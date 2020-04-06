const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

registerBlockType("csismag-blocks/themeinfo-agenda", {
  title: "Agenda Upload",
  icon: "admin-users",
  category: "common",
  attributes: {
    title: {
      type: "string"
    },
    date: {
      type: "string"
    }
  },
  parent: ["csismag-blocks/themeinfo"],

  edit({ attributes, className, setAttributes }) {
    const { title, date } = attributes;
    return (
      <div className="theme__agenda">
        <InnerBlocks allowedBlocks={["core/file"]} />
        <PlainText
          onChange={title => setAttributes({ title: title })}
          value={attributes.title}
          placeholder="Document Title"
          className="theme__agenda-name"
        />
        <PlainText
          onChange={date => setAttributes({ date: date })}
          value={attributes.date}
          placeholder="Date"
          className="theme__agenda-date"
        />
      </div>
    );
  },

  save({ attributes }) {
    const { title, date } = attributes;

    return (
      <div className="theme__agenda">
        <InnerBlocks.Content />
        <div className="theme__agenda-name">{attributes.name}</div>
        <div className="theme__agenda-date">{attributes.date}</div>
      </div>
    );
  }
});
