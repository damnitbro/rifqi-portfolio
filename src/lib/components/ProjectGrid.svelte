<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import type { Project } from '../../data/project';

	type Props = {
		items: Project[];
	};

	let { items }: Props = $props();
</script>

<div class="project-grid">
	{#each items as project, index (project.slug)}
		<a class="project-card" href={`/work/${project.slug}`} style:--accent={project.accent}>
			<div class="media" class:portrait={project.cover.orientation === 'portrait'}>
				{#if project.cover.type === 'video'}
					<video
						src={project.cover.src}
						aria-label={project.cover.alt}
						muted
						autoplay
						loop
						playsinline
						preload="metadata"
					></video>
				{:else}
					<img
						src={project.cover.src}
						alt={project.cover.alt}
						loading={index > 1 ? 'lazy' : 'eager'}
					/>
				{/if}
				<span class="index">0{index + 1}</span>
				<span class="open"><ArrowUpRight size={20} /></span>
			</div>

			<div class="copy">
				<div class="meta">
					<span>{project.category}</span>
					<span>{project.year}</span>
				</div>
				<h3>{project.shortTitle}</h3>
				<p>{project.description}</p>
				<ul aria-label="Disciplines">
					{#each project.disciplines as discipline}
						<li>{discipline}</li>
					{/each}
				</ul>
			</div>
		</a>
	{/each}
</div>

<style>
	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(2rem, 5vw, 5rem) 1rem;
	}

	.project-card {
		display: grid;
		gap: 1.1rem;
		min-width: 0;
		color: var(--paper);
		text-decoration: none;
	}

	.media {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		background: color-mix(in srgb, var(--accent) 16%, var(--surface));
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}

	.media.portrait {
		background:
			radial-gradient(
				circle at 50% 35%,
				color-mix(in srgb, var(--accent) 28%, transparent),
				transparent 46%
			),
			var(--surface);
	}

	.media img,
	.media video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
			filter 400ms ease;
	}

	.media.portrait img,
	.media.portrait video {
		object-fit: contain;
	}

	.project-card:hover .media img,
	.project-card:hover .media video {
		transform: scale(1.035);
		filter: saturate(1.08);
	}

	.index,
	.open {
		position: absolute;
		top: 0.8rem;
		display: grid;
		place-items: center;
		height: 2.5rem;
		background: rgba(8, 8, 8, 0.76);
		border: 1px solid rgba(255, 255, 255, 0.18);
		backdrop-filter: blur(10px);
	}

	.index {
		left: 0.8rem;
		padding-inline: 0.8rem;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 900;
	}

	.open {
		right: 0.8rem;
		width: 2.5rem;
		border-radius: 50%;
		transition:
			color 180ms ease,
			background 180ms ease,
			transform 180ms ease;
	}

	.project-card:hover .open {
		color: var(--ink);
		background: var(--paper);
		transform: rotate(8deg);
	}

	.copy {
		display: grid;
		gap: 0.7rem;
	}

	.meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--quiet);
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(2.4rem, 5vw, 4.5rem);
		font-weight: 500;
		line-height: 0.86;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}

	p {
		max-width: 38rem;
		margin: 0;
		color: var(--muted);
		line-height: 1.65;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0.2rem 0 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 0.38rem 0.6rem;
		color: var(--muted);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	@media (max-width: 760px) {
		.project-grid {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}
	}
</style>
