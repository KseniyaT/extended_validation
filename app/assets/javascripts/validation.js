$(document).ready(function(){
  $('.requirement').extended_validation();
});

(function($){
  $.fn.extended_validation = function(options) {
    var defaults = {
      name_error_msg: 'Please enter a name',
      email_error_msg: 'Invalid email address'
    };
    options = $.extend(defaults, options);

    this.each(function(){
      var obj = $(this)
        , controls = obj.closest('.controls')
        , name_pattern = /^[a-zA-Z0-9]+$/
        , email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , name_error_msg = options.name_error_msg
        , email_error_msg = options.email_error_msg
        ;
      obj.on('blur', checkLength);
      obj.on('keyup', checkLength);
      function checkLength(){
        if (obj.val().length == 0){
          controls.addClass('error-message');
          if (obj.hasClass('email') && obj.siblings('small').length == 0){
            obj.after("<small>"+email_error_msg+"</small>");
          }
          else if (obj.hasClass('name') && obj.siblings('small').length == 0) {
            obj.after("<small>"+name_error_msg+"</small>");
          }
        } else {
          if (obj.hasClass('email')){
            addClass(email_pattern, email_error_msg)
          }
          else if (obj.hasClass('name')) {
            addClass(name_pattern, name_error_msg);
          }
        }
      }
      function addClass(pattern, msg){
        if (pattern.test(obj.val()) ) {
          obj.siblings('small').remove();
          controls.removeClass('error-message');
        } else if (obj.siblings('small').length == 0) {
          controls.addClass('error-message');
          obj.after("<small>"+msg+"</small>");
        }
      }
    });
  }
})(jQuery);
