<?php
/**
 * @package WMS_Navbox
 * @uses Advanced Custom Fields plugin
 */

add_action('widgets_init', create_function('', 'return register_widget("WMS_Navbox_Widget");'));

class WMS_Navbox_Widget extends WP_Widget {
    var $debug      = 0;
    var $_parent    = 'WMS_Navbox';
    var $label      = 'Williams Navbox';
    var $widgetname = 'WMS_Navbox_Widget';
    var $namespace  = 'wms_navbox';
	var $classname  = 'wms-navbox';
	var $version    = '1.0.8';
	var $valueKey   = 'v';
	var $tokensKey  = 't';
	var $urlKey     = 'u';
	var $peopleUrl  = 'http://www.williams.edu/people/?s_directory=';
	    
	function __construct(){
		$description = 'Use javascript to match a string typed into the search box against a set of keywords and page titles.';
        $label       =  WMS_WIDGET_PREFIX . $this->label;
        $widget_ops  = array('classname' => $this->classname. ' cf', 'description' => __($description) );
        $control_ops = array('width' => WMS_WIDGET_WIDTH, 'height' => WMS_WIDGET_HEIGHT);
		
		parent::__construct( 
			$this->namespace, 
			_($label),
			$widget_ops,
			$control_ops
		);
		global $WMS_Navbox;
		$this->_parent = $WMS_Navbox;
		$this->add_hooks();
	}
	
	/**
     * Add in various hooks
     * 
     * Place all add_action, add_filter, add_shortcode hook-ins here
     */
	function add_hooks(){
		// Register front-end js and styles for this plugin
		add_action( 'wp_enqueue_scripts', array( &$this, 'wp_register_scripts' ), 1 );
		add_action( 'wp_enqueue_scripts', array( &$this, 'wp_register_styles' ), 1 );

        // Register admin js and styles for this plugin
        add_action( 'admin_head', array( &$this, 'wp_register_scripts' ), 1 );
        add_action( 'admin_head', array( &$this, 'wp_register_styles' ), 1 );

        // Add Shortcode for widget
		add_shortcode('the_widget', array(&$this, 'the_shortcode'));
		
		// Add ajax action
		add_action("wp_ajax_typeahead_search", array(&$this, "typeahead_search"));
        add_action("wp_ajax_nopriv_typeahead_search", array(&$this, "typeahead_search"));
	}
	
	/**
     * Register scripts used by this plugin for enqueuing elsewhere
     * 
     * @uses wp_register_script()
     */
    function wp_register_scripts() {
        global $isIphone; // Iphone chokes so we disable it.
        
        $name = $this->classname.'-widget';
        if(!is_admin()){
            WMS_Navbox_Helper::getInstance()->build_json_files(array('flexiform','ldap'), DAY_IN_SECONDS);
	        // order LZString, JSXCompressor, jQuery Watch, Hogan, Typeahead, Widget
	        if($this->debug){
    	        wp_enqueue_script( $name . '-typeahead', WMSNAVBOX_URLPATH . '/js/typeahead.js', array( 'jquery' ), $this->version, true );
    	        wp_enqueue_script( $name, WMSNAVBOX_URLPATH . '/js/widget.js', array( 'jquery', $name . '-typeahead', 'jquery-hotkeys' ), $this->version, true );
	        } else {
	           wp_enqueue_script( $name, WMSNAVBOX_URLPATH . '/js/widget.min.js', array( 'jquery', 'jquery-hotkeys' ), $this->version, true );
	        }
        
	        $file_flexiform = file_get_contents(WMSNAVBOX_DIRNAME . '/data/flexiform.json');
	        $file_ldap = file_get_contents(WMSNAVBOX_DIRNAME . '/data/ldap.json');
	        $data_flexiform = json_decode(WMS_Navbox_Helper::getInstance()->jxgdecompress($file_flexiform));
	        $data_ldap = json_decode(WMS_Navbox_Helper::getInstance()->jxgdecompress($file_ldap));
	        
	        wp_localize_script($name, 'WMS_NAVBOX_OBJECT', array(
        			'dataurl'    => WMSNAVBOX_URLPATH . '/data/',
        			'ajaxurl'    => admin_url( 'admin-ajax.php' ),
                    'valueKey'   => $this->valueKey,
                    'tokensKey'  => $this->tokensKey, 
                    'urlKey'     => $this->urlKey,
                    'peopleUrl'  => $this->peopleUrl,
                    'isIphone'   => $isIphone,
                    'flexiform'  => $data_flexiform,
                    'ldap'       => $data_ldap
        		)
            );
        }
    }
    
    /**
     * Register styles used by this plugin for enqueuing elsewhere
     * 
     * @uses wp_register_style()
     */
    function wp_register_styles() {
        // Admin Stylesheet
        $name = $this->classname.'-widget';
        if(!is_admin()){
	        wp_enqueue_style( $name, WMSNAVBOX_URLPATH . '/css/widget.css', array(), $this->version, 'screen' );
        }
    }
    
    /**
     * Widget Display
     *
     * @param Array $args Settings
     * @param Array $instance Widget Instance
     */
	function widget( $args, $instance ) {
		extract( $args, EXTR_SKIP );
		$after_widget = '</div>';

		echo $before_widget;
		
		include( plugin_dir_path( __FILE__ ) . '/views/view-widget.php' );

		echo $after_widget;

	}
	
	/**
	 * Widgets page form submission logic
	 *
	 * @param Array $new_instance
	 * @param Array $old_instance
	 * @return unknown
	 */
	function update( $new_instance, $old_instance ) {
	    
	    foreach( $new_instance as $key => $val ) {
	        $data[$key] = $this->_parent->_sanitize( $val );
	    }

	    return $data;
	}

	/**
	 * Widgets page form controls
	 *
	 * @param Array $instance
	 */
	function form( $instance ) {
	
    	//Set up some default widget settings.
    	$defaults = $this->defaults;
    	
    	$instance = wp_parse_args( (array) $instance, $defaults ); 
    	
    	require('views/view-admin.php');
	}

	/**
	 * Widget shortcode
	 *
	 * @param Array $atts
	 * @return String Widget HTML
	 */
	function the_shortcode($atts) {
	    static $widget_i = 0;
	    global $wp_widget_factory;
	    
	    $defaults = shortcode_atts($this->defaults, $atts);
	    
	    $instance = wp_parse_args( (array) $instance, $defaults ); 
	    
	    if (!is_a($wp_widget_factory->widgets[$this->widgetname], $this->widgetname)){
	        $wp_class = 'WP_Widget_'.ucwords(strtolower($class));
	        
	        if (!is_a($wp_widget_factory->widgets[$wp_class], 'WP_Widget')){
	            return '<p>'.sprintf(__("%s: Widget class not found. Make sure this widget exists and the class name is correct"),'<strong>'.$class.'</strong>').'</p>';
	        } else {
	            $class = $wp_class;
	        }
	    }
	    
	    ob_start();
	    
	    the_widget($this->widgetname, $instance, array(
	    	'widget_id'     => $this->classname.'-'.$widget_i,
	        'before_widget' => '<div id="'.$this->namespace.'-'.$widget_i++.'" class="widget '.$this->classname.' cf">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="title">',
			'after_title'   => '</h2>'
	    ));
	    
	    return ob_get_clean();
	    
	}
	
	function typeahead_search(){
	    if ( isset( $_REQUEST['fn'] ) && 'flexiform' == $_REQUEST['fn'] ) {
	        $file = file_get_contents(WMSNAVBOX_DIRNAME . '/data/flexiform.json');
	        $tokensKey = $this->tokensKey;
	    }else if (isset( $_REQUEST['fn'] ) && 'ldap' == $_REQUEST['fn']){
	        $file = file_get_contents(WMSNAVBOX_DIRNAME . '/data/ldap.json');
	        $tokensKey = $this->valueKey;
	    }
	    if($file){
    	    $data = WMS_Navbox_Helper::getInstance()->jxgdecompress($file);
    	    $data = json_decode($data,true);
    	    $results = $this->searchJSON($data, $_REQUEST['terms'], $tokensKey);
    	    echo json_encode( $results );
	    }else{
	        echo "";
	    }
	    die();
	}
	
	function searchJSON($obj, $term, $tokensKey){
	    $results = array_filter($obj, function ($x) use ($term, $tokensKey){
	        foreach((array)$x[$tokensKey] as $token){
	            if (is_int(stripos($token, $term))) {
	                return true;
	            }
	        }
	        return false;
	    });
	    return $results;
	}
}
?>
