(function($){
    $.fn.contactTools = function (options) {
        var settings = $.extend({
            title       : 'Get Your Free Quote',
            color       : '#0059af',
            phone_number: "+201127384423",
            email_address: "andrewsultann@gmail.com",
            to_top      : true
        }, options);

        var form_exists = false;
        var back_to_top_exists = false;

        var htmlToPage = '<div class="contact-tools">\
        <ul class="tools-list">'; 

        if(settings.form_id){
            if($(settings.form_id).length){
                form_exists = true;
                htmlToPage += '<li class="openForm">\
                            <a href="#" title="'+settings.title+'" class="request_consultation"><i class="fas fa-envelope"></i></a>\
                        </li>';
            }
        }
        var phone_number = (settings.phone_number) ? settings.phone_number.trim() : null;
        // for phone number
        if(phone_number){
            var formatted_phone_number = phone_number.replace(/\s+/g, '');

            htmlToPage += '<li>\
                <a href="tel:'+formatted_phone_number+'"><i class="fas fa-phone-volume"></i> <span>'+phone_number+'</span> </a>\
            </li>';
        }

        // for email address
        var email_address = settings.email_address;
        if(email_address){
            htmlToPage += '<li>\
                <a href="mailto:'+email_address+'"><i class="fa fa-envelope"></i> <span>'+email_address+'</span> </a>\
            </li>';
        }

        // for to top
        if(settings.to_top){
            back_to_top_exists = true;
            htmlToPage += '<li><a href="#" id="contact_tools_back_to_top" title="Back To Top" class="show"><i class="fas fa-chevron-up"></i></a></li>';
        }
    

        htmlToPage += '</ul>\
        </div>';

        if(form_exists){
            htmlToPage += '<div class="sliding-form-holder">\
                <div class="panel-overlay"></div>\
                <div class="contact-form text-black form-toggle" style="right: -460px;"> <a class="close text-capitalize text-right"> <span aria-hidden="true">×</span></a>\
                    <h2 class="title">'+settings.title+'</h2>\
                    <p>Fill out the form below and \
                        <br> we will get in touch with you shortly</p>\
                </div>\
            </div>';
        }

        $('body').append(htmlToPage);

        if ($('.contact-tools').length) {
            var scrollTrigger = 200, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('.contact-tools').addClass('show');
                    } else {
                        $('.contact-tools').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
        }

        if(form_exists){
            createForm(settings.form_id);

            $('.contact-form .title').css('color', settings.color);

            $('.openForm').on('click', function(e){
                e.preventDefault();
        
                var screenWidth = screen.width;
                var bodyWidth = $('body').outerWidth();
                if (screenWidth > bodyWidth){
                    var bodyCurrentPadding = parseInt($('body').css('padding-right'));
                    var body_padding = (bodyCurrentPadding + (screenWidth - bodyWidth)) + 'px';
                    
                    $('body').css('padding-right', body_padding);
                }
                
                $('.sliding-form-holder form:not(.filter) :input:visible:enabled:first').focus();
                $('body').addClass('sidebar-open');
            })
        
            $('.contact-form .close').on('click', function(){
                hideSidebar();
            })
            $('.panel-overlay').on('click', function(){
                hideSidebar();
            });
        
            function hideSidebar(){
                $('body').removeClass('sidebar-open');
                $('body').css('padding-right', "");
            }
        }

        if(back_to_top_exists){
            $('a#contact_tools_back_to_top').on('click', function(e){
                e.preventDefault(); 

                window.scroll({
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth'
                });
            });
        }

        // $("<link/>", {
        //     rel: "stylesheet",
        //     type: "text/css",
        //     href: "./assets/css/contact-tools.css"
        //  }).appendTo("head");

        function createForm(formId){
            var form_html_id = "slide_panel_form";
    
            $(formId).clone().attr('id', form_html_id).appendTo('.sliding-form-holder .contact-form').append('<span class="cta-sub">*Your details are kept confidential</span>');
    
            $("#"+form_html_id).find('.form-group').each(function() {
                $(this).children().each(function() {
                    var typeName = $(this).prop('nodeName');
                    if(typeName == 'LABEL'){
                        var oldID = $(this).attr('for');
                        var newID = oldID + "_sldFrm";
                        console.log(oldID, newID)

                        $(this).attr('for', newID);
                    } else {
                        var oldID = $(this).attr('id');
                        var newID = oldID + "_sldFrm";
                        console.log(oldID, newID)

                        $(this).attr('id', newID);
                    }
                });
            });
    
            if(!jQuery().validate){
                //if jQuery Validate doesn't exist, add it to the page from the CDN
                $.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js')
                    .done(function() {
                        applyFormValidation();
                    });
            } else {
                applyFormValidation();
            }

            function applyFormValidation(){
                $('#'+form_html_id).validate({
                    errorPlacement: function (error, element)
                    {
                        element.after(error);
                    }
                });
            }
        }
    }
})(jQuery);