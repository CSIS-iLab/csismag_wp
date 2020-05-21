<?php
/**
 * Custom template tags for this theme.
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Table of Contents:
 * Logo & Description
 * Post Meta
 * Menus
 * Classes
 * Archives
 * Miscellaneous
 */

/**
 * Logo & Description
 */
/**
 * Displays the site logo, either text or image.
 *
 * @param array   $args Arguments for displaying the site logo either as an image or text.
 * @param boolean $echo Echo or return the HTML.
 *
 * @return string $html Compiled HTML based on our arguments.
 */
function csismag_site_logo( $args = array(), $echo = true ) {
	$logo       = get_custom_logo();
	$site_title = get_bloginfo( 'name' );
	$contents   = '';
	$classname  = '';

	$defaults = array(
		'logo'        => '%1$s<span class="screen-reader-text">%2$s</span>',
		'logo_class'  => 'site-logo',
		'title'       => '<a href="%1$s">%2$s</a>',
		'title_class' => 'site-title',
		'home_wrap'   => '<h1 class="%1$s">%2$s</h1>',
		'wrap' => '<div class="%1$s faux-heading">%2$s</div>',
		'condition'   => ( is_front_page() || is_home() ) && ! is_page(),
	);

	$args = wp_parse_args( $args, $defaults );

	/**
	 * Filters the arguments for `csismag_site_logo()`.
	 *
	 * @param array  $args     Parsed arguments.
	 * @param array  $defaults Function's default arguments.
	 */
	$args = apply_filters( 'csismag_site_logo_args', $args, $defaults );

	if ( has_custom_logo() ) {
		$contents  = sprintf( $args['logo'], $logo, esc_html( $site_title ) );
		$classname = $args['logo_class'];
	} else {
		$contents  = sprintf( $args['title'], esc_url( get_home_url( null, '/' ) ), esc_html( $site_title ) );
		$classname = $args['title_class'];
	}

	$wrap = $args['condition'] ? 'home_wrap' : 'single_wrap';

	$html = sprintf( $args[ $wrap ], $classname, $contents );

	/**
	 * Filters the arguments for `csismag_site_logo()`.
	 *
	 * @param string $html      Compiled html based on our arguments.
	 * @param array  $args      Parsed arguments.
	 * @param string $classname Class name based on current view, home or single.
	 * @param string $contents  HTML for site title or logo.
	 */
	$html = apply_filters( 'csismag_site_logo', $html, $args, $classname, $contents );

	if ( ! $echo ) {
		return $html;
	}

	echo $html; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

}

/**
 * Displays the site description.
 *
 * @param boolean $echo Echo or return the html.
 *
 * @return string $html The HTML to display.
 */
function csismag_site_description( $echo = true ) {
	$description = get_bloginfo( 'description' );

	if ( ! $description ) {
		return;
	}

	$wrapper = '<div class="site-description">%s</div><!-- .site-description -->';

	$html = sprintf( $wrapper, esc_html( $description ) );

	/**
	 * Filters the html for the site description.
	 *
	 * @since 1.0.0
	 *
	 * @param string $html         The HTML to display.
	 * @param string $description  Site description via `bloginfo()`.
	 * @param string $wrapper      The format used in case you want to reuse it in a `sprintf()`.
	 */
	$html = apply_filters( 'csismag_site_description', $html, $description, $wrapper );

	if ( ! $echo ) {
		return $html;
	}

	echo $html; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

/**
 * Post Meta
 */

/**
 * Displays the post meta, including the issue number, post date, and whether it is a CSIS Mag original.
 *
 * @param array $args Arguments including whether to show the issue prefix or display CSIS Mag text.
 *
 * @return string $html The HTML to display.
 */
function csismag_post_meta( array $options = array()
) {

	// Require post ID.
	if ( ! get_the_ID() ) {
		return;
	}

	$args = array_merge(array(
		'show_issue' => true,
		'show_date' => true,
		'show_csismag_original' => true,
	 	'show_issue_prefix' => false
	), $options);

	$issue_output = '';
	$date_output = '';
	$csismag_output = '';

	if ( $args['show_issue'] ) {
		$issue = csismag_get_post_issue( array('has_prefix' => $args['show_issue_prefix'] ) );

		if ( $issue ) {
			$issue_output = '<li class="post-meta__issue">' . $issue . '</li>';
		}
	}

	if ( $args['show_date'] ) {
		$date_output = '<li class="post-meta__date">' . get_the_time( get_option( 'date_format' ) ) . '</li>';
	}

	if ( $args['show_csismag_original'] ) {
		$csismag_output = csismag_get_csismag_original();
	}

	if ( $issue_output === '' && $date_output === '' && $csismag_output === '' ) {
		return;
	}

	echo '<div class="post-meta"><ul class="post-meta__top">' . $issue_output . $date_output . '</ul>' . $csismag_output . '</div>';
}

/**
 * Displays the post authors. Uses CoAuthors Plus plugin to display guest authors in place of standard WP authors.
 *
 */
function csismag_authors() {
	if ( function_exists( 'coauthors' ) ) {
    $authors = coauthors( ', ', ', ', null, null, false );
	} else {
		$authors = get_the_author();
	}

	if ( !$authors ) {
		return;
	}

	echo '<div class="post-meta post-meta__authors"><span class="post-meta__label">Written by</span> <span class="post-meta__value">' . $authors . '</span></div>';
}

if (! function_exists('csismag_authors_list_extended')) :
	/**
	 * Prints HTML with short author list.
	 */
	function csismag_authors_list_extended()
	{
		global $post;

		if (function_exists('coauthors_posts_links')) {
			$authors = '<h2 class="heading">Authors</h2>';

			foreach (get_coauthors() as $coauthor) {
				$name = $coauthor->display_name;

				if ( $coauthor->website ) {
					$name = '<a href="' . $coauthor->website . '">' . $coauthor->display_name . '</a>';
				}

				$authors .= '<p class="post__authors-author">' . $name . ' ' . $coauthor->description . '</p>';
			}
		} else {
			$authors = the_author_posts_link();
		}
		return '<div class="post__authors">' . $authors . '</div>';
	}
endif;

/**
 * Get post issue number.
 *
 * Gets the issue number for the given post.
 *
 * @return string Issue Number.
 */
if ( ! function_exists('csismag_get_post_issue') ) {

	function csismag_get_post_issue( $args = array("is_link" => true, "has_prefix" => false ) ) {

		if ( 'issues' === get_post_type() ) {
			$number = get_field( 'issue_number' );
		} else {
			$issue = get_field( 'issue' );
			$number = get_field( 'issue_number', $issue->ID );
		}

		if ( !$number ) {
			return;
		}

		$prefix = '';
		if ( $args['has_prefix'] ) {
			$prefix = '<span class="post-meta__label">From</span> ';
		}

		if ( !$args['is_link'] ) {
			return $prefix. '<span class="post-meta__value">Issue ' . $number . '</span>';
		}

		return '<a href="' . esc_url( get_permalink( $issue->ID ) ) . '" class="post-meta__value">Issue ' . $number . '</a>';
	}
}

/**
 * Gets CSISMag Original meta if it applies.
 *
 * @return string CSISMag Original.
 */
if ( ! function_exists('csismag_get_csismag_original') ) {

	function csismag_get_csismag_original() {

		if ( 'post' !== get_post_type() ) {
			return;
		}

		$is_original = get_field( 'is_csismag_original' );

		if ( !$is_original ) {
			return;
		}

		return '<div class="post-meta__original">CSISMag Original</div>';
	}
}

/**
 * Gets iLab Language for posts.
 *
 * @return string iLab Language.
 */
if ( ! function_exists('csismag_get_ilab_language') ) {

	function csismag_get_ilab_language() {

		if ( 'post' !== get_post_type() ) {
			return;
		}

		$include_lang = get_field( 'include_ilab_language' );

		if ( !$include_lang ) {
			return;
		}

		return '<div class="post__ilab"><h2 class="heading">Development & Design</h2><p>This CSIS<span style="font-style: italic; ">Mag</span> article is a product of the <a href="https://www.csis.org/programs/dracopoulos-ideas-lab">Andreas C. Dracopoulos iDeas Lab</a>, the in-house digital, multimedia, and design agency at the Center for Strategic and International Studies.</p></div>';
	}
}

/**
 * Gets Post Notes if notes field is filled out.
 *
 * @return string Post Notes.
 */
if ( ! function_exists('csismag_get_notes') ) {

	function csismag_get_notes() {

		if ( 'post' !== get_post_type() ) {
			return;
		}

		$notes = get_field( 'notes' );

		if ( !$notes ) {
			return;
		}

		return '<div class="post__notes"><h2 class="heading">Notes</h2>' . $notes . '</div>';
	}
}

/**
 * Classes
 */
/**
 * Add No-JS Class.
 * If we're missing JavaScript support, the HTML element will have a no-js class.
 */
function csismag_no_js_class() {

	?>
	<script>document.documentElement.className = document.documentElement.className.replace( 'no-js', 'js' );</script>
	<?php

}

add_action( 'wp_head', 'csismag_no_js_class' );

/**
 * Add conditional body classes.
 *
 * @param array $classes Classes added to the body tag.
 *
 * @return array $classes Classes added to the body tag.
 */
function csismag_body_classes( $classes ) {

	global $post;
	$post_type = isset( $post ) ? $post->post_type : false;

	// Check whether we're singular.
	if ( is_singular() ) {
		$classes[] = 'singular';
	}

	// Check for post thumbnail.
	if ( is_singular() && has_post_thumbnail() ) {
		$classes[] = 'has-post-thumbnail';
	} elseif ( is_singular() ) {
		$classes[] = 'missing-post-thumbnail';
	}

	// Check whether we're in the customizer preview.
	if ( is_customize_preview() ) {
		$classes[] = 'customizer-preview';
	}

	// Check if posts have single pagination.
	if ( is_single() && ( get_next_post() || get_previous_post() ) ) {
		$classes[] = 'has-single-pagination';
	} else {
		$classes[] = 'has-no-pagination';
	}

	// Slim page template class names (class = name - file suffix).
	if ( is_page_template() ) {
		$classes[] = basename( get_page_template_slug(), '.php' );
	}

	// Page has light theme
	if ( is_single() && 'issues' === $post_type ) {
		$classes[] = 'theme--light';
	}

	if ( get_field( 'use_light_theme' ) ) {
		$classes[] = 'theme--light';
	}

	return $classes;

}

add_filter( 'body_class', 'csismag_body_classes' );

/**
 * Archives
 */
/**
 * Filters the archive title and styles the word before the first colon.
 *
 * @param string $title Current archive title.
 *
 * @return string $title Current archive title.
 */
function csismag_get_the_archive_title( $title ) {

	$regex = apply_filters(
		'csismag_get_the_archive_title_regex',
		array(
			'pattern'     => '/(\A[^\:]+\:)/',
			'replacement' => '<span class="color-accent">$1</span>',
		)
	);

	if ( empty( $regex ) ) {

		return $title;

	}

	return preg_replace( $regex['pattern'], $regex['replacement'], $title );

}

add_filter( 'get_the_archive_title', 'csismag_get_the_archive_title' );

/**
 * Miscellaneous
 */
/**
 * Toggle animation duration in milliseconds.
 *
 * @return integer Duration in milliseconds
 */
function csismag_toggle_duration() {
	/**
	 * Filters the animation duration/speed used usually for submenu toggles.
	 *
	 * @since 1.0
	 *
	 * @param integer $duration Duration in milliseconds.
	 */
	$duration = apply_filters( 'csismag_toggle_duration', 250 );

	return $duration;
}

/**
 * Get unique ID.
 *
 * This is a PHP implementation of Underscore's uniqueId method. A static variable
 * contains an integer that is incremented with each call. This number is returned
 * with the optional prefix. As such the returned value is not universally unique,
 * but it is unique across the life of the PHP process.
 *
 * @see wp_unique_id() Themes requiring WordPress 5.0.3 and greater should use this instead.
 *
 * @staticvar int $id_counter
 *
 * @param string $prefix Prefix for the returned ID.
 * @return string Unique ID.
 */
function csismag_unique_id( $prefix = '' ) {
	static $id_counter = 0;
	if ( function_exists( 'wp_unique_id' ) ) {
		return wp_unique_id( $prefix );
	}
	return $prefix . (string) ++$id_counter;
}
