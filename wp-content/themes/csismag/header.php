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

			<header id="site-header" class="header" role="banner">

				<?php echo csismag_breadcrumbs(); ?>

				<a href="<?php echo get_home_url(); ?>" class="header__logo" title="Go home"><?php include( get_template_directory() . '/assets/static/csismag-logo.svg'); ?></a>

			</header><!-- #site-header -->
