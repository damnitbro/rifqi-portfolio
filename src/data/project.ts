export type ProjectMedia = {
	src: string;
	alt: string;
	type: 'image' | 'video';
	orientation?: 'landscape' | 'portrait' | 'square';
};

export type ProjectSection = {
	title: string;
	body: string;
	items?: string[];
};

export type Project = {
	title: string;
	shortTitle: string;
	category: string;
	slug: string;
	description: string;
	disciplines: string[];
	organization: string;
	role: string;
	year: string;
	cover: ProjectMedia;
	media: ProjectMedia[];
	overview: string;
	sections: ProjectSection[];
	deliverables: string[];
	reflection: string;
	accent: string;
};

export const projects: Project[] = [
	{
		title: 'Ministry of Health Campaign Design',
		shortTitle: 'Ministry of Health',
		category: 'Campaign Design',
		slug: 'kemenkes',
		description:
			'Public-information campaign graphics designed for social platforms within an established institutional identity.',
		disciplines: ['Campaign Design', 'Social Media', 'Visual Systems'],
		organization: 'Ministry of Health, Indonesia',
		role: 'Social Media Designer Intern',
		year: '2026',
		cover: {
			src: '/media/work/graphic-motion/flyer-idul-adha-w-officials.webp',
			alt: 'Ministry of Health Idul Adha campaign artwork',
			type: 'image',
			orientation: 'square'
		},
		media: [
			{
				src: '/media/work/graphic-motion/flyer-idul-adha-1447-h.webp',
				alt: 'Idul Adha 1447 H social media design',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/graphic-motion/flyer-no-tobacco-day.webp',
				alt: 'World No Tobacco Day campaign design',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/graphic-motion/flyer-hari-pancasila.webp',
				alt: 'Pancasila Day social media design',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/graphic-motion/flyer-hari-kebangkitan-nasional.webp',
				alt: 'National Awakening Day social media design',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/graphic-motion/flyer-hari-waisak.webp',
				alt: 'Vesak Day social media design',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/graphic-motion/flyer-kenaikan-isa-almasih.webp',
				alt: 'Ascension Day social media design',
				type: 'image',
				orientation: 'square'
			}
		],
		overview:
			'A series of campaign assets for public-facing social channels. The work needed to make each message immediately readable while respecting official visual and communication requirements.',
		sections: [
			{
				title: 'The challenge',
				body: 'Institutional campaign graphics carry several layers at once: the main message, event context, required identity elements, and supporting information. The design task was to keep that material clear without making the posts feel rigid or overloaded.'
			},
			{
				title: 'My role',
				body: 'I developed social-media layouts and final visual assets as part of a social media design internship.',
				items: [
					'Established hierarchy for headlines, imagery, and supporting copy',
					'Adapted layouts to the Ministry of Health visual context',
					'Prepared polished campaign graphics for digital publishing'
				]
			},
			{
				title: 'Design approach',
				body: 'Each composition uses a strong focal image, compact typography, and controlled spacing. Repeated alignment and framing choices help the posts feel related while leaving room for the subject of each commemoration.'
			}
		],
		deliverables: [
			'Square social-media campaign graphics',
			'Commemorative and public-information posts',
			'Platform-ready digital exports'
		],
		reflection:
			'This project strengthened my ability to work inside an existing identity and make dense communication feel approachable. The clearest results came from reducing visual competition and giving one message priority in every layout.',
		accent: '#ef3b2d'
	},
	{
		title: 'SOCA 3D Visual Development',
		shortTitle: 'SOCA / Sovia',
		category: '3D Visual Development',
		slug: 'soca',
		description:
			'Character, environment, and campaign-oriented 3D assets developed to create a consistent visual presence for SOCA.',
		disciplines: ['3D Design', 'Character Art', 'Campaign Assets'],
		organization: 'SOCA AI',
		role: '3D Artist Intern',
		year: '2023',
		cover: {
			src: '/media/work/3d-personal/soca-witch-sovia1.webp',
			alt: 'Sovia 3D character render',
			type: 'image',
			orientation: 'portrait'
		},
		media: [
			{
				src: '/media/work/3d-personal/socastreet.mp4',
				alt: 'SOCA 3D environment animation',
				type: 'video',
				orientation: 'landscape'
			},
			{
				src: '/media/work/3d-personal/soca-sovia-box.mp4',
				alt: 'Sovia 3D character animation',
				type: 'video',
				orientation: 'portrait'
			},
			{
				src: '/media/work/3d-personal/soca-frame-x-banner-sovia.webp',
				alt: 'Sovia character campaign banner',
				type: 'image',
				orientation: 'portrait'
			},
			{
				src: '/media/work/3d-personal/soca-witch-sovia-short-1.webp',
				alt: 'Alternate Sovia 3D character render',
				type: 'image',
				orientation: 'portrait'
			}
		],
		overview:
			'Visual development for SOCA centered on Sovia, a digital character presented across rendered scenes, short motion tests, and campaign applications.',
		sections: [
			{
				title: 'The challenge',
				body: 'A character asset needs to remain recognizable across different cameras, lighting conditions, aspect ratios, and levels of motion. The work had to feel coherent whether it appeared as a standalone render or inside a promotional layout.'
			},
			{
				title: 'My role',
				body: 'I contributed 3D staging, rendering, animation tests, and presentation assets during a six-month 3D artist internship.',
				items: [
					'Developed character-focused render compositions',
					'Built environment and presentation scenes',
					'Adapted 3D output for vertical campaign formats'
				]
			},
			{
				title: 'Visual system',
				body: 'Consistent camera language, dramatic color contrast, and repeatable presentation frames allowed the character to move between environment shots and promotional assets without losing identity.'
			}
		],
		deliverables: [
			'Character renders and presentation frames',
			'Short 3D animation tests',
			'Environment visualization',
			'Vertical campaign applications'
		],
		reflection:
			'The project showed me that strong 3D work extends beyond a single final render. Reusable cameras, lighting choices, and presentation formats make an asset more useful to a wider campaign.',
		accent: '#8b5cf6'
	},
	{
		title: 'Real-Estate Content System',
		shortTitle: 'Real-Estate Content',
		category: 'Video & Motion',
		slug: 'real-estate',
		description:
			'A repeatable editing approach for presenting property information through short-form and long-form video.',
		disciplines: ['Video Editing', 'Motion Graphics', 'Social Content'],
		organization: 'Gibran Pro Home Jaya Indonesia',
		role: 'Video Editor & Motion Graphics',
		year: '2024 - 2025',
		cover: {
			src: '/media/work/video-editor/real-estate-5.mp4',
			alt: 'Real-estate short-form video edit',
			type: 'video',
			orientation: 'portrait'
		},
		media: [
			{
				src: '/media/work/video-editor/real-estate-6.mp4',
				alt: 'Vertical property tour edit',
				type: 'video',
				orientation: 'portrait'
			},
			{
				src: '/media/work/video-editor/real-estate-2.mp4',
				alt: 'Short-form real-estate social video',
				type: 'video',
				orientation: 'portrait'
			},
			{
				src: '/media/work/video-editor/real-estate-7.mp4',
				alt: 'Property marketing video',
				type: 'video',
				orientation: 'portrait'
			},
			{
				src: '/media/work/video-editor/real-estate-8.mp4',
				alt: 'Real-estate listing video edit',
				type: 'video',
				orientation: 'portrait'
			}
		],
		overview:
			'An ongoing video-production workflow for property marketing. The editing system balanced clear information, room-by-room storytelling, and the fast pace expected on social platforms.',
		sections: [
			{
				title: 'The challenge',
				body: 'Property footage can become repetitive quickly, while every listing still needs its location, features, and atmosphere to be understood. The system had to support frequent output without making each edit feel identical.'
			},
			{
				title: 'My role',
				body: 'I edited short-form property videos and longer walkthrough content, adding motion graphics where they helped viewers follow the information.',
				items: [
					'Organized footage into a clear viewing sequence',
					'Built rhythmic cuts for vertical social formats',
					'Created reusable title and information treatments',
					'Prepared edits for short-form and long-form publishing'
				]
			},
			{
				title: 'Editing approach',
				body: 'The edits establish context first, move through the property in a readable order, and use concise graphic moments for details that footage alone cannot communicate. Reusable treatments keep production efficient while pacing and shot selection give each listing its own character.'
			}
		],
		deliverables: [
			'Vertical short-form property videos',
			'Long-form property walkthrough edits',
			'Reusable titles and information graphics',
			'Social-platform video exports'
		],
		reflection:
			'This work sharpened my sense of pacing and repeatable production. A useful content system needs enough structure to be efficient and enough flexibility to respond to different footage, spaces, and selling points.',
		accent: '#d6a84b'
	},
	{
		title: 'Personal 3D Project',
		shortTitle: 'Personal 3D Studies',
		category: '3D Art',
		slug: 'personal-3d',
		description:
			'A selected set of self-directed scenes exploring composition, materials, lighting, and visual storytelling.',
		disciplines: ['3D Art', 'Lighting', 'Visual Development'],
		organization: 'Self-initiated',
		role: '3D Artist',
		year: 'Ongoing',
		cover: {
			src: '/media/work/3d-personal/Lab.jpeg',
			alt: 'Atmospheric 3D laboratory environment',
			type: 'image',
			orientation: 'landscape'
		},
		media: [
			{
				src: '/media/work/3d-personal/3d-chamber.webp',
				alt: 'Isometric 3D chamber render',
				type: 'image',
				orientation: 'square'
			},
			{
				src: '/media/work/3d-personal/3d-personal-sofa3.webp',
				alt: 'Sofa and interior lighting study',
				type: 'image',
				orientation: 'landscape'
			},
			{
				src: '/media/work/3d-personal/3d-personal-uasfinal3-1.webp',
				alt: 'Cinematic 3D environment render',
				type: 'image',
				orientation: 'landscape'
			},
			{
				src: '/media/work/3d-personal/3d-catur.webp',
				alt: '3D chess set lighting study',
				type: 'image',
				orientation: 'landscape'
			},
			{
				src: '/media/work/3d-personal/3d-personal-letter.mp4',
				alt: 'Animated personal 3D letter study',
				type: 'video',
				orientation: 'landscape'
			},
			{
				src: '/media/work/3d-personal/3d-personal-posterhorrorfix.webp',
				alt: 'Horror-inspired no smoking 3D poster',
				type: 'image',
				orientation: 'portrait'
			}
		],
		overview:
			'Self-directed work gives me space to test visual ideas outside client constraints. These selected studies focus on atmosphere, readable composition, material response, and the storytelling potential of light.',
		sections: [
			{
				title: 'The objective',
				body: 'Each study begins with one visual question: how a room can feel cinematic, how an object can carry mood, or how lighting can guide attention through a frame.'
			},
			{
				title: 'My process',
				body: 'I move from reference gathering and blockout into materials, lighting, camera refinement, and final presentation.',
				items: [
					'Collect references around mood, architecture, and light',
					'Block the composition before adding detail',
					'Test materials under the intended lighting setup',
					'Refine camera, contrast, and final color'
				]
			},
			{
				title: 'Selection',
				body: 'The work shown here is intentionally edited down to projects that demonstrate a distinct atmosphere or technical focus rather than presenting every exercise.'
			}
		],
		deliverables: [
			'Environment and object renders',
			'Lighting and material studies',
			'Short animated presentation pieces',
			'Poster-oriented 3D artwork'
		],
		reflection:
			'Personal work is where I can be most deliberate about visual standards. My next step is to document more intermediate stages so the development from blockout to final frame is as clear as the finished image.',
		accent: '#4fb7a8'
	}
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
