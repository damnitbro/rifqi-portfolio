<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { identity } from '$lib/data/portfolio';

	const instagramUrl = `https://www.instagram.com/${identity.instagram}/`;
	const whatsappUrl = `https://wa.me/62${identity.phone.replace(/^0/, '')}`;
</script>

<footer>
	<div class="footer-callout">
		<p>Have a project, role, or collaboration in mind?</p>
		<h2>Let&rsquo;s make<br />something clear.</h2>
		<a class="button button-primary" href={`mailto:${identity.email}`}>
			Start a conversation <ArrowUpRight size={18} />
		</a>
	</div>

	<div class="footer-bottom">
		<div>
			<strong>{identity.name}</strong>
			<span>{identity.location}</span>
		</div>
		<div class="links">
			<a href={`mailto:${identity.email}`}>Email</a>
			<a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
			<a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
		</div>
		<span>&copy; {new Date().getFullYear()}</span>
	</div>
</footer>

<style>
	footer {
		width: min(calc(100% - 2rem), 86rem);
		margin: clamp(5rem, 10vw, 9rem) auto 1rem;
		padding: clamp(1.4rem, 4vw, 3rem);
		background:
			radial-gradient(circle at 88% 20%, rgba(239, 59, 45, 0.24), transparent 18rem), var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
	}

	.footer-callout {
		display: grid;
		gap: 1.25rem;
		min-height: min(62vh, 38rem);
		align-content: center;
	}

	.footer-callout p {
		margin: 0;
		color: var(--muted);
	}

	h2 {
		max-width: 10ch;
		margin: 0;
		font-family: var(--display-font);
		font-size: clamp(4rem, 11vw, 10rem);
		font-weight: 500;
		line-height: 0.78;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}

	.footer-callout .button {
		width: fit-content;
	}

	.footer-bottom {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 1.4rem;
		border-top: 1px solid var(--line);
		color: var(--quiet);
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	.footer-bottom > div:first-child {
		display: grid;
		gap: 0.25rem;
	}

	.footer-bottom strong {
		color: var(--paper);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.links a {
		color: var(--muted);
		text-decoration: none;
	}

	.links a:hover {
		color: var(--paper);
	}

	@media (max-width: 620px) {
		footer {
			width: calc(100% - 1rem);
		}

		.footer-callout {
			min-height: 28rem;
		}

		.footer-bottom {
			align-items: start;
			flex-direction: column;
		}
	}
</style>
