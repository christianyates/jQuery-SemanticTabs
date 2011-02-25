/*
jquery.semantictabs.js
Creates semantic tabs from nested divs
Chris Yates

Inspired by Niall Doherty's jQuery Coda-Slider v1.1 - http://www.ndoherty.com/coda-slider

Usage:
$("#mycontainer").semantictabs({
  panel:'.mypanelclass',         //-- Selector of individual panel body
  head:'headelement',           //-- Selector of element containing panel header
  active:':first',              //-- Which panel to activate by default
  activate:':eq(2)'             //-- Argument used to activate panel programmatically
});

1 Nov 2007

Bug fixes 15 Dec 2009:
http://plugins.jquery.com/node/11834
http://plugins.jquery.com/node/8486
(thanks zenmonkey)

Feature update 4 Jan 2010:
Now works with arbitrary jQuery selectors, not just 'class' attribute.

*/

jQuery.fn.semantictabs = function(passedArgsObj) {
  /* defaults */
  var defaults = {panel:'.panel', head:'h3', active:':first', activate:false};

  /* override the defaults if necessary */
  var args = jQuery.extend(defaults,passedArgsObj);
  
  // Allow activation of specific tab, by index
	if (args.activate) {
	  return this.each(function(){
	    var container = jQuery(this);
			container.find(args.panel).hide();
			container.find("ul.tabs li").removeClass("active");
			container.find(args.panel + ":eq(" + args.activate + ")").show();
			container.find("ul.tabs li:eq(" + args.activate + ")").addClass("active");      
	  });
	} else {
    return this.each(function(){
  		// Load behavior
  		var container = jQuery(this);
      container.find(args.panel).hide();
  		container.find(args.panel + args.active).show();
  		container.prepend("<ul class=\"tabs semtabs\"></ul>");
  		container.find(args.panel).each( function() {
  		  var title = jQuery(this).find(args.head).text();
  		  this.title = title;
  			container.find("ul.tabs").append("<li><a href=\"javascript:void(0);\">"+title+"</a></li>");
  		});
  		container.find("ul li" + args.active).addClass("active");
  		// Tab click behavior
  		container.find("ul.tabs li").click(function(){
  			container.find(args.panel).hide();
  			container.find("ul.tabs li").removeClass("active");
  			container.find(args.panel + "[title='"+jQuery(this).text()+"']").show();
  			jQuery(this).addClass("active");
  		});                                
  		container.find("#remtabs").click(function(){
  			container.find("ul.tabs").remove();
  			container.find(args.container + " " + args.panel).show();
  			container.find("#remtabs").remove();
  		});
  	});
	}
		
};