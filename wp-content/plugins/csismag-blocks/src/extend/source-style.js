/**
 * Modify Pullquote
 *
 */

/**
 * Add Source Style Button.
 * @param settings
 * @param name
 */

import "./style.scss";
import "./editor.scss";

const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;

const SourceStyleBtn = (props) => {
  return (
    <RichTextToolbarButton
      icon="editor-code"
      title="Source Info Styles"
      onClick={() => {
        props.onChange(
          toggleFormat(props.value, { type: "csismag-blocks/source-style" })
        );
      }}
      isActive={props.isActive}
    />
  );
};

registerFormatType("csismag-blocks/source-style", {
  title: "Sample output",
  tagName: "span",
  className: "caption__source",
  edit: SourceStyleBtn,
});
