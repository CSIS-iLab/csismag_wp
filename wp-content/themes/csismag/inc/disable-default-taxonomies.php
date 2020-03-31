<?php
/**
 * CSIS Mag Custom CSS
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Disable default category & tags taxonomies.
 *
 *
*/
function csismag_unregister_taxonomy(){
 global $wp_taxonomies;

 $taxonomies = array( 'category', 'post_tag' );

 foreach( $taxonomies as $taxonomy ) {
  if ( taxonomy_exists( $taxonomy) )
    unset( $wp_taxonomies[$taxonomy]);
 }
}
add_action( 'init', 'csismag_unregister_taxonomy');
