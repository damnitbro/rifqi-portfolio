<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	type ModelEntry = {
		url: string;
		title?: string;
	};

	type Props = {
		models?: ModelEntry[];
		title?: string;
		kicker?: string;
		accent?: string;
	};

	let {
		models = [],
		title = '3D Artist',
		kicker = 'Realtime model preview',
		accent = '#8b0000'
	}: Props = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let index = $state(0);
	let modelTitle = $derived(models[index]?.title ?? title);

	const prev = () => {
		if (models.length < 2) return;
		index = (index - 1 + models.length) % models.length;
	};

	const next = () => {
		if (models.length < 2) return;
		index = (index + 1) % models.length;
	};

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		const controls = new OrbitControls(camera, renderer.domElement);
		const modelContainer = new THREE.Group();
		const clock = new THREE.Clock();

		camera.position.set(2.8, 1.8, 6.2);
		modelContainer.position.y = 0.18;
		scene.add(modelContainer);
		scene.add(new THREE.HemisphereLight('#ffffff', '#1a0f0a', 1.35));

		const key = new THREE.DirectionalLight(accent, 2.3);
		key.position.set(4, 4, 3);
		scene.add(key);

		const fill = new THREE.DirectionalLight('#c2a96a', 1.2);
		fill.position.set(-3, 2, -2);
		scene.add(fill);

		controls.enableDamping = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 1.4;
		controls.enablePan = false;
		controls.minDistance = 4.4;
		controls.maxDistance = 8;

		const PARTICLE_COUNT = 4000;
		const pPos = new Float32Array(PARTICLE_COUNT * 3);
		const pCol = new Float32Array(PARTICLE_COUNT * 3);
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const idx = i * 3;
			const parity = i % 2;
			const t = i / PARTICLE_COUNT;
			if (parity === 0) {
				const theta = i * 0.7;
				const phi = i * 0.3;
				const r = 0.2 + t * 0.35;
				pPos[idx] = r * Math.sin(theta) * Math.cos(phi);
				pPos[idx + 1] = r * Math.cos(theta) * 0.8;
				pPos[idx + 2] = r * Math.sin(theta) * Math.sin(phi) * 0.6;
				pCol[idx] = 0.95;
				pCol[idx + 1] = 0.72;
				pCol[idx + 2] = 0.52;
			} else {
				const angle = i * 1.7;
				const rr = 0.3 + t * 0.55;
				pPos[idx] = rr * Math.sin(angle);
				pPos[idx + 1] = Math.cos(angle * 2) * 0.05;
				pPos[idx + 2] = rr * Math.cos(angle) * 0.45;
				pCol[idx] = 0.55;
				pCol[idx + 1] = 0.7;
				pCol[idx + 2] = 0.95;
			}
		}
		const pGeo = new THREE.BufferGeometry();
		pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
		pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
		const pMat = new THREE.PointsMaterial({
			size: 0.025,
			vertexColors: true,
			transparent: true,
			opacity: 0.85,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			sizeAttenuation: true
		});
		const particles = new THREE.Points(pGeo, pMat);
		let pCounter = 100;

		const ring = new THREE.Mesh(
			new THREE.TorusGeometry(1.36, 0.016, 16, 140),
			new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.3 })
		);
		ring.rotation.x = Math.PI / 2.8;

		const platform = new THREE.Mesh(
			new THREE.CylinderGeometry(1.45, 1.45, 0.05, 96),
			new THREE.MeshStandardMaterial({ color: '#121212', metalness: 0.1, roughness: 0.8 })
		);
		platform.position.y = -1.08;

		const fallbackGroup = new THREE.Group();
		fallbackGroup.add(particles, ring, platform);

		const updateParticles = (elapsed: number) => {
			pCounter += 0.02;
			const pos = particles.geometry.attributes.position.array as Float32Array;
			const scale = 0.006;
			for (let i = 2; i < PARTICLE_COUNT; i++) {
				const parity = i % 2;
				const idx = i * 3;
				const r = pCounter / Math.cos(pCounter / (i + 1)) + parity * (pCounter / 2 + (i % 97));
				const a = pCounter / 9 + i * i;
				const rz = r * scale;
				if (parity === 0) {
					pos[idx] = rz * Math.sin(a) * Math.cos(i / pCounter);
					pos[idx + 1] = rz * Math.cos(a) * 0.8;
					pos[idx + 2] = rz * Math.sin(a) * Math.sin(i / pCounter) * 0.5;
				} else {
					pos[idx] = rz * Math.sin(a) * Math.cos(i / pCounter);
					pos[idx + 1] = rz * Math.cos(a + 2) * 0.28 * 2.1;
					pos[idx + 2] = rz * Math.sin(a) * Math.sin(i / pCounter) * 0.3;
				}
			}
			particles.geometry.attributes.position.needsUpdate = true;
		};

		const loader = new GLTFLoader();

		const showFallback = () => {
			while (modelContainer.children.length) {
				modelContainer.remove(modelContainer.children[0]);
			}
			pCounter = 100;
			ring.rotation.z = 0;
			modelContainer.add(fallbackGroup);
		};

		const loadGLB = (url: string) => {
			loader.load(
				url,
				(gltf) => {
					while (modelContainer.children.length) {
						modelContainer.remove(modelContainer.children[0]);
					}
					const model = gltf.scene;
					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const size = box.getSize(new THREE.Vector3()).length();
					model.position.sub(center);
					model.position.y -= 0.3;
					model.scale.setScalar(2.5 / size);
					modelContainer.add(model);
				},
				undefined,
				showFallback
			);
		};

		const proceduralGenerators: Record<string, () => THREE.Object3D> = {
			'torus-knot': () => {
				const group = new THREE.Group();
				const core = new THREE.Mesh(
					new THREE.TorusKnotGeometry(0.7, 0.25, 128, 32),
					new THREE.MeshStandardMaterial({
						color: '#f7f3e8',
						metalness: 0.7,
						roughness: 0.2,
						emissive: new THREE.Color(accent),
						emissiveIntensity: 0.08
					})
				);
				const wire = new THREE.Mesh(
					new THREE.TorusKnotGeometry(0.73, 0.27, 48, 16),
					new THREE.MeshBasicMaterial({
						color: accent,
						wireframe: true,
						transparent: true,
						opacity: 0.15
					})
				);
				group.add(core, wire);
				return group;
			},
			'crystal-cluster': () => {
				const group = new THREE.Group();
				const count = 9;
				const baseMat = new THREE.MeshStandardMaterial({
					color: '#f7f3e8',
					metalness: 0.6,
					roughness: 0.15,
					transparent: true,
					opacity: 0.9,
					emissive: new THREE.Color(accent),
					emissiveIntensity: 0.05
				});
				const wireM = new THREE.MeshBasicMaterial({
					color: accent,
					wireframe: true,
					transparent: true,
					opacity: 0.12
				});
				for (let i = 0; i < count; i++) {
					const t = i / count;
					const size = 0.2 + t * 0.5;
					const angle = t * Math.PI * 2;
					const radius = 0.5 + t * 0.4;
					const x = Math.cos(angle) * radius;
					const y = Math.sin(angle * 1.3) * radius * 0.5;
					const z = Math.sin(angle) * radius;
					const oct = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0), baseMat.clone());
					oct.position.set(x, y, z);
					oct.rotation.set(angle * 2, angle * 1.5, angle);
					group.add(oct);
					const wireOct = new THREE.Mesh(new THREE.OctahedronGeometry(size * 1.06, 0), wireM);
					wireOct.position.copy(oct.position);
					wireOct.rotation.copy(oct.rotation);
					group.add(wireOct);
				}
				return group;
			}
		};

		const loadProcedural = (key: string) => {
			const gen = proceduralGenerators[key];
			if (!gen) { showFallback(); return; }
			while (modelContainer.children.length) {
				modelContainer.remove(modelContainer.children[0]);
			}
			modelContainer.add(gen());
		};

		const loadModel = (url: string) => {
			if (!url) { showFallback(); return; }
			if (url.startsWith('procedural:')) {
				loadProcedural(url.slice('procedural:'.length));
				return;
			}
			loadGLB(url);
		};

		if (models.length > 0) {
			loadModel(models[0].url);
		} else {
			showFallback();
		}

		$effect(() => {
			if (models.length > 0) {
				loadModel(models[index].url);
			}
		});

		const resize = () => {
			const width = Math.max(320, host.clientWidth);
			const height = Math.max(420, host.clientHeight);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height, false);
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(host);
		resize();

		let frame = 0;
		const tick = () => {
			const elapsed = clock.getElapsedTime();
			const current = modelContainer.children[0];
			if (current === fallbackGroup) {
				updateParticles(elapsed);
				ring.rotation.z += 0.006;
			}
			controls.update();
			renderer.render(scene, camera);
			frame = requestAnimationFrame(tick);
		};
		tick();

		const handleKeydown = (e: KeyboardEvent) => {
			if (models.length < 2) return;
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		};
		window.addEventListener('keydown', handleKeydown);

		let touchStartX = 0;
		let touchStartY = 0;
		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.changedTouches[0].screenX;
			touchStartY = e.changedTouches[0].screenY;
		};
		const handleTouchEnd = (e: TouchEvent) => {
			if (models.length < 2) return;
			const dx = e.changedTouches[0].screenX - touchStartX;
			const dy = e.changedTouches[0].screenY - touchStartY;
			if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
				if (dx > 0) prev();
				else next();
			}
		};
		host.addEventListener('touchstart', handleTouchStart, { passive: true });
		host.addEventListener('touchend', handleTouchEnd);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			controls.dispose();
			renderer.dispose();
			window.removeEventListener('keydown', handleKeydown);
			host.removeEventListener('touchstart', handleTouchStart);
			host.removeEventListener('touchend', handleTouchEnd);
			scene.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry.dispose();
					const materials = Array.isArray(object.material) ? object.material : [object.material];
					materials.forEach((item) => item.dispose());
				}
			});
		};
	});
</script>

<div class="model-viewer" bind:this={host} style:--accent={accent}>
	<canvas bind:this={canvas} aria-label={modelTitle}></canvas>
	<div class="model-label">
		<span>{kicker}</span>
		<strong>{modelTitle}</strong>
	</div>
	{#if models.length > 1}
		<button class="nav-arrow nav-prev" onclick={prev} aria-label="Previous model">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
		</button>
		<button class="nav-arrow nav-next" onclick={next} aria-label="Next model">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
		</button>
		<div class="nav-dots">
			{#each models as _, i}
				<button
					class:active={i === index}
					onclick={() => { index = i; }}
					aria-label="Switch to model {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.model-viewer {
		position: relative;
		min-height: clamp(420px, 62vh, 720px);
		overflow: hidden;
		background:
			radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 34%),
			linear-gradient(145deg, #151515 0%, #080808 58%, #1b1711 100%);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		cursor: grab;
		z-index: 1;
	}

	canvas:active {
		cursor: grabbing;
	}

	.model-label {
		position: absolute;
		left: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		display: grid;
		gap: 0.35rem;
		pointer-events: none;
		z-index: 2;
	}

	span {
		color: var(--accent);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	strong {
		max-width: 12ch;
		font-size: 4rem;
		line-height: 0.88;
		text-wrap: balance;
	}

	.nav-arrow {
		position: absolute;
		top: 50%;
		z-index: 3;
		display: grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		padding: 0;
		color: rgba(245, 245, 245, 0.7);
		background: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		cursor: pointer;
		transform: translateY(-50%);
		transition: background 0.15s, color 0.15s;
	}

	.nav-arrow:hover {
		background: rgba(255, 16, 16, 0.6);
		color: #fff;
	}

	.nav-prev {
		left: 0.8rem;
	}

	.nav-next {
		right: 0.8rem;
	}

	.nav-dots {
		position: absolute;
		left: 50%;
		bottom: 1rem;
		z-index: 3;
		display: flex;
		gap: 0.4rem;
		transform: translateX(-50%);
	}

	.nav-dots button {
		width: 0.55rem;
		height: 0.55rem;
		padding: 0;
		background: rgba(245, 245, 245, 0.3);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: background 0.15s, transform 0.15s;
	}

	.nav-dots button.active {
		background: var(--accent);
		transform: scale(1.35);
	}

	@media (max-width: 620px) {
		strong {
			font-size: 2.6rem;
		}
	}
</style>
