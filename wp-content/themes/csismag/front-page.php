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
	<section class="home__recent">
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

			if ($issues->current_post === 0) {
				get_template_part( 'template-parts/block-issues-featured' );
			} else {
				get_template_part( 'template-parts/block', get_post_type() );
			}

		}

		wp_reset_postdata();
	}

	?>
	</section>

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

			<aside class="home__series">
				<h2 class="home__series-title"><?php echo esc_html( $series->name ); ?></h2>
				<p class="home__series-desc"><?php echo esc_html( $series->description ); ?></p>

				<?php

					$image = get_field('image', 'series_' . $series->term_id);
					$size = 'full';
					if ( $image ) {
						echo wp_get_attachment_image( $image, $size );
					}

					echo '<div class="home__series-articles">';

					while ( $seriesPosts->have_posts() ) {
						$seriesPosts->the_post();

						get_template_part( 'template-parts/block', get_post_type() );
					}

					wp_reset_postdata();

					echo '</div>';

					$archive_text = get_field('archive_link_text', 'series_' . $series->term_id);
					$archive_url = get_field('archive_url', 'series_' . $series->term_id);

					if ( !$archive_url ) {
						$archive_url = get_term_link( $series );
						$archive_text = 'Read More';
					}

					echo '<a href="' . $archive_url . '" class="home__series-archive">' . $archive_text . csismag_get_svg( 'arrow-right') . '</a>';
				?>
			</aside>
		<?php
		}
	}
	?>

</main><!-- #site-content -->

<?php get_footer(); ?>
