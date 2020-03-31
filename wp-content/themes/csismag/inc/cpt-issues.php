<?php
/**
 * CSIS Mag Custom CSS
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Create custom post type for "Issues".
 *
 *
*/
function csismag_cpt_issues() {

	$labels = array(
		'name'                  => _x( 'Issues', 'Post Type General Name', 'csismag' ),
		'singular_name'         => _x( 'Issue', 'Post Type Singular Name', 'csismag' ),
		'menu_name'             => __( 'Issues', 'csismag' ),
		'name_admin_bar'        => __( 'Issue', 'csismag' ),
		'archives'              => __( 'Issues Archive', 'csismag' ),
		'attributes'            => __( 'Issue Attributes', 'csismag' ),
		'parent_item_colon'     => __( 'Parent Issue:', 'csismag' ),
		'all_items'             => __( 'All Issues', 'csismag' ),
		'add_new_item'          => __( 'Add New Issue', 'csismag' ),
		'add_new'               => __( 'Add New', 'csismag' ),
		'new_item'              => __( 'New Item', 'csismag' ),
		'edit_item'             => __( 'Edit Item', 'csismag' ),
		'update_item'           => __( 'Update Item', 'csismag' ),
		'view_item'             => __( 'View Item', 'csismag' ),
		'view_items'            => __( 'View Items', 'csismag' ),
		'search_items'          => __( 'Search Item', 'csismag' ),
		'not_found'             => __( 'Not found', 'csismag' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'csismag' ),
		'featured_image'        => __( 'Featured Image', 'csismag' ),
		'set_featured_image'    => __( 'Set featured image', 'csismag' ),
		'remove_featured_image' => __( 'Remove featured image', 'csismag' ),
		'use_featured_image'    => __( 'Use as featured image', 'csismag' ),
		'insert_into_item'      => __( 'Insert into issue', 'csismag' ),
		'uploaded_to_this_item' => __( 'Uploaded to this issue', 'csismag' ),
		'items_list'            => __( 'Issues list', 'csismag' ),
		'items_list_navigation' => __( 'Issues list navigation', 'csismag' ),
		'filter_items_list'     => __( 'Filter issues list', 'csismag' ),
	);
	$args = array(
		'label'                 => __( 'Issue', 'csismag' ),
		'description'           => __( 'Each post represents one issue in the CSIS Magazine.', 'csismag' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-format-gallery',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	register_post_type( 'issues', $args );

}
add_action( 'init', 'csismag_cpt_issues', 0 );
