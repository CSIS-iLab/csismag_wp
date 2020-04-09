<?php
/**
 * CSIS Mag SVG Icon helper functions
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

if ( ! function_exists( 'csismag_get_svg' ) ) {
	/**
	 * Output and Get Theme SVG.
	 * Output and get the SVG markup for an icon in icons.svg file.
	 *
	 * @param string $icon The name of the icon.
	 */
	function csismag_get_svg( $icon ) {
		return '<svg class="icon icon-' . $icon . '"><use xlink:href="#icon-' . $icon . '"></use></svg>';
	}
}

if ( ! function_exists( 'csismag_get_svg_icons' ) ) {
	/**
	 * Get Icon SVG
	 * Get and output icon SVG to reference icons as symbols.
	 *
	 */
	function csismag_get_svg_icons() {
		include (get_template_directory() . '/assets/static/icons.svg');
	}
}
