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

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<?php

	get_template_part( 'template-parts/entry-header' );

	?>

	<div class="single__content">
		<?php
			the_content( __( 'Continue reading', 'csismag' ) );
		?>
	</div><!-- .post-inner -->

	<footer class="single__footer">
		<?php get_template_part( 'template-parts/featured-image-caption' ); ?>
		<?php if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) { ADDTOANY_SHARE_SAVE_KIT(); } ?>
		<?php echo csismag_get_notes(); ?>
		<?php echo csismag_authors_list_extended(); ?>
		<?php echo csismag_get_contributors(); ?>
		<?php echo csismag_get_ilab_language(); ?>
	</footer>

</article><!-- .post -->
