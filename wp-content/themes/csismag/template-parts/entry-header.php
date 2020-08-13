<?php
/**
 * Displays the post header
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

$entry_header_classes = '';

$is_issue = false;
$show_csismag_original = true;
$show_issue_prefix = true;

if ( 'issues' === get_post_type() ) {
	$is_issue = true;
	$show_csismag_original = false;
	$show_issue_prefix = false;
}

$bg = get_field( 'accent_color_background');
$style = '';

if ( is_page_template( 'templates/color.php' ) && $bg != '' ) {
	$style = ' style="--bg: ' . $bg . ';"';
}

?>

<header class="single__header<?php echo esc_attr( $entry_header_classes ); ?>"<?php echo $style; ?>>

	<div class="single__header-wrapper">

		<?php
			csismag_post_meta( array(
				 'show_csismag_original' => $show_csismag_original,
				 'show_issue_prefix' => $show_issue_prefix
				)
			);

			the_title( '<h1 class="single__title">', '</h1>' );

			if ( has_excerpt() && is_singular() ) {
				the_excerpt();
			}

			if ( !$is_issue ) {
				csismag_authors();
			}

			get_template_part( 'template-parts/featured-image' );
		?>

	</div><!-- .entry-header-inner -->

	<?php
	if ( $is_issue ) {
		echo '<div class="issue__scroll">Scroll</div>';
	}
	?>

</header><!-- .entry-header -->
