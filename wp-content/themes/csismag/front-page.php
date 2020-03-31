<?php
/**
 * The template for displaying the home page.
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

  $args = array(
    'post_type' => 'issues',
    'post_status' => 'publish',
    'posts_per_page' => 5
  );

  $issues = new WP_Query( $args );

	if ( $issues->have_posts() ) {

		while ( $issues->have_posts() ) {
			$issues->the_post();

			get_template_part( 'template-parts/content', get_post_type() );
		}

		wp_reset_postdata();
	}

	?>

	<?php

	$series = get_field('featured_series');

	if ( $series ) {

		$args = array(
			'posts_per_page' => 4,
			'tax_query' => array(
        array(
            'taxonomy' => 'series',
            'field'    => 'term_id',
            'terms'    => $series->term_id,
        ),
    ),
		);

		$seriesPosts = new WP_Query( $args );

		if ( $seriesPosts->have_posts() ) { ?>

			<h2><?php echo esc_html( $series->name ); ?></h2>
    	<p><?php echo esc_html( $series->description ); ?></p>

		<?php
			while ( $seriesPosts->have_posts() ) {
				$seriesPosts->the_post();

				get_template_part( 'template-parts/content', get_post_type() );
			}

			wp_reset_postdata();
		}
	}
	?>

</main><!-- #site-content -->

<?php get_footer(); ?>
