const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

registerBlockType("csismag-blocks/meta-block", {
  title: "Post Meta",
  icon: "smiley",
  category: "common",

  attributes: {
    metaAuthors: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_authors"
    },
    metaDate: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_date"
    },
    metaIntro: {
      type: "string",
      source: "meta",
      meta: "csismag-blocks_meta_intro"
    }
  },

  edit({ className, setAttributes, attributes }) {
    function updateMetaDate(metaDate) {
      setAttributes({ metaDate });
    }
    function updateMetaAuthors(metaAuthors) {
      setAttributes({ metaAuthors });
    }
    function updateMetaIntro(metaIntro) {
      setAttributes({ metaIntro });
    }

    return (
      <div>
        <div className={className}>
          <TextControl
            label="Publish Date"
            value={attributes.metaDate}
            onChange={updateMetaDate}
          />
        </div>
        <div className={className}>
          <TextControl
            label="Authors"
            value={attributes.metaAuthors}
            onChange={updateMetaAuthors}
          />
        </div>
        <div className={className}>
          <TextControl
            multiline="true"
            label="Intro"
            value={attributes.metaIntro}
            onChange={updateMetaIntro}
          />
        </div>
      </div>
    );
  },

  // No information saved to the block
  // Data is saved to post meta via attributes
  save() {
    return null;
  }
});
