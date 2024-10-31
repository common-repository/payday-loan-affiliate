$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function loadLeadForm(page, post_data){
    if(typeof(post_data) == 'undefined'){
        var post_data = {};
    }
    
    $('#form_callback').html("<img class=\"loading\" src=\"http://affiliate.winwinhost.com/leads/img/ajax-loader.gif\" />");
    
    $.ajax({
      dataType: 'jsonp',
      data: post_data,
      jsonp: 'jsonp_callback',
      url: 'http://affiliate.winwinhost.com/leads/get_form.php?page='+page,
      success: function (json) {
        $('#form_callback').html(json.content);
      }
    });
}

function checkMortgageFormStep(step, form){
    
    switch(step){
        case 1:
            if(form.PROP_ST.value.length == 0){
                alert('Please enter your property state');
                form.PROP_ST.focus();
                return false;
            }
            if(form.PROP_ZIP.value.length != 5 || !isNumber(form.PROP_ZIP.value)){
                alert('Please enter a valid property ZIP Code');
                form.PROP_ZIP.focus();
                return false;
            }
            
            //separate checks for new home mortgage
            if(form.PRODUCT.value == "PP_NEWHOME"){
                if(form.BUY_TIMEFRAME.value.length == 0){
                    alert('Please enter your time to purchase');
                    form.BUY_TIMEFRAME.focus();
                    return false;
                }
                if(form.DOWN_PMT.value.length == 0){
                    alert('Please enter the down payment percent');
                    form.DOWN_PMT.focus();
                    return false;
                }
                if(form.AGENT_FOUND.value == "yes"){
                    if(form.AGENT_NAME.value.length == 0){
                        alert('Please enter your agent name');
                        form.AGENT_NAME.focus();
                        return false;
                    } 
                    if(form.AGENT_PHONE.value.length == 0){
                        alert('Please enter your agent\'s phone number');
                        form.AGENT_PHONE.focus();
                        return false;
                    }
                    if(form.AGENT_COMPANY.value.length == 0){
                        alert('Please enter your agent\'s company');
                        form.AGENT_COMPANY.focus();
                        return false;
                    }
                }
            }else{
                if(form.PURCHASE_YEAR.value.length == 0){
                    alert('Please enter the purchase year');
                    form.PURCHASE_YEAR.focus();
                    return false;
                } 
            }
            //---------------------------------
            
            if(form.EST_VAL.value.length == 0){
                alert('Please enter the estimated value');
                form.EST_VAL.focus();
                return false;
            } 
            if(form.BAL_ONE.value.length == 0){
                alert('Please enter the first mortgage balance');
                form.BAL_ONE.focus();
                return false;
            } 
            if(form.MTG_ONE_INT.value.length == 0){
                alert('Please enter the first mortgage interest rate');
                form.MTG_ONE_INT.focus();
                return false;
            } 
            
            if(form.MTG_TWO.value == "yes"){
                if(form.BAL_TWO.value.length == 0){
                    alert('Please enter the second mortgage balance');
                    form.BAL_TWO.focus();
                    return false;
                } 
                if(form.MTG_TWO_INT.value.length == 0){
                    alert('Please enter the second mortgage interest rate');
                    form.MTG_TWO_INT.focus();
                    return false;
                } 
            }
              
            if(form.ADD_CASH.value.length == 0){
                alert('Please enter how much additional cash you would like');
                form.ADD_CASH.focus();
                return false;
            }  
            
            break;
        
        case 2:
            if(form.FNAME.value.length == 0){
                alert('Please enter your first name');
                form.FNAME.focus();
                return false;
            }
            if(form.LNAME.value.length == 0){
                alert('Please enter your last name');
                form.LNAME.focus();
                return false;
            }
            if(form.ZIP.value.length != 5 || !isNumber(form.ZIP.value)){
                alert('Please enter a valid ZIP Code');
                form.ZIP.focus();
                return false;
            }
            if(form.STATE.value.length == 0){
                alert('Please enter your state');
                form.STATE.focus();
                return false;
            }
            if(form.CITY.value.length == 0){
                alert('Please enter your city');
                form.CITY.focus();
                return false;
            }
            if(form.ADDRESS.value.length == 0){
                alert('Please enter your street address');
                form.ADDRESS.focus();
                return false;
            }
        	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        	if (!filter.test(form.EMAIL.value)){
        		alert("The Email you entered is invalid");
        		form.EMAIL.value="";
        		form.EMAIL.focus();
        		return false;
        	}
            if( !(form.PRI_PHONE_0.value.length == 3 && form.PRI_PHONE_1.value.length == 3 && form.PRI_PHONE_2.value.length == 4) || !(isNumber(form.PRI_PHONE_0.value) && isNumber(form.PRI_PHONE_1.value) && isNumber(form.PRI_PHONE_2.value)) ){
                alert('Please enter a valid primary phone number');
                form.pphone1.focus();
                return false;
            }  
            if( !(form.SEC_PHONE_0.value.length == 3 && form.SEC_PHONE_1.value.length == 3 && form.SEC_PHONE_2.value.length == 4) || !(isNumber(form.SEC_PHONE_0.value) && isNumber(form.SEC_PHONE_1.value) && isNumber(form.SEC_PHONE_2.value)) ){
                alert('Please enter a valid secondari phone number');
                form.pphone1.focus();
                return false;
            }  
            break;
    }
    
    return true;
}

function checkLoanFormStep(step, form){
    
    var date_obj_now = new Date();
        
    switch(step){
        case 1:
            if(form.amount.value.length == 0){
                alert('Please enter your desired loan amount');
                form.amount.focus();
                return false;
            }
            if(form.first_name.value.length == 0){
                alert('Please enter your first name');
                form.first_name.focus();
                return false;
            }
            if(form.last_name.value.length == 0){
                alert('Please enter your last name');
                form.last_name.focus();
                return false;
            }
            if(form.zip.value.length != 5 || !isNumber(form.zip.value)){
                alert('Please enter a valid ZIP Code');
                form.zip.focus();
                return false;
            }
            if(form.state.value.length == 0){
                alert('Please enter your state');
                form.state.focus();
                return false;
            }
            if(form.city.value.length == 0){
                alert('Please enter your city');
                form.city.focus();
                return false;
            }
            if(form.street_addr1.value.length == 0){
                alert('Please enter your street address');
                form.street_addr1.focus();
                return false;
            }
            if(form.length_at_address.value.length == 0){
                alert('Please enter your length at the address');
                form.length_at_address.focus();
                return false;
            }
            if(form.rent_own.value.length == 0){
                alert('Please enter if you rent or own');
                form.rent_own.focus();
                return false;
            }         
        	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        	if (!filter.test(form.email.value)){
        		alert("The Email you entered is invalid");
        		form.email.value="";
        		form.email.focus();
        		return false;
        	}
            if(form.driver_licence.value.length == 0){
                alert('Please enter your driver licence number');
                form.driver_licence.focus();
                return false;
            }  
            if(form.driver_state.value.length == 0){
                alert('Please enter your driver licence issuing state');
                form.driver_state.focus();
                return false;
            }  
            if( !(form.pphone1.value.length == 3 && form.pphone2.value.length == 3 && form.pphone3.value.length == 4) || !(isNumber(form.pphone1.value) && isNumber(form.pphone2.value) && isNumber(form.pphone3.value)) ){
                alert('Please enter a valid primary phone number');
                form.pphone1.focus();
                return false;
            }  
            if( !(form.wphone1.value.length == 3 && form.wphone2.value.length == 3 && form.wphone3.value.length == 4) || !(isNumber(form.wphone1.value) && isNumber(form.wphone2.value) && isNumber(form.wphone3.value)) ){
                alert('Please enter a valid work phone number');
                form.wphone1.focus();
                return false;
            } 
            if(form.contact_time.value.length == 0){
                alert('Please enter your best contact time');
                form.contact_time.focus();
                return false;
            }  
            if(form.dobd.value.length == 0){
                alert('Please enter your date of birth day');
                form.dobd.focus();
                return false;
            }  
            if(form.dobm.value.length == 0){
                alert('Please enter your date of birth month');
                form.dobm.focus();
                return false;
            }   
            if(form.doby.value.length == 0){
                alert('Please enter your date of birth year');
                form.doby.focus();
                return false;
            }  
            if(parseInt(form.doby.value) > date_obj_now.getFullYear() - 17){
                alert('You must be 18 to apply for a payday loan');
                form.doby.focus();
                return false;
            }  
            if( !(form.ssn1.value.length == 3 && form.ssn2.value.length == 2 && form.ssn3.value.length == 4) || !(isNumber(form.ssn1.value) && isNumber(form.ssn2.value) && isNumber(form.ssn3.value)) || !validateSSN(form.ssn1.value+form.ssn2.value+form.ssn3.value)){
                alert('Please enter a valid social security number');
                form.ssn1.focus();
                return false;
            }        
            break;
        
        case 2:
            if(form.reference1_first_name.value.length == 0){
                alert('Please enter the first name of your first reference');
                form.reference1_first_name.focus();
                return false;
            }  
            if(form.reference1_last_name.value.length == 0){
                alert('Please enter the last name of your first reference');
                form.reference1_last_name.focus();
                return false;
            }  
            if( !(form.ref1phone1.value.length == 3 && form.ref1phone2.value.length == 3 && form.ref1phone3.value.length == 4) || !(isNumber(form.ref1phone1.value) && isNumber(form.ref1phone2.value) && isNumber(form.ref1phone3.value)) ){
                alert('Please enter a valid primary phone number for your first reference');
                form.ref1phone1.focus();
                return false;
            }
            if(form.reference1_relationship.value.length == 0){
                alert('Please enter your first reference relationship');
                form.reference1_relationship.focus();
                return false;
            } 
            if(form.reference2_first_name.value.length == 0){
                alert('Please enter the first name of your second reference');
                form.reference2_first_name.focus();
                return false;
            }  
            if(form.reference2_last_name.value.length == 0){
                alert('Please enter the last name of your second reference');
                form.reference2_last_name.focus();
                return false;
            }  
            if( !(form.ref2phone1.value.length == 3 && form.ref2phone2.value.length == 3 && form.ref2phone3.value.length == 4) || !(isNumber(form.ref2phone1.value) && isNumber(form.ref2phone2.value) && isNumber(form.ref2phone3.value)) ){
                alert('Please enter a valid primary phone number for your second reference');
                form.ref2phone1.focus();
                return false;
            }
            if(form.reference2_relationship.value.length == 0){
                alert('Please enter your first second relationship');
                form.reference2_relationship.focus();
                return false;
            } 
            break;
        
        case 3:
            if(form.income_source.value.length == 0){
                alert('Please enter your income source');
                form.income_source.focus();
                return false;
            }
            if(form.employer.value.length == 0){
                alert('Please enter your employer\'s name');
                form.employer.focus();
                return false;
            }
            if(form.job_title.value.length == 0){
                alert('Please enter your job title');
                form.job_title.focus();
                return false;
            }
            if(form.time_employed_years.value.length == 0){
                alert('Please enter the number of years you have been employed');
                form.time_employed_years.focus();
                return false;
            }
            if(form.time_employed_months.value.length == 0){
                alert('Please enter the number of months you have been employed');
                form.time_employed_months.focus();
                return false;
            }
            if( !(form.ephone1.value.length == 3 && form.ephone2.value.length == 3 && form.ephone3.value.length == 4) || !(isNumber(form.ephone1.value) && isNumber(form.ephone2.value) && isNumber(form.ephone3.value))){
                alert('Please enter a valid employer\'s phone number');
                form.ephone1.focus();
                return false;
            }  
            if(form.monthly_income.value.length == 0){
                alert('Please enter your monthly income');
                form.monthly_income.focus();
                return false;
            }
            if(form.pay_frequency.value.length == 0){
                alert('Please enter how often you are paid');
                form.pay_frequency.focus();
                return false;
            }
            if(form.pay_date1.value.length == 0){
                alert('Please enter your next paycheck date');
                form.pay_date1.focus();
                return false;
            }         
            if(form.pay_date2.value.length == 0 || !validatePaydates(form.pay_frequency.value, form.pay_date1.value, form.pay_date2.value)){
                alert('Please enter 2 valid paycheck dates, respecting your chosen pay frequency and not weekends');
                form.pay_date2.focus();
                return false;
            }  
            if(form.bank_aba.value.length != 9 || !isNumber(form.bank_aba.value) || !validateABA(form.bank_aba.value)){
                alert('Please enter a valid ABA/Routing Number');
                form.bank_aba.focus();
                return false;
            }  
            if(form.bank_account_number.value.length == 0){
                alert('Please enter your bank account number');
                form.bank_account_number.focus();
                return false;
            }  
            if(form.bank_account_type.value.length == 0){
                alert('Please enter your bank account type');
                form.bank_account_type.focus();
                return false;
            }  
            if(form.bank_name.value.length == 0){
                alert('Please enter your bank name');
                form.bank_name.focus();
                return false;
            }  
            if( !(form.bphone1.value.length == 3 && form.bphone2.value.length == 3 && form.bphone3.value.length == 4) || !(isNumber(form.bphone1.value) && isNumber(form.bphone2.value) && isNumber(form.bphone3.value))){
                alert('Please enter a valid bank phone number');
                form.bphone1.focus();
                return false;
            }  
            if(form.bank_account_length_months.value.length == 0){
                alert('Please enter your number of months at this bank');
                form.bank_account_length_months.focus();
                return false;
            }
            break;
    }
    
    return true;
    
}

function sendForm(formID){
    
    $('#'+formID).hide();
    $('#form_callback').append("<img class=\"loading\" src=\"http://affiliate.winwinhost.com/leads/img/ajax-loader.gif\" />");
    
    $.ajax({
      dataType: 'jsonp',
      data: $('#'+formID).serializeObject(),
      jsonp: 'jsonp_callback',
      url: 'http://affiliate.winwinhost.com/leads/save_form.php',
      success: function(data){
        if(data.content == 'not-sold'){
            loadLeadForm("thankyou-page");
        }else{
            document.location = data.content;
        }
      }
    });
    
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateABA(number){
  // Run through each digit and calculate the total.

  n = 0;
  for (i = 0; i < number.length; i += 3) {
    n += parseInt(number.charAt(i),     10) * 3
      +  parseInt(number.charAt(i + 1), 10) * 7
      +  parseInt(number.charAt(i + 2), 10);
  }

  // If the resulting sum is an even multiple of ten (but not zero),
  // the aba routing number is good.

  if (n != 0 && n % 10 == 0)
    return true;
  else
    return false;    
}

function validateSSN(number){
    var re = /^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/;
    if (!re.test(number)) { return false; }
    var temp = number;
    if (number.indexOf("-") != -1) { temp = (number.split("-")).join(""); }
    if (number.indexOf(" ") != -1) { temp = (number.split(" ")).join(""); }
    if (temp.substring(0, 3) == "000") { return false; }
    if (temp.substring(3, 5) == "00") { return false; }
    if (temp.substring(5, 9) == "0000") { return false; }
    return true;
}

function validatePaydates(pay_frequency, date1, date2){
    
    var date_obj1 = new Date(date1);
    var date_obj2 = new Date(date2);
    var date_obj_now = new Date();
    var days_diff = (date_obj2.getTime() - date_obj1.getTime()) / (1000*3600*24);
    
    if(date_obj1.getTime() < date_obj_now.getTime() || date_obj2.getTime() < date_obj_now.getTime() || date_obj2.getTime() < date_obj1.getTime()){
        return false;
    }
    
    if(pay_frequency == "WEEKLY" && (days_diff > 9 || days_diff < 5 )){
        return false;
    }

    if((pay_frequency == "TWICEMONTHLY" || pay_frequency == "BIWEEKLY") && (days_diff > 17 || days_diff < 11 )){
        return false;
    }
    
    if(pay_frequency == "MONTHLY" && (days_diff > 33 || days_diff < 27 )){
        return false;
    }
    
    if(date_obj1.getDay() == 0 || date_obj1.getDay() == 6){
        return false;
    }
    
    if(date_obj2.getDay() == 0 || date_obj2.getDay() == 6){
        return false;
    }
    
    return true;
}