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

	<section class="single__content">
		<div class="issues__top">
			<div class="issues__summary"><?php echo get_field( 'issue_summary' ); ?></div>
			<?php get_template_part( 'template-parts/featured-image-caption' ); ?>
		</div>
		<?php
				the_content( __( 'Continue reading', 'csismag' ) );
			?>

	</section><!-- .single__content -->

</article><!-- .post -->
