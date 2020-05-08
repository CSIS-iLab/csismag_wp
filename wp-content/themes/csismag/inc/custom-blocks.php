<?php
/**
 * CSIS Mag Custom Blocks
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

function csismag_lzb_block_render_attributes( $attributes, $content, $block, $context ) {
    // Change value of custom attribute "my-attribute"
    $attributes['className'] .= 'csis-block';

    return $attributes;
}

add_filter( 'lzb/block_render/attributes', 'csismag_lzb_block_render_attributes', 10, 4 );
