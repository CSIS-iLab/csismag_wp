/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import "./style.scss";
import "./editor.scss";
//import "./block-agenda.js";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { SelectControl, PanelBody, FormFileUpload, Button } = wp.components;
const { Component, Fragment } = wp.element;
const { apiFetch } = wp;
const { withState } = wp.compose;
const {
  RichText,
  PlainText,
  MediaUpload,
  InspectorControls,
  BlockControls,
  InnerBlocks
} = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("csismag-blocks/themeinfo", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: "Theme Info", // Block title.
  icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
    __("Theme", "csismag-blocks"),
    __("Session", "csismag-blocks"),
    __("Class", "csismag-blocks"),
    __("Group", "csismag-blocks"),
    __("Cohort", "csismag-blocks")
  ],

  description: __(
    "This block contains all the information about a theme or session."
  ),

  attributes: {
    title: {
      type: "string"
    },
    intro: {
      type: "string"
    },
    description: {
      type: "string"
    },
    agenda: {
      type: "string"
    },
    dates: {
      type: "string"
    },
    institution: {
      type: "string"
    },
    faculty: {
      type: "string"
    },
    students: {
      type: "string"
    },
    gallery: {
      type: "string"
    },
    selectedPost: {
      type: "string"
    },
    selectedPostUrl: {
      type: "string"
    },
    selectedPostExcerpt: {
      type: "string"
    },
    selectedPostImage: {
      type: "string"
    },
    agendaFile: {
      type: "string"
    },
    agendaDesc: {
      type: "string"
    }
  },

  // The "edit" property must be a valid function.

  edit: function (props) {
    const { attributes } = props.attributes;
    const {
      title,
      intro,
      description,
      dates,
      institution,
      faculty,
      agenda,
      students,
      gallery,
      selectedPost,
      selectedPostUrl,
      selectedPostExcerpt,
      selectedPostImage,
      agendaFile,
      agendaDesc
    } = props.attributes;
    const postSelections = [];

    const allPosts = apiFetch({ path: "/wp/v2/posts" }).then(fps => {
      postSelections.push({ label: "Select a Post", value: 0 });
      $.each(fps, function (key, val) {
        postSelections.push({
          label: val.title.rendered,
          value: val.id,
          idv: val.id,
          content: val.excerpt.rendered,
          url: val.link,
          img: val.featured_image_src
        });
      });
      return postSelections;
      //console.log(postSelections);
    });

    function onChangeSelectPost(value, array) {
      function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
            return array[i];
          }
        }
        return null;
      }
      var postIdv = findObjectByKey(array, "idv", Number(value));

      props.setAttributes({ selectedPost: postIdv["label"] });
      props.setAttributes({ selectedPostUrl: postIdv["url"] });
      props.setAttributes({ selectedPostImage: postIdv["img"] });
      props.setAttributes({ selectedPostExcerpt: postIdv["content"] });
    }

    function getPost() {
      if (selectedPostImage == "") {
        //console.log("empty");
      } else {
        //console.log("filled");
      }
      return (
        <div class="theme-block__article">
          <a class="theme-block__article-title" href={selectedPostUrl}>
            {" "}
            {selectedPost}
          </a>
          <p class="theme-block__article-excerpt">{selectedPostExcerpt}</p>
          <img class="theme-block__article-img" src={selectedPostImage} />
        </div>
      );
    }

    const getImageButton = openEvent => {
      if (agendaFile) {
        return (
          <div>
            <img
              src={agendaFile}
              onClick={openEvent}
              className="theme__agendaimg"
            />
            <p>{agendaDesc}</p>
          </div>
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
      <Fragment>
        <InspectorControls>
          <SelectControl
            label={__("Select some users:")}
            value={selectedPost} // e.g: value = [ 'a', 'c' ]
            onChange={post => {
              onChangeSelectPost(post, postSelections);
            }}
            options={postSelections}
          />
        </InspectorControls>
        <div class="theme-block__container">
          <div class="theme-block__title">
            <div class="block-label">Title:</div>
            <RichText
              tagName="h2"
              onChange={title => props.setAttributes({ title: title })}
              value={title}
              placeholder="Title"
            />
          </div>
          <div class="theme-block__left">
            <div class="theme-block__intro">
              <div class="block-label">Intro:</div>
              <RichText
                tagName="p"
                onChange={intro => props.setAttributes({ intro: intro })}
                value={intro}
                placeholder="Intro"
              />
            </div>
            <div class="theme-block__desc">
              <div class="block-label">Further Description:</div>
              <RichText
                tagName="p"
                onChange={description =>
                  props.setAttributes({ description: description })
                }
                value={description}
                placeholder="Description"
              />
            </div>
            <div class="theme-block__gallery">
              <div class="block-label">Gallery:</div>
              <InnerBlocks
                allowedBlocks={["core/gallery"]}
                template={[["core/gallery", {}]]}
                templateLock="insert"
              />
            </div>
          </div>
          <div class="theme-block__right">
            <div class="theme-block__agenda">
              <div class="block-label">Agenda Image/Info:</div>
              <MediaUpload
                onSelect={media => {
                  props.setAttributes({
                    agendaFile: media.url,
                    agendaDesc: media.title
                  });
                }}
                type="image"
                accept="image/*"
                value={agendaFile}
                render={({ open }) => getImageButton(open)}
              />
            </div>
            <div class="theme-block__dates">
              <div class="block-label">Dates:</div>
              <PlainText
                tagName="p"
                onChange={dates => props.setAttributes({ dates: dates })}
                value={dates}
                placeholder="Dates"
              />
            </div>
            <div class="theme-block__institution">
              <div class="block-label">Institution:</div>
              <PlainText
                tagName="p"
                onChange={institution =>
                  props.setAttributes({ institution: institution })
                }
                value={institution}
                placeholder="Institution"
              />
            </div>
            <div class="theme-block__faculty">
              <div class="block-label">Faculty Advisor Name:</div>
              <PlainText
                tagName="p"
                onChange={faculty => props.setAttributes({ faculty: faculty })}
                value={faculty}
                placeholder="Faculty Advisor"
              />
            </div>
            <div class="theme-block__students">
              <div class="block-label">List of Students:</div>

              <RichText
                tagName="ul"
                multiline="li"
                onChange={students =>
                  props.setAttributes({ students: students })
                }
                value={students}
                placeholder="Students"
                className="theme-block__student"
              />
            </div>
          </div>
          <div class="block-label">
            Featured Post <span>(choose from Block Settings in sidebar)</span>:
          </div>
          <div class="theme-block__article">{getPost()}</div>
        </div>
      </Fragment>
    ); // end withSelect
  }, // end edit

  // The "save" property must be specified and must be a valid function.
  save({ attributes }) {
    return (
      <div class="theme-block__container">
        <div class="theme-block__title">
          <RichText.Content tagName="h2" value={attributes.title} />
        </div>
        <div class="theme-block__left">
          <div class="theme-block__intro">
            <RichText.Content tagName="p" value={attributes.intro} />
          </div>
          <div class="theme-block__desc">
            <RichText.Content tagName="p" value={attributes.description} />
          </div>
          <div class="theme-block__gallery">
            <InnerBlocks.Content />
          </div>
        </div>
        <div class="theme-block__right">
          <div class="theme-block__agenda">
            <a
              href={attributes.agendaFile}
              target="_blank"
              alt={attributes.agendaDesc}
            >
              <img
                class="theme-block__agenda-img"
                src={attributes.agendaFile}
              />

              <p class="theme-block__agenda-desc">{attributes.agendaDesc}</p>
            </a>
          </div>
          <div class="theme-block__dates">
            <div class="theme-block__meta">
              <span class="meta">Dates: </span> {attributes.dates}
            </div>
          </div>
          <div class="theme-block__institution">
            <div class="theme-block__meta">
              <span class="meta">Institution: </span> {attributes.institution}
            </div>
          </div>
          <div class="theme-block__faculty">
            <div class="theme-block__meta">
              <span class="meta">Faculty Advisor: </span> {attributes.faculty}
            </div>
          </div>
          <div class="theme-block__students">
            <div class="theme-block__meta">
              <span class="meta">Students: </span>{" "}
              <RichText.Content tagName="ul" value={attributes.students} />
            </div>
          </div>
        </div>
        <div class="theme-block__article">
          <a href={attributes.selectedPostUrl}>
            <div class="post-entry-header">
              <div class="section-subtitle">Read the story</div>{" "}
              <div class="theme-block__article-title">
                {attributes.selectedPost}
              </div>
            </div>
            <div class="theme-block__article-excerpt">
              <RichText.Content value={attributes.selectedPostExcerpt} />
            </div>
            <div class="theme-block__article-img-container objfit">
              <img
                class="theme-block__article-img"
                src={attributes.selectedPostImage}
              />
              {attributes.selectedPostImage}
            </div>
          </a>
        </div>
      </div>
    );
  }
});
