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
	let canvas2d: HTMLCanvasElement;
	let index = $state(0);
	let modelTitle = $derived(models[index]?.title ?? title);
	let show2d = $state(false);
	let loadRef: ((url: string) => void) | null = null;
	let reset2dFn: (() => void) | null = null;

	$effect(() => {
		const fn = loadRef;
		const i = index;
		if (fn && models.length > 0) {
			fn(models[i].url);
		}
	});

	$effect(() => {
		if (show2d && reset2dFn) {
			reset2dFn();
		}
	});

	let autoTimer: ReturnType<typeof setTimeout>;
	let timerProgress = $state(0);
	const timerDuration = 15000;
	let timerStarted = 0;

	const scheduleAdvance = () => {
		clearTimeout(autoTimer);
		if (models.length < 2) return;
		timerProgress = 0;
		timerStarted = performance.now();
		const tick = () => {
			const elapsed = performance.now() - timerStarted;
			timerProgress = Math.min(elapsed / timerDuration, 1);
			if (timerProgress < 1) {
				autoTimer = setTimeout(tick, 50);
			} else {
				index = (index + 1) % models.length;
				scheduleAdvance();
			}
		};
		autoTimer = setTimeout(tick, 50);
	};

	const resetAdvance = () => {
		scheduleAdvance();
	};

	const prev = () => {
		if (models.length < 2) return;
		index = (index - 1 + models.length) % models.length;
		resetAdvance();
	};

	const next = () => {
		if (models.length < 2) return;
		index = (index + 1) % models.length;
		resetAdvance();
	};

	function navAction(node: HTMLElement, direction: 'prev' | 'next') {
		const handler = direction === 'prev' ? prev : next;
		node.addEventListener('click', handler);
		return {
			destroy() {
				node.removeEventListener('click', handler);
			}
		};
	}

	function dotAction(node: HTMLElement, i: number) {
		const handler = () => {
			index = i;
			resetAdvance();
		};
		node.addEventListener('click', handler);
		return {
			destroy() {
				node.removeEventListener('click', handler);
			}
		};
	}

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
		const isSmallViewport = () => window.matchMedia('(max-width: 760px)').matches;
		const renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: !isSmallViewport(),
			alpha: true,
			powerPreference: 'high-performance'
		});
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;
		const controls = new OrbitControls(camera, renderer.domElement);
		const modelContainer = new THREE.Group();
		const startTime = performance.now();
		let viewerVisible = true;

		camera.position.set(1.8, 1.1, 3.8);
		modelContainer.position.y = 0.18;
		scene.add(modelContainer);
		scene.add(new THREE.HemisphereLight('#ffffff', '#2a1710', 2.8));
		scene.add(new THREE.AmbientLight('#fff4e5', 0.65));

		const key = new THREE.DirectionalLight('#fff2dc', 2.1);
		key.position.set(4, 4, 3);
		scene.add(key);

		const fill = new THREE.DirectionalLight(accent, 2.8);
		fill.position.set(-3, 2, -2);
		scene.add(fill);

		controls.enableDamping = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 1.4;
		controls.enablePan = false;
		controls.minDistance = 1.5;
		controls.maxDistance = 6.5;

		const fallbackMat = new THREE.MeshStandardMaterial({
			color: '#f7f3e8',
			metalness: 0.42,
			roughness: 0.34,
			emissive: new THREE.Color(accent),
			emissiveIntensity: 0.05
		});

		const wireMat = new THREE.MeshBasicMaterial({
			color: accent,
			wireframe: true,
			transparent: true,
			opacity: 0.2
		});

		const fallbackCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.96, 4), fallbackMat);
		const fallbackWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 2), wireMat);

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
		fallbackGroup.add(fallbackCore, fallbackWire, ring, platform);

		const loader = new GLTFLoader();

		const showFallback = () => {
			while (modelContainer.children.length) {
				modelContainer.remove(modelContainer.children[0]);
			}
			modelContainer.add(fallbackGroup);
			show2d = false;
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
					show2d = false;
				},
				undefined,
				showFallback
			);
		};

		const loadModel = (url: string) => {
			if (!url) {
				showFallback();
				return;
			}
			if (url === 'particle-planet') {
				show2d = true;
				return;
			}
			loadGLB(url);
		};

		if (models.length > 0) {
			loadModel(models[0].url);
		} else {
			showFallback();
		}

		loadRef = loadModel;

		const resize = () => {
			const width = Math.max(320, host.clientWidth);
			const height = Math.max(420, host.clientHeight);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallViewport() ? 1.25 : 2));
			renderer.setSize(width, height, false);
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(host);
		resize();

		const visibilityObserver = new IntersectionObserver(
			([entry]) => {
				viewerVisible = entry.isIntersecting;
			},
			{ rootMargin: '180px 0px', threshold: 0.01 }
		);
		visibilityObserver.observe(host);

		const canAnimate = () => viewerVisible && !document.hidden;

		let frame = 0;
		let frame2d = 0;
		let pCounter = 100;

		const tick = () => {
			if (canAnimate()) {
				const elapsed = (performance.now() - startTime) / 1000;
				const floatY = Math.sin(elapsed * 1.4) * 0.08;
				fallbackCore.position.y = floatY;
				fallbackWire.position.y = floatY;
				fallbackWire.rotation.x -= 0.004;
				ring.rotation.z += 0.006;
				controls.update();
				renderer.render(scene, camera);
			}
			frame = requestAnimationFrame(tick);
		};
		tick();

		const draw2D = () => {
			frame2d = requestAnimationFrame(draw2D);
			if (!canAnimate() || !show2d || !canvas2d) return;
			const w = canvas2d.width;
			const h = canvas2d.height;
			if (w === 0 || h === 0) return;
			const ctx = canvas2d.getContext('2d');
			if (!ctx) return;

			ctx.fillStyle = 'rgba(0, 0, 0, 0.157)';
			ctx.fillRect(0, 0, w, h);

			pCounter += 0.015;
			const cx = w / 2;
			const cy = h / 2;
			const primaryCount = isSmallViewport() ? 1200 : 3000;
			const secondaryCount = isSmallViewport() ? 800 : 1999;

			for (let i = primaryCount; i >= 2; i -= 2) {
				drawPoint(ctx, i, 0, cx, cy, pCounter);
			}
			for (let i = secondaryCount; i > 1; i -= 2) {
				drawPoint(ctx, i, 1, cx, cy, pCounter);
			}
		};

		const drawPoint = (
			ctx: CanvasRenderingContext2D,
			i: number,
			parity: number,
			cx: number,
			cy: number,
			counter: number
		) => {
			const r = counter / Math.cos(counter / i) + parity * (counter / 2 + (i % counter));
			const a = counter / 9 + i * i;
			const ringFlatten = parity ? 0.28 : 1.0;
			const ringTilt = parity ? 2.1 : 1.0;
			const x = cx + r * Math.sin(a) * Math.cos(((parity === 0 ? 1 : 0) * i) / counter);
			const y = cy + r * Math.cos(a + parity * 2) * ringFlatten * ringTilt;
			let size = 1 - Math.cos(a);
			if (parity) {
				const depth = Math.sin(a + 2);
				size *= ((depth + 1) / 2) * (1.3 - 0.4) + 0.4;
			}
			ctx.beginPath();
			ctx.arc(x, y, Math.max(size, 0.5) / 2, 0, Math.PI * 2);
			if (parity === 0) {
				ctx.fillStyle = 'rgba(220, 200, 170, 0.706)';
			} else {
				ctx.fillStyle = 'rgba(200, 220, 255, 0.627)';
			}
			ctx.fill();
		};
		draw2D();

		const reset2D = () => {
			pCounter = 100;
			if (canvas2d) {
				canvas2d.width = host.clientWidth;
				canvas2d.height = host.clientHeight;
				const ctx = canvas2d.getContext('2d');
				if (ctx) {
					ctx.fillStyle = '#000';
					ctx.fillRect(0, 0, canvas2d.width, canvas2d.height);
				}
			}
		};

		reset2dFn = reset2D;

		const handleKeydown = (e: KeyboardEvent) => {
			if (models.length < 2) return;
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		};
		window.addEventListener('keydown', handleKeydown);

		const handleControlStart = () => resetAdvance();
		controls.addEventListener('start', handleControlStart);

		resetAdvance();

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
			resetAdvance();
		};
		host.addEventListener('touchstart', handleTouchStart, { passive: true });
		host.addEventListener('touchend', handleTouchEnd);

		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(frame2d);
			clearTimeout(autoTimer);
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			controls.dispose();
			renderer.dispose();
			window.removeEventListener('keydown', handleKeydown);
			controls.removeEventListener('start', handleControlStart);
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
	<canvas bind:this={canvas2d} class:active={show2d}></canvas>
	<div class="model-label" class:hidden={show2d}>
		<span>{kicker}</span>
		<strong>{modelTitle}</strong>
	</div>
	<button
		class="nav-arrow nav-prev"
		class:hidden={models.length < 2}
		use:navAction={'prev'}
		aria-label="Previous model"
	>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
		>
	</button>
	<button
		class="nav-arrow nav-next"
		class:hidden={models.length < 2}
		use:navAction={'next'}
		aria-label="Next model"
	>
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
		>
	</button>
	<div class="nav-dots" class:hidden={models.length < 2}>
		{#each models as model, i (model.url)}
			<button class:active={i === index} use:dotAction={i} aria-label="Switch to model {i + 1}"
			></button>
		{/each}
	</div>
	<div class="timer-bar" style:--progress={timerProgress.toFixed(3)}></div>
</div>

<style>
	.model-viewer {
		position: relative;
		min-height: clamp(420px, 62vh, 720px);
		overflow: hidden;
		background:
			radial-gradient(
				circle at 70% 30%,
				color-mix(in srgb, var(--accent) 35%, transparent),
				transparent 34%
			),
			linear-gradient(145deg, #151515 0%, #080808 58%, #1b1711 100%);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	canvas:first-of-type {
		cursor: grab;
		z-index: 1;
	}

	canvas:first-of-type:active {
		cursor: grabbing;
	}

	canvas + canvas {
		z-index: 2;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	canvas + canvas.active {
		opacity: 1;
	}

	.model-label {
		position: absolute;
		left: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		display: grid;
		gap: 0.35rem;
		pointer-events: none;
		z-index: 3;
		transition: opacity 0.3s ease;
	}

	.model-label.hidden {
		opacity: 0;
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
		top: calc(50% - 1.3rem);
		z-index: 4;
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
		transition:
			background 0.15s,
			color 0.15s;
		isolation: isolate;
		contain: layout style;
	}

	.nav-arrow.hidden {
		display: none;
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
		z-index: 4;
		display: flex;
		gap: 0.4rem;
		transform: translateX(-50%);
	}

	.nav-dots.hidden {
		display: none;
	}

	.nav-dots button {
		width: 0.55rem;
		height: 0.55rem;
		padding: 0;
		background: rgba(245, 245, 245, 0.3);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition:
			background 0.15s,
			transform 0.15s;
	}

	.nav-dots button.active {
		background: var(--accent);
		transform: scale(1.35);
	}

	.timer-bar {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 5;
		height: 2px;
		background: var(--accent);
		width: calc(var(--progress) * 100%);
		pointer-events: none;
		transition: width 0.05s linear;
	}

	@media (max-width: 680px) {
		.model-viewer {
			min-height: auto;
			aspect-ratio: 4 / 5;
		}

		strong {
			font-size: clamp(2.35rem, 12vw, 3.25rem);
		}

		.nav-arrow {
			width: 2.35rem;
			height: 2.35rem;
		}
	}

	@media (max-width: 420px) {
		.model-viewer {
			aspect-ratio: 1 / 1.15;
		}

		.model-label {
			left: 0.9rem;
			bottom: 0.9rem;
		}
	}
</style>
