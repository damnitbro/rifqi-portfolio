<script lang="ts">
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import type { VideoProject } from '$lib/data/portfolio';

	type Props = {
		videos?: VideoProject[];
	};

	let { videos = [] }: Props = $props();

	const socaSrc = '/media/work/3d-personal/socastreet.mp4';

	const models = [
		{ url: '/media/models/Lucy.glb', title: 'Lucy' },
		{ url: '/media/models/Male.glb', title: 'Male' }
	];
</script>

<section class="spotlight" id="work" data-video-count={videos.length}>
	<div class="section-heading">
		<span>Featured work</span>
		<h2>Project Spotlight</h2>
	</div>

	<div class="spotlight-grid">
		<ModelViewer {models} accent="#8b0000" />
		<div class="vid-shell">
			<video src={socaSrc} muted autoplay playsinline loop preload="metadata"></video>
		</div>
	</div>
</section>

<style>
	.spotlight {
		display: grid;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.section-heading {
		display: grid;
		gap: 0.2rem;
	}

	.section-heading span {
		color: rgba(255, 255, 255, 0.58);
		font-size: 0.86rem;
		font-weight: 950;
		text-transform: uppercase;
	}

	.section-heading h2 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 4.8rem;
		line-height: 0.88;
		letter-spacing: 0.024em;
		text-wrap: balance;
	}

	.spotlight-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	.vid-shell {
		position: relative;
		overflow: hidden;
		min-height: clamp(420px, 62vh, 720px);
		background: #080808;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	.vid-shell video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	@media (max-width: 980px) {
		.spotlight-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 680px) {
		.spotlight {
			gap: 1rem;
		}

		.vid-shell {
			min-height: auto;
			aspect-ratio: 16 / 9;
		}
	}
</style>
