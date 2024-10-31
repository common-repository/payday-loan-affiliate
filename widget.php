<?php

add_action("widgets_init", array('paydayLoanForm', 'register'));

class paydayLoanForm {
    
  function control(){
    echo 'For CSS settings go to Settings > Payday Loan Affiliate';
  }
  
  function widget($args){
    echo $args['before_widget'];
    echo $args['before_title'] . get_option("leads_widget_title") . $args['after_title'];
    echo get_leads_smallform();
    echo $args['after_widget'];
  }
  
  function register(){
    register_sidebar_widget('Payday Loan Affiliate Small Form', array('paydayLoanForm', 'widget'));
    register_widget_control('Payday Loan Affiliate Small Form', array('paydayLoanForm', 'control'));
  }
  
}

?>