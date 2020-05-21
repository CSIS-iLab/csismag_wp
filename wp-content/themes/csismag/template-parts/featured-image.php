<?php
/**
 * Displays the featured image
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

$is_singular = is_singular();
$is_front_page = is_front_page();

if ( has_post_thumbnail() && ! post_password_required() ) {

	?>

	<figure class="featured-media">

		<?php
			if ( !$is_singular || $is_front_page ) {
				echo '<a href="' . esc_url ( get_permalink() ) . '">';
			}

			$size = '';

			if ( $is_singular && !$is_front_page ) {
				$size = 'csismag-fullscreen';
			}

			the_post_thumbnail( $size );

			if ( !$is_singular || $is_front_page ) {
				echo '</a>';
			}
		?>

	</figure><!-- .featured-media -->

	<?php
}
