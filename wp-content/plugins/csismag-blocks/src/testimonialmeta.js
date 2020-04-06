const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
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
  ColorPicker,
  SelectControl,
  TextControl
} = wp.components;

registerBlockType("csismag-blocks/testimonial-meta", {
  title: "Post Meta",
  icon: "smiley",
  category: "common",

  attributes: {
    metaName: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_testimonial_name"
    },
    metaInstituion: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_testimonial_institution"
    },
    metaDate: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_testimonial_date"
    }
  },

  edit({ className, setAttributes, attributes }) {
    //console.log(attributes.metaShow);
    function updateMetaName(metaName) {
      setAttributes({ metaName });
    }
    function updateMetaInstitution(metaInstituion) {
      setAttributes({ metaInstituion });
    }
    function updateMetaDate(metaDate) {
      setAttributes({ metaDate });
    }

    return (
      <Fragment>
        <div className="testimonial-name">
          <TextControl
            label="Name"
            value={attributes.metaName}
            onChange={updateMetaName}
          />
        </div>
        <div className={className}>
          <TextControl
            label="Institution"
            value={attributes.metaInstituion}
            onChange={updateMetaInstitution}
          />
        </div>
        <div className={className}>
          <TextControl
            label="Date"
            value={attributes.metaDate}
            onChange={updateMetaDate}
          />
        </div>
      </Fragment>
    );
  },

  // No information saved to the block
  // Data is saved to post meta via attributes
  save() {
    return null;
  }
});
