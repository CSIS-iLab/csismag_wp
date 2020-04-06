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
  title: "Audio J",
  description: __(
    "How to use the RichText component for building your own editable blocks.",
    "csismag-blocks"
  ),
  category: "common",
  icon: "smiley",
  keywords: [
    __("Banner", "jsforwpblocks"),
    __("Call to Action", "jsforwpblocks"),
    __("Message", "jsforwpblocks")
  ],
  attributes: {
    title: {
      type: "string"
    },
    caption: {
      type: "string"
    },
    mediaUrl: {
      type: "string",
      default: "https://thenewcode.com/assets/audio/24-ghosts-III.mp3"
    },
    color: {
      type: "string"
    }
  },

  edit: function (props) {
    const { attributes } = props.attributes;
    const { mediaUrl, caption, title, color } = props.attributes;
    const getMediaButton = openEvent => {
      if (mediaUrl) {
        return <div />;
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
    function setColor(newColor) {
      props.setAttributes({ color: newColor });
    }
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Text Overlay Settings")}>
            <PanelRow>
              <MediaUpload
                onSelect={media => {
                  setAttributes({ mediaUrl: media.url });
                }}
                type="image"
                value={mediaUrl}
                render={({ open }) => getMediaButton(open)}
              />
            </PanelRow>

            <PanelRow>
              <ColorPicker
                color={color}
                onChangeComplete={value => setColor(value.hex)}
                disableAlpha
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div class="firePlayer">
          <div class="controls">
            <audio src="http://www.bensound.org/bensound-music/bensound-dubstep.mp3" />

            <div class="button-wrap">
              <button class="audio-play" />
            </div>

            <div class="progress-wrap">
              <div class="audio-title">"Track Title"</div>
              <div class="audio-current-time">0:00</div>
              <div class="audio-seekbar" value="0" max="1">
                <div class="audio-slide" />
              </div>
              <div class="audio-length">0:00</div>
            </div>
          </div>
        </div>

        <PlainText
          onChange={title => setAttributes({ title: title })}
          value={title}
          placeholder="Title"
          className="component__title"
        />
        <PlainText
          onChange={caption => setAttributes({ caption: caption })}
          value={caption}
          placeholder="Caption"
          className="component__caption"
        />

        <InnerBlocks allowedBlocks={["csismag-blocks/profile"]} />
      </Fragment>
    );
  },
  save: props => {
    const {
      attributes: { message }
    } = props;
    return (
      <div class="firePlayer">
        <div class="controls">
          <audio src="http://www.bensound.org/bensound-music/bensound-dubstep.mp3" />

          <div class="button-wrap">
            <button class="audio-play" />
          </div>

          <div class="progress-wrap">
            <div class="audio-title">"Track Title"</div>
            <div class="audio-current-time">0:00</div>
            <div class="audio-seekbar" value="0" max="1">
              <div class="audio-slide" />
            </div>
            <div class="audio-length">0:00</div>
          </div>
        </div>
      </div>
    );
  }
});

import "./player.js";
