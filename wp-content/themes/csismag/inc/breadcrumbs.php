<?php
/**
 * CSIS Mag Custom CSS
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Disable default category & tags taxonomies.
 *
 *
*/

if ( ! function_exists('csismag_breadcrumbs') ) {

	function csismag_breadcrumbs() {
		$items = '';

		if ( is_front_page() || is_home() ) {
			$items .= '<li><span>Archive</span></li>';
		} else {
			$items .= '<li><a href="' . get_home_url() . '" title="Go to the Archive">Archive</a></li>';
		}

		if ( is_singular( array( 'post', 'issues' ) ) ) {
			$is_link = true;

			if ( 'issues' === get_post_type()) {
				$is_link = false;
			}

			$item = csismag_get_post_issue( $is_link );
			$items .= '<li>' . $item . '</li>';
		}

		return '
		<nav id="site-nav">
			<ul class="breadcrumbs">' . $items . '</ul>
		</nav>';
	}
}
