const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

registerBlockType("csismag-blocks/audio-profile", {
  title: "Audio Profile",
  icon: "admin-users",
  category: "common",
  attributes: {
    name: {
      type: "string"
    },
    title: {
      type: "string"
    },
    imageUrl: {
      type: "string"
    }
  },
  parent: ["csismag-blocks/audio"],

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
      <div className="audio__block">
        <MediaUpload
          onSelect={media => {
            setAttributes({ imageUrl: media.url });
          }}
          type="image"
          value={attributes.imageID}
          render={({ open }) => getImageButton(open)}
        />
        <div className="audio__content">
          <PlainText
            onChange={name => setAttributes({ name: name })}
            value={attributes.name}
            placeholder="Name"
            className={("audio__name", "small-title")}
          />
          <RichText
            tagName="figcaption"
            onChange={title => setAttributes({ title: title })}
            value={attributes.title}
            placeholder="Title"
            className={("audio__title", "tiny-text")}
          />
        </div>
      </div>
    );
  },

  save: ({ attributes }) => {
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
      <div className="audio__block">
        {cardImage(attributes.imageUrl)}
        <div className="audio__content">
          <div className={("audio__name", "small-title")}>
            {attributes.name}
          </div>
          <RichText.Content
            tagName="figcaption"
            className={("audio__title", "tiny-text")}
            value={attributes.title}
          />
        </div>
      </div>
    );
  }
});
