<script lang="ts">
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { identity } from '$lib/data/portfolio';
	import { projects } from '../../data/project';
</script>

<Seo
	title={`Selected Work | ${identity.name}`}
	description="Selected campaign design, 3D visual development, motion, and video editing work by Rifqi Adiantama."
	path="/work"
	image="/media/work/graphic-motion/flyer-idul-adha-w-officials.webp"
/>

<SiteNav active="work" />

<main class="page-shell">
	<header class="page-intro">
		<span class="eyebrow">Selected work</span>
		<h1 class="display-title">Projects built to stay clear across formats.</h1>
		<p>
			Four selected projects showing how I approach communication, visual systems, 3D development,
			and repeatable content production.
		</p>
	</header>

	<ProjectGrid items={projects} />
</main>

<SiteFooter />

<style>
	main {
		display: grid;
		gap: clamp(4rem, 9vw, 8rem);
	}

	.page-intro {
		display: grid;
		gap: 1.6rem;
	}

	.page-intro h1 {
		max-width: 9ch;
	}

	.page-intro p {
		max-width: 42rem;
		margin: 0 0 0 auto;
		color: var(--muted);
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		line-height: 1.65;
	}
</style>
