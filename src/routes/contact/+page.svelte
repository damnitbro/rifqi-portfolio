<script lang="ts">
	import { ArrowUpRight, Mail, MessageCircle } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import { identity } from '$lib/data/portfolio';

	const instagramUrl = `https://www.instagram.com/${identity.instagram}/`;
	const whatsappUrl = `https://wa.me/62${identity.phone.replace(/^0/, '')}`;
</script>

<Seo
	title={`Contact | ${identity.name}`}
	description="Contact Rifqi Adiantama for visual design, 3D, motion, and digital campaign collaborations."
	path="/contact"
/>

<SiteNav active="contact" />

<main class="page-shell">
	<header>
		<span class="eyebrow">Contact</span>
		<h1 class="display-title">Let&rsquo;s make something worth looking at.</h1>
		<p>
			I am open to freelance, studio, and in-house opportunities across visual design, 3D, motion,
			and digital content production.
		</p>
	</header>

	<section class="contact-grid">
		<a href={`mailto:${identity.email}`}>
			<span class="icon"><Mail size={22} /></span>
			<small>Email</small>
			<strong>{identity.email}</strong>
			<ArrowUpRight class="arrow" size={24} />
		</a>
		<a href={instagramUrl} target="_blank" rel="noreferrer">
			<span class="icon">@</span>
			<small>Instagram</small>
			<strong>@{identity.instagram}</strong>
			<ArrowUpRight class="arrow" size={24} />
		</a>
		<a href={whatsappUrl} target="_blank" rel="noreferrer">
			<span class="icon"><MessageCircle size={22} /></span>
			<small>WhatsApp</small>
			<strong>{identity.phone}</strong>
			<ArrowUpRight class="arrow" size={24} />
		</a>
	</section>

	<footer>
		<span>{identity.name}</span>
		<span>{identity.location}</span>
		<span>Available for collaboration</span>
	</footer>
</main>

<style>
	main {
		display: grid;
		min-height: 100svh;
		align-content: space-between;
		gap: clamp(4rem, 9vw, 8rem);
		padding-bottom: 1.5rem;
	}

	header {
		display: grid;
		gap: 1.5rem;
	}

	header h1 {
		max-width: 10ch;
	}

	header p {
		max-width: 42rem;
		margin: 0 0 0 auto;
		color: var(--muted);
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		line-height: 1.65;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}

	.contact-grid a {
		position: relative;
		display: grid;
		min-height: 18rem;
		align-content: space-between;
		gap: 0.7rem;
		padding: 1.2rem;
		color: var(--paper);
		background: var(--surface);
		text-decoration: none;
		transition:
			color 180ms ease,
			background 180ms ease;
	}

	.contact-grid a:hover {
		color: var(--ink);
		background: var(--paper);
	}

	.icon {
		display: grid;
		width: 3rem;
		aspect-ratio: 1;
		place-items: center;
		color: var(--ink);
		background: var(--red);
		border-radius: 50%;
		font-weight: 900;
	}

	small {
		margin-top: auto;
		color: currentColor;
		font-size: 0.68rem;
		font-weight: 800;
		opacity: 0.55;
		text-transform: uppercase;
	}

	strong {
		font-size: clamp(1rem, 2vw, 1.35rem);
		overflow-wrap: anywhere;
	}

	.contact-grid a > :global(svg:last-child) {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 1rem;
		color: var(--quiet);
		border-top: 1px solid var(--line);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	@media (max-width: 760px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.contact-grid a {
			min-height: 13rem;
		}
	}
</style>
