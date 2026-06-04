<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	type Props = {
		modelUrl?: string;
		title?: string;
		kicker?: string;
		accent?: string;
	};

	let {
		modelUrl,
		title = '3D Artist',
		kicker = 'Realtime model preview',
		accent = '#8b0000'
	}: Props = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		const controls = new OrbitControls(camera, renderer.domElement);
		const group = new THREE.Group();
		const clock = new THREE.Clock();

		camera.position.set(2.8, 1.8, 6.2);
		group.position.y = 0.18;
		scene.add(group);
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

		const material = new THREE.MeshStandardMaterial({
			color: '#f7f3e8',
			metalness: 0.42,
			roughness: 0.34,
			emissive: new THREE.Color(accent),
			emissiveIntensity: 0.05
		});

		const wire = new THREE.MeshBasicMaterial({
			color: accent,
			wireframe: true,
			transparent: true,
			opacity: 0.2
		});

		const fallbackCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.96, 4), material);
		const fallbackWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.02, 2), wire);

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
		group.add(fallbackCore, fallbackWire, ring, platform);

		if (modelUrl) {
			new GLTFLoader().load(modelUrl, (gltf) => {
				group.clear();
				const model = gltf.scene;
				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				const size = box.getSize(new THREE.Vector3()).length();
				model.position.sub(center);
				model.scale.setScalar(2.5 / size);
				group.add(model);
			});
		}

		const resize = () => {
			const width = Math.max(320, host.clientWidth);
			const height = Math.max(420, host.clientHeight);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height, false);
		};

		const observer = new ResizeObserver(resize);
		observer.observe(host);
		resize();

		let frame = 0;
		const tick = () => {
			const elapsed = clock.getElapsedTime();
			const floatY = Math.sin(elapsed * 1.4) * 0.08;
			group.rotation.y += 0.003;
			fallbackCore.position.y = floatY;
			fallbackWire.position.y = floatY;
			fallbackWire.rotation.x -= 0.004;
			ring.rotation.z += 0.006;
			controls.update();
			renderer.render(scene, camera);
			frame = requestAnimationFrame(tick);
		};
		tick();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			controls.dispose();
			renderer.dispose();
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
	<canvas bind:this={canvas} aria-label={title}></canvas>
	<div class="model-label">
		<span>{kicker}</span>
		<strong>{title}</strong>
	</div>
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

	@media (max-width: 620px) {
		strong {
			font-size: 2.6rem;
		}
	}
</style>
