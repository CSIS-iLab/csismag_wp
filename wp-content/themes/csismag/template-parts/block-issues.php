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

<article <?php post_class('post-block post-block--issues'); ?> id="post-<?php the_ID(); ?>">

	<?php
	get_template_part( 'template-parts/featured-image' );

	csismag_post_meta( array( 'show_csismag_original' => false ) );

	the_title( '<h2 class="post-block__title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' );

	the_excerpt();
	?>

</article><!-- .post -->
