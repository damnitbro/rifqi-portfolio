export type Skill = {
	label: string;
	value: string;
};

export type TimelineItem = {
	period: string;
	title: string;
	detail: string;
	type?: 'education' | 'experience';
};

export type PaletteColor = {
	name: string;
	value: string;
};

export type AppBadge = {
	name: string;
	icon: string;
};

export type VideoProject = {
	title: string;
	role: string;
	src: string;
	poster?: string;
	startAt?: number;
	endAt?: number;
	accent: string;
};

export type SocialPost = {
	title: string;
	meta: string;
	caption: string;
	accent: string;
	src?: string;
};

export type ProjectAsset = {
	title: string;
	src: string;
	type: 'image' | 'video';
	meta: string;
	startAt?: number;
	endAt?: number;
	ratio?: 'wide' | 'square' | 'portrait' | 'poster' | 'tall' | 'auto';
	aspect?: string;
	poster?: boolean;
};

export type ProjectGroup = {
	kind: 'priority' | 'personal';
	title: string;
	description: string;
	layout?: 'showcase' | 'soca-showcase' | 'personal-3d' | 'poster-wall' | 'logo-system' | 'motion-layout';
	assets: ProjectAsset[];
};

export type ExperienceSection = {
	id: string;
	kicker: string;
	title: string;
	description: string;
	apps: AppBadge[];
	accent: string;
	groups: ProjectGroup[];
	metrics?: { label: string; value: string }[];
};

export const appBadges = {
	afterEffects: { name: 'After Effects', icon: '/media/work/apps/after-effect.webp' },
	blender: { name: 'Blender', icon: '/media/work/apps/blender.webp' },
	davinci: { name: 'DaVinci Resolve', icon: '/media/work/apps/davinci.webp' },
	figma: { name: 'Figma', icon: '/media/work/apps/figma.webp' },
	finalCut: { name: 'Final Cut Pro', icon: '/media/work/apps/final-cut-pro.webp' },
	photoshop: { name: 'Photoshop', icon: '/media/work/apps/photoshop.webp' },
	premiere: { name: 'Premiere Pro', icon: '/media/work/apps/premiere-pro.webp' }
} satisfies Record<string, AppBadge>;

export const identity = {
	name: 'Muhammad Rifqi Adiantama',
	location: 'Jakarta, Indonesia',
	tagline: 'Interactive CV for 3D art, editing, motion, and visual systems.',
	availability: 'Open for freelance and studio collaborations',
	email: 'rifqiadiantama@gmail.com',
	instagram: 'marvs_qx',
	phone: '082114914404'
};

export const cvTimeline: TimelineItem[] = [
	{
		period: '2017 - 2020',
		title: 'Media Informatika Vocational',
		detail: 'Software Engineering',
		type: 'education'
	},
	{
		period: '2020 - Present',
		title: 'Budi Luhur University',
		detail: 'Visual Communication and Design',
		type: 'education'
	},
	{
		period: '2023 (6 Months)',
		title: 'SOCA AI',
		detail: '3D Artist Intern',
		type: 'experience'
	},
	{
		period: '2024 - 2025',
		title: 'Gibran Pro Home Jaya Indonesia',
		detail: 'Video Editing and Motion Graphics',
		type: 'experience'
	},
	{
		period: '2026 (3 Months)',
		title: 'Kementrian Kesehatan RI',
		detail: 'Social Media Designer',
		type: 'experience'
	}
];

export const brandPalette = [
	{ name: 'Black Obsidian', value: '#080808' },
	{ name: 'Ivory White', value: '#f5f5f5' },
	{ name: 'Crimson Red', value: '#8b0000' },
	{ name: 'Ash Gray', value: '#6e6e6e' },
	{ name: 'Muted Gold', value: '#c2a96a' }
];

export const skills: Skill[] = [
	{ label: '3D Artist', value: 'Model previews, look-dev, cinematic presentation' },
	{ label: 'Video Editor', value: 'Short-form cuts, pacing, social-first reels' },
	{ label: 'Graphic Design', value: 'Campaign posts, motion assets, and social visual systems' },
	{ label: 'Contact', value: 'Email, Instagram, and WhatsApp details for collaboration' }
];

export const personalSkills: Skill[] = [
	{ label: 'Creative Direction', value: 'Mood, visual hierarchy, and presentation choices' },
	{ label: 'Technical Workflow', value: '3D, editing, motion, and design pipeline awareness' },
	{ label: 'Detail Craft', value: 'Composition, timing, typography, and polish' },
	{ label: 'English', value: 'Comfortable communicating project ideas and visual direction' }
];

export const softSkills: Skill[] = [
	{ label: 'Communication', value: 'Clear handoff, feedback handling, and progress updates' },
	{ label: 'Adaptability', value: 'Comfortable moving between formats, tools, and project needs' },
	{ label: 'Consistency', value: 'Reliable iteration, organized files, and focused follow-through' }
];

export const videoProjects: VideoProject[] = [
	{
		title: 'Real Estate Editing Reel',
		role: 'Video Editor',
		src: '/media/work/video-editor/real-estate-5.mp4',
		poster: '/media/editorial-reel.svg',
		// Backend-only clip timing: change these seconds to control the loop.
		startAt: 0,
		endAt: 12,
		accent: '#ff1010'
	}
];

export const socialColumns: SocialPost[][] = [
	[
		{
			title: 'Creature Lookdev',
			meta: '3D render set',
			caption: 'Turntable, materials, and lighting pass.',
			accent: '#8b0000',
			src: '/media/work/3d-personal/soca-witch-sovia1.webp'
		},
		{
			title: 'Idul Adha Flyer',
			meta: 'Kemenkes post',
			caption: 'Square social graphic for public-health content.',
			accent: '#c2a96a',
			src: '/media/work/graphic-motion/flyer-idul-adha-1447-h.webp'
		},
		{
			title: 'Hard Surface Study',
			meta: 'modeling',
			caption: 'Mechanical details and product lighting.',
			accent: '#6e6e6e',
			src: '/media/work/3d-personal/3d-chamber.webp'
		}
	],
	[
		{
			title: 'Short Reel Edit',
			meta: 'social cut',
			caption: 'Fast pacing, captions, and beat sync.',
			accent: '#c2a96a',
			src: '/media/work/graphic-motion/frame-3.webp'
		},
		{
			title: 'Logo Exploration',
			meta: 'brand layout',
			caption: 'Custom monogram with motion-ready lockups.',
			accent: '#8b0000',
			src: '/media/work/personal-logo/personal-logo.webp'
		},
		{
			title: 'Product Teaser',
			meta: 'video edit',
			caption: 'Clean transitions for campaign launch.',
			accent: '#6e6e6e',
			src: '/media/work/graphic-motion/magazine-1.webp'
		}
	],
	[
		{
			title: 'Abstract Loop',
			meta: 'motion',
			caption: 'Generative shapes built for a looping screen.',
			accent: '#c2a96a',
			src: '/media/work/graphic-motion/saturn-1.webp'
		},
		{
			title: 'Scene Breakdown',
			meta: '3D workflow',
			caption: 'Clay render to final composited shot.',
			accent: '#8b0000',
			src: '/media/work/3d-personal/3DLabPersonal.jpeg'
		},
		{
			title: 'IG Carousel',
			meta: 'campaign',
			caption: 'Vertical post sequence for portfolio drops.',
			accent: '#6e6e6e',
			src: '/media/work/graphic-motion/flyer-no-tobacco-day.webp'
		}
	]
];

const socaAssets: ProjectAsset[] = [
	{
		title: 'Soca Environment Render',
		src: '/media/work/3d-personal/socastreet.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 16,
		ratio: 'wide'
	},
	{
		title: 'Sovia Pop out',
		src: '/media/work/3d-personal/soca-sovia-box.mp4',
		type: 'video',
		meta: '3D character animation test',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 6,
		ratio: 'portrait'
	},
	{
		title: 'Sovia X Banner',
		src: '/media/work/3d-personal/soca-frame-x-banner-sovia.webp',
		type: 'image',
		meta: '',
		ratio: 'tall',
		aspect: '405 / 1080'
	},
	{
		title: 'Witch Sovia v1',
		src: '/media/work/3d-personal/soca-witch-sovia1.webp',
		type: 'image',
		meta: '',
		ratio: 'portrait',
		aspect: '486 / 852'
	},
	{
		title: 'Witch Sovia v2',
		src: '/media/work/3d-personal/soca-witch-sovia-short-1.webp',
		type: 'image',
		meta: 'short-format render',
		ratio: 'portrait',
		aspect: '487 / 852'
	}
];

const threeDPersonalAssets: ProjectAsset[] = [
	{ title: 'Chess Piece', src: '/media/work/3d-personal/3d-catur.webp', type: 'image', meta: 'Design From Sait Alanyali', ratio: 'wide' },
	{
		title: 'Isometric Room',
		src: '/media/work/3d-personal/3d-chamber.webp',
		type: 'image',
		meta: 'environment render',
		ratio: 'square'
	},
	{ title: 'Isometric Classroom', src: '/media/work/3d-personal/3d-class.webp', type: 'image', meta: '', ratio: 'wide' },
	{ title: 'CG Boost Lab Competition entry', src: '/media/work/3d-personal/3DLabPersonal.jpeg', type: 'image', meta: '', ratio: 'wide' },
	{
		title: 'Personal Letter Animation',
		src: '/media/work/3d-personal/3d-personal-letter.mp4',
		type: 'video',
		meta: 'animated personal piece',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 10,
		ratio: 'wide'
	},
	{
		title: 'Trains',
		src: '/media/work/3d-personal/trains.mov',
		type: 'video',
		meta: '3D train scene',
		ratio: 'wide'
	},
	{
		title: 'Mandiri Booth Front Right',
		src: '/media/work/3d-personal/3d-personal-mbfpng-1.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	},
	{
		title: 'Mandiri Booth Front Left',
		src: '/media/work/3d-personal/3d-personal-mbl.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	},
	{
		title: 'Mandiri Booth Front Low Right',
		src: '/media/work/3d-personal/3d-personal-mbr.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	},
	{
		title: 'Mandiri Booth Right Side',
		src: '/media/work/3d-personal/3d-personal-mbs.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	},
	{
		title: 'Horror Poster for No Smoke Campaign',
		src: '/media/work/3d-personal/3d-personal-posterhorrorfix.webp',
		type: 'image',
		meta: 'poster render',
		ratio: 'poster',
		aspect: '2268 / 3402',
		poster: false
	},
	{
		title: 'Sofa with Lighting Study',
		src: '/media/work/3d-personal/3d-personal-sofa3.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	},
	{
		title: 'University Final Semester Project',
		src: '/media/work/3d-personal/3d-personal-uasfinal3-1.webp',
		type: 'image',
		meta: '',
		ratio: 'wide'
	}
];

const videoEditorAssets: ProjectAsset[] = [
	{
		title: '',
		src: '/media/work/video-editor/real-estate-5.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 90.114,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-1.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 78.829,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-2.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 59.116,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-3.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 59.952,
		ratio: 'portrait'
	},
	{
	title: '',
		src: '/media/work/video-editor/real-estate-4.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 80.803,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-6.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 90.184,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-7.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 89.905,
		ratio: 'portrait'
	},
	{
		title: '',
		src: '/media/work/video-editor/real-estate-8.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 90.068,
		ratio: 'portrait'
	}
];

const graphicMotionAssets: ProjectAsset[] = [
	{
		title: 'Idul Adha Officials',
		src: '/media/work/graphic-motion/flyer-idul-adha-w-officials.webp',
		type: 'image',
		meta: 'priority Kemenkes flyer',
		ratio: 'square'
	},
	{
		title: 'Idul Adha 1447 H',
		src: '/media/work/graphic-motion/flyer-idul-adha-1447-h.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{
		title: 'No Tobacco Day',
		src: '/media/work/graphic-motion/flyer-no-tobacco-day.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{
		title: 'Kemenkes Campaign Frame',
		src: '/media/work/graphic-motion/frame-3.webp',
		type: 'image',
		meta: 'IG layout',
		ratio: 'wide'
	},
	{
		title: 'Hari Kebangkitan Nasional',
		src: '/media/work/graphic-motion/flyer-hari-kebangkitan-nasional.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{
		title: 'Hari Pancasila',
		src: '/media/work/graphic-motion/flyer-hari-pancasila.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{
		title: 'Hari Waisak',
		src: '/media/work/graphic-motion/flyer-hari-waisak.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{
		title: 'Kenaikan Isa Almasih',
		src: '/media/work/graphic-motion/flyer-kenaikan-isa-almasih.webp',
		type: 'image',
		meta: 'Kemenkes flyer'
	},
	{ title: 'IG Post 1', src: '/media/work/graphic-motion/1-1.webp', type: 'image', meta: 'social post' },
	{ title: 'IG Post 2', src: '/media/work/graphic-motion/2-172500810.webp', type: 'image', meta: 'social post' },
	{ title: 'IG Post 3', src: '/media/work/graphic-motion/3-1.webp', type: 'image', meta: 'social post' },
	{ title: 'Minggu 1', src: '/media/work/graphic-motion/minggu-1-1-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 2', src: '/media/work/graphic-motion/minggu-2-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 2-1', src: '/media/work/graphic-motion/minggu-2-1-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 2-13', src: '/media/work/graphic-motion/minggu-2-13-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 2-2', src: '/media/work/graphic-motion/minggu-2-2-2.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 2-21', src: '/media/work/graphic-motion/minggu-2-21-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 3-1', src: '/media/work/graphic-motion/minggu-3-1-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 3-2', src: '/media/work/graphic-motion/minggu-3-2-3.webp', type: 'image', meta: 'content series' },
	{ title: 'Minggu 3-22', src: '/media/work/graphic-motion/minggu-3-22-1.webp', type: 'image', meta: 'content series' },
	{ title: 'Magazine Layout', src: '/media/work/graphic-motion/magazine-1.webp', type: 'image', meta: 'editorial study', ratio: 'poster', poster: true },
	{ title: 'Saturn Poster', src: '/media/work/graphic-motion/saturn-1.webp', type: 'image', meta: 'poster study', ratio: 'poster', poster: true }
];

const kemenkesGraphicAssets = graphicMotionAssets.filter((asset) => asset.src.toLowerCase().includes('flyer'));
const budiluhurCommunityAssets = graphicMotionAssets.filter((asset) => !asset.src.toLowerCase().includes('flyer'));

const personalLogoAssets: ProjectAsset[] = [
	{
		title: 'Fallen Halo Mark',
		src: '/media/work/personal-logo/personal-logo.png',
		type: 'image',
		meta: 'main logo',
		ratio: 'square',
		aspect: '524 / 525'
	},
	{
	title: '',
		src: '/media/work/personal-logo/image-29.webp',
		type: 'image',
		meta: 'brand mockup',
		aspect: '304 / 240'
	},
	{
	title: '',
		src: '/media/work/personal-logo/image-32.webp',
		type: 'image',
		meta: 'brand mockup',
		aspect: '379 / 242'
	},
	{
	title: '',
		src: '/media/work/personal-logo/link-image-31.png',
		type: 'image',
		meta: 'brand mockup',
		aspect: '303 / 228'
	},
	{
	title: '',
		src: '/media/work/personal-logo/image-30.webp',
		type: 'image',
		meta: 'brand mockup',
		aspect: '354 / 237'
	}
];

const motionPersonalAssets: ProjectAsset[] = [
	{
		title: '44th Budiluhur University Anniversary Motion Backdrop',
		src: '/media/work/motion/motion-44-landscape.mp4',
		type: 'video',
		meta: '',
		// Backend-only clip timing: change startAt/endAt to adjust this loop.
		startAt: 0,
		endAt: 12,
		ratio: 'wide'
	},
	{
		title: '44th Budiluhur University Anniversary Motion Instagram Reels',
		src: '/media/work/motion/motion-44-potrait.mp4',
		type: 'video',
		meta: '',
		ratio: 'portrait'
	},
	{
		title: '44th Budiluhur University Anniversary Motion Instagram Post',
		src: '/media/work/motion/motion-44-square.mp4',
		type: 'video',
		meta: '',
		ratio: 'square'
	}
];

export const experienceSections: ExperienceSection[] = [
	{
		id: 'experience-3d',
		kicker: 'Job experience / 3D',
		title: 'Intern 3D Artist',
		description:
			'Character, environment, and presentation work focused on turning static assets into readable digital companions with mood, staging, and production polish.',
		apps: [appBadges.blender, appBadges.davinci, appBadges.afterEffects],
		accent: '#ff1010',
		groups: [
			{
				kind: 'priority',
				title: 'Soca AI / Sovia',
				description:
					'3D internship work: Sovia character renders, turntable-style previews, vertical campaign frames mockups, environment presentation and Icons',
				layout: 'soca-showcase',
				assets: socaAssets
			},
			{
				kind: 'personal',
				title: '3D Personal Project',
				description:
					'Personal 3D scenes and studies exploring environments, objects, mood lighting, posters, and short animated presentation pieces.',
				layout: 'personal-3d',
				assets: threeDPersonalAssets
			}
		]
	},
	{
		id: 'experience-video',
		kicker: 'Job experience / Editing',
		title: 'Video Editor',
		description:
			'Short-form editing for real-estate and lifestyle content, with attention to pacing, clean transitions, social framing, and repeatable campaign output.',
		apps: [appBadges.premiere, appBadges.afterEffects, appBadges.finalCut, appBadges.davinci],
		accent: '#c2a96a',
		metrics: [
			{ label: 'Engagement Rate', value: '60%' },
			{ label: 'YouTube Subscribers', value: '3.5K+' },
			{ label: 'Instagram Followers', value: '300+' }
		],
		groups: [
			{
				kind: 'priority',
				title: 'Real Estate Editing Reel',
				description:
					'Property-focused edits built for fast viewing: clear room flow, rhythmic cuts, and concise visual storytelling for listings and social media.',
				layout: 'showcase',
				assets: videoEditorAssets
			}
		]
	},
	{
		id: 'experience-graphics',
		kicker: 'Job experience / graphics',
		title: 'Graphics Designer',
		description:
			'Social graphics and motion-ready layouts for campaign communication, using strong hierarchy, repeatable templates, and clean visual systems.',
		apps: [appBadges.figma, appBadges.photoshop],
		accent: '#ff1010',
		groups: [
			{
				kind: 'priority',
				title: 'Ministry of Health Social Media Designer',
				description:
					'Health campaign visuals designed for clear public communication, balancing institutional trust, accessible messaging, and consistent social media presentation.',
				layout: 'poster-wall',
				assets: kemenkesGraphicAssets
			},
			{
				kind: 'priority',
				title: 'Budiluhur University Community Social Media Manager',
				description:
					'Community-focused social content for campus activities and student engagement, shaped with adaptable layouts, readable hierarchy, and an energetic visual tone.',
				layout: 'poster-wall',
				assets: budiluhurCommunityAssets
			},
			{
				kind: 'personal',
				title: 'Personal Logo / Fallen Halo',
				description:
					'Flexible visual signature with main logo, mockup applications, black/crimson/gold color system, and typography references.',
				layout: 'logo-system',
				assets: personalLogoAssets
			}
		]
	},
	{
		id: 'experience-motion',
		kicker: 'Job experience / Motion',
		title: 'Motion Designer',
		description:
			'Looping motion assets, event bumpers, and aspect-ratio variations designed for flexible publishing across landscape, portrait, and square formats.',
		apps: [appBadges.afterEffects],
		accent: '#c2a96a',
		groups: [
			{
				kind: 'priority',
				title: '44th Budiluhur University Anniversary Motion',
				description:
					'Motion package exported across landscape, portrait, and square ratios to show adaptable format thinking in celebration of the university\'s anniversary.',
				layout: 'motion-layout',
				assets: motionPersonalAssets
			}
		]
	}
];
