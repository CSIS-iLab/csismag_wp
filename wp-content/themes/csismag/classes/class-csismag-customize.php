<?php
/**
 * Customizer settings for this theme.
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

if ( ! class_exists( 'CSISMag_Customize' ) ) {
	/**
	 * CUSTOMIZER SETTINGS
	 */
	class CSISMag_Customize {

		/**
		 * Register customizer options.
		 *
		 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
		 */
		public static function register( $wp_customize ) {

			/**
			 * Site Title & Description.
			 * */
			$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
			$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

			$wp_customize->selective_refresh->add_partial(
				'blogname',
				array(
					'selector'        => '.site-title a',
					'render_callback' => 'csismag_customize_partial_blogname',
				)
			);

			$wp_customize->selective_refresh->add_partial(
				'blogdescription',
				array(
					'selector'        => '.site-description',
					'render_callback' => 'csismag_customize_partial_blogdescription',
				)
			);
		}
	}

	// Setup the Theme Customizer settings and controls.
	add_action( 'customize_register', array( 'CSISMag_Customize', 'register' ) );

}

/**
 * PARTIAL REFRESH FUNCTIONS
 * */
if ( ! function_exists( 'csismag_customize_partial_blogname' ) ) {
	/**
	 * Render the site title for the selective refresh partial.
	 */
	function csismag_customize_partial_blogname() {
		bloginfo( 'name' );
	}
}

if ( ! function_exists( 'csismag_customize_partial_blogdescription' ) ) {
	/**
	 * Render the site description for the selective refresh partial.
	 */
	function csismag_customize_partial_blogdescription() {
		bloginfo( 'description' );
	}
}
