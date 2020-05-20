<?php
/**
 * Displays the featured image caption
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

$is_singular = is_singular();

if ( has_post_thumbnail() && ! post_password_required() ) {

	$caption = get_the_post_thumbnail_caption();

	$source = get_field('source', get_post_thumbnail_id() );
	$sourceHTML = '';
	if ( $source ) {
		$sourceHTML = ' <span class="caption__source">' . esc_html( $source ) . '</span>';
	}

	if ( $caption ) {
		echo '<div class="featured-media__caption"> ' . esc_html( $caption ) . $sourceHTML . '</div>';
	}
}
