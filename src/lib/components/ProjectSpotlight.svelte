<script lang="ts">
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import type { VideoProject } from '$lib/data/portfolio';

	type Props = {
		videos?: VideoProject[];
	};

	let { videos = [] }: Props = $props();

	const YT_ID = '5v7WOd9hAi0';
	const ytSrc = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=1&rel=0`;

	const models = [
		{ url: '', title: '3D Shape' },
		{ url: '/media/models/Lucy.glb', title: 'Lucy' },
		{ url: '/media/models/Male.glb', title: 'Male' }
	];
</script>

<section class="spotlight" id="work" data-video-count={videos.length}>

	<div class="spotlight-grid">
		<ModelViewer {models} accent="#8b0000" />
		<div class="yt-embed-shell">
			<iframe
				src={ytSrc}
				title="Gibran Pro Home - Satu Satunya Rumah Sultan Di Pondok Indah"
				frameborder="0"
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
</section>

<style>
	.spotlight {
		display: grid;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.spotlight-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	.yt-embed-shell {
		position: relative;
		overflow: hidden;
		min-height: clamp(420px, 62vh, 720px);
		background: #080808;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	.yt-embed-shell iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
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

		.yt-embed-shell {
			min-height: auto;
			aspect-ratio: 16 / 9;
		}
	}
</style>
