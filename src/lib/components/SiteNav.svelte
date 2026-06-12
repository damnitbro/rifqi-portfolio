<script lang="ts">
	import { identity } from '$lib/data/portfolio';

	type Props = {
		active?: 'work' | 'about' | 'resume' | 'contact';
	};

	let { active }: Props = $props();
</script>

<header class="site-header">
	<a class="brand" href="/" aria-label={`${identity.name}, home`}>
		<img src="/media/work/personal-logo/personal-logo.png" alt="" />
		<span>{identity.name}</span>
	</a>

	<nav aria-label="Main navigation">
		<a class:active={active === 'work'} href="/work">Work</a>
		<a class:active={active === 'about'} href="/about">About</a>
		<a class:active={active === 'resume'} href="/resume">Resume</a>
		<a class:active={active === 'contact'} href="/contact">Contact</a>
	</nav>
</header>

<style>
	.site-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		width: min(calc(100% - 2rem), 86rem);
		margin: 0.8rem auto 0;
		padding: 0.55rem 0.65rem 0.55rem 0.8rem;
		background: color-mix(in srgb, var(--ink) 82%, transparent);
		border: 1px solid var(--line);
		border-radius: 999px;
		backdrop-filter: blur(18px);
		box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.26);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
		color: var(--paper);
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
	}

	.brand img {
		width: 1.85rem;
		aspect-ratio: 1;
		object-fit: contain;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.15rem;
	}

	nav a {
		padding: 0.6rem 0.75rem;
		color: var(--muted);
		border-radius: 999px;
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-decoration: none;
		text-transform: uppercase;
		transition:
			color 180ms ease,
			background 180ms ease;
	}

	nav a:hover,
	nav a.active {
		color: var(--ink);
		background: var(--paper);
	}

	@media (max-width: 620px) {
		.site-header {
			width: calc(100% - 0.8rem);
			margin-top: 0.4rem;
			padding-left: 0.55rem;
		}

		.brand span {
			display: none;
		}

		nav a {
			padding: 0.55rem 0.48rem;
			font-size: 0.65rem;
		}
	}
</style>
