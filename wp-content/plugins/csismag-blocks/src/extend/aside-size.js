/**
 * Extends the Blocks by adding an "Aside Size" dropdown to the sidebar.
 *
 */

const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable spacing control on the following blocks
const enableSpacingControlOnBlocks = ["core/image"];

// Available spacing control options
const spacingControlOptions = [
	{
		label: __("Large"),
		value: "large",
	},
	{
		label: __("Small"),
		value: "small",
	},
];

/**
 * Add spacing control attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addSpacingControlAttribute = (settings, name) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableSpacingControlOnBlocks.includes(name)) {
		return settings;
	}

	settings.attributes = Object.assign(settings.attributes, {
		spacing: {
			type: "string",
			default: spacingControlOptions[0].value,
		},
	});

	return settings;
};

addFilter(
	"blocks.registerBlockType",
	"csismag-extend-block/attribute/spacing",
	addSpacingControlAttribute
);

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl } = wp.components;

/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		// Do nothing if it's another block than our defined ones.
		if (!enableSpacingControlOnBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { spacing } = props.attributes;

		// Add Class to Block
		if (spacing) {
			props.attributes.className = `csis-block--${spacing}`;
		}

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("CSISMag")} initialOpen={true}>
						<SelectControl
							label={__("Aside Size")}
							value={spacing}
							options={spacingControlOptions}
							onChange={(selectedSpacingOption) => {
								props.setAttributes({
									spacing: selectedSpacingOption,
								});
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withSpacingControl");

addFilter(
	"editor.BlockEdit",
	"csismag-extend-block/with-spacing-control",
	withSpacingControl
);
