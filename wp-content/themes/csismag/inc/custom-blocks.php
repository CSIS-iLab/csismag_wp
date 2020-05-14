<?php
/**
 * CSIS Mag Custom Blocks
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

function csismag_keep_plugins_blocks( $allowed_block_types, $post ) {

	if ( $post->post_type !== 'post' && $post->post_type !== 'issues' ) {
		return $allowed_block_types;
	}

	// get widget blocks and registered by plugins blocks
	$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

	// in case we do not need widgets
	unset( $registered_blocks[ 'core/latest-comments' ] );
	unset( $registered_blocks[ 'core/archives' ] );
	unset( $registered_blocks[ 'core/categories' ] );
	unset( $registered_blocks[ 'core/latest-posts' ] );
	unset( $registered_blocks[ 'core/calendar' ] );
	unset( $registered_blocks[ 'core/rss' ] );
	unset( $registered_blocks[ 'core/search' ] );
	unset( $registered_blocks[ 'core/tag-cloud' ] );


	// now $registered_blocks contains only blocks registered by plugins, but we need keys only
	$registered_blocks = array_keys( $registered_blocks );

	// merge the whitelist with plugins blocks
	return array_merge( array(
		'core/image',
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/gallery',
		'core/table',
		'core/freeform',
		'core/html',
		'core/shortcode'
	), $registered_blocks );

}

add_filter( 'allowed_block_types', 'csismag_keep_plugins_blocks', 10, 2 );

function csismag_lzb_block_render_attributes( $attributes, $content, $block, $context ) {
    // Change value of custom attribute "my-attribute"
		$attributes['className'] .= 'csis-block';

    return $attributes;
}

add_filter( 'lzb/block_render/attributes', 'csismag_lzb_block_render_attributes', 10, 4 );
