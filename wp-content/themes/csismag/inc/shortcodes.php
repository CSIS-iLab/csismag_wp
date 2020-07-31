<?php
/**
 * CSIS Mag Custom Shortcodes
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

function csismag_shortcode_share_button( $atts, $content = null ) {

	// If there is an anchor link, direct the user's here instead of the top of the page.
	$atts = shortcode_atts(
		array(
				'anchor' => null,
				'image' => null,
		), $atts, 'share' );

	$anchor = null;

	if ( $atts['anchor'] != '' ) {
		$anchor = '#' . $atts['anchor'];
	}

	// If there is an image associated with this block, share it.
	$img = null;

	if ( $atts['image'] ) {
		$image_data = json_decode( html_entity_decode($atts['image'] ), true);
		$img = ' ' . $image_data['url'];
	}

	$shareArgs = array(
		'linkname' => get_the_title() . $img,
		'linkurl' => get_permalink() . $anchor
	);

	$output = '<div class="csis-block__share">
		<button class="csis-block__share-btn btn btn--circle" aria-expanded="false" aria-label="Share on social media">' . csismag_get_svg( 'share' ) . csismag_get_svg( 'close' ) . '</button>';

	ob_start();
	if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) {
    ADDTOANY_SHARE_SAVE_KIT( $shareArgs );
	}
	$output .= ob_get_contents();
	ob_end_clean();

	$output .= '</div>';

	return $output;
}

add_shortcode( 'share', 'csismag_shortcode_share_button' );
