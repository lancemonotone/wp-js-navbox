<?php if(class_exists('Meerkat16')){?>
<!-- 	meerkat 16 search UI -->

    <form class="wms-navbox-form" action="<?php WMS_Navbox_Helper::getInstance()->print_action() ?>">
        <input data-role="none" class="wms-navbox-input" tabindex="1" id="input_<?php echo $this->id ?>" name="q" type="text" placeholder="<?php WMS_Navbox_Helper::getInstance()->print_placeholder(); ?>"/>
         <input data-role="none" class="wms-navbox-button" tabindex="1" type="submit" value="<?php _e( 'Go' ) ?>"/>
		<span class="wms-icon-search"><span class="search-text">SEARCH</span></span><!-- .wms-navbox-cancel -->
    </form><!-- .wms-navbox-search -->
    
    
<?php }else { ?>
<!-- all others Search UI -->

    <form class="wms-navbox-form" action="<?php WMS_Navbox_Helper::getInstance()->print_action()?>">
		<input data-role="none" class="wms-navbox-input" tabindex="1" id="input_<?php echo $this->id?>" name="q" type="text" placeholder="<?php WMS_Navbox_Helper::getInstance()->print_placeholder(); ?>"/>
		<input data-role="none" class="wms-navbox-button" tabindex="1" type="submit" value="<?php _e('Go')?>"/>
		<div class="wms-navbox-cancel" tabindex="1" title="<?php _e('Reset search')?>"></div><!-- .wms-navbox-cancel -->
	</form><!-- .wms-navbox-search -->

<?php } ?>