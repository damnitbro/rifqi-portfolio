<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { RotateCcw, Volume2, VolumeOff } from '@lucide/svelte';
	import { activeVideoKey } from '$lib/stores/videoMute';

	type Props = {
		title: string;
		role: string;
		src: string;
		poster?: string;
		startAt?: number;
		endAt?: number;
		accent?: string;
	};

	let {
		title,
		role,
		src,
		poster,
		startAt = 0,
		endAt = 0,
		accent = '#8b0000'
	}: Props = $props();

	const videoKey = $derived(`vloop-${title}`);
	const initialStart = () => startAt;
	const initialEnd = () => endAt;
	const initialSegmentMode = () => endAt > startAt;

	let video: HTMLVideoElement;
	let duration = $state(0);
	const loopSegment = initialSegmentMode();
	let segmentStart = $state(initialStart());
	let segmentEnd = $state(initialEnd());
	let videoMuted = $state(true);

	let unsub: (() => void) | undefined;

	onMount(() => {
		unsub = activeVideoKey.subscribe((key) => {
			if (key !== null && key !== videoKey && video) {
				video.muted = true;
				videoMuted = true;
			}
		});
	});

	onDestroy(() => {
		unsub?.();
	});

	const syncBounds = () => {
		if (!duration) return;
		segmentStart = Math.min(Math.max(0, segmentStart), Math.max(0, duration - 1));
		segmentEnd = Math.min(Math.max(segmentStart + 1, segmentEnd || duration), duration);
	};

	const handleLoaded = () => {
		duration = video.duration || 0;
		segmentEnd = segmentEnd || duration;
		syncBounds();
		video.currentTime = loopSegment ? segmentStart : 0;
		void video.play().catch(() => undefined);
	};

	const handleTimeUpdate = () => {
		if (!loopSegment || !segmentEnd) return;
		if (video.currentTime >= segmentEnd || video.currentTime < segmentStart) {
			video.currentTime = segmentStart;
			void video.play();
		}
	};

	const restart = () => {
		video.currentTime = loopSegment ? segmentStart : 0;
		void video.play();
	};

	const toggleMute = () => {
		const nextMuted = !video.muted;
		video.muted = nextMuted;
		videoMuted = nextMuted;
		activeVideoKey.set(nextMuted ? null : videoKey);
	};
</script>

<article class="video-loop" style:--accent={accent}>
	<div class="video-shell">
		<video
			bind:this={video}
			{poster}
			autoplay
			playsinline
			muted={videoMuted}
			loop={!loopSegment}
			preload="metadata"
			src={src}
			onloadedmetadata={handleLoaded}
			ontimeupdate={handleTimeUpdate}
		></video>

		<div class="video-copy">
			<span>{role}</span>
			<h3>{title}</h3>
		</div>

		<div class="overlay-controls">
			<button aria-label="Restart video" onclick={restart}>
				<RotateCcw size={16} />
			</button>

			<button aria-label={videoMuted ? 'Unmute video' : 'Mute video'} onclick={toggleMute}>
				{#if videoMuted}
					<VolumeOff size={16} />
				{:else}
					<Volume2 size={16} />
				{/if}
			</button>
		</div>
	</div>
</article>

<style>
	.video-loop {
		min-width: 0;
	}

	.video-shell {
		position: relative;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		background: #101010;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: saturate(1.1) contrast(1.03);
	}

	.video-shell::after {
		position: absolute;
		inset: 0;
		content: '';
		background: linear-gradient(180deg, transparent 42%, rgba(0, 0, 0, 0.72));
		pointer-events: none;
	}

	.video-copy {
		position: absolute;
		left: clamp(1rem, 3vw, 1.4rem);
		right: clamp(1rem, 3vw, 1.4rem);
		bottom: clamp(1rem, 3vw, 1.4rem);
		z-index: 1;
		display: grid;
		gap: 0.2rem;
	}

	.video-copy span {
		color: var(--accent);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 2rem;
		line-height: 0.95;
	}

	.overlay-controls {
		position: absolute;
		right: clamp(0.6rem, 2vw, 1rem);
		bottom: clamp(0.6rem, 2vw, 1rem);
		z-index: 2;
		display: flex;
		gap: 0.45rem;
	}

	button {
		display: inline-grid;
		width: 2.2rem;
		height: 2.2rem;
		place-items: center;
		color: #f8f8f2;
		background: rgba(21, 21, 21, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 6px;
		cursor: pointer;
		backdrop-filter: blur(4px);
	}

	button:hover {
		color: #080808;
		background: var(--accent);
		border-color: var(--accent);
	}

	@media (max-width: 620px) {
		h3 {
			font-size: 1.45rem;
		}
	}
</style>
