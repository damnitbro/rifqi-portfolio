<script lang="ts">
	type Props = {
		title: string;
		description: string;
		path?: string;
		image?: string;
	};

	let {
		title,
		description,
		path = '/',
		image = '/media/work/personal-logo/personal-logo.png'
	}: Props = $props();

	const siteUrl = 'https://rifqiadiantama.com';
	let canonical = $derived(`${siteUrl}${path === '/' ? '' : path}`);
	let socialImage = $derived(image.startsWith('http') ? image : `${siteUrl}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
