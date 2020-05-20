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

	if ( $caption ) {
		echo '<div class="featured-media__caption"> ' . esc_html( $caption ) . '</div>';
	}
}
