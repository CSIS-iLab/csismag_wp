<?php
/**
 * Customizer Separator Control settings for this theme.
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

if ( class_exists( 'WP_Customize_Control' ) ) {

	if ( ! class_exists( 'CSISMag_Separator_Control' ) ) {
		/**
		 * Separator Control.
		 */
		class CSISMag_Separator_Control extends WP_Customize_Control {
			/**
			 * Render the hr.
			 */
			public function render_content() {
				echo '<hr/>';
			}

		}
	}
}
