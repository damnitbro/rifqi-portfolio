<script lang="ts">
	import { ArrowDownRight, ArrowUpRight } from '@lucide/svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { identity } from '$lib/data/portfolio';
	import { projects } from '../data/project';

	const capabilities = [
		'Campaign design',
		'Social-media systems',
		'3D visualization',
		'Motion graphics',
		'Video editing',
		'Art direction',
		'Presentation design'
	];
</script>

<Seo
	title={`${identity.name} | Visual Designer`}
	description="Jakarta-based visual designer specializing in 3D, motion, campaign design, and digital content systems."
/>

<SiteNav />

<main>
	<section class="hero page-shell">
		<div class="hero-copy">
			<span class="eyebrow">{identity.location}</span>
			<h1 class="display-title">
				Visual <span>designer</span> for 3D, motion &amp; digital campaigns.
			</h1>
		</div>

		<div class="hero-bottom">
			<p>
				I create adaptable visual systems for brands, institutions, and digital platforms, from
				campaign graphics and social content to motion design and 3D environments.
			</p>
			<div class="actions">
				<a class="button button-primary" href="#selected-work">
					View selected work <ArrowDownRight size={18} />
				</a>
				<a class="button button-secondary" href="/resume">
					View resume <ArrowUpRight size={18} />
				</a>
			</div>
		</div>

		<div class="hero-mark" aria-hidden="true">
			<img src="/media/work/personal-logo/personal-logo.png" alt="" />
		</div>
	</section>

	<section class="selected page-shell" id="selected-work">
		<div class="section-heading">
			<div>
				<span class="eyebrow">Selected work</span>
				<h2>Four ways<br />I build visuals.</h2>
			</div>
			<p>
				A focused selection spanning institutional communication, character-led 3D, repeatable video
				production, and self-directed visual development.
			</p>
		</div>

		<ProjectGrid items={projects} />

		<a class="text-link" href="/work">Explore all selected work <ArrowUpRight size={18} /></a>
	</section>

	<section class="about-preview page-shell">
		<div class="about-copy">
			<span class="eyebrow">About</span>
			<h2>One idea.<br />Many formats.<br />Still clear.</h2>
		</div>

		<div class="about-detail">
			<p>
				I am a Jakarta-based visual designer working across 3D, motion, campaign design, and digital
				content production. I focus on translating complex information into clear visual
				communication that can adapt across platforms.
			</p>
			<a class="button button-secondary" href="/about">
				More about me <ArrowUpRight size={18} />
			</a>
		</div>
	</section>

	<section class="capabilities page-shell">
		<div class="section-heading">
			<div>
				<span class="eyebrow">Capabilities</span>
				<h2>What I bring<br />to the work.</h2>
			</div>
			<p>
				From early visual direction through final platform-ready assets, I work across the parts of
				a project that need to stay visually connected.
			</p>
		</div>

		<ol>
			{#each capabilities as capability, index}
				<li>
					<span>0{index + 1}</span>
					<strong>{capability}</strong>
				</li>
			{/each}
		</ol>
	</section>
</main>

<SiteFooter />

<style>
	.hero {
		position: relative;
		display: grid;
		min-height: 100svh;
		align-content: space-between;
		gap: 4rem;
		padding-bottom: 2rem;
	}

	.hero-copy {
		position: relative;
		z-index: 1;
		display: grid;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.hero h1 {
		max-width: 10ch;
	}

	.hero h1 span {
		color: transparent;
		-webkit-text-stroke: 1px rgba(245, 243, 238, 0.54);
	}

	.hero-bottom {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 38rem) auto;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
		padding-top: 1.2rem;
		border-top: 1px solid var(--line);
	}

	.hero-bottom p {
		margin: 0;
		color: var(--muted);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: end;
		gap: 0.6rem;
	}

	.hero-mark {
		position: absolute;
		right: clamp(0rem, 4vw, 5rem);
		top: 18%;
		width: clamp(11rem, 25vw, 24rem);
		opacity: 0.14;
		filter: drop-shadow(0 0 4rem rgba(239, 59, 45, 0.72));
		transform: rotate(8deg);
		pointer-events: none;
	}

	.selected,
	.about-preview,
	.capabilities {
		padding-top: clamp(6rem, 12vw, 11rem);
	}

	.text-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 3rem;
		color: var(--paper);
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		text-decoration: none;
		text-transform: uppercase;
	}

	.text-link:hover {
		color: var(--gold);
	}

	.about-preview {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
		gap: clamp(3rem, 8vw, 8rem);
		align-items: end;
	}

	.about-copy {
		display: grid;
		gap: 1.5rem;
	}

	.about-copy h2 {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(4rem, 10vw, 9rem);
		font-weight: 500;
		line-height: 0.8;
		text-transform: uppercase;
	}

	.about-detail {
		display: grid;
		justify-items: start;
		gap: 1.5rem;
		padding-bottom: 0.8rem;
	}

	.about-detail p {
		margin: 0;
		color: var(--muted);
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		line-height: 1.7;
	}

	.capabilities ol {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--line);
	}

	.capabilities li {
		display: grid;
		grid-template-columns: 4rem minmax(0, 1fr);
		align-items: center;
		gap: 1rem;
		padding: 1.2rem 0;
		border-bottom: 1px solid var(--line);
	}

	.capabilities li span {
		color: var(--red);
		font-size: 0.72rem;
		font-weight: 900;
	}

	.capabilities li strong {
		font-family: var(--display-font);
		font-size: clamp(2rem, 5vw, 4.2rem);
		font-weight: 500;
		line-height: 0.9;
		text-transform: uppercase;
	}

	@media (max-width: 760px) {
		.hero {
			min-height: 92svh;
		}

		.hero-bottom,
		.about-preview {
			grid-template-columns: 1fr;
		}

		.actions {
			justify-content: start;
		}

		.hero-mark {
			top: 32%;
		}
	}
</style>
