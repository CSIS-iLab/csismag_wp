<?php
/**
 * CSIS Mag Custom CSS
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Create custom taxonomy for "Series".
 *
 *
*/
function csismag_tax_series() {

	$labels = array(
		'name'                       => _x( 'Series', 'Taxonomy General Name', 'csismag' ),
		'singular_name'              => _x( 'Series', 'Taxonomy Singular Name', 'csismag' ),
		'menu_name'                  => __( 'Series', 'csismag' ),
		'all_items'                  => __( 'All Series', 'csismag' ),
		'parent_item'                => __( 'Parent Series', 'csismag' ),
		'parent_item_colon'          => __( 'Parent Series:', 'csismag' ),
		'new_item_name'              => __( 'New Series Name', 'csismag' ),
		'add_new_item'               => __( 'Add New Series', 'csismag' ),
		'edit_item'                  => __( 'Edit Series', 'csismag' ),
		'update_item'                => __( 'Update Series', 'csismag' ),
		'view_item'                  => __( 'View Series', 'csismag' ),
		'separate_items_with_commas' => __( 'Separate series with commas', 'csismag' ),
		'add_or_remove_items'        => __( 'Add or remove series', 'csismag' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'csismag' ),
		'popular_items'              => __( 'Popular Series', 'csismag' ),
		'search_items'               => __( 'Search Series', 'csismag' ),
		'not_found'                  => __( 'Not Found', 'csismag' ),
		'no_terms'                   => __( 'No series', 'csismag' ),
		'items_list'                 => __( 'Series list', 'csismag' ),
		'items_list_navigation'      => __( 'Series list navigation', 'csismag' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => false,
		'show_in_rest'               => true,
	);
	register_taxonomy( 'series', array( 'post' ), $args );

}
add_action( 'init', 'csismag_tax_series', 0 );
