<script lang="ts">
	import type { SocialPost } from '$lib/data/portfolio';

	type Props = {
		columns: SocialPost[][];
	};

	let { columns }: Props = $props();
</script>

<div class="carousel" aria-label="Social work samples">
	{#each columns as column, index}
		<div class="lane" class:reverse={index === 1} style:--speed={`${26 + index * 5}s`}>
			<div class="track">
				{#each [...column, ...column] as post}
					<article class="post" style:--accent={post.accent}>
						<div class="post-top">
							<span class="avatar"></span>
							<div>
								<strong>{post.title}</strong>
								<span>{post.meta}</span>
							</div>
						</div>

						<div class="post-media">
							{#if post.src}
								<img src={post.src} alt={post.title} loading="lazy" />
							{/if}
							<span>{post.title}</span>
						</div>

						<p>{post.caption}</p>
					</article>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.carousel {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(0.7rem, 2vw, 1.2rem);
		height: min(720px, 80vh);
		min-height: 460px;
		overflow: hidden;
		mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
	}

	.lane {
		min-width: 0;
		overflow: hidden;
	}

	.track {
		display: grid;
		gap: clamp(0.7rem, 2vw, 1.2rem);
		animation: scroll-y var(--speed) linear infinite;
	}

	.reverse .track {
		animation-direction: reverse;
	}

	.post {
		display: grid;
		gap: 0.85rem;
		padding: clamp(0.75rem, 2vw, 1rem);
		background: #111;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
	}

	.post-top {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		align-items: center;
		gap: 0.65rem;
	}

	.avatar {
		width: 2rem;
		aspect-ratio: 1;
		background:
			linear-gradient(135deg, var(--accent), transparent),
			#222;
		border-radius: 50%;
	}

	.post-top div {
		display: grid;
		min-width: 0;
		gap: 0.1rem;
	}

	strong,
	.post-top span,
	p {
		overflow-wrap: anywhere;
	}

	strong {
		font-size: 0.88rem;
	}

	.post-top span {
		color: rgba(255, 255, 255, 0.58);
		font-size: 0.72rem;
	}

	.post-media {
		position: relative;
		display: grid;
		aspect-ratio: 4 / 5;
		place-items: end start;
		overflow: hidden;
		padding: 0.85rem;
		background:
			radial-gradient(circle at 24% 20%, color-mix(in srgb, var(--accent) 74%, #fff), transparent 18%),
			linear-gradient(140deg, color-mix(in srgb, var(--accent) 60%, #111), #111 62%),
			repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 13px);
		border-radius: 6px;
	}

	.post-media::after {
		position: absolute;
		inset: 0;
		content: '';
		background: linear-gradient(180deg, transparent 34%, rgba(0, 0, 0, 0.78));
		pointer-events: none;
	}

	.post-media img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-media span {
		position: relative;
		z-index: 1;
		max-width: 9ch;
		color: #f8f8f2;
		font-size: 1.65rem;
		font-weight: 900;
		line-height: 0.9;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.75);
		text-transform: uppercase;
	}

	p {
		margin: 0;
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.82rem;
		line-height: 1.35;
	}

	@keyframes scroll-y {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(-50%);
		}
	}

	@media (max-width: 760px) {
		.post-media span {
			font-size: 1.15rem;
		}

		.carousel {
			grid-template-columns: 1fr 1fr;
			height: 620px;
		}

		.lane:nth-child(3) {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
