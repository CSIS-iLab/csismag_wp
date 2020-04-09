<?php
/**
 * Header file for the CSIS Mag WordPress default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

?><!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>

		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >

		<link rel="profile" href="https://gmpg.org/xfn/11">

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		<?php
		wp_body_open();
		?>

		<?php csismag_get_svg_icons(); ?>

		<div class="container">

			<header id="site-header" class="header-footer-group" role="banner">

			<?php echo csismag_breadcrumbs(); ?>

				<div class="header-inner section-inner">

					<div class="header-titles-wrapper">

						<div class="header-titles">

							<?php
								// Site title or logo.
								csismag_site_logo();

								// Site description.
								csismag_site_description();
							?>

						</div><!-- .header-titles -->

					</div><!-- .header-titles-wrapper -->

					<div class="header-navigation-wrapper">

					</div><!-- .header-navigation-wrapper -->

				</div><!-- .header-inner -->

			</header><!-- #site-header -->
