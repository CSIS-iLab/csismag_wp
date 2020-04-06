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
  withColors,
  PlainText
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

const { withSelect } = wp.data;

registerBlockType("csismag-blocks/header", {
  title: "Header",

  icon: "welcome-view-site",

  category: "layout",

  attributes: {
    mediaURL: {
      type: "string",
      default: "http://placehold.it/500"
    },
    title: {
      type: "string"
    },
    excerpt: {
      type: "string"
    },
    align: {
      type: "string",
      default: "full"
    },
    authors: {
      type: "string"
    },
    color: {
      type: "string"
    },
    date: {
      type: "string"
    },
    quote: {
      type: "string"
    }
  },
  styles: [
    // Mark style as default.
    {
      name: "color-block",
      label: __("Color Block"),
      isDefault: true
    },
    {
      name: "background-img",
      label: __("Line Background Image")
    },
    {
      name: "zoom-img",
      label: __("Zoom Background Image")
    },
    {
      name: "half-page",
      label: __("Half Page")
    },
    {
      name: "cut-out",
      label: __("Cut Out")
    }
  ],
  supports: {
    align: ["full"]
  },

  edit: function (props) {
    const { attributes } = props.attributes;
    const {
      mediaURL,
      align,
      color,
      authors,
      date,
      title,
      excerpt
    } = props.attributes;

    function setColor(newColor) {
      props.setAttributes({ color: newColor });
    }

    function setAuthors(newAuthors) {
      props.setAttributes({ authors: newAuthors });
    }

    function setDate(newDate) {
      props.setAttributes({ date: newDate });
    }

    function onChangeAlignment(newAlignment) {
      props.setAttributes({ alignment: newAlignment });
    }

    function onImageSelect(imageObject) {
      props.setAttributes({
        mediaURL: imageObject.url
      });
    }

    var withSelect = wp.data.withSelect;

    var GetTitle = function GetTitle(props) {
      return el("h1", { className: "header__title" }, props.title);
    };

    var selectTitle = withSelect(function (select) {
      var title;

      if (typeof select("core/editor").getPostEdits().title !== "undefined") {
        title = select("core/editor").getPostEdits().title;
        props.setAttributes({ title: title });
      } else {
        title = select("core/editor").getCurrentPost().title;
      }
      props.setAttributes({ title: title });
      return {
        title: title
      };
    });

    var PostTitle = selectTitle(GetTitle);

    return [
      // Block Controls
      <Fragment>
        <BlockControls>
          <Tooltip text={__("Thick Border", "csismag-blocks")}>
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
          <PanelBody title={__("Color Settings")}>
            <PanelRow>
              <ColorPicker
                color={color}
                onChangeComplete={value => setColor(value.hex)}
                disableAlpha
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div className="">
          <div
            class="header__container"
            style={{
              backgroundImage: `url(${mediaURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div>
              <div className="header__date">
                <span>PUBLISHED: </span>
                <PlainText
                  onChange={date => props.setAttributes({ date: date })}
                  value={date}
                  placeholder="Publish Date"
                />
              </div>
              <PostTitle />
              <div className="header__intro">
                <RichText
                  placeholder={__("Intro Summary", "csismag-blocks")}
                  onChange={excerpt =>
                    props.setAttributes({ excerpt: excerpt })
                  }
                  value={excerpt}
                />
              </div>

              <div className="header__authors">
                <span>BY: </span>
                <PlainText
                  onChange={authors =>
                    props.setAttributes({ authors: authors })
                  }
                  value={authors}
                  placeholder="Authors"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    ];
  },

  save: ({ attributes }) => {
    return (
      <div className="">
        <div
          class="header__container"
          style={{
            backgroundImage: `url(${attributes.mediaURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="header__date">
            <span>PUBLISHED: </span>
            {attributes.date}
          </div>
          <h1 className="header__title">{attributes.title}</h1>
          <div className="header__intro">
            <RichText.Content value={attributes.excerpt} />
          </div>
          <div className="header__authors">
            <span>BY: </span>
            {attributes.authors}
          </div>
        </div>
      </div>
    );
  }
});
