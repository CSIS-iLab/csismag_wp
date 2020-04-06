/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript.
 * You can create a new block folder in
 * this dir and include code for that block
 * here as well.
 *
 * All blocks should be included here since
 * this is the file that Webpack is compiling.
 */

//import "./block/block.js";
//import "./block/block_old.js";
import "./postmeta.js";
import "./testimonialmeta.js";
import "./text-overlay/block.js";
import "./profile/block.js";
import "./dialog/block.js";
import "./authors/block-authorprofile.js";
import "./authors/block.js";
//import "./group-img/block.js";
import "./infocus/block.js";
//import "./header/block.js";
import "./audio/block.js";
import "./dataviz/block.js";
import "./audio/block-audioprofile.js";
import "./themeinfo/block.js";
// adding block
wp.blocks.registerBlockStyle("csismag-blocks/profile", {
	name: "profile-large",
	label: "Large Image"
});

var SourceStyleButton = function (props) {
	return wp.element.createElement(wp.blockEditor.RichTextToolbarButton, {
		icon: "editor-code",
		title: "Source Info Style",
		onClick: function () {
			props.onChange(
				wp.richText.toggleFormat(props.value, {
					type: "csismag-blocks/source-style"
				})
			);
		},
		isActive: props.isActive
	});
};
wp.richText.registerFormatType("csismag-blocks/source-style", {
	title: "Sample output",
	tagName: "span",
	className: "caption__source",
	edit: SourceStyleButton
});

wp.hooks.addFilter("blocks.registerBlockType", "csismag-blocks/namespace", function (
	settings,
	name
) {
	if (name === "core/pullquote") {
		return lodash.assign({}, settings, {
			supports: lodash.assign({}, settings.supports, {
				// disable the align-UI completely ...
				align: ["center", "right"]
				// ... or only allow specific alignments
				// align: ['center,'full'],
			})
		});
	}

	return settings;
});

wp.hooks.addFilter("blocks.registerBlockType", "core/video", function (
	settings,
	name
) {
	if (name === "core/pullquote") {
		return lodash.assign({}, settings, {
			supports: lodash.assign({}, settings.supports, {
				// disable the align-UI completely ...
				align: ["center", "right", "full", "wide"]
				// ... or only allow specific alignments
				// align: ['center,'full'],
			})
		});
	}

	return settings;
});

wp.hooks.addFilter("blocks.registerBlockType", "csismag-blocks/namespace", function (
	settings,
	name
) {
	if (name === "core/audio") {
		return lodash.assign({}, settings, {
			supports: lodash.assign({}, settings.supports, {
				// disable the align-UI completely ...
				align: false
				// ... or only allow specific alignments
				// align: ['center,'full'],
			})
		});
	}

	return settings;
});

wp.hooks.addFilter("blocks.registerBlockType", "csismag-blocks/namespace", function (
	settings,
	name
) {
	if (name === "core/audio") {
		return lodash.assign({}, settings, {
			parent: ["csismag-blocks/audio"]
		});
	}

	return settings;
});

wp.hooks.addFilter("blocks.registerBlockType", "csismag-blocks/namespace", function (
	settings,
	name
) {
	if (name === "core/html") {
		return lodash.assign({}, settings, {
			parent: ["csismag-blocks/dataviz"]
		});
	}

	return settings;
});

wp.domReady(() => {
	wp.blocks.unregisterBlockStyle("core/pullquote", "large");
	wp.blocks.unregisterBlockStyle("core/pullquote", "default");
	wp.blocks.unregisterBlockStyle("core/pullquote", "solid-color");

	wp.blocks.registerBlockStyle("core/pullquote", {
		name: "line",
		label: "Lined Border",
		isDefault: true
	});
});

wp.blocks.registerBlockStyle("core/pullquote", {
	name: "fancy-quote",
	label: "Fancy Quote"
});

wp.blocks.registerBlockStyle("core/pullquote", {
	name: "bold-serif",
	label: "Bold Serif"
});

//removing block style
wp.domReady(function (allowedBlocks) {
	wp.domReady(function () {
		var allowedPostBlocks = [
			"core/paragraph",
			"core/image",
			"core/list",
			"core/pullquote",
			"core/heading",
			"core/audio",
			"core/columns",
			"core/gallery",
			"core/video",
			"core/freeform",
			"core/html",
			"core/spacer",
			"core-embed/vimeo",
			"core-embed/twitter",
			"core-embed/youtube",
			"csismag-blocks/audio",
			"csismag-blocks/authors",
			"csismag-blocks/dataviz",
			"csismag-blocks/dialog",
			"csismag-blocks/focus",
			"csismag-blocks/profile",
			"csismag-blocks/text-overlay",
			"csismag-blocks/audio",
			"csismag-blocks/audio-profile",
			"csismag-blocks/author-profile",
			"csismag-blocks/dialog-name",
			"csismag-blocks/meta-block",
			"core/shortcode"
		];

		wp.domReady(function () {
			var allowedThemeBlocks = [
				"core/paragraph",
				"core/gallery",
				"core/heading",
				"core-embed/youtube",
				"csismag-blocks/themeinfo",
				"core/shortcode",
				"core/image",
				"core/file",
				"core/html",
				"core/spacer",
				"core/columns",
				"core/text-columns",
				"core/column"
			];

			const post_type = wp.data.select("core/editor").getCurrentPostType();

			wp.blocks.getBlockTypes().forEach(function (blockType) {
				//Whitelist Post Block
				if (post_type == "post") {
					if (allowedPostBlocks.indexOf(blockType.name) === -1) {
						wp.blocks.unregisterBlockType(blockType.name);
						//console.log(blockType.name);
					}
				}
				//Whitelist Theme Page
				if (post_type == "page") {
					if (allowedThemeBlocks.indexOf(blockType.name) === -1) {
						wp.blocks.unregisterBlockType(blockType.name);
						console.log(blockType.name);
					}
				}
			});
		});
	});
});
// my-plugin.js
