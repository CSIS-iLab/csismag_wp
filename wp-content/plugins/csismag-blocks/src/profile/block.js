const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;
// Import our CSS files
import "./style.scss";
import "./editor.scss";

registerBlockType("csismag-blocks/profile", {
	title: "Profile",
	icon: "id",
	category: "common",
	keywords: [
		__("Profile", "csismag-blocks"),
		__("Aside", "csismag-blocks"),
		__("Character", "csismag-blocks"),
		__("Location", "csismag-blocks"),
		__("Detail", "csismag-blocks")
	],
	description: __("An aside that describes a person or place."),
	attributes: {
		title: {
			type: "string"
		},
		body: {
			type: "string"
		},
		imageUrl: {
			type: "string"
		},
		align: {
			type: "string",
			default: "right"
		}
	},
	supports: {
		align: ["right"]
	},
	edit({ attributes, className, setAttributes }) {
		const getImageButton = openEvent => {
			if (attributes.imageUrl) {
				return (
					<img
						src={attributes.imageUrl}
						onClick={openEvent}
						className="component__imgcircle"
					/>
				);
			} else {
				return (
					<div className="button-container">
						<Button onClick={openEvent} className="button button-large">
							Pick an image
						</Button>
					</div>
				);
			}
		};

		return (
			<div className={"profile__container"}>
				<MediaUpload
					onSelect={media => {
						setAttributes({ imageUrl: media.url });
					}}
					type="image"
					value={attributes.imageID}
					render={({ open }) => getImageButton(open)}
				/>
				<div className={("profile__title", "small-title")}>
					<PlainText
						onChange={content => setAttributes({ title: content })}
						value={attributes.title}
						placeholder="Your card title"
					/>
				</div>
				<div className="component__caption">
					<RichText
						tagName="figcaption"
						onChange={content => setAttributes({ body: content })}
						value={attributes.body}
						placeholder="Your card text"
						formattingControls={["bold", "italic", "underline"]}
						isSelected={attributes.isSelected}
					/>
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { title, body, imageUrl } = attributes;
		const cardImage = src => {
			if (!src) return null;

			// No alt set, so let's hide it from screen readers
			return (
				<div className="component__imgcircle">
					<img src={src} alt={title} aria-hidden="true" />
				</div>
			);
		};

		return (
			<div className={"small"}>
				<div className={"profile__container"}>
					{cardImage(attributes.imageUrl)}
					<div className="profile__content">
						<div
							className={("profile__title", "component__title", "small-title")}
						>
							{attributes.title}
						</div>

						<RichText.Content
							tagName="figcaption"
							className="component__caption"
							value={attributes.body}
						/>
					</div>
				</div>
			</div>
		);
	}
});
