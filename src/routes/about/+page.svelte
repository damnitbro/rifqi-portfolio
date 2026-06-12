<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { identity } from '$lib/data/portfolio';

	const capabilities = [
		'Campaign design',
		'Social-media content systems',
		'3D visualization',
		'Motion graphics',
		'Video editing',
		'Art direction',
		'Visual identity application',
		'Presentation design'
	];

	const process = [
		{
			title: 'Understand',
			text: 'Identify the audience, objective, required information, platform, and practical limitations.'
		},
		{
			title: 'Define',
			text: 'Establish the hierarchy, composition, typography, imagery, color, and motion principles.'
		},
		{
			title: 'Produce',
			text: 'Build reusable assets that remain consistent across different dimensions and formats.'
		},
		{
			title: 'Refine',
			text: 'Revise the work through feedback while protecting clarity, accessibility, and visual hierarchy.'
		}
	];
</script>

<Seo
	title={`About | ${identity.name}`}
	description="About Rifqi Adiantama, a Jakarta-based visual designer working across 3D, motion, and digital campaigns."
	path="/about"
	image="/images/Me.png"
/>

<SiteNav active="about" />

<main class="page-shell">
	<header class="page-intro">
		<span class="eyebrow">About</span>
		<h1 class="display-title">I build visual ideas that can travel.</h1>
	</header>

	<section class="portrait-story">
		<figure>
			<img src="/images/Me.png" alt="Portrait of Rifqi Adiantama" />
		</figure>
		<div class="story">
			<p class="lead">
				I am Rifqi Adiantama, a Jakarta-based visual designer specializing in 3D, motion, and
				digital campaign production.
			</p>
			<p>
				My experience covers institutional communication, social-media campaigns, real-estate
				marketing, video editing, and visual development. I am especially interested in projects
				that require one idea to remain clear and consistent across static graphics, motion content,
				video, and 3D applications.
			</p>
			<p>
				Rather than treating each deliverable as an isolated design, I aim to build flexible visual
				systems that can adapt for different platforms, audiences, and formats.
			</p>
			<a class="button button-primary" href="/resume">
				View resume <ArrowUpRight size={18} />
			</a>
		</div>
	</section>

	<section class="content-section">
		<div class="section-heading">
			<div>
				<span class="eyebrow">Capabilities</span>
				<h2>Across image,<br />motion &amp; space.</h2>
			</div>
			<p>
				I connect strategy, visual direction, and production so the final work feels like one system
				instead of a collection of unrelated outputs.
			</p>
		</div>

		<ul class="capability-list">
			{#each capabilities as capability, index}
				<li><span>0{index + 1}</span>{capability}</li>
			{/each}
		</ul>
	</section>

	<section class="content-section">
		<div class="section-heading">
			<div>
				<span class="eyebrow">Working process</span>
				<h2>Clear from brief<br />to delivery.</h2>
			</div>
			<p>
				A straightforward process keeps the creative work connected to its audience, constraints,
				and final publishing context.
			</p>
		</div>

		<div class="process-grid">
			{#each process as step, index}
				<article>
					<span>0{index + 1}</span>
					<h3>{step.title}</h3>
					<p>{step.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="tools">
		<span class="eyebrow">Tools</span>
		<p>
			Blender, Adobe After Effects, Adobe Premiere Pro, Adobe Photoshop, Figma, DaVinci Resolve, and
			Final Cut Pro.
		</p>
	</section>
</main>

<SiteFooter />

<style>
	main {
		display: grid;
		gap: clamp(6rem, 12vw, 11rem);
	}

	.page-intro {
		display: grid;
		gap: 1.5rem;
	}

	.page-intro h1 {
		max-width: 9ch;
	}

	.portrait-story {
		display: grid;
		grid-template-columns: minmax(16rem, 0.8fr) minmax(20rem, 1.2fr);
		gap: clamp(2rem, 8vw, 8rem);
		align-items: center;
		margin: 0;
	}

	figure {
		overflow: hidden;
		margin: 0;
		aspect-ratio: 4 / 5;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}

	figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.8) contrast(1.04);
	}

	.story {
		display: grid;
		justify-items: start;
		gap: 1.3rem;
	}

	.story p {
		margin: 0;
		color: var(--muted);
		line-height: 1.75;
	}

	.story .lead {
		color: var(--paper);
		font-size: clamp(1.35rem, 3vw, 2.2rem);
		line-height: 1.35;
	}

	.capability-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--line);
	}

	.capability-list li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 0;
		border-bottom: 1px solid var(--line);
		font-size: clamp(1rem, 2vw, 1.3rem);
		font-weight: 700;
	}

	.capability-list li:nth-child(odd) {
		padding-right: 1.5rem;
		border-right: 1px solid var(--line);
	}

	.capability-list li:nth-child(even) {
		padding-left: 1.5rem;
	}

	.capability-list span,
	.process-grid article > span {
		color: var(--red);
		font-size: 0.7rem;
		font-weight: 900;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}

	.process-grid article {
		display: grid;
		gap: 1rem;
		min-height: 19rem;
		align-content: space-between;
		padding: 1.2rem;
		background: var(--surface);
	}

	.process-grid h3 {
		margin: auto 0 0;
		font-family: var(--display-font);
		font-size: 2.6rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	.process-grid p,
	.tools p {
		margin: 0;
		color: var(--muted);
		line-height: 1.65;
	}

	.tools {
		display: grid;
		grid-template-columns: minmax(10rem, 0.4fr) minmax(0, 1fr);
		gap: 2rem;
		padding: 2rem 0;
		border-block: 1px solid var(--line);
	}

	.tools p {
		font-size: clamp(1.2rem, 3vw, 2rem);
	}

	@media (max-width: 860px) {
		.process-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 680px) {
		.portrait-story,
		.tools {
			grid-template-columns: 1fr;
		}

		.capability-list,
		.process-grid {
			grid-template-columns: 1fr;
		}

		.capability-list li:nth-child(odd),
		.capability-list li:nth-child(even) {
			padding-inline: 0;
			border-right: 0;
		}

		.process-grid article {
			min-height: 15rem;
		}
	}
</style>
