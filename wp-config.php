<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'CQks/taOhQPngaQJ+Zm3JbrOj6ssAmWCF3mJ1m8H8Aqs2ybCGsiSKUpdSbapQUafQittYKKlVqZELjTPEPWfYQ==');
define('SECURE_AUTH_KEY',  'mskqjcViT2XJa++ZNWAxdiHkAhtHyiKpQAyKZ4ugCfC0MVy/+d6q5S6oCF3swZaEIOJc6QlrtgqccezYn/gy3g==');
define('LOGGED_IN_KEY',    'Y/7qRsLseVExontAnoJ/AZfyzrKHdgZdsksjwFCaxlyvhKeMb7x3/uAb8L5E4p9/PMNmJuelFHzNLcj9Q33suA==');
define('NONCE_KEY',        'BgsH+0+EA9zihcca/JgO6LqCJcu9E2YLTJBrY7GCucaGmc/ZNQAtvCJ/FBIGUuX6fNJoVjn4tjJTjLi+u9CJyw==');
define('AUTH_SALT',        '62UXFAfoVTOyTGoEPvtc6r5Wi4+OUpifA7yOhwakv1ujeQtnMws0opYFMRvTBqaSWIKkL/rgXcMfPhJhEQ752w==');
define('SECURE_AUTH_SALT', 'K8x85aNIE/E8WN1PfZen65BbN3tfRnFJEE+mlWuBTlzrs6lu1sFM9vaC6ZMryIfgYnckVDvRmc3k5j7AeRurZw==');
define('LOGGED_IN_SALT',   'PUA097EpVrhJEiawd7XKuP+V8ZkwnG+C7iyhST4xqAiLVasbWI3JwwCLcCG+suBlezUH0u0zqOp3ezPOra0MzA==');
define('NONCE_SALT',       'NC84ROc9TOTvZjiMxGvqWvaA6jC4tXPUwgJG2/T5X8xLdpH0/LA3j0ML5Rk9dSj9b/NHfLPCNi44zlpFIQ+qCg==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
