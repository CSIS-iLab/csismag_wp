<?php
/**
 * CSIS Mag functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package CSIS iLab
 * @subpackage @package CSISMag
 * @since 1.0.0
 */

/**
 * Table of Contents:
 * Theme Support
 * Required Files
 * Register Styles
 * Register Scripts
 * Register Menus
 * WP Body Open
 * Register Sidebars
 * Modify Excerpt
 */

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function csismag_theme_support() {

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Set content-width.
	global $content_width;
	if ( ! isset( $content_width ) ) {
		$content_width = 680;
	}

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// Set post thumbnail size.
	set_post_thumbnail_size( 750, 9999 );

	// Add custom image size used in Cover Template.
	add_image_size( 'csismag-fullscreen', 1980, 9999 );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'gallery',
			'caption',
			'script',
			'style',
		)
	);

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on CSIS Mag, use a find and replace
	 * to change 'csismag' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'csismag' );

	// Add support for full and wide align images.
	add_theme_support( 'align-wide' );

	/* Disable custom font sizes, colors, gradients in Blocks */
	add_theme_support( 'editor-font-sizes', array() );
	add_theme_support( 'disable-custom-font-sizes' );
	add_theme_support( 'disable-custom-colors' );
	add_theme_support( 'editor-color-palette' );
	add_theme_support( 'disable-custom-gradients' );

	/*
	 * Adds starter content to highlight the theme on fresh sites.
	 * This is done conditionally to avoid loading the starter content on every
	 * page load, as it is a one-off operation only needed once in the customizer.
	 */
	if ( is_customize_preview() ) {
		require get_template_directory() . '/inc/starter-content.php';
		add_theme_support( 'starter-content', csismag_get_starter_content() );
	}

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * Adds `async` and `defer` support for scripts registered or enqueued
	 * by the theme.
	 */
	$loader = new CSISMag_Script_Loader();
	add_filter( 'script_loader_tag', array( $loader, 'filter_script_loader_tag' ), 10, 2 );

}

add_action( 'after_setup_theme', 'csismag_theme_support' );

/**
 * REQUIRED FILES
 * Include required files.
 */
require get_template_directory() . '/inc/template-tags.php';

// Handle SVG icons.
require get_template_directory() . '/inc/svg-icons.php';

// Handle Customizer settings.
require get_template_directory() . '/classes/class-csismag-customize.php';

// Custom script loader class.
require get_template_directory() . '/classes/class-csismag-script-loader.php';

// Disable default taxonomies.
require get_template_directory() . '/inc/disable-default-taxonomies.php';

// Issues Custom Post Type.
require get_template_directory() . '/inc/cpt-issues.php';

// Series Custom Taxonomy.
require get_template_directory() . '/inc/tax-series.php';

// Breadcrumbs.
require get_template_directory() . '/inc/breadcrumbs.php';

// Custom Blocks.
require get_template_directory() . '/inc/custom-blocks.php';

// Shortcodes.
require get_template_directory() . '/inc/shortcodes.php';

/**
 * Register and Enqueue Styles.
 */
function csismag_register_styles() {

	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style( 'csismag-fonts', 'https://use.typekit.net/ngw0sua.css', array(), $theme_version );

	wp_enqueue_style( 'csismag-style', get_stylesheet_directory_uri() . '/style.min.css', array(), $theme_version );

	if ( is_front_page() || is_home() ) {
		wp_enqueue_style( 'csismag-style-home', get_stylesheet_directory_uri() . '/assets/css/pages/home.min.css', array(), $theme_version );
	}

	if ( is_archive() ) {
		wp_enqueue_style( 'csismag-style-archive', get_stylesheet_directory_uri() . '/assets/css/pages/archive.min.css', array(), $theme_version );
	}

	if ( is_singular() ) {
		wp_enqueue_style( 'csismag-style-single', get_stylesheet_directory_uri() . '/assets/css/pages/single.min.css', array(), $theme_version );
	}

	if ( 'post' === get_post_type() ) {
		wp_enqueue_style( 'csismag-style-post', get_stylesheet_directory_uri() . '/assets/css/pages/post.min.css', array(), $theme_version );

		wp_enqueue_style( 'csismag-style-post-blocks', get_stylesheet_directory_uri() . '/assets/css/blocks/post.min.css', array(), $theme_version );

		if ( is_page_template( 'templates/color.php' ) ) {
			wp_enqueue_style( 'csismag-style-post--color', get_stylesheet_directory_uri() . '/assets/css/pages/post--color.min.css', array(), $theme_version );
		}

		if ( is_page_template( 'templates/split.php' ) ) {
			wp_enqueue_style( 'csismag-style-post--split', get_stylesheet_directory_uri() . '/assets/css/pages/post--split.min.css', array(), $theme_version );
		}
	}

	if ( 'issues' === get_post_type() ) {
		wp_enqueue_style( 'csismag-style-issues', get_stylesheet_directory_uri() . '/assets/css/pages/issues.min.css', array(), $theme_version );

		wp_enqueue_style( 'csismag-style-issues-blocks', get_stylesheet_directory_uri() . '/assets/css/blocks/issues.min.css', array(), $theme_version );
	}

	// Add print CSS.
	wp_enqueue_style( 'csismag-print-style', get_template_directory_uri() . '/print.css', null, $theme_version, 'print' );

}

add_action( 'wp_enqueue_scripts', 'csismag_register_styles' );

/**
 * Register and Enqueue Scripts.
 */
function csismag_register_scripts() {

	$theme_version = wp_get_theme()->get( 'Version' );

	if ( ( ! is_admin() ) && is_singular() ) {
		wp_enqueue_script( 'csismag-iframeResizer', 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js', array(), $theme_version, true );

		wp_add_inline_script( 'csismag-iframeResizer', 'const iframes = iFrameResize({ log: false }, ".js-resize")' );

		// wp_script_add_data( 'csismag-iframeResizer', 'async', true );
	}

	wp_enqueue_script( 'csismag-vendor-js', get_template_directory_uri() . '/assets/js/vendor.min.js', array(), $theme_version, true );
	wp_script_add_data( 'csismag-vendor-js', 'async', true );

	wp_enqueue_script( 'csismag-custom-js', get_template_directory_uri() . '/assets/js/custom.min.js', array(), $theme_version, true );
	wp_script_add_data( 'csismag-custom-js', 'defer', true );

}

add_action( 'wp_enqueue_scripts', 'csismag_register_scripts' );

/**
 * Fix skip link focus in IE11.
 *
 * This does not enqueue the script because it is tiny and because it is only for IE11,
 * thus it does not warrant having an entire dedicated blocking script being loaded.
 *
 * @link https://git.io/vWdr2
 */
function csismag_skip_link_focus_fix() {
	// The following is minified via `terser --compress --mangle -- assets/js/skip-link-focus-fix.js`.
	?>
	<script>
	/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
}
add_action( 'wp_print_footer_scripts', 'csismag_skip_link_focus_fix' );


if ( ! function_exists( 'wp_body_open' ) ) {

	/**
	 * Shim for wp_body_open, ensuring backwards compatibility with versions of WordPress older than 5.2.
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
}

/**
 * Include a skip to content link at the top of the page so that users can bypass the menu.
 */
function csismag_skip_link() {
	echo '<a class="skip-link screen-reader-text" href="#site-content">' . __( 'Skip to the content', 'csismag' ) . '</a>';
}

add_action( 'wp_body_open', 'csismag_skip_link', 5 );

/**
 * Register widget areas.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function csismag_sidebar_registration() {

	// Arguments used in all register_sidebar() calls.
	$footer_shared_args = array(
		'before_title'  => '',
		'after_title'   => '',
		'before_widget' => '<div class="widget %2$s">',
		'after_widget'  => '</div>',
	);

	// Footer #1.
	register_sidebar(
		array_merge(
			$footer_shared_args,
			array(
				'name'        => __( 'Footer #1', 'csismag' ),
				'id'          => 'sidebar-1',
				'description' => __( 'Widgets in this area will be displayed in the first column in the footer.', 'csismag' ),
			)
		)
	);

	// Footer #2.
	register_sidebar(
		array_merge(
			$footer_shared_args,
			array(
				'name'        => __( 'Footer #2', 'csismag' ),
				'id'          => 'sidebar-2',
				'description' => __( 'Widgets in this area will be displayed in the second column in the footer.', 'csismag' ),
			)
		)
	);

	// Social Share
	register_sidebar(
		array(
				'name'        => __( 'Social Share', 'csismag' ),
				'id'          => 'social-share',
				'description' => __( 'Social Share Widget', 'csismag' ),
				'before_widget' => '',
				'after_widget' => ''
			)
	);

}

add_action( 'widgets_init', 'csismag_sidebar_registration' );

/**
 * Overwrite default more tag with styling and screen reader markup.
 *
 * @param string $html The default output HTML for the more tag.
 *
 * @return string $html
 */
function csismag_read_more_tag( $html ) {
	return preg_replace( '/<a(.*)>(.*)<\/a>/iU', sprintf( '<div class="read-more-button-wrap"><a$1><span class="faux-button">$2</span> <span class="screen-reader-text">"%1$s"</span></a></div>', get_the_title( get_the_ID() ) ), $html );
}

add_filter( 'the_content_more_link', 'csismag_read_more_tag' );

/** Modify Excerpt */
function new_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

/** Modify Excerpt Classes */
function csismag_filter_excerpt ($post_excerpt) {
	$class = 'post-block__excerpt';

	if ( !is_front_page() && is_singular() ) {
		$class = 'single__excerpt';
	}

  $post_excerpt = '<p class="' . $class . '">' . $post_excerpt . '</p>';
  return $post_excerpt;
}
add_filter ('get_the_excerpt','csismag_filter_excerpt');
