<script lang="ts">
	import type { ExperienceSection as ExperienceSectionData, ProjectAsset } from '$lib/data/portfolio';
	import { RotateCcw, Volume2, VolumeOff } from '@lucide/svelte';
	import { activeVideoKey } from '$lib/stores/videoMute';

	type Props = {
		section: ExperienceSectionData;
	};

	let { section }: Props = $props();

	const isVideo = (asset: ProjectAsset) => asset.type === 'video';
	const posterColumns = (assets: ProjectAsset[]) => {
		const columns = Array.from({ length: 4 }, () => [] as ProjectAsset[]);
		if (assets.length === 0) return columns;

		assets.forEach((asset, index) => {
			columns[index % columns.length].push(asset);
		});

		const minItemsPerColumn = 4;
		return columns.map((column, columnIndex) => {
			const filled = [...column];
			let row = 0;
			while (filled.length < minItemsPerColumn) {
				const shuffledIndex =
					(row * (columns.length + 1) + columnIndex * 3 + filled.length * 2 + 1) % assets.length;
				let nextAsset = assets[shuffledIndex];
				if (filled.length > 0 && nextAsset === filled[filled.length - 1]) {
					nextAsset = assets[(shuffledIndex + columnIndex + 1) % assets.length];
				}
				filled.push(nextAsset);
				row += 1;
			}
			return filled;
		});
	};

	const segmentVideo = (node: HTMLVideoElement, asset: ProjectAsset) => {
		let inView = false;

		const playIfVisible = () => {
			if (!inView || document.hidden) return;
			void node.play().catch(() => {
				// Browsers can still defer autoplay under load; muted inline video will retry when visible.
			});
		};

		const applyStart = () => {
			const start = asset.startAt ?? 0;
			if (Number.isFinite(node.duration) && Math.abs(node.currentTime - start) > 0.25) {
				node.currentTime = start;
			}
			playIfVisible();
		};

		const restartSegment = () => {
			node.currentTime = asset.startAt ?? 0;
			playIfVisible();
		};

		const handleTimeUpdate = () => {
			if (asset.endAt && node.currentTime >= asset.endAt - 0.12) {
				restartSegment();
			}
		};

		const handleEnded = () => {
			if (asset.endAt || (asset.startAt ?? 0) > 0) {
				restartSegment();
			}
		};

		const handleVisibility = () => {
			if (document.hidden) {
				node.pause();
			} else {
				playIfVisible();
			}
		};

		node.muted = true;
		node.autoplay = false;
		node.loop = !asset.endAt;
		node.playsInline = true;
		node.preload = 'metadata';
		node.addEventListener('loadedmetadata', applyStart);
		node.addEventListener('timeupdate', handleTimeUpdate);
		node.addEventListener('ended', handleEnded);
		document.addEventListener('visibilitychange', handleVisibility);

		const observer = new IntersectionObserver(
			([entry]) => {
				inView = entry.isIntersecting;
				if (inView) {
					playIfVisible();
				} else {
					node.pause();
				}
			},
			{ rootMargin: '220px 0px', threshold: 0.08 }
		);
		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
				node.removeEventListener('loadedmetadata', applyStart);
				node.removeEventListener('timeupdate', handleTimeUpdate);
				node.removeEventListener('ended', handleEnded);
				document.removeEventListener('visibilitychange', handleVisibility);
			}
		};
	};

	let videoEls: Record<string, HTMLVideoElement> = {};
	let mutedMap: Record<string, boolean> = $state({});

	const vidKey = (g: number, a: number) => `${g}-${a}`;

	const restartVideo = (key: string) => {
		const el = videoEls[key];
		if (!el) return;
		el.currentTime = 0;
		void el.play().catch(() => undefined);
	};

	const toggleMute = (key: string) => {
		const el = videoEls[key];
		if (!el) return;
		const nextMuted = !el.muted;
		el.muted = nextMuted;
		mutedMap[key] = nextMuted;
		activeVideoKey.set(nextMuted ? null : key);
	};

	$effect(() => {
		const active = $activeVideoKey;
		if (active === null) return;
		for (const [key, el] of Object.entries(videoEls)) {
			if (key !== active && el) {
				el.muted = true;
				mutedMap[key] = true;
			}
		}
	});
</script>

<section class="experience-section" id={section.id} style:--accent={section.accent}>
	<div class="experience-heading">
		<span>{section.kicker}</span>
		<h2>{section.title}</h2>
		<p>{section.description}</p>
		<div class="apps" aria-label={`${section.title} apps used`}>
			{#each section.apps as app}
				<span><img src={app.icon} alt="" loading="lazy" />{app.name}</span>
			{/each}
		</div>
		{#if section.metrics}
			<div class="metrics-grid" aria-label={`${section.title} performance metrics`}>
				{#each section.metrics as metric}
					<div class="metric-card">
						<strong>{metric.value}</strong>
						<span>{metric.label}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="project-groups" class:poster-wall={section.groups[0]?.layout === 'poster-wall'}>
		{#each section.groups as group, groupIdx}
			<article
				class="project-group"
				class:personal={group.kind === 'personal'}
				class:poster-wall-group={group.layout === 'poster-wall'}
				class:logo-system={group.layout === 'logo-system'}
				data-layout={group.layout ?? 'showcase'}
			>
				<div class="group-copy">
					<span>{group.kind === 'priority' ? 'Main project' : 'Personal project'}</span>
					<h3>{group.title}</h3>
					<p>{group.description}</p>
				</div>

				{#if group.layout === 'poster-wall'}
					<div class="poster-columns" aria-label={`${group.title} vertical carousel`}>
						{#each posterColumns(group.assets) as column, columnIndex}
							<div
								class="poster-column"
								class:reverse={columnIndex % 2 === 1}
								style:--speed={`${28 + columnIndex * 7}s`}
								style:--offset={`${(columnIndex % 2) * -3.2}rem`}
							>
								<div class="poster-track">
									{#each [...column, ...column] as asset, itemIndex}
										<figure
											class:poster={asset.poster}
											data-ratio={asset.ratio ?? 'auto'}
											style:--asset-aspect={asset.aspect}
										>
											<img src={asset.src} alt={asset.title} loading="lazy" />
										</figure>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					{#if group.layout === 'logo-system'}
						{@const mockups = group.assets.slice(1)}
						<div class="logo-system-container">
							<div class="logo-left">
								<figure class="main-logo-figure">
									<img src={group.assets[0].src} alt={group.assets[0].title} loading="lazy" />
								</figure>
							</div>

							<div class="logo-right-inner">
								<div class="mockup-grid">
									{#each mockups as asset}
										<figure class="mockup-figure">
											<img src={asset.src} alt={asset.title} loading="lazy" />
										</figure>
									{/each}
								</div>

								<div class="color-row">
									<div style:--swatch={'#080808'}><span></span><strong>Black Obsidian</strong><small>#080808</small></div>
									<div style:--swatch={'#f5f5f5'}><span></span><strong>Ivory White</strong><small>#f5f5f5</small></div>
									<div style:--swatch={'#8b0000'}><span></span><strong>Crimson Red</strong><small>#8b0000</small></div>
									<div style:--swatch={'#6e6e6e'}><span></span><strong>Ash Gray</strong><small>#6e6e6e</small></div>
									<div style:--swatch={'#c2a96a'}><span></span><strong>Muted Gold</strong><small>#c2a96a</small></div>
								</div>
							</div>

							<div class="font-left">
								<span>Heading font</span>
								<strong class="brand-serif">Fallen Halo</strong>
								<small>Cinzel Bold reference</small>
								<strong class="brand-serif alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ</strong>
								<strong class="brand-serif alphabet">1234567890 !@#$%^&*()</strong>
							</div>

							<div class="font-right">
								<span>Body font</span>
								<strong>Create. Descend. Become.</strong>
								<small>Inter Regular web fallback</small>
								<strong class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ</strong>
								<strong class="alphabet">1234567890 !@#$%^&*()</strong>
							</div>
						</div>
					{:else}
						<div class="media-grid" data-layout={group.layout ?? 'showcase'}>
							{#each group.assets as asset, assetIdx}
								{@const key = vidKey(groupIdx, assetIdx)}
								<figure
									class:featured={assetIdx === 0}
									class:poster={asset.poster}
									data-title={asset.title}
									data-ratio={asset.ratio ?? 'auto'}
									style:--asset-aspect={asset.aspect}
								>
									{#if isVideo(asset)}
										<div class="vid-wrap">
											<video
												bind:this={videoEls[key]}
												use:segmentVideo={asset}
												src={asset.src}
												muted={mutedMap[key] ?? true}
												playsinline
												preload="metadata"
											></video>
											<div class="vid-overlay-controls">
												<button aria-label="Restart video" onclick={() => restartVideo(key)}>
													<RotateCcw size={13} />
												</button>
												<button aria-label={mutedMap[key] ? 'Unmute video' : 'Mute video'} onclick={() => toggleMute(key)}>
													{#if mutedMap[key]}
														<VolumeOff size={13} />
													{:else}
														<Volume2 size={13} />
													{/if}
												</button>
											</div>
										</div>
									{:else}
										<img src={asset.src} alt={asset.title} loading="lazy" />
									{/if}
									<figcaption>
										<strong>{asset.title}</strong>
										{#if group.kind !== 'personal'}
											<span>{asset.meta}</span>
										{/if}
									</figcaption>
								</figure>
							{/each}
						</div>
					{/if}
				{/if}
			</article>
		{/each}
	</div>
</section>

<style>
	.experience-section {
		display: grid;
		gap: clamp(1.5rem, 4vw, 3rem);
		min-width: 0;
		overflow: hidden;
	}

	.experience-heading {
		display: grid;
		grid-template-columns: minmax(10rem, 0.35fr) minmax(0, 0.8fr);
		align-items: end;
		gap: 1rem;
	}

	.experience-heading > span {
		color: var(--accent);
		font-size: 0.82rem;
		font-weight: 950;
		text-transform: uppercase;
	}

	h2 {
		margin: 0 0 0.2em 0;
		font-family: var(--display-font);
		font-size: 4.8rem;
		line-height: 0.88;
		text-wrap: balance;
	}

	.experience-heading p {
		grid-column: 2;
		max-width: 48rem;
		margin: 0;
		color: rgba(245, 245, 245, 0.72);
		line-height: 1.6;
	}

	.apps {
		grid-column: 2;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.apps span {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.4rem 0.58rem;
		color: #f5f5f5;
		background: rgba(8, 8, 8, 0.72);
		border: 1px solid color-mix(in srgb, var(--accent) 70%, transparent);
		border-radius: 7px;
		font-size: 0.78rem;
		font-weight: 900;
	}

	.apps img {
		width: 1.25rem;
		height: 1.25rem;
		object-fit: contain;
	}

	.metrics-grid {
		grid-column: 2;
		display: flex;
		flex-wrap: wrap;
		gap: clamp(1rem, 2.5vw, 1.8rem);
		margin-top: 1rem;
		padding-top: 1.2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.metric-card {
		display: grid;
		gap: 0.15rem;
	}

	.metric-card strong {
		font-family: var(--display-font);
		font-size: 2.4rem;
		color: var(--accent);
		line-height: 1;
	}

	.metric-card span {
		color: rgba(245, 245, 245, 0.6);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.project-groups {
		display: grid;
		gap: clamp(1rem, 3vw, 1.8rem);
		min-width: 0;
	}

	.project-group {
		display: grid;
		grid-template-columns: minmax(220px, 0.28fr) minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 1.4rem);
		padding: clamp(0.9rem, 2vw, 1.3rem);
		background:
			repeating-radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--accent) 30%, transparent) 0 1px, transparent 1px 8px),
			linear-gradient(140deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 46%),
			rgba(12, 10, 11, 0.78);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 24px 8px 24px 8px;
		min-width: 0;
		overflow: hidden;
	}

	.project-group > * {
		min-width: 0;
	}

	.project-group.personal {
		background:
			repeating-radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.5) 0 1px, transparent 1px 40px),
			linear-gradient(140deg, rgba(194, 169, 106, 0.12), transparent 44%),
			rgba(8, 8, 8, 0.86);
	}

	.project-group.logo-system {
		grid-template-columns: minmax(320px, 0.5fr) minmax(0, 1fr);
	}

	.project-group[data-layout='personal-3d'],
	.project-group.logo-system {
		background:
			repeating-radial-gradient(circle at 88% 16%, rgba(255, 255, 255, 0.2) 0 1px, transparent 1px 8px),
			linear-gradient(140deg, rgba(255, 255, 255, 0.2), transparent 46%),
			rgba(8, 8, 8, 0.86);
	}

	.project-group.logo-system .group-copy {
		gap: 0.2rem;
	}

	.project-group.logo-system h3 {
		font-size: 1.8rem;
		line-height: 0.92;
	}

	.project-group.logo-system .group-copy p {
		font-size: 0.85rem;
		line-height: 1.3;
	}

	.project-group.poster-wall-group {
		grid-template-columns: minmax(190px, 0.2fr) minmax(0, 1fr);
	}

	.group-copy {
		display: grid;
		align-content: start;
		gap: 0.65rem;
	}

	.group-copy span {
		color: var(--accent);
		font-size: 0.78rem;
		font-weight: 950;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 2.4rem;
		line-height: 1.08;
		text-wrap: balance;
		overflow-wrap: anywhere;
	}

	.group-copy p {
		margin: 0;
		color: rgba(245, 245, 245, 0.7);
		line-height: 1.55;
	}

	.media-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 0.8rem;
		align-items: start;
		min-width: 0;
		width: 100%;
		max-width: 100%;
	}

	.poster-columns {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(0.5rem, 1.4vw, 0.9rem);
		height: min(900px, 90vh);
		min-height: 680px;
		overflow: hidden;
		contain: paint;
		-webkit-mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
		mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
	}

	.poster-column {
		min-width: 0;
		overflow: hidden;
	}

	.poster-track {
		display: grid;
		gap: clamp(0.5rem, 1.4vw, 0.9rem);
		animation: poster-scroll var(--speed) linear infinite;
		will-change: transform;
	}

	.poster-column.reverse .poster-track {
		animation-direction: reverse;
	}

	figure {
		position: relative;
		display: grid;
		grid-column: span 4;
		min-width: 0;
		margin: 0;
		overflow: hidden;
		aspect-ratio: var(--asset-aspect, 4 / 3);
		background: #080808;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	figure.featured {
		grid-column: span 4;
	}

	figure[data-ratio='square'] {
		grid-column: span 4;
		aspect-ratio: var(--asset-aspect, 1 / 1);
	}

	figure[data-ratio='portrait'],
	figure[data-ratio='poster'] {
		grid-column: span 3;
		aspect-ratio: var(--asset-aspect, 9 / 16);
	}

	figure[data-ratio='wide'] {
		grid-column: span 6;
		aspect-ratio: var(--asset-aspect, 16 / 9);
	}

	figure[data-ratio='tall'] {
		grid-column: span 2;
		aspect-ratio: var(--asset-aspect, 3 / 8);
	}

	figure.poster {
		grid-column: span 3;
		aspect-ratio: var(--asset-aspect, 2 / 3);
	}

	figure.featured[data-ratio='wide'] {
		grid-column: span 8;
	}

	.project-group[data-layout='soca-showcase'] .media-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 0.8rem;
		align-items: start;
	}

	.project-group[data-layout='soca-showcase'] figure[data-title='Soca Environment Render'] {
		order: 0;
		grid-column: 1 / span 8;
		grid-row: 1;
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.project-group[data-layout='soca-showcase'] figure[data-title='Sovia X Banner'] {
		order: 2;
		grid-column: 1 / span 2;
		grid-row: 2;
		width: 100%;
		aspect-ratio: 405 / 1080;
	}

	.project-group[data-layout='soca-showcase'] figure[data-title='Witch Sovia v1'] {
		order: 3;
		grid-column: 3 / span 3;
		grid-row: 2;
		width: 100%;
		aspect-ratio: 486 / 852;
	}

	.project-group[data-layout='soca-showcase'] figure[data-title='Witch Sovia v2'] {
		order: 4;
		grid-column: 6 / span 3;
		grid-row: 2;
		width: 100%;
		aspect-ratio: 487 / 852;
	}

	.project-group[data-layout='soca-showcase'] figure[data-title='Sovia Pop out'] {
		order: 1;
		grid-column: 9 / span 4;
		grid-row: 1 / span 2;
		width: 100%;
		height: 100%;
	}

	.project-group[data-layout='soca-showcase'] img,
	.project-group[data-layout='soca-showcase'] video {
		object-fit: contain;
		background: #080808;
	}

	.project-group[data-layout='personal-3d'] .media-grid {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		align-items: stretch;
	}

	.project-group[data-layout='personal-3d'] figure {
		order: 5;
		grid-column: span 6;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='CG Boost Lab Competition entry'] {
		order: 0;
		grid-column: 1 / span 8;
		grid-row: 1;
		width: 100%;
		aspect-ratio: 16 / 10;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='Isometric Room'] {
		order: 1;
		grid-column: 9 / -1;
		grid-row: 1;
		width: 100%;
		aspect-ratio: 1 / 1;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='Chess Piece'] {
		order: 82;
		grid-column: 7 / -1;
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='University Final Semester Project'] {
		order: 81;
		grid-column: 1 / span 6;
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='Horror Poster for No Smoke Campaign'] {
		order: 99;
		grid-column: 1 / -1;
		width: min(100%, 22rem);
		aspect-ratio: 2268 / 3402;
		justify-self: center;
	}

	.project-group[data-layout='personal-3d'] img,
	.project-group[data-layout='personal-3d'] video {
		object-fit: cover;
	}

	.project-group[data-layout='personal-3d'] figure[data-title='Horror Poster for No Smoke Campaign'] img {
		object-fit: contain;
		background: #080808;
	}

	.project-group[data-layout='motion-layout'] .media-grid {
		align-items: stretch;
	}

	.project-group[data-layout='motion-layout'] figure[data-ratio='wide'] {
		grid-column: 1 / span 8;
		grid-row: 1;
		width: min(100%, 760px);
		justify-self: end;
	}

	.project-group[data-layout='motion-layout'] figure[data-ratio='square'] {
		grid-column: 5 / span 4;
		grid-row: 2;
		width: min(100%, 360px);
		justify-self: end;
	}

	.project-group[data-layout='motion-layout'] figure[data-ratio='portrait'] {
		grid-column: 9 / -1;
		grid-row: 1 / span 2;
		aspect-ratio: 9 / 16;
		justify-self: end;
		align-self: start;
		width: 100%;
	}

	.project-group[data-layout='motion-layout'] figure[data-ratio='portrait'] video {
		object-fit: cover;
	}

	.logo-system-container {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: minmax(11rem, 0.42fr) minmax(18rem, 0.9fr) minmax(18rem, 0.7fr);
		grid-template-rows: auto auto;
		gap: clamp(1.2rem, 3vw, 2.4rem) clamp(1rem, 3vw, 2rem);
		width: 100%;
	}

	.logo-left {
		grid-column: 2;
		grid-row: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.main-logo-figure {
		margin: 0;
		width: 100%;
		max-width: min(100%, 32rem);
		aspect-ratio: 1 / 1;
		background: transparent;
		border: 0;
		box-shadow: none;
	}

	.main-logo-figure img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.logo-right-inner {
		grid-column: 3;
		grid-row: 1;
		display: grid;
		gap: clamp(0.65rem, 1.4vw, 1rem);
		align-content: start;
	}

	.mockup-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.7rem;
	}

	.mockup-figure {
		grid-column: auto;
		margin: 0;
		width: 100%;
		justify-self: start;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 0;
		overflow: hidden;
		aspect-ratio: 1.35 / 1;
	}

	.mockup-figure img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.color-row {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.color-row div {
		display: grid;
		min-width: 0;
		gap: 0.35rem;
	}

	.color-row span {
		display: block;
		width: 100%;
		aspect-ratio: 1 / 1;
		background: var(--swatch);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 0;
	}

	.color-row strong,
	.color-row small {
		color: rgba(245, 245, 245, 0.7);
		font-size: 0.72rem;
		overflow-wrap: anywhere;
	}

	.font-left,
	.font-right {
		display: grid;
		gap: 0.2rem;
		align-content: start;
		padding-top: 0.6rem;
		border-top: 0;
	}

	.font-left {
		grid-column: 2;
		grid-row: 2;
	}

	.font-right {
		grid-column: 3;
		grid-row: 2;
	}

	.font-left span,
	.font-right span {
		color: var(--accent);
		font-size: 0.68rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.font-left strong:first-of-type,
	.font-right strong:first-of-type {
		font-size: 2.2rem;
		line-height: 1;
	}

	.font-left small,
	.font-right small {
		color: rgba(245, 245, 245, 0.6);
		font-size: 0.85rem;
	}

	.alphabet {
		font-size: 1rem !important;
		line-height: 1.3;
		color: rgba(245, 245, 245, 0.6);
		font-weight: 600;
	}

	.brand-serif {
		font-family: 'Cinzel', Georgia, 'Times New Roman', serif;
		text-transform: uppercase;
	}

	.poster-track figure {
		grid-column: auto;
		width: 100%;
		aspect-ratio: 1 / 1;
		box-shadow: 0 18px 70px rgba(0, 0, 0, 0.34);
	}

	.poster-track img {
		object-fit: cover;
	}

	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	video {
		background: #080808;
	}

	.vid-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
	}

	.vid-overlay-controls {
		position: absolute;
		right: 0.35rem;
		bottom: 0.35rem;
		z-index: 2;
		display: flex;
		gap: 0.3rem;
		opacity: 0;
		transition: opacity 0.2s;
	}

	figure:hover .vid-overlay-controls,
	.vid-wrap:focus-within .vid-overlay-controls {
		opacity: 1;
	}

	.vid-overlay-controls button {
		display: inline-grid;
		width: 1.7rem;
		height: 1.7rem;
		place-items: center;
		color: #f8f8f2;
		background: rgba(21, 21, 21, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 5px;
		cursor: pointer;
		backdrop-filter: blur(4px);
	}

	.vid-overlay-controls button:hover {
		color: #080808;
		background: var(--accent, #8b0000);
		border-color: var(--accent, #8b0000);
	}

	figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: grid;
		gap: 0.15rem;
		padding: 2.4rem 0.75rem 0.75rem;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.84));
	}

	figcaption strong,
	figcaption span {
		overflow-wrap: anywhere;
	}

	figcaption strong {
		font-size: 0.86rem;
	}

	figcaption span {
		color: rgba(245, 245, 245, 0.62);
		font-size: 0.72rem;
	}

	@keyframes poster-scroll {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(-50%);
		}
	}

	@media (max-width: 980px) {
		.experience-heading,
		.project-group {
			grid-template-columns: 1fr;
		}

		.experience-section .experience-heading {
			grid-template-columns: minmax(0, 1fr) !important;
			align-items: start;
		}

		.experience-section .experience-heading > span,
		.experience-section .experience-heading h2,
		.experience-section .experience-heading p,
		.experience-section .apps,
		.experience-section .metrics-grid {
			grid-column: 1 / -1 !important;
			width: 100%;
			min-width: 0;
		}

		.experience-heading p,
		.apps {
			grid-column: auto;
		}

		h2 {
			font-size: 3.2rem;
		}
	}

	@media (max-width: 680px) {
		.experience-section {
			gap: 1.2rem;
		}

		.project-group {
			content-visibility: auto;
			contain-intrinsic-size: 760px;
			gap: 0.9rem;
			padding: 0.75rem;
			border-radius: 18px 8px 18px 8px;
		}

		.vid-overlay-controls {
			opacity: 1;
		}

		.vid-overlay-controls button {
			backdrop-filter: none;
		}

		h2 {
			font-size: 2.6rem;
		}

		h3 {
			font-size: 2rem;
		}

		.group-copy {
			gap: 0.45rem;
		}

		.group-copy p {
			font-size: 0.92rem;
			line-height: 1.45;
		}

		.media-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 0.6rem;
		}

		.color-row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.media-grid figure,
		.media-grid figure.featured,
		.media-grid figure[data-ratio='wide'],
		.media-grid figure[data-ratio='square'],
		.media-grid figure[data-ratio='portrait'],
		.media-grid figure[data-ratio='poster'],
		.media-grid figure.poster,
		.logo-system .media-grid figure:not(:first-child) {
			grid-column: span 3;
		}

		.media-grid figure[data-ratio='tall'] {
			grid-column: span 2;
		}

		.logo-system figure:first-child {
			grid-column: 1 / -1;
		}

		.project-group[data-layout='soca-showcase'] figure[data-title='Soca Environment Render'],
		.project-group[data-layout='soca-showcase'] figure[data-title='Witch Sovia v2'],
		.project-group[data-layout='soca-showcase'] figure[data-title='Sovia Pop out'],
		.project-group[data-layout='soca-showcase'] figure[data-title='Sovia X Banner'],
		.project-group[data-layout='soca-showcase'] figure[data-title='Witch Sovia v1'] {
			grid-row: auto;
			grid-column: 1 / -1 !important;
			width: 100%;
			aspect-ratio: var(--asset-aspect, 16 / 9);
		}

		.project-group[data-layout='personal-3d'] .media-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}

		.project-group[data-layout='personal-3d'] figure,
		.project-group[data-layout='personal-3d'] figure[data-title='CG Boost Lab Competition entry'],
		.project-group[data-layout='personal-3d'] figure[data-title='Isometric Room'] {
			grid-column: 1 / -1 !important;
			grid-row: auto !important;
			width: 100%;
		}

		.project-group[data-layout='personal-3d'] figure[data-title='University Final Semester Project'] {
			grid-column: 1 / -1 !important;
			grid-row: auto !important;
			width: 100%;
		}

		.project-group[data-layout='personal-3d'] figure[data-title='Chess Piece'] {
			grid-column: 1 / -1 !important;
			grid-row: auto !important;
			width: 100%;
		}

		.project-group[data-layout='personal-3d'] figure[data-title='Horror Poster for No Smoke Campaign'] {
			grid-column: 1 / -1 !important;
			grid-row: auto !important;
			width: 60%;
			margin-inline: auto;
			aspect-ratio: 2268 / 3402;
		}

		.logo-system-container {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}

		.logo-left {
			grid-column: auto;
			grid-row: auto;
		}

		.logo-right-inner {
			grid-column: auto;
			grid-row: auto;
		}

		.main-logo-figure {
			max-width: 24rem;
		}

		.font-left,
		.font-right {
			grid-column: auto;
			grid-row: auto;
		}

		.project-group[data-layout='motion-layout'] figure[data-ratio='wide'],
		.project-group[data-layout='motion-layout'] figure[data-ratio='square'],
		.project-group[data-layout='motion-layout'] figure[data-ratio='portrait'] {
			grid-row: auto;
		}

		.project-group[data-layout='motion-layout'] figure[data-ratio='wide'] {
			grid-column: 1 / -1;
			width: 100%;
		}

		.project-group[data-layout='motion-layout'] figure[data-ratio='square'],
		.project-group[data-layout='motion-layout'] figure[data-ratio='portrait'] {
			grid-column: span 3;
			width: 100%;
		}

		.poster-columns {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			min-height: 430px;
			height: 62vh;
		}
	}

	@media (max-width: 620px) {
		.logo-system-container {
			gap: 1rem;
		}

		.main-logo-figure {
			max-width: 18rem;
			justify-self: center;
		}

		.mockup-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.5rem;
		}

		.color-row {
			grid-template-columns: repeat(5, minmax(0, 1fr));
			gap: 0.35rem;
		}

		.color-row strong,
		.color-row small {
			font-size: 0.58rem;
		}

		.poster-columns {
			min-height: 450px;
			height: 66vh;
		}
	}

	@media (max-width: 480px) {
		.media-grid {
			grid-template-columns: 1fr;
		}

		.media-grid figure,
		.media-grid figure.featured,
		.media-grid figure[data-ratio='wide'],
		.media-grid figure[data-ratio='square'],
		.media-grid figure[data-ratio='portrait'],
		.media-grid figure[data-ratio='poster'],
		.media-grid figure[data-ratio='tall'],
		.media-grid figure.poster,
		.project-group[data-layout='motion-layout'] figure[data-ratio='square'],
		.project-group[data-layout='motion-layout'] figure[data-ratio='portrait'] {
			grid-column: 1 / -1 !important;
		}

		.project-group[data-layout='personal-3d'] figure[data-title='Horror Poster for No Smoke Campaign'] {
			width: min(100%, 16rem);
		}

		.mockup-grid {
			grid-template-columns: 1fr 1fr;
		}

		.poster-columns {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			height: 58vh;
			min-height: 390px;
		}

		figcaption {
			padding: 1.8rem 0.55rem 0.55rem;
		}

		figcaption strong {
			font-size: 0.72rem;
		}

		figcaption span {
			font-size: 0.62rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poster-track {
			animation: none;
		}
	}
</style>
