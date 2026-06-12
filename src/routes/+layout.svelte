<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--ink: #080808;
		--paper: #f5f3ee;
		--surface: #111110;
		--surface-soft: #191817;
		--muted: rgba(245, 243, 238, 0.68);
		--quiet: rgba(245, 243, 238, 0.44);
		--line: rgba(245, 243, 238, 0.13);
		--red: #ef3b2d;
		--gold: #d6a84b;
		--display-font: 'Bebas Neue', Impact, 'Arial Black', sans-serif;
		--radius: 0.75rem;
		--radius-lg: 1.25rem;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		color: var(--paper);
		background: var(--ink);
		font-synthesis: none;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
		background: var(--ink);
	}

	:global(body) {
		min-width: 320px;
		margin: 0;
		overflow-x: hidden;
		color: var(--paper);
		background:
			radial-gradient(circle at 100% 0, rgba(139, 0, 0, 0.2), transparent 28rem), var(--ink);
	}

	:global(body::before) {
		position: fixed;
		inset: 0;
		z-index: -1;
		content: '';
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E");
		opacity: 0.1;
		pointer-events: none;
	}

	:global(img),
	:global(video) {
		display: block;
		max-width: 100%;
	}

	:global(button),
	:global(input),
	:global(textarea) {
		font: inherit;
	}

	:global(::selection) {
		color: var(--ink);
		background: var(--gold);
	}

	:global(:focus-visible) {
		outline: 2px solid var(--gold);
		outline-offset: 4px;
	}

	:global(.page-shell) {
		width: min(calc(100% - 2rem), 86rem);
		margin: 0 auto;
		padding-top: clamp(8rem, 15vw, 12rem);
	}

	:global(.eyebrow) {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	:global(.eyebrow::before) {
		width: 0.48rem;
		aspect-ratio: 1;
		content: '';
		background: var(--red);
		border-radius: 50%;
		box-shadow: 0 0 1rem rgba(239, 59, 45, 0.68);
	}

	:global(.display-title) {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(4.8rem, 14vw, 13rem);
		font-weight: 500;
		line-height: 0.77;
		letter-spacing: 0.005em;
		text-transform: uppercase;
		text-wrap: balance;
	}

	:global(.section-heading) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(16rem, 34rem);
		align-items: end;
		gap: 2rem;
		margin-bottom: clamp(2rem, 5vw, 4rem);
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--line);
	}

	:global(.section-heading h2) {
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(3.5rem, 8vw, 7rem);
		font-weight: 500;
		line-height: 0.8;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}

	:global(.section-heading p) {
		margin: 0;
		color: var(--muted);
		line-height: 1.65;
	}

	:global(.button) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		min-height: 3rem;
		padding: 0.7rem 1rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-decoration: none;
		text-transform: uppercase;
		transition:
			color 180ms ease,
			background 180ms ease,
			border-color 180ms ease,
			transform 180ms ease;
	}

	:global(.button:hover) {
		transform: translateY(-2px);
	}

	:global(.button-primary) {
		color: var(--ink);
		background: var(--paper);
		border-color: var(--paper);
	}

	:global(.button-secondary) {
		color: var(--paper);
		background: transparent;
	}

	:global(.button-secondary:hover) {
		color: var(--ink);
		background: var(--gold);
		border-color: var(--gold);
	}

	@media (max-width: 720px) {
		:global(.page-shell) {
			width: calc(100% - 1rem);
			padding-top: 7rem;
		}

		:global(.section-heading) {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		:global(*),
		:global(*::before),
		:global(*::after) {
			scroll-behavior: auto !important;
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
