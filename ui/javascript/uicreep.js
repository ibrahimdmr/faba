
$(".nano").nanoScroller();

// Custom Styling For Select Box
// ===================================================


$('.search-btn').click(function () {
	$('.submit-btn').trigger('click');
});
$('.product-thumb-section').flexslider({
	animation: "slide",
	controlNav: false,
	directionNav: true, 
	animationLoop: true, 
	slideshow: false,
	itemWidth: 120,
	maxItems: 2,
	minItems: 2,
	move: 1,
	asNavFor: '.product-detail-main-section',
	useCSS: false
});

$('.product-detail-main-section').flexslider({
	animation: "slide",
	controlNav: false,
	animationLoop: true,
	slideshow: false,
	sync: ".product-thumb-section"
});


// For Plus Click Functionality

$('.plus').on('click', function () {

	var $qty = $(this).parents('div.quantity-holder').find('.qty');
	var currentVal = parseInt($qty.val());
	if (!isNaN(currentVal)) {
		$qty.attr("value", (currentVal + 1));
	}

});

// For Minus Click Functionality

$('.minus').on('click', function () {

	var $qty = $(this).parents('div.quantity-holder').find('.qty');
	var currentVal = parseInt($qty.val());
	if (!isNaN(currentVal) && currentVal > 0) {
		$qty.attr("value", (currentVal - 1));
	}

});

// For Archive Month Tab Listings
// --------------------------------------

$(".archiveMonthContentContainer > div").hide();
$(".archiveMonthContentContainer > div:first-child").show();

$("ul.archiveMonthNav li").on("click", function () {

	var $this = $(this);
	if ($(this).attr("class") != "active")

	{

		var $index = $this.index();
		$index++;
		$this.addClass("active").siblings().removeClass("active");

		$(".archiveMonthContentContainer > div").hide();
		$(".archiveMonthContentContainer > div.content-" + $index).fadeIn();

	}

});


// For Accordian section
// --------------------------------------------------------------------
$(window).load(function () {
	$(".accordian-content.first").show();
	$(".accordian-container h2:first-child").find("span").addClass("minus");
	$(".accordian-container h2").click(function () {
		$(this).next(".accordian-content").slideToggle();
		$(this).siblings().next(".accordian-content").slideUp();
		$(this).siblings().find("span").removeClass("minus");
		$(this).find("span").toggleClass("minus");
	});
});


// Fancy Box
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
$('.fancybox').fancybox();


$(".review-popup").fancybox({
	maxWidth: 920,
	maxHeight: 530,
	width: '100%',
	height: '100%',
	autoSize: false,
	closeClick: false,
	openEffect: 'none',
	closeEffect: 'none'
});

$(".write-review-popup").fancybox({
	maxWidth: 920,
	maxHeight: 445,
	width: '100%',
	height: '100%',
	autoSize: false,
	closeClick: false,
	openEffect: 'none',
	closeEffect: 'none'
});

$(".sizeguide-popup").fancybox({
	maxWidth: '1100',
	fitToView: true,
	width: '100%',
	height: '100%',
	autoSize: false,
	closeClick: false,
	openEffect: 'none',
	closeEffect: 'none'
});

$(".quick-view-popup").fancybox({
	maxWidth: 800,
	maxHeight: 530,
	fitToView: false,
	width: '100%',
	height: '100%',
	autoSize: false,
	closeClick: false,
	openEffect: 'none',
	closeEffect: 'none'
});

// For Navigation dropdown
// ----------------------------------------------------------------------
$('#primary-navigation ul > li').hover(function () {
	// alert('pn');
	$(this).find('.mega-dropdown-container').stop().slideDown("slow");

}, function () {
	$(this).find('.mega-dropdown-container').stop().slideUp("slow");
});

$(".welcome-trigger").click(function () {

	$(".welcome-list-dropdown").slideToggle();
	$(this).toggleClass("active")

});



$(".cart-trigger>a").click(function () {

	$(".cart-container").slideToggle();

});

$(".close-btn-main").click(function (e) {
	e.preventDefault();
	$(".cart-container").slideUp();
})


// $(".menu-trigger").click(function () {
// 	$("#primary-navigation").slideToggle();
// });

$("select:not('#combobox,#comboboxMobile')").uniform({
	selectAutoWidth: false
});



$(function () {
	$.widget("custom.combobox", {
		_create: function () {
			this.wrapper = $("<span>")
				.addClass("custom-combobox")
				.insertAfter(this.element);

			this.element.hide();
			this._createAutocomplete();
			this._createShowAllButton();
		},

		_createAutocomplete: function () {
			var selected = this.element.children(":selected"),
				value = selected.val() ? selected.text() : "";

			this.input = $("<input>")
				.appendTo(this.wrapper)
				.val(value)
				.attr("title", "")
				.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: $.proxy(this, "_source")
				})
				.tooltip({
					classes: {
						"ui-tooltip": "ui-state-highlight"
					}
				});

			this._on(this.input, {
				autocompleteselect: function (event, ui) {
					ui.item.option.selected = true;
					this._trigger("select", event, {
						item: ui.item.option
					});
				},

				autocompletechange: "_removeIfInvalid"
			});
		},

		_createShowAllButton: function () {
			var input = this.input,
				wasOpen = false;

			$("<a>")
				.attr("tabIndex", -1)
				.attr("title", "Show All Items")
				.tooltip()
				.appendTo(this.wrapper)
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass("ui-corner-all")
				.addClass("custom-combobox-toggle ui-corner-right")
				.on("mousedown", function () {
					wasOpen = input.autocomplete("widget").is(":visible");
				})
				.on("click", function () {
					input.trigger("focus");

					// Close if already visible
					if (wasOpen) {
						return;
					}

					// Pass empty string as value to search for, displaying all results
					input.autocomplete("search", "");
				});
		},

		_source: function (request, response) {
			var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
			response(this.element.children("option").map(function () {
				var text = $(this).text();
				if (this.value && (!request.term || matcher.test(text)))
					return {
						label: text,
						value: text,
						option: this
					};
			}));
		},

		_removeIfInvalid: function (event, ui) {

			// Selected an item, nothing to do
			if (ui.item) {
				return;
			}

			// Search for a match (case-insensitive)
			var value = this.input.val(),
				valueLowerCase = value.toLowerCase(),
				valid = false;
			this.element.children("option").each(function () {
				if ($(this).text().toLowerCase() === valueLowerCase) {
					this.selected = valid = true;
					return false;
				}
			});

			// Found a match, nothing to do
			if (valid) {
				return;
			}

			// Remove invalid value
			this.input
				.val("")
				.attr("title", value + " didn't match any item")
				.tooltip("open");
			this.element.val("");
			this._delay(function () {
				this.input.tooltip("close").attr("title", "");
			}, 2500);
			this.input.autocomplete("instance").term = "";
		},

		_destroy: function () {
			this.wrapper.remove();
			this.element.show();
		}
	});
	$("#combobox").combobox();
	$("#comboboxMobile").combobox();
	$('.custom-combobox-input').attr("placeholder", "Search");
});

$(".mouse-scroll-down").click(function () {
	$('html,body').animate({
			scrollTop: $(".home-category-box-section").offset().top
		},
		'slow');
});

$(".back-to-top").click(function () {
	$('html,body').animate({
			scrollTop: $(".product-listings").offset().top
		},
		'slow');
});


// For Push Menu 
// -----------------------------------------------------------

$(".menu-trigger").click(function(){         

	$(this).parents("div.main-width").toggleClass("active");
	$(".push-menu-container").toggleClass("active");
	$('body,html').toggleClass('overflow-hide');

});

$('.main-width').click(function(e) {
    if (!$(e.target).closest('.menu-trigger').length){
        
		$(".main-width").removeClass("active");
		$(".push-menu-container").removeClass("active");

    }
});


$("ul.push-menu-listings li a").click(function(){

	$(this).next("div.drop-down-level-2").addClass("active");

});

$(".back-button").click(function(){

	$(this).parent("div.drop-down-level-2").removeClass("active");

});

$("ul.drop-down-level-2-nav-list li a").click(function(){

	$(this).next("div.drop-down-level-3").addClass("active");

});

$(".back-button-3").click(function(){

	$(this).parent("div.drop-down-level-3").removeClass("active");

});


$(".mobile-search-trigger").click(function(){

	$(".mobile-search-section").slideDown();

})


$(".mobile-search-close").click(function(){

	$(this).parent("div.mobile-search-section").slideUp();

})



$(function(){
	$(".product-left-panel input[type='checkbox']").each(function(){
		if($(this).prop("checked"))
			OpenFilter($(this),true);
	});

});

function OpenFilter(checkboxElem,option){
	if (option){
		checkboxElem.parents(".product-tick-box-container").addClass("active");
		checkboxElem.parents(".product-tick-box-container").prev("h2").find("span").addClass("side-arrow");   
	}else 
	{
		checkboxElem.parents(".product-tick-box-container").removeClass("active"); 
		checkboxElem.parents(".product-tick-box-container").prev("h2").find("span").removeClass("side-arrow");
	}

}

$('.product-left-panel h2').click(function(){
	$(this).find('.down-arrow').toggleClass('side-arrow');
	$(this).next('.product-tick-box-container').toggleClass("active");
});


$('.product-left-panel').find('.product-tick-box-container.active').addClass("test");


// if(test.is(':checked')){
// 	alert("test");
// 	$(this).parents().find('.product-tick-box-container').addClass("active");
// 	}
// 	else if(test.prop("checked") == false){
// 	$(this).parents().find('.product-tick-box-container').removeClass("active");
// 	}


// Mobile Filter & Sort 
$('.mobile-filter').click(function(){
	$(this).addClass('active');
	$('.sort-filter').removeClass('active');
	$('.filter-area').slideToggle();
	$('.sort-wrapper').addClass("hidden-xs"); 
});

$('.sort-filter').click(function(){
	$('.mobile-filter').removeClass('active');
	$(this).addClass('active');
	$('.filter-area').slideUp();
	$('.sort-wrapper').toggleClass("hidden-xs"); 
});


// Mobile header
if ($(window).width() < 480) {

	$(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        if(scrollTop > 90){
            $('.mobile-nav-serch-section').addClass("sticky");
            $('.site-logo img').addClass("fixed");
        }else{
        	$('.mobile-nav-serch-section').removeClass("sticky");
        	$('.site-logo img').removeClass("fixed");
        }
    });

	


	// This following light box has been used in mobile for product image popup with zoom effect
    $('.imgPopup').click(function(e) {
		//prevent default action (hyperlink)
		e.preventDefault();
		
		//Get clicked link href
		var image_href = $(this).attr("href");
		
		/* 	
		If the lightbox window HTML already exists in document, 
		change the img src to to match the href of whatever link was clicked
		
		If the lightbox window HTML doesn't exists, create it and insert it.
		(This will only happen the first time around)
		*/
		
		if ($('#lightbox').length > 0) { // #lightbox exists
			
			//place href as img src value
			$('#content').html('<img src="' + image_href + '" />');
		   	
			//show lightbox window - you could use .show('fast') for a transition
			$('#lightbox').show();
		}
		
		else { //#lightbox does not exist - create and insert (runs 1st time only)
			 
			//create HTML markup for lightbox window
			var lightbox = 
			'<div id="lightbox">' +
				'<p>X</p>' +
				'<div id="content">' + //insert clicked link's href into img src
					'<img src="' + image_href +'" />' +
				'</div>' +	
			'</div>';
				
			//insert lightbox HTML into page
			$('body').append(lightbox);
		}
		//Click anywhere on the page to get rid of lightbox window
		$('#lightbox p').click(function() { //must use live, as the lightbox element is inserted into the DOM
			$('#lightbox').hide();
		});
	});
	
	


	
 





} else if ($(window).width() < 1024 && $(window).width() >= 768) {

	

	
} else {

	var $easyzoom = $('.easyzoom').easyZoom();

}


// $('.push-menu-listings').
$('.drop-down-level-2').prev('a').addClass("dropdownStat");
$('.drop-down-level-3').prev('a').addClass("dropdownStat");



// Footer collpase for mobile view
$('.useful-links').on('click', function(){
	$('.useful-links').toggleClass("is-visible");
	$('.footer-links-wrapper').slideToggle();
});


// $('.dashboard-wraper .dash-title').on('click', function(){
// 	// alert("test");
// 	$(this).next('.mobile-cart-table').slideToggle();
// 	$(this).toggleClass("active");
// });


$('.dashboard-wraper .recentordertitle').on('click', function(){
	$(this).next('.recentordertable').slideToggle();
	$(this).toggleClass("active");
});

$('.dashboard-wraper .archivedordertitle').on('click', function(){
	$(this).next('.archivedordertable').slideToggle();
	$(this).toggleClass("active");
});

// CVV Description popup
$('.fa-question-circle').on('click', function(){
	$('.cvv-description-popup').fadeToggle();
});

$('.fa-times').on('click', function(){
	$('.cvv-description-popup').fadeOut();
});




/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=54d4b64f6dfd7f0e3d9f0749533dbe98)
 * Config saved to config.json and https://gist.github.com/54d4b64f6dfd7f0e3d9f0749533dbe98
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var n=t.fn.jquery.split(" ")[0].split(".");if(n[0]<2&&n[1]<9||1==n[0]&&9==n[1]&&n[2]<1||n[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function n(n){return this.each(function(){var a=t(this),i=a.data("bs.tab");i||a.data("bs.tab",i=new e(this)),"string"==typeof n&&i[n]()})}var e=function(n){this.element=t(n)};e.VERSION="3.3.7",e.TRANSITION_DURATION=150,e.prototype.show=function(){var n=this.element,e=n.closest("ul:not(.dropdown-menu)"),a=n.data("target");if(a||(a=n.attr("href"),a=a&&a.replace(/.*(?=#[^\s]*$)/,"")),!n.parent("li").hasClass("active")){var i=e.find(".active:last a"),r=t.Event("hide.bs.tab",{relatedTarget:n[0]}),s=t.Event("show.bs.tab",{relatedTarget:i[0]});if(i.trigger(r),n.trigger(s),!s.isDefaultPrevented()&&!r.isDefaultPrevented()){var o=t(a);this.activate(n.closest("li"),e),this.activate(o,o.parent(),function(){i.trigger({type:"hidden.bs.tab",relatedTarget:n[0]}),n.trigger({type:"shown.bs.tab",relatedTarget:i[0]})})}}},e.prototype.activate=function(n,a,i){function r(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),n.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),o?(n[0].offsetWidth,n.addClass("in")):n.removeClass("fade"),n.parent(".dropdown-menu").length&&n.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}var s=a.find("> .active"),o=i&&t.support.transition&&(s.length&&s.hasClass("fade")||!!a.find("> .fade").length);s.length&&o?s.one("bsTransitionEnd",r).emulateTransitionEnd(e.TRANSITION_DURATION):r(),s.removeClass("in")};var a=t.fn.tab;t.fn.tab=n,t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){return t.fn.tab=a,this};var i=function(e){e.preventDefault(),n.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),+function(t){"use strict";function n(){var t=document.createElement("bootstrap"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var e in n)if(void 0!==t.style[e])return{end:n[e]};return!1}t.fn.emulateTransitionEnd=function(n){var e=!1,a=this;t(this).one("bsTransitionEnd",function(){e=!0});var i=function(){e||t(a).trigger(t.support.transition.end)};return setTimeout(i,n),this},t(function(){t.support.transition=n(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(n){return t(n.target).is(this)?n.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
