<?php
/**
 * Template functions for this plugin
 * 
 * Place all functions that may be usable in theme template files here.
 * 
 * @package Williams_Navbox
 * 
 * @author Williams Web Team
 * @version 1.0.0
 * @since 1.0.0
 */
class WMS_Navbox_Helper{
	
    private static $instances = array();
    protected function __construct() {}
    protected function __clone() {}
    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }

    public static function getInstance(){
        $cls = get_called_class(); // late-static-bound class name
        if (!isset(self::$instances[$cls])) {
            self::$instances[$cls] = new self();
        }
        return self::$instances[$cls];
    }
    
	/**
     * Build and write files for json data
     *
     * @param string $flavors
     * @param int $time
     */
    function build_json_files($flavors, $time){
        foreach((array)$flavors as $key => $flavor){
    	    $file = WMSNAVBOX_DIRNAME . '/data/' . $flavor . '.json';
    	    if(!file_exists($file) || (time() - filemtime($file) > $time)){ // if not...
    	        // Build json data.
    	        $data = call_user_func(array(&$this, build_json_ . $flavor));
    	        // Write json to file
    	        if($f = fopen($file, 'w')){

    	            //jxgcompressed
    	            $data = $this->jxgcompress($data);

    	            fwrite($f, $data);
    	            fclose($f);
    	        }
    	    }
	    }
	}
	
	function jxgcompress($data) {
	    if ($data) {
	        $base64 = base64_encode(gzcompress(rawurlencode($data),9));
	        return $base64;
	    } else {
	        throw new Exception("No data to compress");
	    }
    }
    
    function jxgdecompress($data){
        if ($data) {
	        $original = rawurldecode(gzuncompress(base64_decode($data)));
	        return $original;
	    } else {
	        throw new Exception("No data to decompress");
	    }
    }
	
	function build_json_flexiform(){
	    $args = array(
    	    'schemaID' => 12076,
    	    'searchFields' => array(26549),
    	    'searchString' => 'dir: search',
	    );
	    $results = flexiform_get_data($args);
	    $json = array();
	    foreach($results as $result){
	        if($result != null){
	            $tokens = '';
	            // join search terms to title (which is also searchable)
	            $tokens = $result['Title']['value'] .','. $result['Search terms']['value'];
	            // remove illegal characters
	            $tokens = str_replace(array(')','('), '', $tokens);
	            // split multiword tokens
	            $tokens = str_replace(' ', ',', $tokens);
	            // convert to array
	            $tokens = explode(',', $tokens);
	            // remove elements with 0 length
	            $tokens = array_filter($tokens, 'strlen');
	            // remove duplicate elements
	            $tokens = array_unique($tokens, SORT_STRING);
	            // remove &
	            $tokens = array_diff($tokens, array('&'));
	            // reindex the array
	            $tokens = array_values($tokens);
	            // put values into json array
    		    array_push($json, array(
        	           //'value'    => $result['Title']['value'],
        	           //'tokens'    => $tokens,
        	           //'url'    => $result['URL']['value']
			   
        	           'v'    => $result['Title']['value'],
        	           't'    => $tokens,
        	           'u'    => $result['URL']['value']
    	           	)
    	            );
        	}
	    }
	    
	    return json_encode($json);
	}

	function build_json_ldap(){
	    require_once WMS_EXT_LIB . '/ldap/wms-directory.class.php';
	    if(class_exists('WilliamsPeopleDirectory')){
	        $wms_dir = new WilliamsPeopleDirectory();
	        $directory_options = get_option($wms_dir->option_name); //Saved directory options
	        $department_list   = $directory_options['departments']; //Full list of departments
	        $ldap 			    = $wms_dir->ldap; //LDAP object
	        
	        $json = array();
	        
	        foreach ($department_list as $id => $dept) {
	            $ldap->get_records('department='.$id);
	            if($records = $ldap->facstaff_records){
		            foreach ($records as $r) {
		                $json[$r['first_name'] . ' ' . $r['last_name']] = array(
	            	           //'value'     => $r['first_name'] . ' ' . $r['last_name'],
	            	           //'tokens'    => array_filter(array($r['first_name'], $r['last_name']), 'strlen'),
	            	           //'url'       => 'http://www.williams.edu/people/?s_directory=' . urlencode($r['first_name'] . ' ' . $r['last_name'])
				   //'url'       => urlencode($r['first_name'] . ' ' . $r['last_name'])
	        	        
	            	           'v'    => $r['first_name'] . ' ' . $r['last_name'],
	            	           //'t'    => array_filter(array($r['first_name'], $r['last_name']), 'strlen'),
	            	           //'u'    => urlencode($r['first_name'] . ' ' . $r['last_name'])
	        	        );
		            }
		        }
	        }

	        return json_encode($json);
	    } else {
	        return false;
	    }
	}
	
	// UTILITY
	
	function print_placeholder(){
	    echo !wp_is_mobile() ? __('Search &amp; Directories (alt+s)') : __('Search &amp; Directories');
	}
	
	/**
	 * Print form action based on Theme and Server.
	 * Live Meerkat: http://www.williams.edu/search/
	 * Stage Meerkat: http://stage.williams.edu/search/
	 * Dev Meerkat: http://dev.williams.edu/search/
	 * Purple Theme and others should go to site url
	 */
	function print_action(){
	    $is_meerkat = Wms_Admin::instance()->is_meerkat_theme;
	    echo $is_meerkat ? Wms_Server::instance()->www . '/search/' : home_url() . "/";
	}
}