<?php
/**
 * Plugin Name: CSISMag Blocks
 * Plugin URI: https://github.com/CSIS-iLab/csismag_wp/
 * Description: This plugin extends core blocks & adds custom blocks for CSISMag.
 * Author: CSIS iDeas Lab
 * Author URI: https://github.com/CSIS-iLab/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
