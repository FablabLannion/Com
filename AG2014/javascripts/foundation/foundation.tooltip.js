!function(t,e){"use strict";Foundation.libs.tooltip={name:"tooltip",version:"5.3.3",settings:{additional_inheritable_classes:[],tooltip_class:".tooltip",append_to:"body",touch_close_text:"Tap To Close",disable_for_touch:!1,hover_delay:200,show_on:"all",tip_template:function(t,e){return'<span data-selector="'+t+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'">'+e+'<span class="nub"></span></span>'}},cache:{},init:function(t,e,n){Foundation.inherit(this,"random_str"),this.bindings(e,n)},should_show:function(e){var n=t.extend({},this.settings,this.data_options(e));return"all"===n.show_on?!0:this.small()&&"small"===n.show_on?!0:this.medium()&&"medium"===n.show_on?!0:this.large()&&"large"===n.show_on?!0:!1},medium:function(){return matchMedia(Foundation.media_queries.medium).matches},large:function(){return matchMedia(Foundation.media_queries.large).matches},events:function(e){var n=this,i=n.S;n.create(this.S(e)),t(this.scope).off(".tooltip").on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"]",function(e){var s=i(this),a=t.extend({},n.settings,n.data_options(s)),o=!1;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&i(e.target).is("a"))return!1;if(/mouse/i.test(e.type)&&n.ie_touch(e))return!1;if(s.hasClass("open"))Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&e.preventDefault(),n.hide(s);else{if(a.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type))return;!a.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&(e.preventDefault(),i(a.tooltip_class+".open").hide(),o=!0),/enter|over/i.test(e.type)?this.timer=setTimeout(function(){n.showTip(s)}.bind(this),n.settings.hover_delay):"mouseout"===e.type||"mouseleave"===e.type?(clearTimeout(this.timer),n.hide(s)):n.showTip(s)}}).on("mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip","["+this.attr_name()+"].open",function(e){return/mouse/i.test(e.type)&&n.ie_touch(e)?!1:void(("touch"!=t(this).data("tooltip-open-event-type")||"mouseleave"!=e.type)&&("mouse"==t(this).data("tooltip-open-event-type")&&/MSPointerDown|touchstart/i.test(e.type)?n.convert_to_touch(t(this)):n.hide(t(this))))}).on("DOMNodeRemoved DOMAttrModified","["+this.attr_name()+"]:not(a)",function(){n.hide(i(this))})},ie_touch:function(){return!1},showTip:function(t){var e=this.getTip(t);return this.should_show(t,e)?this.show(t):void 0},getTip:function(e){var n=this.selector(e),i=t.extend({},this.settings,this.data_options(e)),s=null;return n&&(s=this.S('span[data-selector="'+n+'"]'+i.tooltip_class)),"object"==typeof s?s:!1},selector:function(t){var e=t.attr("id"),n=t.attr(this.attr_name())||t.attr("data-selector");return(e&&e.length<1||!e)&&"string"!=typeof n&&(n=this.random_str(6),t.attr("data-selector",n)),e&&e.length>0?e:n},create:function(n){var i=this,s=t.extend({},this.settings,this.data_options(n)),a=this.settings.tip_template;"string"==typeof s.tip_template&&e.hasOwnProperty(s.tip_template)&&(a=e[s.tip_template]);var o=t(a(this.selector(n),t("<div></div>").html(n.attr("title")).html())),r=this.inheritable_classes(n);o.addClass(r).appendTo(s.append_to),Modernizr.touch&&(o.append('<span class="tap-to-close">'+s.touch_close_text+"</span>"),o.on("touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip",function(){i.hide(n)})),n.removeAttr("title").attr("title","")},reposition:function(e,n,i){var s,a,o,r,l;if(n.css("visibility","hidden").show(),s=e.data("width"),a=n.children(".nub"),o=a.outerHeight(),r=a.outerHeight(),n.css(this.small()?{width:"100%"}:{width:s?s:"auto"}),l=function(t,e,n,i,s){return t.css({top:e?e:"auto",bottom:i?i:"auto",left:s?s:"auto",right:n?n:"auto"}).end()},l(n,e.offset().top+e.outerHeight()+10,"auto","auto",e.offset().left),this.small())l(n,e.offset().top+e.outerHeight()+10,"auto","auto",12.5,t(this.scope).width()),n.addClass("tip-override"),l(a,-o,"auto","auto",e.offset().left);else{var c=e.offset().left;Foundation.rtl&&(a.addClass("rtl"),c=e.offset().left+e.outerWidth()-n.outerWidth()),l(n,e.offset().top+e.outerHeight()+10,"auto","auto",c),n.removeClass("tip-override"),i&&i.indexOf("tip-top")>-1?(Foundation.rtl&&a.addClass("rtl"),l(n,e.offset().top-n.outerHeight(),"auto","auto",c).removeClass("tip-override")):i&&i.indexOf("tip-left")>-1?(l(n,e.offset().top+e.outerHeight()/2-n.outerHeight()/2,"auto","auto",e.offset().left-n.outerWidth()-o).removeClass("tip-override"),a.removeClass("rtl")):i&&i.indexOf("tip-right")>-1&&(l(n,e.offset().top+e.outerHeight()/2-n.outerHeight()/2,"auto","auto",e.offset().left+e.outerWidth()+o).removeClass("tip-override"),a.removeClass("rtl"))}n.css("visibility","visible").hide()},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},inheritable_classes:function(e){var n=t.extend({},this.settings,this.data_options(e)),i=["tip-top","tip-left","tip-bottom","tip-right","radius","round"].concat(n.additional_inheritable_classes),s=e.attr("class"),a=s?t.map(s.split(" "),function(e){return-1!==t.inArray(e,i)?e:void 0}).join(" "):"";return t.trim(a)},convert_to_touch:function(e){var n=this,i=n.getTip(e),s=t.extend({},n.settings,n.data_options(e));0===i.find(".tap-to-close").length&&(i.append('<span class="tap-to-close">'+s.touch_close_text+"</span>"),i.on("click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose",function(){n.hide(e)})),e.data("tooltip-open-event-type","touch")},show:function(t){var e=this.getTip(t);"touch"==t.data("tooltip-open-event-type")&&this.convert_to_touch(t),this.reposition(t,e,t.attr("class")),t.addClass("open"),e.fadeIn(150)},hide:function(t){var e=this.getTip(t);e.fadeOut(150,function(){e.find(".tap-to-close").remove(),e.off("click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose"),t.removeClass("open")})},off:function(){var e=this;this.S(this.scope).off(".fndtn.tooltip"),this.S(this.settings.tooltip_class).each(function(n){t("["+e.attr_name()+"]").eq(n).attr("title",t(this).text())}).remove()},reflow:function(){}}}(jQuery,window,window.document);