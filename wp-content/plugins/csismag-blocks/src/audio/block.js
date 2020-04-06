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

registerBlockType("csismag-blocks/audio", {
  title: "Audio",
  description: __(
    "Add an audio player and mini profiles of the speakers (optional).",
    "csismag-blocks"
  ),
  category: "common",
  icon: "controls-volumeon",
  keywords: [
    __("Audio", "csismag-blocks"),
    __("Listen", "csismag-blocks"),
    __("Player", "csismag-blocks")
  ],
  attributes: {
    title: {
      type: "string"
    },
    color: {
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
    const { caption, color, title } = attributes;

    function setColor(newColor) {
      setAttributes({ color: newColor });
    }
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Color Settings")}>
            <PanelRow>
              <ColorPicker
                color={attributes.color}
                onChangeComplete={value => setColor(value.hex)}
                disableAlpha
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div>
          {" "}
          <div className="component__title">
            <PlainText
              onChange={title => setAttributes({ title: title })}
              value={attributes.title}
              placeholder="Title"
            />
          </div>
          <InnerBlocks
            allowedBlocks={["core/audio", "csismag-blocks/audio-profile"]}
            template={TEMPLATEAU}
          />
        </div>
      </Fragment>
    );
  },
  save({ attributes }) {
    const { title, color, align } = attributes;
    return (
      <div>
        <div class="component__title">{attributes.title}</div>
        <InnerBlocks.Content />
      </div>
    );
  }
});

//import "./player.js";
const TEMPLATEAU = [["core/audio", {}], ["csismag-blocks/audio-profile", {}]];
