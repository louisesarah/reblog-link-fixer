// ==UserScript==
// @name	Reblog Link Option for Tumblr
// @description	Automatically removes any click-through link (preserving the content source), adds option to set a link in the editor (on mouse-hover, link edit icon appears).
// @include	http://www.tumblr.com/*
// @exclude	http://www.tumblr.com/inbox
// @exclude	http://www.tumblr.com/help
// @exclude	http://www.tumblr.com/settings
// @grant	none
// ==/UserScript==


// Beginning code as userscript for simplicity
// will edit and create manifest.json upon successful compile/run/test


(function(){
// tumblr image clickthrough editor html code when posting content, set to var 
var controlDivs = '<div style="display: none;" class="controls"><div class="linkthrough control" title="Click-through link"><b class="icon"></b><div class="linkthrough_popover popover popover_gradient" style="display: none;"><div class="popover_inner"><label for="post[three]">Set a click-through link</label><div><input class="text_field" placeholder="http://" maxlength="200" size="40" name="post[three]" value="" autocomplete="off" type="text"></div></div></div></div></div>';

// unsafeWindow emulation found via http://mths.be/unsafewindow
// Note: unsafeWindow is just that
// but a temporary solution to access custom jQuery objects until better option is found

var UW = (function(){
    var newDiv = document.createElement('p')
    newDiv.setAttribute('onclick', 'return window;');
	return newDiv.onclick();
    })();

function controlOption($button){
	UW.jQuery(".item", $button).each(function(i,y){
		UW.jQuery(y).append(UW.jQuery(controlDivs));
	});
}

// check post_type when show_post_form occurs (the edit window)
var newPF = UW.Tumblr.PostForms.BaseView.prototype.show_post_form;

UW.Tumblr.PostForms.BaseView.prototype.show_post_form = function(post_type){
	newPF.call(this, post_type);
	if (post_type != 'photo'){
		return;
	}

 	//check .active exists as subset of plexi, where the new post form divs are
	if(UW.jQuery('.photos','.active','.plexi').size()>0 || UW.jQuery('.active','#dashboard_drafts').size()>0){
		var $photos = UW.jQuery("#post_form .photos");
		
		// check inner class="controls" size (exists or not)
		// if it already exists (user-uploaded photo keeps controls option), return
		if (UW.jQuery(".controls", "#post_form .photos").size()>0){ return; }
		else { controlOption($photos); }
		};
	};

})();
