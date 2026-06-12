<script lang="ts">
	import { Printer } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { appBadges, cvTimeline, identity, personalSkills, softSkills } from '$lib/data/portfolio';

	const experience = cvTimeline.filter((item) => item.type === 'experience');
	const education = cvTimeline.filter((item) => item.type === 'education');
	const tools = Object.values(appBadges).map((tool) => tool.name);
</script>

<Seo
	title={`Resume | ${identity.name}`}
	description="Resume and experience overview for visual designer Rifqi Adiantama."
	path="/resume"
/>

<SiteNav active="resume" />

<main class="page-shell">
	<header>
		<div>
			<span class="eyebrow">Resume</span>
			<h1>{identity.name}</h1>
			<p>{identity.tagline}</p>
		</div>
		<button class="button button-primary print-button" type="button" onclick={() => window.print()}>
			Print / Save PDF <Printer size={17} />
		</button>
	</header>

	<section class="contact-strip">
		<span>{identity.location}</span>
		<a href={`mailto:${identity.email}`}>{identity.email}</a>
		<a href={`https://www.instagram.com/${identity.instagram}/`}>@{identity.instagram}</a>
	</section>

	<section class="resume-section">
		<h2>Profile</h2>
		<p class="profile">
			Jakarta-based visual designer working across 3D, motion, campaign design, and digital content
			production. Focused on creating adaptable visual systems that remain clear and consistent
			across platforms.
		</p>
	</section>

	<section class="resume-section">
		<h2>Experience</h2>
		<div class="timeline">
			{#each experience as item}
				<article>
					<span>{item.period}</span>
					<div>
						<h3>{item.title}</h3>
						<p>{item.detail}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="resume-section">
		<h2>Education</h2>
		<div class="timeline">
			{#each education as item}
				<article>
					<span>{item.period}</span>
					<div>
						<h3>{item.title}</h3>
						<p>{item.detail}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="resume-section skills">
		<h2>Skills</h2>
		<div>
			<h3>Creative &amp; production</h3>
			<ul>
				{#each personalSkills as skill}
					<li>{skill.label}</li>
				{/each}
				<li>3D visualization</li>
				<li>Motion graphics</li>
				<li>Video editing</li>
				<li>Campaign design</li>
			</ul>
		</div>
		<div>
			<h3>Collaboration</h3>
			<ul>
				{#each softSkills as skill}
					<li>{skill.label}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="resume-section skills">
		<h2>Tools</h2>
		<ul>
			{#each tools as tool}
				<li>{tool}</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	main {
		padding-bottom: 5rem;
	}

	header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--line);
	}

	header > div {
		display: grid;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(4.5rem, 12vw, 10rem);
		font-weight: 500;
		line-height: 0.8;
		text-transform: uppercase;
	}

	header p,
	.profile {
		max-width: 46rem;
		margin: 0;
		color: var(--muted);
		font-size: 1.05rem;
		line-height: 1.65;
	}

	.print-button {
		flex: 0 0 auto;
		border: 0;
		cursor: pointer;
	}

	.contact-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem 1.5rem;
		padding: 1rem 0;
		color: var(--quiet);
		border-bottom: 1px solid var(--line);
		font-size: 0.76rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.contact-strip a {
		color: var(--muted);
		text-decoration: none;
	}

	.resume-section {
		display: grid;
		grid-template-columns: minmax(10rem, 0.35fr) minmax(0, 1fr);
		gap: clamp(2rem, 7vw, 7rem);
		padding: clamp(2.5rem, 6vw, 4.5rem) 0;
		border-bottom: 1px solid var(--line);
	}

	h2 {
		margin: 0;
		color: var(--quiet);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.timeline {
		display: grid;
	}

	.timeline article {
		display: grid;
		grid-template-columns: minmax(8rem, 0.35fr) minmax(0, 1fr);
		gap: 1.5rem;
		padding: 1.2rem 0;
		border-top: 1px solid var(--line);
	}

	.timeline article:first-child {
		padding-top: 0;
		border-top: 0;
	}

	.timeline span {
		color: var(--quiet);
		font-size: 0.75rem;
		font-weight: 700;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	.timeline p {
		margin: 0.35rem 0 0;
		color: var(--muted);
	}

	.skills {
		grid-template-columns: minmax(10rem, 0.35fr) repeat(2, minmax(0, 1fr));
	}

	.skills div {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 0.45rem 0.65rem;
		color: var(--muted);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 0.75rem;
	}

	@media (max-width: 720px) {
		header {
			align-items: start;
			flex-direction: column;
		}

		.resume-section,
		.skills {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	@media print {
		:global(body) {
			color: #111;
			background: #fff;
		}

		:global(header.site-header),
		.print-button {
			display: none;
		}

		main {
			width: 100%;
			padding: 0;
		}

		header,
		.contact-strip,
		.resume-section,
		.timeline article {
			border-color: #ccc;
		}

		header p,
		.profile,
		.contact-strip,
		.contact-strip a,
		.timeline span,
		.timeline p,
		li,
		h2 {
			color: #333;
		}

		li {
			border-color: #bbb;
		}
	}
</style>
