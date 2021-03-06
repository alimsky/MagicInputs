window.sts={};
window.miText={
	not_assigned:'(not assigned)',
	pressHotkey:'Press the hotkey',
	saved:'Options saved.\nNote, that you should reload opened tabs to make changes work.',
	unsavedOut:'Your options has not been saved.'
};
function storeOption(optionName, optionValue){
	sts[optionName]=optionValue;
}
function removeStoredOption(optionName){
	delete sts[optionName];
}


function mergeObject(tH, def){
	for (att in def) { tH[att] = tH.hasOwnProperty(att)?tH[att]:def[att]}
	return tH;
}
function convertEventToHotkeyString(e){
	return (e.ctrlKey?'Ctrl + ':'') +
		(e.altKey?'Alt + ':'') +
		(e.shiftKey?'Shift + ':'') + String.fromCharCode(e.keyCode);
}

function dropHotkeyAssign(){
			$('.hotkey-input').each(function(i,b){
				if($(b).val()==window.miText['pressHotkey']){
					$(b).val($(b)[0].previousVal)
				}
				$(b).removeClass('assign-in-process')
			});
			window.hotKeyBind='';
}

$(document).keyup(function(e){
	if((window.hotKeyBind)&&(window.hotKeyBind!='')){ // should we care about this key event?
		if((!e.keyCode)||
			( ((e.keyCode>127)&&(e.keyCode<162)) || (e.keyCode<31) )
			){
				dropHotkeyAssign();
				return;
			}
		var ch=convertEventToHotkeyString(e); // to show in input
		$('#hotkey_'+window.hotKeyBind+'_input').val(ch); //...
		storeOption(window.hotKeyBind+'_hotkey',{ctrlKey:e.ctrlKey, altKey:e.altKey, shiftKey:e.shiftKey, keyCode:e.keyCode}); // save this
		highlightChange($('.hotkeys content')[0]);
	}
	dropHotkeyAssign();	
});

function highlightChange(el){
	pEl=el; 
	while(pEl.tagName!="SEGMENT"){
		pEl=pEl.parentElement;
	}
	$(pEl).addClass('changed');
	$('changed', $(pEl)).fadeIn();
	window.onbeforeunload=function(){return window.miText['unsavedOut'];}
}


//Load options
$(document).ready(function(){
	//get from localStorage and parse
	if(localStorage['MagicInputs_defaultPreset']){
		localSettings =	JSON.parse(localStorage['MagicInputs_defaultPreset']);

		//Move it to stored
		sts=localSettings;	

		//And show on frontend
		if(sts['USE_HOTKEYS'])
			$('#use_hotkeys').attr('checked','checked');

		if(sts['typical_hotkey'])
			$('#hotkey_typical_input').val(convertEventToHotkeyString(sts['typical_hotkey']));

		if(sts['PASSWORD_TYPE'])
			$('input[name=PASSWORD_TYPE][value=' + sts['PASSWORD_TYPE'] + ']').attr('checked','checked');

		if(sts['PASSWORD_DEF'])
			$('input[name=PASSWORD_DEF]').val(sts['PASSWORD_DEF']);

		if(sts['EMAIL_USERNAME_TYPE'])
			$('input[name=EMAIL_USERNAME_TYPE][value=' + sts['EMAIL_USERNAME_TYPE'] + ']').attr('checked','checked');

		if(sts['EMAIL_USERNAME_DEF'])
			$('input[name=EMAIL_USERNAME_DEF]').val(sts['EMAIL_USERNAME_DEF']);

		if(sts['EMAIL_HOSTING_TYPE'])
			$('input[name=EMAIL_HOSTING_TYPE][value=' + sts['EMAIL_HOSTING_TYPE'] + ']').attr('checked','checked');

		if(sts['CARD_TYPE'])
			$('input[name=CARD_TYPE][value=' + sts['CARD_TYPE'] + ']').attr('checked','checked');

		if(sts['CARDNUMBER_DEF'])
			$('input[name=CARDNUMBER_DEF]').val(sts['CARDNUMBER_DEF']);

		if(sts['CARDCVV_DEF'])
			$('input[name=CARDCVV_DEF]').val(sts['CARDCVV_DEF']);

		var sss=sts['EMAIL_HOSTING']+'';
		if(sts['EMAIL_HOSTING'])
			$('textarea[name=EMAIL_HOSTING]').val(sss.replace(/,/g, ', '));

		//if this feature checked, highlight the inputs for this segment
		if(!$('#use_hotkeys')[0].checked)
			$('#hotkey__content block.hotkey *').each(function(i,el){$(el).fadeTo(500,0.5)});	
		else
			$('#hotkey__content block.hotkey *').each(function(i,el){$(el).fadeTo(300,1)});	

		$('#targetblank').attr('checked',sts['TARGET_BLANK_FORMS']?'checked':'');
		$('#captchas_fields').attr('checked',sts['DONT_FILL_CAPTCHAS']?'checked':'');
		$('#clear_inputs_events').attr('checked',sts['CLEAR_INPUTS_EVENTS']?'checked':'');
		
	}

	//Now events to input

	$('input[type=radio]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).click(function(){ //maybe somebode clicked radioboxes, we should save it
		  highlightChange(this);
		  storeOption(this.name, this.value);
			_gaq.push(['_trackEvent', 'options', this.name]);
		})
	});
	$('input[type=checkbox]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).click(function(){ //maybe somebody clicked checkboxes, we should save it
		  highlightChange(this);
		  storeOption(this.name, this.checked);
			_gaq.push(['_trackEvent', 'options', this.name]);
		})
	});
	$('#use_hotkeys').click(function(){
		if(!$('#use_hotkeys')[0].checked)
			$('#hotkey__content block.hotkey *').each(function(i,el){$(el).fadeTo(500,0.5)});	
		else
			$('#hotkey__content block.hotkey *').each(function(i,el){$(el).fadeTo(300,1)});	
		_gaq.push(['_trackEvent', 'options', 'hotkeys clicked']);
	})
	$('textarea, input[type=text]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).change(function(){ //maybe somebode changed inputs, we should save it
		  highlightChange(this);
		  storeOption(this.name, $(this).val());
			_gaq.push(['_trackEvent', 'options', this.name]);
		})
	});
	$('textarea.save_as_array, input.save_as_array[type=text]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).unbind('change');
		$(el).change(function(){ //maybe somebode changed inputs, we should save it
		  highlightChange(this);
		  storeOption(this.name, $(this).val().split(' ').join('').split(','));
			_gaq.push(['_trackEvent', 'options', this.name]);
		})
	});
	$('#hotkey_typical,	#hotkey_typical_input').mouseup(function(){	//assign typical hotkey
		dropHotkeyAssign();		//drop others
		window.hotKeyBind='typical';	//main reason
		$('#hotkey_typical_input')[0].previousVal = $('#hotkey_typical_input').val();
		$('#hotkey_typical_input').val(window.miText['pressHotkey']);
		$('#hotkey_typical_input').addClass('assign-in-process');  //helps to see what we're going to assign
	});
});

// Saves options to localStorage.
function save_options() {
	localStorage['MagicInputs_defaultPreset']=(JSON.stringify(window.sts));
	$('changed').fadeOut();
	window.onbeforeunload=null;
	alert(window.miText['saved']);
}


// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["favorite_color"];
  if (!favorite) {
	return;
  }
  var select = document.getElementById("color");
  for (var i = 0; i < select.children.length; i++) {
	var child = select.children[i];
	if (child.value == favorite) {
	  child.selected = "true";
	  break;
	}
  }
}
