<?php
/**
 * Displays the featured image
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

$is_singular = is_singular();

if ( has_post_thumbnail() && ! post_password_required() ) {

	?>

	<figure class="featured-media">

		<?php
			if ( !$is_singular ) {
				echo '<a href="' . esc_url ( get_permalink() ) . '">';
			}

			the_post_thumbnail();

			if ( !$is_singular ) {
				echo '</a>';
			}
		?>

	</figure><!-- .featured-media -->

	<?php
}
