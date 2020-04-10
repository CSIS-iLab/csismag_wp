<?php
/**
 * The default template for displaying content
 *
 * Used for both singular and index.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

?>

<article <?php post_class('post-block post-block--issues-featured'); ?> id="post-<?php the_ID(); ?>">

	<?php
	get_template_part( 'template-parts/featured-image' );

	csismag_post_meta( array( 'show_csismag_original' => false ) );

	the_title( '<h1 class="post-block__title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h1>' );

	the_excerpt();

	$issue = get_field( 'issue' );

	// args
	$args = array(
		'numberposts'	=> -1,
		'post_type'		=> 'post',
		'meta_query'	=> array(
			'relation'	=> 'AND',
				array(
					'key'			=> 'is_csismag_original',
					'value'		=> true,
					'compare'	=> '='
				),
				array(
					'key'			=> 'issue',
					'value' => get_the_ID(),
					'compare' => 'LIKE'
				)
			)
	);

	$originals = new WP_Query( $args );

	if ( $originals->have_posts() ) {

		echo '
		<div class="post-block__originals">
			<div class="post-meta post-meta__original">CSISMag Original</div>';

		while ( $originals->have_posts() ) {
			$originals->the_post();

			the_title( '<h2><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' );

		}

		wp_reset_postdata();

		echo '</div>';
	}

	?>

</article><!-- .post -->
