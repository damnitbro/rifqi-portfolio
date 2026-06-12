<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { identity } from '$lib/data/portfolio';
	import { getProject, projects } from '../../../data/project';

	let project = $derived(getProject(page.params.slug ?? ''));
	let projectIndex = $derived(
		project ? projects.findIndex((item) => item.slug === project?.slug) : -1
	);
	let nextProject = $derived(
		projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : undefined
	);
</script>

<Seo
	title={`${project?.title ?? 'Project'} | ${identity.name}`}
	description={project?.description ?? 'Selected project case study.'}
	path={`/work/${page.params.slug ?? ''}`}
	image={project?.cover.type === 'image'
		? project.cover.src
		: '/media/work/personal-logo/personal-logo.png'}
/>

<SiteNav active="work" />

{#if project}
	<main>
		<header class="project-header page-shell" style:--accent={project.accent}>
			<a class="back" href="/work"><ArrowLeft size={17} /> Selected work</a>
			<span class="eyebrow">{project.category}</span>
			<h1 class="display-title">{project.title}</h1>
			<p class="lede">{project.description}</p>

			<dl>
				<div>
					<dt>Organization</dt>
					<dd>{project.organization}</dd>
				</div>
				<div>
					<dt>Role</dt>
					<dd>{project.role}</dd>
				</div>
				<div>
					<dt>Year</dt>
					<dd>{project.year}</dd>
				</div>
				<div>
					<dt>Disciplines</dt>
					<dd>{project.disciplines.join(', ')}</dd>
				</div>
			</dl>
		</header>

		<section class="hero-media" class:portrait={project.cover.orientation === 'portrait'}>
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
				<img src={project.cover.src} alt={project.cover.alt} />
			{/if}
		</section>

		<article class="case-study page-shell">
			<section class="overview">
				<span class="section-number">01 / Overview</span>
				<p>{project.overview}</p>
			</section>

			{#each project.sections as section, index}
				<section class="case-section">
					<div>
						<span class="section-number">0{index + 2} / {section.title}</span>
						<h2>{section.title}</h2>
					</div>
					<div class="section-copy">
						<p>{section.body}</p>
						{#if section.items}
							<ul>
								{#each section.items as item}
									<li>{item}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</section>
			{/each}
		</article>

		<section class="gallery page-shell" aria-label={`${project.title} gallery`}>
			{#each project.media as media, index}
				<figure
					class:portrait={media.orientation === 'portrait'}
					class:square={media.orientation === 'square'}
					class:wide={media.orientation === 'landscape'}
				>
					{#if media.type === 'video'}
						<video
							src={media.src}
							aria-label={media.alt}
							muted
							autoplay
							loop
							playsinline
							preload="metadata"
						></video>
					{:else}
						<img src={media.src} alt={media.alt} loading={index > 1 ? 'lazy' : 'eager'} />
					{/if}
					<figcaption>{media.alt}</figcaption>
				</figure>
			{/each}
		</section>

		<article class="case-study page-shell">
			<section class="case-section">
				<div>
					<span class="section-number">Deliverables</span>
					<h2>Final output</h2>
				</div>
				<ul class="deliverables">
					{#each project.deliverables as item}
						<li>{item}</li>
					{/each}
				</ul>
			</section>

			<section class="case-section reflection">
				<div>
					<span class="section-number">Reflection</span>
					<h2>What I learned</h2>
				</div>
				<p>{project.reflection}</p>
			</section>
		</article>

		{#if nextProject}
			<a class="next-project page-shell" href={`/work/${nextProject.slug}`}>
				<span>Next project</span>
				<strong>{nextProject.shortTitle}</strong>
				<ArrowRight size={32} />
			</a>
		{/if}
	</main>
{:else}
	<main class="not-found page-shell">
		<span class="eyebrow">404</span>
		<h1 class="display-title">Project not found.</h1>
		<a class="button button-primary" href="/work">Back to selected work</a>
	</main>
{/if}

<SiteFooter />

<style>
	.project-header {
		display: grid;
		gap: 1.4rem;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		width: fit-content;
		margin-bottom: 2rem;
		color: var(--muted);
		font-size: 0.74rem;
		font-weight: 800;
		text-decoration: none;
		text-transform: uppercase;
	}

	.back:hover {
		color: var(--paper);
	}

	.project-header .eyebrow::before {
		background: var(--accent);
	}

	.project-header h1 {
		max-width: 10ch;
	}

	.lede {
		max-width: 45rem;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1.1rem, 2.5vw, 1.5rem);
		line-height: 1.6;
	}

	dl {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		margin: clamp(2rem, 6vw, 5rem) 0 0;
		background: var(--line);
		border: 1px solid var(--line);
	}

	dl div {
		display: grid;
		gap: 0.5rem;
		padding: 1rem;
		background: var(--ink);
	}

	dt {
		color: var(--quiet);
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	dd {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		line-height: 1.45;
	}

	.hero-media {
		display: grid;
		width: min(calc(100% - 2rem), 96rem);
		max-height: 88svh;
		place-items: center;
		margin: clamp(3rem, 7vw, 6rem) auto 0;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
	}

	.hero-media img,
	.hero-media video {
		width: 100%;
		max-height: 88svh;
		object-fit: cover;
	}

	.hero-media.portrait img,
	.hero-media.portrait video {
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}

	.case-study {
		display: grid;
		gap: 0;
		padding-top: clamp(6rem, 12vw, 10rem);
	}

	.overview,
	.case-section {
		display: grid;
		grid-template-columns: minmax(13rem, 0.7fr) minmax(0, 1.3fr);
		gap: clamp(2rem, 8vw, 8rem);
		padding: clamp(2rem, 5vw, 4rem) 0;
		border-top: 1px solid var(--line);
	}

	.overview p {
		margin: 0;
		color: var(--paper);
		font-size: clamp(1.6rem, 4vw, 3.3rem);
		line-height: 1.24;
		text-wrap: balance;
	}

	.section-number {
		color: var(--quiet);
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.case-section > div:first-child {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.case-section h2 {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(2.6rem, 6vw, 5rem);
		font-weight: 500;
		line-height: 0.85;
		text-transform: uppercase;
	}

	.section-copy,
	.reflection > p {
		display: grid;
		gap: 1.5rem;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.75;
	}

	.section-copy p {
		margin: 0;
	}

	.section-copy ul,
	.deliverables {
		display: grid;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--line);
	}

	.section-copy li,
	.deliverables li {
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--line);
	}

	.section-copy li::before,
	.deliverables li::before {
		margin-right: 0.7rem;
		color: var(--red);
		content: '+';
		font-weight: 900;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 0.8rem;
		padding-top: clamp(4rem, 8vw, 7rem);
	}

	.gallery figure {
		grid-column: span 6;
		margin: 0;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}

	.gallery figure.wide {
		grid-column: span 12;
	}

	.gallery figure.portrait {
		grid-column: span 4;
	}

	.gallery figure.square {
		grid-column: span 6;
	}

	.gallery img,
	.gallery video {
		width: 100%;
		height: auto;
		max-height: 78svh;
		object-fit: contain;
		background: var(--surface);
	}

	.gallery figcaption {
		padding: 0.75rem;
		color: var(--quiet);
		border-top: 1px solid var(--line);
		font-size: 0.68rem;
		text-transform: uppercase;
	}

	.next-project {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 1.5rem;
		margin-top: clamp(5rem, 10vw, 9rem);
		padding-block: 2rem;
		color: var(--paper);
		border-block: 1px solid var(--line);
		text-decoration: none;
	}

	.next-project span {
		color: var(--quiet);
		font-size: 0.7rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.next-project strong {
		font-family: var(--display-font);
		font-size: clamp(2.5rem, 7vw, 6rem);
		font-weight: 500;
		line-height: 0.9;
		text-transform: uppercase;
	}

	.next-project:hover {
		color: var(--gold);
	}

	.not-found {
		display: grid;
		justify-items: start;
		gap: 2rem;
		min-height: 75svh;
		align-content: center;
	}

	@media (max-width: 760px) {
		dl {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.hero-media {
			width: calc(100% - 1rem);
		}

		.overview,
		.case-section {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.gallery figure,
		.gallery figure.wide,
		.gallery figure.portrait,
		.gallery figure.square {
			grid-column: span 12;
		}

		.next-project {
			grid-template-columns: 1fr auto;
		}

		.next-project span {
			grid-column: 1 / -1;
		}
	}
</style>
