<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown, ArrowUp, Instagram, Mail, MessageCircle } from '@lucide/svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectSpotlight from '$lib/components/ProjectSpotlight.svelte';
	import WhatWeBuild from '$lib/components/WhatWeBuild.svelte';
	import {
		cvTimeline,
		experienceSections,
		identity,
		personalSkills,
		skills,
		softSkills,
		videoProjects
	} from '$lib/data/portfolio';

	const instagramUrl = `https://www.instagram.com/marvs_qx/`;
	const whatsappUrl = 'https://wa.me/+6282114914404';

	let isAtBottom = $state(false);
	let isLoading = $state(true);

	const updateScrollState = () => {
		isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 180;
	};

	const jumpEdge = () => {
		const target = document.getElementById(isAtBottom ? 'top' : 'contact');
		target?.scrollIntoView({ behavior: 'smooth', block: isAtBottom ? 'start' : 'end' });
	};

	onMount(() => {
		const forceTop = () => {
			const previousBehavior = document.documentElement.style.scrollBehavior;
			document.documentElement.style.scrollBehavior = 'auto';
			window.scrollTo(0, 0);
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			window.requestAnimationFrame(() => {
				document.documentElement.style.scrollBehavior = previousBehavior;
			});
		};
		let previousScrollRestoration: History['scrollRestoration'] | undefined;
		if ('scrollRestoration' in history) {
			previousScrollRestoration = history.scrollRestoration;
			history.scrollRestoration = 'manual';
		}
		if (window.location.hash) {
			history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
		}
		forceTop();
		updateScrollState();
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const mobileQuery = window.matchMedia('(max-width: 760px)');
		const applyMobileMode = () => {
			document.body.classList.toggle('mobile-optimized', mobileQuery.matches);
		};
		applyMobileMode();
		mobileQuery.addEventListener('change', applyMobileMode);
		const revealGroups = [
			'.hero .cover-banner',
			'.hero .intro > *',
			'.hero .intro-card',
			'.hero .timeline-section',
			'.hero .skill-group',
			'.hero .contact-info',
			'.cv-panel .toc-card',
			'.spotlight .section-heading > *',
			'.spotlight-grid > *',
			'.loop-marquee',
			'.experience-heading > *',
			'.apps span',
			'.metric-card',
			'.project-group',
			'.group-copy > *',
			'.media-grid figure',
			'.poster-column',
			'.logo-system-container > *',
			'.mockup-figure',
			'.color-row > div',
			'.site-footer .footer-intro > *',
			'.footer-contact-grid a',
			'.footer-bottom > *'
		];

		const revealElements = Array.from(document.querySelectorAll<HTMLElement>(revealGroups.join(',')));
		revealElements.forEach((element, index) => {
			element.classList.add('motion-reveal');
			element.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 45, 225)}ms`);
			if (
				element.matches(
					'figure, .spotlight-grid > *, .project-group, .poster-column, .mockup-figure, .footer-contact-grid a'
				)
			) {
				element.dataset.motion = 'media';
			}
		});

		let observer: IntersectionObserver | undefined;
		if (prefersReducedMotion.matches || mobileQuery.matches) {
			revealElements.forEach((element) => element.classList.add('motion-visible'));
		} else {
			document.body.classList.add('motion-ready');
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							entry.target.classList.add('motion-visible');
							observer?.unobserve(entry.target);
						}
					}
				},
				{ rootMargin: '0px 0px 14% 0px', threshold: 0.02 }
			);
			revealElements.forEach((element) => observer?.observe(element));
		}

		let raf = 0;
		const updateMotionVars = () => {
			raf = 0;
			const scrollable = document.documentElement.scrollHeight - window.innerHeight || 1;
			const progress = Math.min(window.scrollY / scrollable, 1);
			document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
		};
		const queueMotionUpdate = () => {
			updateScrollState();
			if (!raf && !prefersReducedMotion.matches) {
				raf = window.requestAnimationFrame(updateMotionVars);
			}
		};

		const handlePointer = (event: PointerEvent) => {
			if (prefersReducedMotion.matches) return;
			const x = (event.clientX / window.innerWidth - 0.5).toFixed(3);
			const y = (event.clientY / window.innerHeight - 0.5).toFixed(3);
			document.documentElement.style.setProperty('--cursor-x', x);
			document.documentElement.style.setProperty('--cursor-y', y);
		};

		const handleInteractiveClick = (event: MouseEvent) => {
			if (prefersReducedMotion.matches || !(event.target instanceof Element)) return;
			const target = event.target.closest<HTMLElement>('a, button, [role="button"]');
			if (!target || target.closest('.loading-screen')) return;

			const rect = target.getBoundingClientRect();
			target.style.setProperty('--click-x', `${event.clientX - rect.left}px`);
			target.style.setProperty('--click-y', `${event.clientY - rect.top}px`);
			target.classList.remove('interaction-pop');
			void target.offsetWidth;
			target.classList.add('interaction-pop');
			window.setTimeout(() => target.classList.remove('interaction-pop'), 680);

			if (target.closest('.game-nav')) {
				const dot = document.querySelector<HTMLElement>('.status-dot');
				if (dot) {
					dot.classList.remove('nav-dot-click');
					void dot.offsetWidth;
					dot.classList.add('nav-dot-click');
					dot.classList.add('nav-dot-active');
					const removeOnScroll = () => {
						dot.classList.remove('nav-dot-active');
						window.removeEventListener('scroll', removeOnScroll);
					};
					window.addEventListener('scroll', removeOnScroll, { once: true });
				}
			}
		};

		queueMotionUpdate();
		const loaderTimer = window.setTimeout(() => {
			forceTop();
			isLoading = false;
		}, 1800);
		window.addEventListener('scroll', queueMotionUpdate, { passive: true });
		window.addEventListener('resize', queueMotionUpdate);
		window.addEventListener('pointermove', handlePointer, { passive: true });
		document.addEventListener('click', handleInteractiveClick);

		return () => {
			window.clearTimeout(loaderTimer);
			window.removeEventListener('scroll', queueMotionUpdate);
			window.removeEventListener('resize', queueMotionUpdate);
			window.removeEventListener('pointermove', handlePointer);
			document.removeEventListener('click', handleInteractiveClick);
			mobileQuery.removeEventListener('change', applyMobileMode);
			observer?.disconnect();
			if (raf) window.cancelAnimationFrame(raf);
			if (previousScrollRestoration) history.scrollRestoration = previousScrollRestoration;
			document.body.classList.remove('motion-ready');
			document.body.classList.remove('mobile-optimized');
		};
	});
</script>

<svelte:head>
	<title>{identity.name} | Interactive CV</title>
	<meta
		name="description"
		content="Interactive portfolio CV for 3D art, video editing, motion design, social posts, and identity work."
	/>
</svelte:head>

{#if isLoading}
	<div class="loading-screen" aria-label="Loading portfolio">
		<div class="loading-ring">
			<img src="/media/work/personal-logo/personal-logo.png" alt={identity.name} />
		</div>
		<span>Loading</span>
	</div>
{/if}

<div class="page-content" class:page-visible={!isLoading}>
<nav class="game-nav" aria-label="Main navigation">
	<div class="nav-status">
		<span class="status-dot"></span>
		<span></span>
		<span></span>
		<span></span>
	</div>

	<div class="nav-links">
		<a href="#experience-3d">3D Artist</a>
		<a href="#experience-video">Video Editor</a>
		<a href="#experience-graphics">Graphic Design</a>
		<a href="#contact">Contact</a>
	</div>

	<!-- <a class="nav-player" href="#top">Player 1</a> -->
</nav>

<Hero
	name={identity.name}
	location={identity.location}
	tagline={identity.tagline}
	availability={identity.availability}
	email={identity.email}
	instagram={identity.instagram}
	phone={identity.phone}
	timeline={cvTimeline}
	{skills}
	{personalSkills}
	{softSkills}
/>

<main>
	<ProjectSpotlight videos={videoProjects} />
	<WhatWeBuild />

	{#each experienceSections as section}
		<ExperienceSection {section} />
	{/each}
</main>

<button
	class="edge-jump"
	class:bottom-mode={isAtBottom}
	type="button"
	aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to contact'}
	onclick={jumpEdge}
>
	<span class="arrow arrow-down"><ArrowDown size={24} /></span>
	<span class="arrow arrow-up"><ArrowUp size={24} /></span>
</button>

<footer class="site-footer" id="contact">
	<div class="footer-intro">
		<span>Want to collaborate?</span>
		<h2>Let’s talk</h2>
	</div>

	<div class="footer-contact-grid" aria-label="Contact information">
		<a href={`mailto:${identity.email}`}>
			<span><Mail size={20} /></span>
			<strong>Want to ask something?</strong>
			<small>{identity.email}</small>
		</a>
		<a href={instagramUrl} target="_blank" rel="noreferrer">
			<span><Instagram size={20} /></span>
			<strong>Stay in the loop</strong>
			<small>@{identity.instagram}</small>
		</a>
		<a href={whatsappUrl} target="_blank" rel="noreferrer">
			<span><MessageCircle size={20} /></span>
			<strong>Prefer direct chat?</strong>
			<small>{identity.phone}</small>
		</a>
	</div>

	<div class="footer-bottom">
		<span>{identity.name}</span>
		<span>{identity.location}</span>
		<span>Interactive CV</span>
	</div>
</footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
		background: #080808;
	}

	:global(body) {
		margin: 0;
		min-width: 320px;
		overflow-x: hidden;
		color: #f5f5f5;
		background:
			radial-gradient(circle at 0 20%, rgba(139, 0, 0, 0.26), transparent 18rem),
			linear-gradient(180deg, #211c1d, #080808 36rem);
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

	:global(::selection) {
		color: #080808;
		background: #c2a96a;
	}

	:global(:root) {
		--cursor-x: 0;
		--cursor-y: 0;
		--scroll-progress: 0;
		--display-font: 'Bebas Neue', Impact, 'Arial Black', 'Roboto Condensed', 'Arial Narrow',
			system-ui, sans-serif;
	}

	:global(.motion-ready .game-nav) {
		animation: nav-enter 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	:global(.motion-ready .motion-reveal) {
		opacity: 0;
		filter: blur(8px);
		transform: translate3d(0, 1.45rem, 0) scale(0.99);
		transition:
			opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
			filter 520ms cubic-bezier(0.22, 1, 0.36, 1),
			clip-path 680ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 680ms cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: var(--reveal-delay, 0ms);
		will-change: opacity, filter, transform;
	}

	:global(.motion-ready .motion-reveal[data-motion='media']) {
		clip-path: inset(7% 0 7% 0 round 10px);
		transform: translate3d(0, 2rem, 0) scale(0.97);
	}

	:global(.motion-ready .motion-reveal.motion-visible) {
		opacity: 1;
		filter: blur(0);
		clip-path: inset(0 0 0 0 round 0);
		transform: translate3d(0, 0, 0) scale(1);
	}

	:global(.motion-ready .motion-visible .motion-reveal) {
		opacity: 1;
		filter: blur(0);
		clip-path: inset(0 0 0 0 round 0);
		transform: translate3d(0, 0, 0) scale(1);
	}

	:global(.mobile-optimized .motion-reveal) {
		opacity: 1 !important;
		filter: none !important;
		clip-path: none !important;
		transform: none !important;
		transition: none !important;
	}

	:global(.motion-ready .hero) {
		background-position:
			calc(86% + (var(--cursor-x) * 1.5rem)) calc(28% + (var(--cursor-y) * 1.5rem)),
			calc(86% + (var(--cursor-x) * 2rem)) calc(22% + (var(--cursor-y) * 2rem)),
			0 0;
	}

	:global(.motion-ready .cover-banner::before) {
		transform: translate3d(
			calc(var(--cursor-x) * 1.4rem),
			calc((var(--cursor-y) * 1rem) - (var(--scroll-progress) * 3rem)),
			0
		);
	}

	:global(.motion-ready .portfolio-o) {
		animation: portfolio-pulse 3.8s ease-in-out infinite;
	}

	:global(.motion-ready .media-grid figure.motion-visible:hover),
	:global(.motion-ready .project-group.motion-visible:hover),
	:global(.motion-ready .spotlight-grid > *.motion-visible:hover),
	:global(.motion-ready .footer-contact-grid a.motion-visible:hover) {
		transform: translate3d(0, -0.35rem, 0) scale(1.01);
	}

	:global(a),
	:global(button),
	:global([role='button']) {
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}

	:global(.interaction-pop) {
		animation: interaction-pop 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.interaction-pop::after) {
		position: absolute;
		left: var(--click-x, 50%);
		top: var(--click-y, 50%);
		z-index: 3;
		width: 0.8rem;
		aspect-ratio: 1;
		content: '';
		background: currentColor;
		border-radius: 50%;
		opacity: 0.28;
		pointer-events: none;
		transform: translate(-50%, -50%) scale(0);
		animation: interaction-ripple 620ms ease-out;
	}

	:global(.mobile-optimized .interaction-pop::after) {
		display: none;
	}

	.loading-screen {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		align-content: center;
		gap: 1rem;
		background: #080808;
		color: #f5f5f5;
	}

	.loading-ring {
		position: relative;
		display: grid;
		width: min(42vw, 15rem);
		aspect-ratio: 1;
		place-items: center;
		background:
			radial-gradient(circle, rgba(255, 16, 16, 0.18), transparent 58%),
			#111;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 50%;
		box-shadow: 0 0 0 0 rgba(255, 16, 16, 0.5);
		animation: loading-pulse 1.1s ease-in-out infinite;
	}

	.loading-ring::before {
		position: absolute;
		width: min(42vw, 15rem);
		aspect-ratio: 1;
		content: '';
		border: 2px solid transparent;
		border-top-color: #ff1010;
		border-right-color: rgba(194, 169, 106, 0.85);
		border-radius: 50%;
		animation: loading-spin 1.1s linear infinite;
	}

	.loading-ring img {
		position: relative;
		z-index: 1;
		width: 46%;
		height: 46%;
		object-fit: contain;
	}

	.loading-screen span {
		color: rgba(245, 245, 245, 0.7);
		font-size: 0.76rem;
		font-weight: 950;
		text-transform: uppercase;
	}

	.page-content {
		opacity: 0;
		transition: opacity 800ms ease;
	}

	.page-content.page-visible {
		opacity: 1;
	}

	.game-nav {
		position: fixed;
		left: 50%;
		top: 1.1rem;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(calc(100% - 2rem), 68rem);
		padding: 0.45rem 0.55rem;
		color: #f5f5f5;
		background: rgba(8, 8, 8, 0.78);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 18px;
		backdrop-filter: blur(18px);
		box-shadow: 0 18px 60px rgba(0, 0, 0, 0.42);
		transform: translateX(-50%);
	}

	.game-nav a {
		color: inherit;
		text-decoration: none;
	}

	.nav-status,
	.nav-links {
		display: flex;
		align-items: center;
		gap: clamp(0.4rem, 1vw, 0.7rem);
	}

	.nav-status {
		position: absolute;
		left: clamp(1rem, 2.2vw, 1.8rem);
		top: 50%;
		transform: translateY(-50%);
		color: rgba(245, 245, 245, 0.62);
		font-size: 0.62rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.status-dot {
		width: 1.1rem;
		flex: 0 0 auto;
		aspect-ratio: 1;
		background: rgb(255, 0, 0);
		border-radius: 50%;
		box-shadow: 0 0 18px rgba(251, 8, 8, 0.72);
		animation: nav-dot-idle 2.6s ease-in-out infinite;
	}

	:global(.status-dot.nav-dot-click) {
		animation:
			nav-dot-click 780ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
			nav-dot-idle 2.6s ease-in-out infinite 780ms;
	}

	:global(.status-dot.nav-dot-active) {
		box-shadow: 0 0 30px rgba(251, 8, 8, 0.9), 0 0 0 0.4rem rgba(255, 16, 16, 0.1);
		transform: scale(1.06);
	}

	.nav-links {
		justify-content: center;
		flex: 0 1 auto;
		min-width: 0;
		margin-left: 3rem;
	}

	.nav-links a {
		padding: 0.62rem clamp(0.45rem, 1.2vw, 0.8rem);
		color: rgba(245, 245, 245, 0.86);
		border-radius: 10px;
		font-size: clamp(0.64rem, 1.1vw, 0.88rem);
		font-weight: 950;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.nav-links a:hover {
		color: #080808;
		background: #ff0000;
	}

	@keyframes loading-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes loading-pulse {
		50% {
			box-shadow: 0 0 0 0.8rem rgba(255, 16, 16, 0.06);
		}
	}

	@keyframes nav-enter {
		from {
			opacity: 0;
			transform: translate(-50%, -1.4rem) scale(0.98);
		}

		to {
			opacity: 1;
			transform: translate(-50%, 0) scale(1);
		}
	}

	@keyframes portfolio-pulse {
		0%,
		100% {
			box-shadow: inset 0 0 0 0 rgba(255, 16, 16, 0.2), 0 0 0 rgba(255, 16, 16, 0);
		}

		50% {
			box-shadow: inset 0 0 1rem rgba(255, 16, 16, 0.28), 0 0 1.6rem rgba(255, 16, 16, 0.22);
		}
	}

	@keyframes nav-dot-idle {
		0%,
		100% {
			box-shadow: 0 0 16px rgba(251, 8, 8, 0.62), 0 0 0 0 rgba(255, 16, 16, 0.18);
			transform: scale(1);
		}

		50% {
			box-shadow: 0 0 24px rgba(251, 8, 8, 0.86), 0 0 0 0.45rem rgba(255, 16, 16, 0.05);
			transform: scale(1.08);
		}
	}

	@keyframes nav-dot-click {
		0% {
			box-shadow: 0 0 16px rgba(251, 8, 8, 0.72), 0 0 0 0 rgba(255, 16, 16, 0.32);
			transform: scale(1);
		}

		45% {
			box-shadow: 0 0 34px rgba(251, 8, 8, 1), 0 0 0 0.95rem rgba(255, 16, 16, 0.1);
			transform: scale(1.38);
		}

		100% {
			box-shadow: 0 0 18px rgba(251, 8, 8, 0.72), 0 0 0 0 rgba(255, 16, 16, 0);
			transform: scale(1);
		}
	}

	@keyframes interaction-pop {
		0% {
			transform: scale(1);
			filter: brightness(1);
		}

		38% {
			transform: scale(0.96);
			filter: brightness(1.4);
		}

		100% {
			transform: scale(1);
			filter: brightness(1);
		}
	}

	@keyframes interaction-ripple {
		0% {
			opacity: 0.3;
			transform: translate(-50%, -50%) scale(0);
		}

		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(18);
		}
	}

	main {
		position: relative;
		display: grid;
		gap: clamp(5rem, 12vw, 9rem);
		overflow: hidden;
		padding: clamp(1rem, 2.6vw, 2rem);
	}

	main::before,
	main::after {
		position: fixed;
		z-index: -1;
		width: 18rem;
		aspect-ratio: 1;
		content: '';
		background:
			radial-gradient(circle, rgba(255, 0, 0, 0.52), transparent 58%),
			repeating-radial-gradient(circle, rgba(255, 0, 0, 0.55) 0 1px, transparent 1px 8px);
		border-radius: 50%;
		filter: blur(0.2px);
		opacity: 0.45;
	}

	main::before {
		left: -7rem;
		bottom: 7rem;
	}

	main::after {
		right: -8rem;
		top: 18rem;
	}

	h2 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 4.8rem;
		line-height: 0.88;
		letter-spacing: 0.024em;
		text-wrap: balance;
	}

	.edge-jump {
		position: fixed;
		right: clamp(1rem, 2.6vw, 2rem);
		bottom: clamp(5.5rem, 8vw, 6.2rem);
		z-index: 20;
		display: grid;
		width: 3.7rem;
		aspect-ratio: 1;
		place-items: center;
		color: #080808;
		background: #f5f5f5;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
		cursor: pointer;
		transition:
			background 220ms ease,
			color 220ms ease,
			transform 220ms ease;
	}

	.edge-jump:hover {
		background: #c2a96a;
		transform: translateY(-2px);
	}

	.arrow {
		grid-area: 1 / 1;
		display: grid;
		place-items: center;
		transition:
			opacity 220ms ease,
			transform 260ms ease;
	}

	.arrow-up {
		opacity: 0;
		transform: translateY(0.35rem) rotate(90deg) scale(0.72);
	}

	.edge-jump.bottom-mode .arrow-down {
		opacity: 0;
		transform: translateY(-0.35rem) rotate(-90deg) scale(0.72);
	}

	.edge-jump.bottom-mode .arrow-up {
		opacity: 1;
		transform: translateY(0) rotate(0deg) scale(1);
	}

	.site-footer {
		display: grid;
		gap: clamp(2rem, 5vw, 4rem);
		min-height: 92vh;
		align-content: end;
		padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 2.6vw, 2rem) 6.5rem;
		color: #f5f5f5;
		background: #080808;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer-intro {
		display: grid;
		gap: 0.7rem;
	}

	.footer-intro > span {
		color: rgba(245, 245, 245, 0.58);
		font-size: 0.86rem;
		font-weight: 950;
		text-transform: uppercase;
	}

	.footer-intro h2 {
		max-width: 8ch;
		font-size: clamp(5.4rem, 18vw, 18rem);
		letter-spacing: 0.024em;
		text-transform: uppercase;
	}

	.footer-contact-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.12);
	}

	.footer-contact-grid a {
		display: grid;
		min-height: 15rem;
		align-content: space-between;
		gap: 1rem;
		padding: clamp(1rem, 2.2vw, 1.6rem);
		color: #f5f5f5;
		background: #080808;
		text-decoration: none;
	}

	.footer-contact-grid a:hover {
		background: #f5f5f5;
		color: #080808;
	}

	.footer-contact-grid span {
		display: grid;
		width: 2.7rem;
		aspect-ratio: 1;
		place-items: center;
		color: #080808;
		background: #fb0808;
		border-radius: 50%;
	}

	.footer-contact-grid strong {
		max-width: 12rem;
		font-size: clamp(1.45rem, 3vw, 2.35rem);
		line-height: 0.94;
	}

	.footer-contact-grid small {
		color: currentColor;
		font-size: 0.95rem;
		font-weight: 900;
		overflow-wrap: anywhere;
		opacity: 0.72;
	}

	.footer-bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.8rem;
		color: rgba(245, 245, 245, 0.52);
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	.footer-bottom span:first-child {
		color: #f5f5f5;
	}

	@media (max-width: 980px) {
		h2 {
			font-size: 3.2rem;
		}

		.footer-contact-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 620px) {
		main {
			gap: 3.2rem;
			padding: 0.75rem;
		}

		main::before,
		main::after {
			display: none;
		}

		:global(.mobile-optimized .portfolio-o),
		:global(.mobile-optimized .marquee-track),
		:global(.mobile-optimized .poster-track) {
			animation-duration: 44s !important;
		}

		h2 {
			font-size: 2.6rem;
		}

		.site-footer {
			min-height: 80vh;
			padding-inline: 0.75rem;
		}

		.game-nav {
			top: 0.6rem;
			width: calc(100% - 0.8rem);
			padding: 0.35rem 0.45rem;
			backdrop-filter: none;
			border-radius: 14px;
		}

		.nav-status {
			left: 0.7rem;
		}

		.nav-status span:not(.status-dot) {
			display: none;
		}

		.status-dot {
			width: 0.78rem;
		}

		.nav-links {
			justify-content: center;
			gap: 0.12rem;
			width: 100%;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.nav-links::-webkit-scrollbar {
			display: none;
		}

		.nav-links a {
			flex: 0 0 auto;
			padding: 0.52rem 0.42rem;
			font-size: clamp(0.5rem, 2.55vw, 0.64rem);
		}

		.edge-jump {
			right: 0.8rem;
			bottom: 1rem;
			width: 3.15rem;
		}
	}

	@media (max-width: 420px) {
		.nav-links {
			justify-content: center;
		}

		.footer-intro h2 {
			font-size: clamp(4.4rem, 24vw, 6.2rem);
		}

		.footer-contact-grid a {
			min-height: 12rem;
		}
	}
</style>
