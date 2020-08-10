<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

get_header();
?>

<main id="site-content" role="main">

	<?php

	if ( is_post_type_archive('issues') ) {
		if ( have_posts() ) {
			$i = 0;

			while ( have_posts() ) {
				the_post();

				if ($i == 0) {
					get_template_part( 'template-parts/block-issues-featured' );
				} else {
					get_template_part( 'template-parts/block', get_post_type() );
				}

				$i++;

			}
			wp_reset_postdata();
		}
	} else {
		if ( have_posts() ) {

			while ( have_posts() ) {
				the_post();

				get_template_part( 'template-parts/block', get_post_type() );

			}
		}
	}
	?>

</main><!-- #site-content -->

<?php
get_footer();
