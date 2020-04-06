const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

registerBlockType("csismag-blocks/author-profile", {
  title: "Author Block",
  icon: "admin-users",
  category: "common",
  attributes: {
    name: {
      type: "string"
    },
    institution: {
      type: "string"
    },
    body: {
      type: "string"
    },
    imageUrl: {
      type: "string"
    }
  },
  parent: ["csismag-blocks/author"],

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
      <div className="author__content">
        <MediaUpload
          onSelect={media => {
            setAttributes({ imageUrl: media.url });
          }}
          type="image"
          value={attributes.imageID}
          render={({ open }) => getImageButton(open)}
        />
        <PlainText
          tagName="h4"
          onChange={content => setAttributes({ name: content })}
          value={attributes.name}
          placeholder="Author Name"
          className="author__name"
        />
        <RichText
          tagName="figcaption"
          onChange={content => setAttributes({ institution: content })}
          value={attributes.institution}
          placeholder="Institution"
          className={("author__institution", "tiny-text")}
        />
        <div className="author__bio">
          <RichText
            onChange={content => setAttributes({ body: content })}
            value={attributes.body}
            multiline="p"
            placeholder="Bio text"
            formattingControls={["bold", "italic", "underline"]}
            isSelected={attributes.isSelected}
          />
        </div>
      </div>
    );
  },

  save: ({ attributes }) => {
    const { imageUrl, name, body, institution } = attributes;
    const cardImage = src => {
      if (!src) return null;

      // No alt set, so let's hide it from screen readers
      return (
        <img
          className="component__imgcircle"
          src={src}
          alt=""
          aria-hidden="true"
        />
      );
    };

    return (
      <div className="author__block">
        {cardImage(attributes.imageUrl)}
        <div className="author__content">
          <h4 className="author__name">{attributes.name}</h4>
          <RichText.Content
            tagName="figcaption"
            className={("author__institution", "tiny-text")}
            value={attributes.institution}
          />
          <div className="author__bio">
            <RichText.Content tagName="p" value={attributes.body} />
          </div>
        </div>
      </div>
    );
  }
});
