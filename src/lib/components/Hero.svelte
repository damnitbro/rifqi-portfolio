<script lang="ts">
	import { ArrowDownRight, Mail, MessageCircle } from '@lucide/svelte';
	import type { Skill, TimelineItem } from '$lib/data/portfolio';

	type Props = {
		name: string;
		location: string;
		tagline: string;
		availability: string;
		email: string;
		instagram: string;
		phone: string;
		timeline: TimelineItem[];
		skills: Skill[];
		personalSkills: Skill[];
		softSkills: Skill[];
	};

	let { name, location, tagline, availability, email, instagram, phone, timeline, skills, personalSkills, softSkills }: Props =
		$props();

	let education = $derived(timeline.filter((item) => item.type === 'education'));
	let experience = $derived(timeline.filter((item) => item.type === 'experience'));

	const instagramUrl = `https://www.instagram.com/marvs_qx/`;
	const whatsappUrl = 'https://wa.me/+6282114914404';
	const skillTargets = ['experience-3d', 'experience-video', 'experience-graphics', 'contact'];

	const letters = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];
</script>

<section class="hero" id="top">
	<div class="cover-banner">
		<div class="portfolio-word">
			{#each letters as letter, i}
				{#if i === 5}
					<span class="letter ornament-letter" style:--i={i}>
						<img src="/images/RadialDot.png" alt="O" class="radial-o" />
					</span>
				{:else}
					<span class="letter" style:--i={i}>{letter}</span>
				{/if}
			{/each}
		</div>
	</div>
	<div class="hero-grid">
		<div class="intro">
			<span class="eyebrow">{location}</span>
			<h1>{name}</h1>
			<p>{tagline}</p>
			<a class="cta" href="#experience-3d">
				<span>{availability}</span>
				<span class="cta-icon"><ArrowDownRight size={20} /></span>
			</a>
		</div>

		<div class="profile-board" aria-label="Portfolio introduction">
			<div class="intro-card">
				<h2>Introduction</h2>
				<p>
					Hello, I'm <strong>{name}</strong>. A 3D artist and video editor focused on
					creating impactful visuals that connect ideas with audiences.
				</p>

				<div class="timeline-split">
					<div class="timeline-section">
						<span class="timeline-label">Experience</span>
						<div class="timeline">
							{#each experience as item}
								<div>
									<span class="tl-period">{item.period}</span>
									<strong class="tl-title">{item.title}</strong>
									<span class="tl-detail">{item.detail}</span>
								</div>
							{/each}
						</div>
					</div>

					<div class="timeline-section">
						<span class="timeline-label">Education</span>
						<div class="timeline">
							{#each education as item}
								<div>
									<span class="tl-period">{item.period}</span>
									<strong class="tl-title">{item.title}</strong>
									<span class="tl-detail">{item.detail}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="skills-row">
					<div class="skill-group">
						<span class="skill-group-label">Personal Skills</span>
						<div class="skill-tags">
							{#each personalSkills as skill}
								<span class="skill-tag">{skill.label}</span>
							{/each}
						</div>
					</div>
					<div class="skill-group">
						<span class="skill-group-label">Soft Skills</span>
						<div class="skill-tags">
							{#each softSkills as skill}
								<span class="skill-tag">{skill.label}</span>
							{/each}
						</div>
					</div>
				</div>

				<div class="contact-info">
					<span class="contact-heading">Contact Information</span>
					<div class="contact-row">
						<a href={`mailto:${email}`} aria-label="Email">
							<Mail size={18} />
							<span>{email}</span>
						</a>
						<a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
							<span>@{instagram}</span>
						</a>
						<a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
							<MessageCircle size={18} />
							<span>{phone}</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="cv-panel" aria-label="Role summary">
			{#each skills as skill, index}
				<a class="toc-card" href={`#${skillTargets[index] ?? 'contact'}`} style:--delay={`${index * 90}ms`}>
					<span>0{index + 1}</span>
					<h2>{skill.label}</h2>
					<p>{skill.value}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero {
		--hero-pad: clamp(1rem, 2.6vw, 2rem);
		--hero-nav-space: 0rem;
		min-height: 100svh;
		display: grid;
		grid-template-rows: auto auto 1fr;
		padding: calc(var(--hero-pad) + var(--hero-nav-space)) var(--hero-pad) var(--hero-pad);
		background:
			repeating-radial-gradient(circle at 86% 28%, rgba(255, 0, 0, 0.28) 0 2px, transparent 2px 10px),
			radial-gradient(circle at 86% 22%, rgba(139, 0, 0, 0.56), transparent 21rem),
			linear-gradient(180deg, #221f20, #080808 74%);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
		align-items: end;
		gap: clamp(1.4rem, 4vw, 4rem);
		padding-block: clamp(4rem, 8vw, 7rem) clamp(1rem, 3vw, 2rem);
	}

	.intro {
		display: grid;
		gap: clamp(1rem, 2vw, 1.5rem);
	}

	.eyebrow {
		width: fit-content;
		color: #ff1010;
		font-size: 0.82rem;
		font-weight: 900;
		text-transform: uppercase;
	}

	h1 {
		max-width: 10ch;
		margin: 0;
		font-family: var(--display-font);
		font-size: 5.8rem;
		font-weight: 500;
		line-height: 0.86;
		letter-spacing: 0.024em;
		text-transform: uppercase;
		text-wrap: balance;
		overflow-wrap: anywhere;
	}

	.intro p {
		max-width: 42rem;
		margin: 0;
		color: rgba(255, 255, 255, 0.72);
		font-size: 1.25rem;
		line-height: 1.55;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: min(100%, 26rem);
		min-height: 3.4rem;
		padding: 0.3rem 0.35rem 0.3rem 1rem;
		color: #f5f5f5;
		background: #8b0000;
		border: 1px solid #ff1010;
		border-radius: 8px;
		font-weight: 900;
	}

	.cta-icon {
		display: inline-grid;
		flex: 0 0 auto;
		width: 2.8rem;
		height: 2.8rem;
		place-items: center;
		background: #f5f5f5;
		color: #080808;
		border-radius: 6px;
	}

	.cta-icon :global(svg) {
		flex: 0 0 auto;
	}

	.profile-board {
		display: grid;
		gap: 0.8rem;
	}

	.intro-card {
		overflow: hidden;
		background: rgba(12, 10, 11, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 24px 8px 24px 8px;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
	}

	.cover-banner {
		position: relative;
		display: grid;
		align-content: center;
		place-items: stretch;
		width: calc(100% + (var(--hero-pad) * 2));
		min-height: clamp(26rem, 62vw, 48rem);
		margin: calc(var(--hero-pad) * -1) calc(var(--hero-pad) * -1) clamp(2.4rem, 5vw, 4.5rem);
		padding: clamp(5.8rem, 9vw, 8rem) clamp(0rem, 0vw, 0rem) clamp(3.2rem, 6vw, 5rem);
		overflow: visible;
		background:
			radial-gradient(circle at 100% 0%, rgba(255, 0, 0, 0.82), transparent 24rem),
			radial-gradient(circle at 5% 74%, rgba(255, 0, 0, 0.64), transparent 8rem),
			linear-gradient(180deg, rgba(33, 29, 31, 0.92), rgba(28, 25, 26, 0.88));
	}

	.cover-banner::before,
	.cover-banner::after {
		position: absolute;
		content: '';
		pointer-events: none;
	}

	.cover-banner::before {
		right: clamp(2rem, 10vw, 9rem);
		top: clamp(6rem, 12vw, 9rem);
		width: min(28vw, 22rem);
		height: min(26vw, 20rem);
		background: rgba(255, 0, 0, 0.72);
		filter: blur(1.5rem);
		opacity: 0.72;
	}

	.cover-banner::after {
		left: clamp(-4rem, -4vw, -1.4rem);
		bottom: clamp(2.4rem, 5vw, 4.2rem);
		width: min(26vw, 16rem);
		height: min(18vw, 11rem);
		border-radius: 50%;
		background:
			radial-gradient(ellipse at 38% 45%, rgba(255, 0, 0, 0.78), rgba(139, 0, 0, 0.38) 42%, transparent 72%),
			radial-gradient(ellipse at 92% 88%, rgba(255, 0, 0, 0.44), transparent 68%);
		filter: blur(0.35rem);
	}

	.portfolio-word {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding-inline: clamp(0.5rem, 2vw, 1.5rem);
		gap: 0.02em;
		color: #ffffff;
		font-family: var(--display-font);
		font-size: clamp(5.5rem, 26vw, 28rem);
		line-height: 0.64;
		text-transform: uppercase;
		letter-spacing: 0;
		white-space: nowrap;
	}

	.letter {
		display: inline-block;
		flex: 0 0 auto;
		animation: letter-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(var(--i) * 70ms);
	}

	.ornament-letter {
		flex: 0 0 auto;
		width: 0.72em;
		aspect-ratio: 1;
		animation: ornament-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(5 * 70ms);
		transform-origin: center;
	}

	.radial-o {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		animation: spin 10s linear infinite;
		filter: drop-shadow(0 0 0.15em rgba(255, 16, 16, 0.8));
	}

	.intro-card {
		display: grid;
		gap: 0.9rem;
		padding: 1.1rem;
	}

	.intro-card h2 {
		margin: 0;
		font-family: var(--display-font);
		font-size: 3.2rem;
		font-weight: 500;
		line-height: 0.9;
		text-transform: uppercase;
	}

	.intro-card p {
		margin: 0;
		color: rgba(245, 245, 245, 0.78);
		line-height: 1.45;
	}

	.intro-card strong {
		color: #ff1010;
	}

	.timeline-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.timeline-section {
		display: grid;
		align-content: start;
		gap: 0.4rem;
	}

	.timeline-label {
		font-size: 1.35rem;
		font-weight: 950;
		color: #ff1010;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1;
	}

	.timeline {
		display: grid;
		align-content: start;
		gap: 0.7rem;
	}

	.timeline div {
		position: relative;
		display: grid;
		gap: 0.15rem;
		min-width: 0;
		padding-left: 0.8rem;
	}

	.timeline div::before {
		position: absolute;
		left: 0;
		top: 0.45rem;
		width: 0.45rem;
		aspect-ratio: 1;
		content: '';
		background: #ff1010;
		border-radius: 50%;
	}

	.tl-period {
		color: rgba(245, 245, 245, 0.9);
		font-size: 1rem;
		font-weight: 600;
	}

	.tl-title {
		color: #ff1010;
		font-size: 0.9rem;
	}

	.tl-detail {
		color: rgba(245, 245, 245, 0.7);
		font-size: 0.9rem;
	}

	.contact-info {
		display: grid;
		gap: 0.4rem;
	}

	.contact-heading {
		font-size: 0.72rem;
		font-weight: 950;
		color: #ff1010;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.contact-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.contact-row a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.55rem;
		color: rgba(245, 245, 245, 0.7);
		border: 1px solid rgba(255, 16, 16, 0.7);
		border-radius: 7px;
		text-decoration: none;
		font-size: 0.8rem;
		transition: background 0.15s, color 0.15s;
	}

	.contact-row a:hover {
		background: rgba(255, 16, 16, 0.18);
		color: #f5f5f5;
	}

	.contact-row a :global(svg) {
		flex: 0 0 auto;
	}

	.cv-panel {
		display: grid;
		gap: 0.8rem;
		grid-column: 1 / -1;
	}

	.toc-card {
		display: grid;
		grid-template-columns: 3rem minmax(0, 0.8fr) minmax(12rem, 1fr);
		align-items: center;
		gap: clamp(0.8rem, 2vw, 1.4rem);
		row-gap: 1rem;
		min-height: 5.8rem;
		padding: clamp(0.9rem, 1.8vw, 1.25rem);
		background: rgba(12, 10, 11, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 16px 8px 16px 8px;
		animation: rise 640ms ease both;
		animation-delay: var(--delay);
		transition:
			border-color 180ms ease,
			background 180ms ease,
			transform 180ms ease,
			box-shadow 180ms ease;
	}

	.toc-card:hover {
		background: rgba(255, 16, 16, 0.16);
		border-color: rgba(255, 16, 16, 0.46);
		transform: translateY(-3px) scale(1.012);
		box-shadow: 0 0.6rem 1.4rem rgba(255, 16, 16, 0.15);
	}

	.toc-card span {
		color: #ff1010;
		font-weight: 950;
	}

	.toc-card h2 {
		margin: 0 0 0.4em 0;
		font-size: 1.35rem;
		line-height: 1.5;
		letter-spacing: 0.022em;
	}

	.toc-card p {
		margin: 0;
		color: rgba(255, 255, 255, 0.64);
		line-height: 1.45;
	}

	.skills-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		align-items: start;
	}

	.skills-row .skill-group {
		display: grid;
		gap: 0.25rem;
		flex: 1;
		min-width: 14rem;
		align-content: start;
	}

	.skill-group-label {
		font-size: 0.72rem;
		font-weight: 950;
		color: #ff1010;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.skill-tag {
		padding: 0.3rem 0.55rem;
		font-size: 0.78rem;
		font-weight: 900;
		color: #f5f5f5;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
	}

	@keyframes letter-pop {
		from { opacity: 0; filter: blur(12px); }
		to { opacity: 1; filter: blur(0); }
	}

	@keyframes ornament-in {
		from { opacity: 0; transform: scale(0) rotate(-90deg); }
		to { opacity: 1; transform: scale(1) rotate(0deg); }
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(18px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 1400px) {
		h1 {
			font-size: 8.6rem;
		}
	}

	@media (max-width: 980px) {
		.hero-grid {
			grid-template-columns: 1fr;
			align-items: start;
		}

		.skills-row {
			flex-direction: column;
		}
	}

	@media (max-width: 660px) {
		.hero {
			--hero-pad: 0.8rem;
			--hero-nav-space: 3.2rem;
			min-height: auto;
		}

		.hero-grid {
			gap: 1.2rem;
			padding-block: 1.6rem 1rem;
		}

		.cover-banner {
			width: calc(100% + (var(--hero-pad) * 2));
			min-height: clamp(15rem, 62vw, 20rem);
			margin: calc(var(--hero-pad) * -1) calc(var(--hero-pad) * -1) 1.4rem;
			padding: 2.8rem 0.75rem 1.4rem;
			overflow: hidden;
		}

		.cover-banner::before {
			right: -4rem;
			top: 3rem;
			width: 14rem;
			height: 14rem;
			filter: blur(1.1rem);
			opacity: 0.48;
		}

		.cover-banner::after {
			left: -3.5rem;
			bottom: 0.4rem;
			width: 12rem;
			height: 8rem;
			opacity: 0.72;
		}

		.portfolio-word {
			font-size: clamp(3.2rem, 21vw, 5.5rem);
			line-height: 0.76;
		}

		h1 {
			max-width: 14ch;
			font-size: clamp(2.75rem, 12.8vw, 3.35rem);
			line-height: 0.92;
		}

		.intro p {
			font-size: 1.05rem;
		}

		.intro-card {
			border-radius: 18px 8px 18px 8px;
		}

		.intro-card h2 {
			font-size: clamp(2.4rem, 13vw, 3rem);
		}

		.contact-row {
			display: grid;
			grid-template-columns: 1fr;
		}

		.contact-row a {
			justify-content: start;
			min-width: 0;
		}

		.toc-card {
			grid-template-columns: 2rem minmax(0, 1fr);
			min-height: auto;
		}

		.toc-card p {
			grid-column: 2;
		}

		.timeline-split {
			grid-template-columns: 1fr;
		}

		.toc-card h2 {
			font-size: 1.05rem;
		}
	}

	@media (max-width: 420px) {
		.portfolio-word {
			font-size: clamp(2.8rem, 22vw, 4.6rem);
		}

		h1 {
			max-width: 13ch;
			font-size: clamp(2.45rem, 12vw, 2.95rem);
		}

		.cta {
			width: 100%;
		}
	}
</style>
