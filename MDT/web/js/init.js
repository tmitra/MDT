(function($) {

	skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {
               
                
                var flagSignup =false;
		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

                var pm = "A product manager investigates, selects, and drives the development of products for an organization, performing the activities of product management. It is the intersection between business, technology and user experience."
                var con = "Technology consulting (IT advisory) is a field that focuses on advising businesses on how best to use information technology to meet their business objectives."
                var da = "A data scientist has a solid foundation typically in computer science, modeling, statistics, analytics and math. What sets a data scientist apart is strong business acumen, coupled with the ability to communicate findings to both business and IT leaders in a way that can influence how an organization approaches a business challenge."
                var hr ="A Software Developer is a person concerned with facets of the software development process. In short, developers make software for the world to use. Their work includes researching, designing, implementing, and testing software."


		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
                                
                                 flagSignup=true;
			});

		// Mobile?
			if (skel.vars.isMobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			var	$menu = $('#menu'),
				$menuClose = $('<a class="close">').appendTo($menu),
				$menuToggle = $('.menuToggle');

			// Move to end of body.
				$menu
					.appendTo($body);

			// Close.
				$menuClose
					.on('click touchend', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$body.removeClass('is-menu-visible');

					});
                                        var theformValidator;
			var $signup = $('#signup');
                        $signup.on('click touchend', function(event) {
                            theformValidator = $('#theform').validate({
                                rules:{
                                    demoname: "required",
                                    demoemail: {required: true, email: true},
                                    demopassword: {required: true, minlength: 8},
                                    demoretypepassword:{required: true, minlength: 8, equalTo: "#demo-password"}
                                },
                                messages:{
                                    demoname: "Please provide a name",
                                    demopassword: {required: "Please provide a password"},
                                    demoretypepassword: {required: "Please provide a password",equalTo:"Please enter the same password as above"}
                                },
                                tooltip_options: {
                                    demoname: { placement: 'right' },
                                    demoemail: { placement: 'right' },
                                    demopassword: { placement: 'right' },
                                    demoretypepassword: { placement: 'right' }
                                    
                                },                                
                              errorPosition: 'r',
                                submitHandler: function(form){
                                    var dataobj = {name: $('#demo-name').val(),email: $('#demo-email').val(),password: $('#demo-password').val()};
                                    $.ajax({
                                        method: "POST",
                                        url: "signup",
                                        data: dataobj
                                      })
                                        .done(function( msg ) {
                                             window.location="/MDT"
                                        });
                                }
                            });
                           
                                                    
                        }); 
                        
                        var $resetsignup = $('#resetsignup');
                         $resetsignup.on('click touchend', function(event) {
                             
                             theformValidator.resetForm();                          
                         });
                         
                         
                         var $sendmailsubmit = $('#sendmailsubmit');
                        $sendmailsubmit.on('click touchend', function(event) {
                            $('#sendmailform').validate({
                                rules:{
                                    subject: "required",
                                    message: {required: true}
                                },                                
                                  errorPosition: 'r',
                                submitHandler: function(form){
                                    var dataobj = {email: $('#semd-mail-email').val(),subject: $('#subject').val(),message: $('#subject').val()};
                                    $.ajax({
                                        method: "POST",
                                        url: "sendmail",
                                        data: dataobj
                                      })
                                        .done(function( msg ) {
                                          window.location="/MDT"
                                        });

                                }
                            });
                        });
                        
                                                
                         var $login = $('#login');
                        $login.on('click touchend', function(event) {
                            $('#theloginform').validate({
                                rules:{
                                    demousername: "required",
                                    demologinpassword: "required"
                                },                                
                                errorPosition: 'r',
                                submitHandler: function(form){
                                    var dataobj = {username: $('#demo-username').val(),password: $('#demo-login-password').val()};
                                    $.ajax({
                                        method: "POST",
                                        url: "login",
                                        data: dataobj
                                      })
                                        .done(function( msg ) {                                             
                                             deleteCookie("mdt");
                                            if(msg!="Invalid User"){
                                             setCookie("mdt",msg,10)
                                             window.location="/MDT/initial-page.html"
                                            }else{
                                                window.location="/MDT/"
                                            }
                                        });
                                }
                            });
                        });
                        
                        
                        var $logoutlink = $('#logout-link');
                        $logoutlink.on('click touchend', function(event) {
                            deleteCookie("mdt");
                            window.location="/MDT"
                        });
                        
                        
                        var $selectjob = $('#selectjob');
                         $selectjob.on('click touchend',function(event){
                             
                             $('#thejobform').validate({
                                rules:{
                                    democategory: {
                                        required: true
                                    }                                    
                                },                                
                                errorPosition: 'b',
                                submitHandler: function(form){
                                    
                                    var val = $democategory.val();
                                    
                                        deleteCookie("userdreamjob");
                                        deleteCookie("userdreamjobvalue");
                                        setCookie("userdreamjob",val,10);
                                        setCookie("userdreamjobvalue",$('select[name="democategory"]')[0].options[$('select[name="democategory"]')[0].selectedIndex].innerHTML,10);
                                        $('body').removeClass();
                                        $body.toggleClass('loaded');
                                        $('#djQuestion').css('display','none');
                                        $('#secondSection').css('display','block');
                                        $('body').toggleClass('is-next-question');
                                                                           
                                }
                            });
                         });
                         var time;
                         var currdate;
                         var $findJob = $('#findJob');
                         $findJob.on('click touchend',function(event){
                             
                             var dreamjob = getCookie("userdreamjob");
                             
                             var selectedBachelor = $('select[name="demobachlorspursuing"]')[0].options[$('select[name="demobachlorspursuing"]')[0].selectedIndex].innerHTML;
                             
                             var selectedMaster = $('select[name="demomasterspursuing"]')[0].options[$('select[name="demomasterspursuing"]')[0].selectedIndex].innerHTML;
                             
                             if(selectedBachelor === "Pursuing" || selectedBachelor === "Completed"){                                 
                                 
                                    if($('select[name="demobachlors"]')[0].options[$('select[name="demobachlors"]')[0].selectedIndex].innerHTML === "- Select -" ){
                                        
                                     $("#bachelor-error").html("Please select a degree of Undergraduation");   
                                    
                                     $("#bachelor-error").css("display","block"); 
                                     
                                        return;
                                    }
                                    
                             }else if(selectedMaster === "Pursuing" || selectedMaster === "Completed"){
                                  if($('select[name="demomasters"]')[0].options[$('select[name="demomasters"]')[0].selectedIndex].innerHTML === "- Select -" ){
                                      $("#master-error").html("Please select a degree of Masters"); 
                                        $("#master-error").css("display","block");
                                        return;
                                    } 
                                    
                             }else if($("#expYears").val() === ""){
                                 
                                 $("#exp-error").html("Please mention years of experience");                                  
                                 $("#exp-error").css("display","block");
                                 return;
                             }
                                 
                                 $("#bachelor-error").css("display","none");
                                 $("#master-error").css("display","none");
                                 $("#exp-error").css("display","none");
                                 
                                 var dataobj = {dreamjob: dreamjob,bachelors: $("#demo-bachelors").val(), bachelorstatus: selectedBachelor, masters: $("#demo-masters").val() ,masterstatus: selectedMaster, exp: $("#expYears").val()};
                                  $.ajax({
                                        method: "POST",
                                        url: "findpath",
                                        data: dataobj
                                      })
                                        .done(function( msg ) {
                                                
                                                $('body').toggleClass('loaded');
                                                
                                                setTimeout(function(){ 
                                                    $('body').toggleClass('loaded');
                                                    setCookie("flare",msg,10);
                                                    window.location="/MDT/results.html";
                                                }, 100);                                         
                                        });                            
                         });
                         
                         var $showStat =$('#showStat');
                         $showStat.on('click touchend',function(event){
                             
                             var dreamjob = getCookie("userdreamjob");
                             var dataobj = {dreamjob: dreamjob};
                              $.ajax({
                                        method: "POST",
                                        url: "chart",
                                        data: dataobj
                                      })
                                        .done(function( msg ) {
                                                
                                                setCookie("chartvalue",msg,10);
                                                window.location="/MDT/chart.html";                                       
                                        });
                         });
                         
                         
                         
                         var showLoadingInformation = function(){
                             
                              var newDate = new Date();
                              var currenttime = newDate.getTime();                              
                              if(currenttime > (time + 59000)){                                 
                                 $('body').toggleClass('loaded');
                                 return;
                                }
                                
                             setTimeout(function(){ 
                                showLoadingInformation()
                             }, 15000);
                         }
                         var $returnMain = $('#returnMain');
                         $returnMain.on('click touchend',function(event){
                             
                             $("#bachelor-error").css("display","none");
                                 $("#master-error").css("display","none");
                                 $("#exp-error").css("display","none");
                             
                             $('body').removeClass();
                             
                             $('body').toggleClass('loaded');
                             
                                        $('#djQuestion').css('display','block');
                                        $('#secondSection').css('display','none');
                         });
                         
                         
                         
                        var $democategory = $('#demo-category');
                        var $flagToggle = false;
                        $democategory.on('change touchend',function(event){
                                var val = $democategory.val();
                                
                                if(val !== ""){                                    
                                    event.preventDefault();
                                    event.stopPropagation();
                                  setTimeout(function(){  
                                        if($flagToggle)
                                        $body.toggleClass('is-drop-down-visible');                                    
                                        if(val === '17'){                                            
                                        $('#role-header').html('Product Manager');
                                        $('#role-content').html(pm);
                                        $body.toggleClass('is-drop-down-visible');
                                    }else if(val === '31'){
                                        $('#role-header').html('Technology Consultant');
                                        $('#role-content').html(con);
                                        $body.toggleClass('is-drop-down-visible');
                                    }
                                    else if(val === '8'){
                                        $('#role-header').html('Data Scientist');
                                        $('#role-content').html(da);
                                        $body.toggleClass('is-drop-down-visible');
                                    }else if(val === 'sd'){
                                        $('#role-header').html('Software Developer');
                                        $('#role-content').html(hr);
                                        $body.toggleClass('is-drop-down-visible');
                                    }
                                    $flagToggle = true;
                                    }, 500);
                                    
                                    
                                }else{
                                 event.preventDefault();
						event.stopPropagation();

						$body.removeClass('is-drop-down-visible');   
                                }
                        });
                        // Toggle.
				$menuToggle
					.on('click touchend', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$body.toggleClass('is-menu-visible');

					});

			// Wrapper.
				$wrapper
					.on('click touchend', function(event) {

						if ($body.hasClass('is-menu-visible')) {

							event.preventDefault();
							event.stopPropagation();

							$body.removeClass('is-menu-visible');

						}

					});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);