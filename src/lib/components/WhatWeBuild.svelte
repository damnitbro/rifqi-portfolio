<section class="loop-marquee" aria-hidden="true">
	<div class="marquee-track">
		<span>WHAT I LOVE TO CREATE • 3D ART • VIDEO EDITING • MOTION • </span>
		<span>WHAT I LOVE TO CREATE • 3D ART • VIDEO EDITING • MOTION • </span>
	</div>
</section>

<style>
	.loop-marquee {
		display: flex;
		overflow: hidden;
		pointer-events: none;
		user-select: none;
		padding: clamp(2rem, 4vw, 4rem) 0;
	}

	.marquee-track {
		display: flex;
		white-space: nowrap;
		animation: marquee-scroll 30s linear infinite;
		will-change: transform;
	}

	.marquee-track span {
		font-family: var(--display-font);
		font-size: clamp(5rem, 14vw, 10rem);
		font-weight: 900;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.12);
		padding-right: 3rem;
		letter-spacing: 0.04em;
	}

	@keyframes marquee-scroll {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-50%);
		}
	}
</style>
