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

?>

<header class="single__header<?php echo esc_attr( $entry_header_classes ); ?>">

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
		$in_this_issue = get_field( 'in_this_issue' );

		if ( $in_this_issue ) {
			echo '
			<div class="issue__overview">
				<h2 class="issue__overview-title">In this Issue</h2>
				' . $in_this_issue . '
				<div class="issue__overview-marker"></div>
			</div>';
		}

		echo '<div class="issue__scroll">Scroll</div>';
	}
	?>

</header><!-- .entry-header -->
