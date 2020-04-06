import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n;
const el = wp.element.createElement;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const {
  RichText,
  BlockControls,
  BlockFormatControls,
  AlignmentToolbar,
  InnerBlocks,
  InspectorControls,
  PlainText,
  withColors,
  MediaUpload
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

registerBlockType("csismag-blocks/dataviz", {
  title: "Data Viz",
  description: __(
    "Add a data visualization using an HTML iframe and a caption.",
    "csismag-blocks"
  ),
  category: "common",
  icon: "chart-pie",
  keywords: [
    __("Data", "csismag-blocks"),
    __("Visualization", "csismag-blocks"),
    __("HTML", "csismag-blocks"),
    __("chart", "csismag-blocks"),
    __("graph", "csismag-blocks"),
    __("interactive", "csismag-blocks")
  ],
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
    align: ["right", "wide", "center"]
  },
  edit({ attributes, className, setAttributes }) {
    const { caption, align } = attributes;

    return (
      <Fragment>
        <div>
          <InnerBlocks
            allowedBlocks={["core/html"]}
            template={TEMPLATEAU}
            templateLock="true"
          />

          <RichText
            onChange={caption => setAttributes({ caption: caption })}
            value={attributes.caption}
            multiline="figcaption"
            placeholder="Data Viz Caption"
            isSelected={attributes.isSelected}
            className="component__caption"
            tagName="figcaption"
          />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    return (
      <div>
        <InnerBlocks.Content />
        <RichText.Content
          tagName="figcaption"
          value={attributes.caption}
          className="component__caption"
        />
      </div>
    );
  }
});

//import "./player.js";
const TEMPLATEAU = [["core/html", {}]];
