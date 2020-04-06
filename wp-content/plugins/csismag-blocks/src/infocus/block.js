const { RichText, MediaUpload, PlainText, InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;
const { __ } = wp.i18n;
// Import our CSS files
import "./style.scss";
import "./editor.scss";

registerBlockType("csismag-blocks/focus", {
  title: "In Focus",
  icon: "flag",
  category: "layout",
  keywords: [
    __("Focus", "csismag-blocks"),
    __("Aside", "csismag-blocks"),
    __("Case", "csismag-blocks"),
    __("Box", "csismag-blocks"),
    __("Sidebar", "csismag-blocks")
  ],
  description: __(
    "Add a box that blocks off content in a case study or sidebar",
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
    align: ["right", "center", "wide"]
  },
  edit({ attributes, className, setAttributes }) {
    return (
      <div className="focus__container">
        <div class="focus__content">
          <InnerBlocks
            allowedBlocks={[
              "core/paragraph",
              "core/image",
              "core/heading",
              "core/list",
              "core/pullquote",
              "core/video",
              "csismag-blocks/dataviz",
              "csismag-blocks/audio",
              "csismag-blocks/profile"
            ]}
          />
        </div>
      </div>
    );
  },

  save({ attributes }) {
    return (
      <div className="focus__container">
        <div class="focus__content">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
});
