import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;

const el = wp.element.createElement;
const { registerBlockType } = wp.blocks;

const { compose } = wp.element;

const { Fragment } = wp.element;

const {
	RichText,
	BlockControls,
	BlockFormatControls,
	AlignmentToolbar,
	InnerBlocks,
	MediaUpload,
	InspectorControls,
	PanelColor,
	PanelColorSettings,
	withColors
} = wp.editor;

const {
	PanelBody,
	PanelRow,
	Button,
	RangeControl,
	Dashicon,
	Tooltip,
	ToggleControl,
	ColorPicker
} = wp.components;

const { withState } = wp.compose;

registerBlockType("csismag-blocks/text-overlay", {
	title: "Text Overlay",

	icon: "format-image",

	category: "layout",

	keywords: [
		__("Overlay", "csismag-blocks"),
		__("Photo section", "csismag-blocks"),
		__("Scroll", "csismag-blocks"),
		__("Background Image", "csismag-blocks")
	],

	description: __("Add text that scrolls over a large image."),

	attributes: {
		dimRatio: {
			type: "number",
			default: 50
		},
		overlayColor: {
			type: "string",
			default: "white"
		},
		textColor: {
			type: "boolean",
			default: false
		},
		mediaURL: {
			type: "string",
			default: "http://placehold.it/500"
		},
		align: {
			type: "string",
			default: "full"
		},
		textAlign: {
			type: "boolean",
			default: false
		},
		caption: {
			type: "html",
			selector: "p"
		}
	},

	supports: {
		align: ["full"]
	},

	edit: function (props) {
		const { attributes } = props.attributes;
		const {
			caption,
			dimRatio,
			overlayColor,
			mediaURL,
			textAlign,
			alignment,
			textColor
		} = props.attributes;

		function onChangeCaption(newChangeCaption) {
			props.setAttributes({ caption: newChangeCaption });
		}
		function setOverlayColor(newBackgroundColor) {
			props.setAttributes({ overlayColor: newBackgroundColor });
		}
		function onChangeAlignment(newAlignment) {
			props.setAttributes({ alignment: newAlignment });
		}

		function setDimRatio(newDimRatio) {
			props.setAttributes({ dimRatio: newDimRatio });
			//setDimClass(dimRatio);
			//console.log();
		}

		function setDimClass(ratio) {
			return ratio === 0 || ratio === 50
				? null
				: "has-background-dim-" + 10 * Math.round(ratio / 10);
		}

		function onImageSelect(imageObject) {
			props.setAttributes({
				mediaURL: imageObject.url
			});
		}

		function classes(ratio) {
			let dimratioclass = setDimClass(ratio);
			let dimarray = ["text-overlay__overlay", dimratioclass];
			let classString = dimarray.join(" ");
			//console.log(classString);
			return classString;
		}
		function checktextAlign(textAlign) {
			if (textAlign === true) {
				return "text-align__right";
			} else {
				return "text-align__left";
			}
		}

		const setTextAlign = () => props.setAttributes({ textAlign: !textAlign });

		function checktextColor(textColor) {
			if (textColor === true) {
				return "text-color__light";
			} else {
				return "text-color__dark";
			}
		}

		return [
			// Block Controls
			<Fragment>
				<BlockControls>
					<Tooltip text={__("Thick Border", "jsforwpblocks")}>
						<MediaUpload
							onSelect={onImageSelect}
							type="image"
							value={mediaURL}
							render={({ open }) => (
								<Button onClick={open}>Upload Image!</Button>
							)}
						/>
					</Tooltip>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__("Text Overlay Settings")}>
						<PanelRow>
							{" "}
							<ToggleControl
								label={__("Text on Right")}
								checked={textAlign}
								onChange={() => props.setAttributes({ textAlign: !textAlign })}
							/>
						</PanelRow>

						<PanelRow>
							<ColorPicker
								color={overlayColor}
								onChangeComplete={value => setOverlayColor(value.hex)}
								disableAlpha
							/>
						</PanelRow>

						<RangeControl
							label={__("Background Opacity")}
							value={dimRatio}
							onChange={setDimRatio}
							min={0}
							max={100}
							step={10}
						/>
						<PanelRow>
							{" "}
							<ToggleControl
								label={__("Invert Text Color")}
								checked={textColor}
								onChange={() => props.setAttributes({ textColor: !textColor })}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className={("text-overlay", "alignfull")}>
					<div
						class="text-overlay__container"
						style={{
							backgroundImage: `url(${mediaURL})`,
							backgroundSize: "cover",
							backgroundPosition: "center"
						}}
					>
						<div
							className={[
								"text-overlay__text",
								checktextAlign(textAlign),
								checktextColor(textColor)
							].join(" ")}
						>
							<div
								className={classes(dimRatio)}
								style={{ backgroundColor: overlayColor }}
							/>
							<InnerBlocks allowedBlocks={["core/paragraph", "core/heading"]} />
						</div>
					</div>

					<RichText
						tagName="figcaption"
						placeholder={__("Caption", "csismag-blocks")}
						onChange={onChangeCaption}
						value={caption}
					/>
				</div>
			</Fragment>
		];
	},

	save: ({ attributes }) => {
		const {
			caption,
			dimRatio,
			overlayColor,
			mediaURL,
			textAlign,
			alignment
		} = attributes;
		const dimClass = classes(attributes.dimRatio);
		const textAlignCheck = checkTextAlign(attributes.textAlign);
		const textColorCheck = checkTextColor(attributes.textColor);

		function checkTextAlign(textAlign) {
			let check = "text-align__noidea";
			if (textAlign === true) {
				check = "text-align__right";
			} else {
				check = "text-align__left";
			}
			return check;
		}

		function checkTextColor(textColor) {
			if (textColor === true) {
				return "text-color__light";
			} else {
				return "text-color__dark";
			}
		}

		function classes(ratio) {
			let dimratioclass = setDimClass(ratio);
			let dimarray = ["text-overlay__overlay", dimratioclass];
			let classString = dimarray.join(" ");
			//console.log(classString);
			return classString;
		}

		function setDimClass(ratio) {
			return ratio === 0 || ratio === 50
				? null
				: "has-background-dim-" + 10 * Math.round(ratio / 10);
		}

		return (
			<div className={("text-overlay", "alignfull")}>
				<div
					class="text-overlay__container"
					style={{ backgroundImage: `url(${mediaURL})` }}
				>
					<div
						className={[
							"text-overlay__text",
							textAlignCheck,
							textColorCheck
						].join(" ")}
					>
						<div
							className={dimClass}
							style={{ backgroundColor: attributes.overlayColor }}
						/>
						<div class="text-overlay__content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
				<div className={"text-overlay__print"}>
					<img src={mediaURL} alt="" aria-hidden="true" />
				</div>
				<RichText.Content tagName="figcaption" value={attributes.caption} />
			</div>
		);
	}
});
