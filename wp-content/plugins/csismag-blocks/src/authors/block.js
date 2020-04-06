const {
	RichText,
	MediaUpload,
	PlainText,
	InnerBlocks
} = wp.editor;
const {
	registerBlockType
} = wp.blocks;
const {
	Button
} = wp.components;
const {
	__
} = wp.i18n;

// Import our CSS files
import "./style.scss";
import "./editor.scss";

registerBlockType("csismag-blocks/authors", {
	title: "Author",
	icon: "groups",
	category: "common",
	keywords: [
		__("Authors", "csismag-blocks"),
		__("Students", "csismag-blocks"),
		__("Writers", "csismag-blocks"),
		__("Contributors", "csismag-blocks")
	],
	description: __(
		"Add a list of author bios at the end of the post.",
		"csismag-blocks"
	),
	attributes: {
		body: {
			type: "string"
		}
	},
	edit({
		attributes,
		className,
		setAttributes
	}) {
		return (<
			div className="author__container" >
			<
			h2 > Authors < /h2> <
					InnerBlocks allowedBlocks={
						["csismag-blocks/author-profile", "core/video"]
					}
					template={
						TEMPLATEA
					}
				/> < /
			div >
		);
	},

	save: ({
					attributes
				}) => {
		return ( <
			div className="author__container" >
					<
			h2 > Authors < /h2> <
							InnerBlocks.Content />
						<
			/div>
		);
	}
});

const TEMPLATEA = [
	["core/video", {},
		[]
	],
	["csismag-blocks/author-profile", {},
		[]
	]
];
