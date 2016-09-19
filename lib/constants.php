<?php
/**
 * Constants used by this plugin
 * 
 * @package Williams_Navbox
 * 
 * @author Williams Web Team
 * @version 1.0.0
 * @since 1.0.0
 */
$file = __FILE__;
if(!defined('WMS_WIDGET_PREFIX')) define( 'WMS_WIDGET_PREFIX', '. ');

// The current version of this plugin
if( !defined( 'WMSNAVBOX_VERSION' ) ) define( 'WMSNAVBOX_VERSION', '1.0.0' );

// The directory the plugin resides in
if( !defined( 'WMSNAVBOX_DIRNAME' ) ) define( 'WMSNAVBOX_DIRNAME', dirname( dirname( $file ) ) );

// The URL path of this plugin
if( !defined( 'WMSNAVBOX_URLPATH' ) ) define( 'WMSNAVBOX_URLPATH', plugin_dir_url( '' ) . plugin_basename( WMSNAVBOX_DIRNAME ) );

if( !defined( 'IS_AJAX_REQUEST' ) ) define( 'IS_AJAX_REQUEST', ( !empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) == 'xmlhttprequest' ) );