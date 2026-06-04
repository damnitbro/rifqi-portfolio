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
		const decor = new THREE.Group();
		const clock = new THREE.Clock();

		camera.position.set(2.8, 1.8, 6.2);
		modelContainer.position.y = 0.18;
		scene.add(modelContainer);
		scene.add(decor);
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

		const fallbackGeo = new THREE.IcosahedronGeometry(0.96, 4);
		const fallbackMat = new THREE.MeshStandardMaterial({
			color: '#f7f3e8',
			metalness: 0.42,
			roughness: 0.34,
			emissive: new THREE.Color(accent),
			emissiveIntensity: 0.05
		});
		const fallbackCore = new THREE.Mesh(fallbackGeo, fallbackMat);

		const wireMat = new THREE.MeshBasicMaterial({
			color: accent,
			wireframe: true,
			transparent: true,
			opacity: 0.2
		});
		const fallbackWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 2), wireMat);

		const ring = new THREE.Mesh(
			new THREE.TorusGeometry(1.36, 0.016, 16, 140),
			new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.3 })
		);
		ring.rotation.x = Math.PI / 2.8;

		const platform = new THREE.Mesh(
			new THREE.CylinderGeometry(1.45, 1.45, 0.05, 96),
			new THREE.MeshStandardMaterial({
				color: '#121212',
				metalness: 0.1,
				roughness: 0.8
			})
		);
		platform.position.y = -1.08;

		fallbackCore.visible = false;
		fallbackWire.visible = false;
		decor.add(ring, platform);

		const loader = new GLTFLoader();

		const showFallback = () => {
			while (modelContainer.children.length) {
				const child = modelContainer.children[0];
				modelContainer.remove(child);
			}
			fallbackCore.visible = true;
			fallbackWire.visible = true;
			modelContainer.add(fallbackCore, fallbackWire);
		};

		const loadGLB = (url: string) => {
			loader.load(
				url,
				(gltf) => {
					while (modelContainer.children.length) {
						const child = modelContainer.children[0];
						modelContainer.remove(child);
					}
					const model = gltf.scene;
					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const size = box.getSize(new THREE.Vector3()).length();
					model.position.sub(center);
					model.scale.setScalar(2.5 / size);
					modelContainer.add(model);
				},
				undefined,
				showFallback
			);
		};

		const loadModel = (url: string) => {
			if (!url) { showFallback(); return; }
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
			const floatY = Math.sin(elapsed * 1.4) * 0.08;
			fallbackCore.position.y = floatY;
			fallbackWire.position.y = floatY;
			fallbackWire.rotation.x -= 0.004;
			ring.rotation.z += 0.006;
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
