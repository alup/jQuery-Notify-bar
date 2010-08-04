/*
* Notify Bar - jQuery plugin
*
* Copyright (c) 2009-2010 Dmitri Smirnov
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Version: 1.2.2
*
* Project home:
* http://www.dmitri.me/blog/notify-bar
*/

function strncmp(str1, str2, n) {
  str1 = str1.substring(0, n);
  str2 = str2.substring(0, n);
  return ( ( str1 == str2 ) ? 0 : (( str1 > str2 ) ? 1 : -1 ));
};

var jquery_notifyBar_counter = 0;

/**
* param Object
*/
jQuery.notifyBar = function(settings) {
  
  (function($) {
    
    var bar = notifyBarNS = {};
    notifyBarNS.shown = false;
     
    if( !settings) {
      settings = {};
    }
    // HTML inside bar
    notifyBarNS.html = settings.html || "Your message here";
     
    //How long bar will be displayed, doesn't count animation time.
    notifyBarNS.duration = settings.duration || 2000;
     
    //How long notifyBarNS bar will be slided up and down
    notifyBarNS.animationDuration = settings.animationDuration || 200;
    
    //Sticky mode: user must click to close
    notifyBarNS.sticky = settings.sticky || false;
     
    //Use own jquery object usually DIV, or use default
    notifyBarNS.jqObject = settings.jqObject;
     
    //Set up own class
    notifyBarNS.cls = settings.cls || "";
    
    if( notifyBarNS.jqObject) {
      bar = notifyBarNS.jqObject;
      notifyBarNS.html = bar.html();
    } else {
      jquery_notifyBar_counter++;
      bar = jQuery("<div></div>")
      .addClass("jquery-notify-bar")
      .addClass(notifyBarNS.cls)
      .attr("id", "__notifyBar_" + jquery_notifyBar_counter);
    }
         
    bar.html(notifyBarNS.html).hide();
    var id = bar.attr("id");
    switch (notifyBarNS.animationDuration) {
    case "slow":
      animDuration = 600;
      break;
    case "normal":
      animDuration = 400;
      break;
    case "fast":
      animDuration = 200;
      break;
    default:
      animDuration = notifyBarNS.animationDuration;
    }
    if( bar != 'object'); {
      jQuery("body").prepend(bar);
    }
    
    jQuery("#" + id).click(function() {
      if( notifyBarNS.jqObject) {
        jQuery("#" + id).slideUp(animDuration);
      } else {
        jQuery("#" + id).slideUp(animDuration, function() { jQuery("#" + id).remove() });
      }
      return false;
    });
    
    bar.slideDown(animDuration);
    
    if( notifyBarNS.sticky == false) {
      // If taken from DOM dot not remove just hide
      if( notifyBarNS.jqObject) {
        setTimeout("jQuery('#" + id + "').slideUp(" + animDuration +", function() {jQuery('#" + id + "')});", notifyBarNS.duration + animDuration);
      } else {
        setTimeout("jQuery('#" + id + "').slideUp(" + animDuration +", function() {jQuery('#" + id + "').remove()});", notifyBarNS.duration + animDuration);
      }
    }

})(jQuery) };