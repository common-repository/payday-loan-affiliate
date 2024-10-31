<?php
/*
Plugin Name: Payday Loan Affiliate
Plugin URI: http://www.winwinhost.com/
Description: Earn money by generating leads with your wordpress site. This plugin adds a Paday Loan form to your site that you can customize in many ways. People who want a loan fill in and submit this form, thus generating leads that your site will send to the WinWinHost Affiliate Network, where the information will be validated and we will pay you for each valid lead. To use this plugin you need a publisher account on the <a href="http://affiliate.winwinhost.com/publisher-sign-up.php">WinWinHost Affiliate Network</a>.
Version: 1.1
Author: WinWinHost
Author URI: http://www.winwinhost.com/
*/

if(key_exists('publisher',$_GET) && key_exists('website',$_GET) && key_exists('link',$_GET)){
    setcookie('AWC',$_GET['publisher']."|".$_GET['website']."|".$_GET['link'],time()+(24*3600));
    header("Location: ".str_replace("?publisher=".$_GET['publisher']."&website=".$_GET['website']."&link=".$_GET['link'],"",$_SERVER['HTTP_X_REWRITE_URL']));
    exit();
}

if(key_exists("content", $_GET) && $_GET['content']=="css"){
	css_content();
}
if(key_exists("hide_donate",$_GET) && $_GET['hide_donate']=="1"){
	update_option('leads_show_donate','0');
}

function leads_install () {
	global $wpdb;
	
	add_option("leads_unique_key");
    
    add_option("leads_small_form_width","auto");
    add_option("leads_big_form_height","450px");
    add_option("leads_big_form_width","100%");
    add_option("leads_small_form_other_css");
    add_option("leads_big_form_other_css");
    add_option("leads_big_form_url", get_bloginfo('url')."/payday-loan/");
    add_option("leads_widget_title", "Get Your Payday Loan");
    add_option("leads_show_donate","1");
    
	$wpdb->query("INSERT INTO $wpdb->posts (`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES (1, '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."', '[leads_form]', 'Payday Loan', '', 'publish', 'open', 'open', '', 'payday-loan', '', '', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."', '', 0, '', 0, 'page', '', 0)");
	
	$page_id = $wpdb->insert_id;
	
	add_option('leads_page_id',$page_id);
	
}

function leads_uninstall(){
	
	global $wpdb;
	
	$wpdb->query("DELETE FROM $wpdb->posts WHERE ID = ".get_option('leads_page_id'));
    
    delete_option('leads_page_id');
	delete_option("leads_unique_key");

    delete_option("leads_small_form_width");
    delete_option("leads_big_form_height");
    delete_option("leads_big_form_width");
    delete_option("leads_small_form_other_css");
    delete_option("leads_big_form_other_css");
    delete_option("leads_big_form_url");
    delete_option("leads_widget_title");
    delete_option("leads_show_donate");
    	
}

function leads_admin_menu(){
	add_options_page('Payday Loan Affiliate', 'Payday Loan Affiliate', 8, basename(__FILE__), 'leads_options');
}

function leads_options(){

$plugin_path = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));

global $wpdb;
$errors = array();
if($_POST){
	foreach($_POST as $key=>$value){
		if(!is_array($value)){
			update_option($key, $value);
			if(strlen($value)==0){
				$errors[] = $key;
			}	
		}else{
			update_option($key, serialize($value));
		}
	}
}

$td_title = "text-align:center;font-weight:bold;background-color:#888;color:#fff;padding:3px";
?>
<div class="wrap">
<h2>Payday Loan Affiliate</h2>
<br />
	<div style="float: left;width:800px">
    <?if(get_option('leads_show_donate')=='1'){?>
        <div style="float:right">
    	   <a href="<?=$_SERVER['REQUEST_URI']."&hide_donate=1"?>">hide</a>
        </div>
    	<div style="float:right">
    		<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
    		<input type="hidden" name="cmd" value="_s-xclick" />
    		<input type="hidden" name="hosted_button_id" value="EP68S8BRUTNE6" />
    		<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
    		<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
    		</form>
    	</div>
    	<br clear="both" />
    <?}?>
	<form action = "" method="post">
    	<table class="form-table">
        	<tr><td colspan="2" style="<?=$td_title?>">Access information</td></tr>
        	<tr>
                <td colspan="2"> 
                    <div id="key_tooltip" style="position: absolute;display:none;background:#FFFAB5;border: 1px solid #858585;margin: 30px 0 0 130px;width:400px;padding:10px;">
                        To find the Unique Key, please follow these steps:
                            <ul style="list-style: square;margin:10px 0 0 15px">
                                <li>Log into your account on <strong>http://affiliate.winwinhost.com/</strong> (click the link on the right to create one).</li>
                                <li>In the left column of the <strong>Dashboard</strong> you will see this website in the "<strong>My Websites</strong>" table (if not, click "Add Website" and fill in the information to add it).</li>
                                <li>Click "<strong>details...</strong>" near the name of this website</li>
                                <li>On the upper part of the right column you will see the <strong>Unique Key</strong>.</li>
                            </ul>
                    </div>
                    <span <?=in_array('leads_unique_key', $errors)?' style="color:red"':''?>>Website Unique Key from WinWinHost Affiliate Network:</span>
                    <a href="javascript:void(0)" onmouseover="document.getElementById('key_tooltip').style.display = 'block'" onmouseout="document.getElementById('key_tooltip').style.display = 'none'"><img src="<?php echo $plugin_path?>img/help.png" /></a> 
                    <span style="float:right"><a target="_blank" href="http://affiliate.winwinhost.com/publisher-sign-up.php">Don't have an account ? Click here !</a></span>
                </td>
            </tr>
        	<tr><td colspan="2"><input type="text" name="leads_unique_key" value="<?=get_option('leads_unique_key')?>" style="width:100%" /></td></tr>
        	<tr><td colspan="2" style="<?=$td_title?>">Custom CSS</td></tr>
        	<tr><td colspan="2">Small form width</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_small_form_width" value="<?=get_option('leads_small_form_width')?>" style="width:100%" /></td></tr>
        	<tr><td colspan="2">Small form other CSS</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_small_form_other_css" value="<?=get_option('leads_small_form_other_css')?>" style="width:100%" /></td></tr>
        	<tr><td colspan="2">Large form width</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_big_form_width" value="<?=get_option('leads_big_form_width')?>" style="width:100%" /></td></tr>
        	<tr><td colspan="2">Large form height</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_big_form_height" value="<?=get_option('leads_big_form_height')?>" style="width:100%" /></td></tr>
        	<tr><td colspan="2">Large form other CSS</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_big_form_other_css" value="<?=get_option('leads_big_form_other_css')?>" style="width:100%" /></td></tr>
            <tr><td colspan="2" style="<?=$td_title?>">Other</td></tr>
            <tr><td colspan="2">Small Form Widget Title</td></tr>
            <tr><td colspan="2"><input type="text" name="leads_widget_title" value="<?=get_option('leads_widget_title')?>" style="width:100%" /></td></tr>
            <tr><td colspan="2">Large Form URL</td></tr>
        	<tr><td colspan="2"><input type="text" name="leads_big_form_url" value="<?=get_option('leads_big_form_url')?>" style="width:100%" /></td></tr>
    	   <tr><td colspan="2"><input type="submit" value="Save" style="width:100%" /></td></tr>
        </table>
	</form>
	</div>
</div>
<?	
}

function leads_css_link(){
	$plugin_path = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));
?>
<link rel="stylesheet" href="<?php echo $plugin_path?>css/calendar.css" type="text/css" media="screen" />
<style type="text/css">
    table.payday_form_table {width:100%}
    table.payday_form_table input[type="text"], table.payday_form_table input[type="submit"], table.payday_form_table input[type="button"]{width:97%}
    table.payday_form_table select{width: 100%;}
    table.payday_form_table td{padding:3px}
    table.payday_form_table td.right{text-align:right}
    div.form_header{width:100%}
    div.payday_form_small {width:<?php echo get_option("leads_small_form_width")?>;<?php echo get_option("leads_small_form_other_css")?>}
        div.payday_form_small input[type="text"], div.payday_form_small input[type="submit"], div.payday_form_small select{width:100%}
    #form_callback{height: <?php echo get_option("leads_big_form_height")?>;width:<?php echo get_option("leads_big_form_width")?>;<?php echo get_option("leads_big_form_other_css")?>}
    img.loading{margin:130px 0 0 250px}
    
    div.d_tooltip{position: absolute;text-align:left;font-size:80%;margin-left:50px;display:none;background:#FFFAB5;border: 1px solid #858585;padding:10px;}
</style>
<?
}

function leads_js_link(){
	$plugin_path = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));
	?>
    <script type="text/javascript" src="<?php echo $plugin_path?>js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="<?php echo $plugin_path?>js/main.js"></script>
	<script type="text/javascript" src="<?php echo $plugin_path?>js/calendar/calendar.js"></script>
	<script type="text/javascript" src="<?php echo $plugin_path?>js/calendar/calendar-setup.js"></script>
	<script type="text/javascript" src="<?php echo $plugin_path?>js/calendar/lang/calendar-en.js"></script>
<?php }

function get_leads_smallform(){
    $states = get_us_states();
    $content = '<div class="payday_form_small">';
    if(strlen(get_option('leads_unique_key')) == 0){
        $content .= 'please enter your Website Unique Key from the WinWinHost Affiliate Network in the admin panel';
    }else{
        $content .= '<form method="post" action="'.get_option("leads_big_form_url").'">
            Loan Amount:<br />
            <select name="amount">
                <option value="">select...</option>';
                for($i=1;$i<10;$i++){
                    $content .= "<option value=\"".$i."00\">$".$i."00</option>";
                }
                $content .= '<option value="1000">$1000 or more</option>
            </select><br />
            First Name<br />
            <input name="fname" type="text" /><br />
            Last Name<br />
            <input name="lname" type="text" /><br />
            State<br />
            <select name="state">
                <option value="">select...</option>';
                foreach($states as $code => $state){
                    $content .= '<option value="'.$code.'">'.$state.'</option>';
                }
           $content .= '</select>
            <br />
            ZIP Code<br />
            <input name="zip" type="text" /><br />
            Email Address<br />
            <input name="email" type="text" /><br />    
            <input type="submit" value="Get Started !" />
        </form>';
    }
    $content .= '</div>';
    
    return $content;
}

function get_leads_form(){
    $content = "";
    if(strlen(get_option('leads_unique_key')) == 0){
        $content .= 'please enter your Website Unique Key from the WinWinHost Affiliate Network in the admin panel';
    }else{
        $content .= '<div id="form_callback"></div>
        <script type="text/javascript">
            loadLeadForm("loan-form",{unique_key: "'.get_option('leads_unique_key').'", host: "'.$_SERVER['HTTP_HOST'].'"'; 
            if($_POST){
               $content .= ', amount:"'.$_POST['amount'].'", fname: "'.$_POST['fname'].'", lname: "'.$_POST['lname'].'", state: "'.$_POST['state'].'", zip: "'.$_POST['zip'].'", email: "'.$_POST['email'].'"';
            }
            if(isset($_COOKIE['AWC'])){
                $ref_cookie = explode("|",$_COOKIE['AWC']);
                $content .= ', publisher_id: "'.$ref_cookie[0].'", website_id: "'.$ref_cookie[1].'", link_id: "'.$ref_cookie[2].'"';
            }
        $content .= '});
        </script>';
    }
    
    return $content;
}

function get_us_states(){
return array('AL'=>"Alabama",
                'AK'=>"Alaska",  
                'AZ'=>"Arizona",  
                'AR'=>"Arkansas",  
                'CA'=>"California",  
                'CO'=>"Colorado",  
                'CT'=>"Connecticut",  
                'DE'=>"Delaware",  
                'DC'=>"District Of Columbia",  
                'FL'=>"Florida",  
                'GA'=>"Georgia",  
                'HI'=>"Hawaii",  
                'ID'=>"Idaho",  
                'IL'=>"Illinois",  
                'IN'=>"Indiana",  
                'IA'=>"Iowa",  
                'KS'=>"Kansas",  
                'KY'=>"Kentucky",  
                'LA'=>"Louisiana",  
                'ME'=>"Maine",  
                'MD'=>"Maryland",  
                'MA'=>"Massachusetts",  
                'MI'=>"Michigan",  
                'MN'=>"Minnesota",  
                'MS'=>"Mississippi",  
                'MO'=>"Missouri",  
                'MT'=>"Montana",
                'NE'=>"Nebraska",
                'NV'=>"Nevada",
                'NH'=>"New Hampshire",
                'NJ'=>"New Jersey",
                'NM'=>"New Mexico",
                'NY'=>"New York",
                'NC'=>"North Carolina",
                'ND'=>"North Dakota",
                'OH'=>"Ohio",  
                'OK'=>"Oklahoma",  
                'OR'=>"Oregon",  
                'PA'=>"Pennsylvania",  
                'RI'=>"Rhode Island",  
                'SC'=>"South Carolina",  
                'SD'=>"South Dakota",
                'TN'=>"Tennessee",  
                'TX'=>"Texas",  
                'UT'=>"Utah",  
                'VT'=>"Vermont",  
                'VA'=>"Virginia",  
                'WA'=>"Washington",  
                'WV'=>"West Virginia",  
                'WI'=>"Wisconsin",  
                'WY'=>"Wyoming");
}

register_activation_hook(__FILE__,'leads_install');
register_deactivation_hook(__FILE__,'leads_uninstall');
add_action('admin_menu', 'leads_admin_menu');
add_shortcode('leads_smallform', 'get_leads_smallform');
add_shortcode('leads_form', 'get_leads_form');
add_action( 'wp_head', 'leads_css_link' );
add_action( 'wp_head', 'leads_js_link' );

require_once('widget.php');
?>
