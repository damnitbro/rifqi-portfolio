<script lang="ts">
	type Props = {
		title: string;
		category: string;
		description?: string;
		accent?: string;
	};

	let { title, category, description = '', accent = '#c2a96a' }: Props = $props();
</script>

<article class="card" style:--accent={accent}>
	<span>{category}</span>
	<h3>{title}</h3>
	{#if description}
		<p>{description}</p>
	{/if}
</article>

<style>
	.card {
		display: grid;
		align-content: end;
		gap: 0.7rem;
		min-height: 250px;
		padding: 1.2rem;
		background:
			linear-gradient(140deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent),
			#111;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		transition:
			transform 0.25s ease,
			border-color 0.25s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	span {
		color: var(--accent);
		font-size: 0.78rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 2rem;
		line-height: 0.95;
	}

	p {
		margin: 0;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.45;
	}

	@media (max-width: 620px) {
		h3 {
			font-size: 1.45rem;
		}
	}
</style>
