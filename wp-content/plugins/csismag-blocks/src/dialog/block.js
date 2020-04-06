const { RichText, MediaUpload, PlainText, InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;
// Import our CSS files
import "./style.scss";
import "./editor.scss";

registerBlockType("csismag-blocks/dialog", {
  title: "Dialog",
  icon: "format-chat",
  category: "common",
  keywords: [
    __("Dialog", "csismag-blocks"),
    __("Interview", "csismag-blocks"),
    __("Conversation", "csismag-blocks"),
    __("Excerpt", "csismag-blocks"),
    __("Transcript", "csismag-blocks"),
    __("Quote", "csismag-blocks")
  ],
  description: __(
    "Add a block for long quotes, excerpts, interviews, transcripts, or dialog.",
    "csismag-blocks"
  ),
  attributes: {
    caption: {
      type: "string"
    },
    align: {
      type: "string",
      default: "center"
    }
  },
  supports: {
    align: ["left", "right", "center"]
  },
  edit({ attributes, className, setAttributes }) {
    return (
      <div className="dialog__container">
        <div class="dialog__content">
          <InnerBlocks allowedBlocks={["core/paragraph"]} />
        </div>

        <RichText
          tagName="figcaption"
          onChange={caption => setAttributes({ caption: caption })}
          value={attributes.caption}
          placeholder="Dialog Caption"
          formattingControls={["bold", "italic", "underline"]}
          isSelected={attributes.isSelected}
        />
      </div>
    );
  },

  save({ attributes }) {
    return (
      <div className="dialog__container">
        <div class="dialog__content">
          <InnerBlocks.Content />
        </div>
        <div className="component__caption">
          <RichText.Content
            tagName="figcaption"
            value={attributes.caption}
            className="dialog__caption"
          />
        </div>
      </div>
    );
  }
});
