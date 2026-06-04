<script lang="ts">
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import type { VideoProject } from '$lib/data/portfolio';

	type Props = {
		videos?: VideoProject[];
	};

	let { videos = [] }: Props = $props();

	const YT_ID = '5v7WOd9hAi0';
	const ytSrc = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=1&rel=0`;
</script>

<section class="spotlight" id="work" data-video-count={videos.length}>
	<div class="section-heading">
		<span>Selected roles</span>
		<h2>One CV, multiple visual modes.</h2>
	</div>

	<div class="spotlight-grid">
		<ModelViewer accent="#8b0000" />
		<div class="yt-embed-shell">
			<iframe
				src={ytSrc}
				title="Gibran Pro Home - Satu Satunya Rumah Sultan Di Pondok Indah"
				frameborder="0"
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

	.section-heading {
		display: grid;
		grid-template-columns: minmax(8rem, 0.35fr) minmax(0, 0.85fr);
		align-items: end;
		gap: 1rem;
	}

	.section-heading span {
		color: #ff1010;
		font-size: 0.82rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		font-size: 5.8rem;
		line-height: 0.86;
		text-wrap: balance;
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
		h2 {
			font-size: 3.2rem;
		}

		.section-heading,
		.spotlight-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		h2 {
			font-size: 2.6rem;
		}
	}
</style>
