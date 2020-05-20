<?php
/**
 * The template for displaying CSISMag Originals posts in Issues.
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

<article <?php post_class('post-block post-block--post'); ?> id="post-<?php the_ID(); ?>">
	<header class="post-block__header">
		<?php
		csismag_post_meta( array(
			'show_issue' => false,
			'show_date' => false,
			'show_csismag_original' => true ) );

		the_title( '<h2 class="post-block__title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' );
		?>
	</header>

	<?php
		the_excerpt();
  	csismag_authors();

		echo '<figure class="post-block__img">
			<a href="' . esc_url ( get_permalink() ) . '">' . get_the_post_thumbnail() . '</a>
		</figure>';
	?>

</article><!-- .post -->
