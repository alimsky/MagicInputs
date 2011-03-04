window.sts={};
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
			$('.hotkey-input').each(function(i,b){$(b).removeClass('assign-in-process')});
			window.hotKeyBind='';
}

$(document).keyup(function(e){
	if((window.hotKeyBind)&&(window.hotKeyBind!='')){ // should we care about this key event?
		if(!e.keyCode) return; // if whatever..?
		if(27==e.keyCode) dropHotkeyAssign(); //If Esc
		var ch=convertEventToHotkeyString(e); // to show in input
		$('#hotkey_'+window.hotKeyBind+'_input').val(ch); //...
		storeOption(window.hotKeyBind+'_hotkey',{ctrlKey:e.ctrlKey, altKey:e.altKey, shiftKey:e.shiftKey, keyCode:e.keyCode}); // save this
		highlightChange($('.hotkeys content'));
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
	window.onbeforeunload=function(){return "You didn't save your choice, ok?";}
}


//Load options
$(document).ready(function(){
	//get from localStorage and parse
	if(localStorage['MagicInputs_defaultPreset'])
		localSettings =	JSON.parse(localStorage['MagicInputs_defaultPreset']);
	else
		return;

	//Move it to stored
	sts=localSettings;	

	//And show on frontend
	if(sts['USE_HOTKEYS'])
		$('#use_hotkeys').attr('checked','checked');

	if(sts['typical_hotkey'])
		$('#hotkey_typical_input').val(convertEventToHotkeyString(sts['typical_hotkey']));

	if(sts['PASSWORD_TYPE'])
		$('.passwords input[value=' + sts['PASSWORD_TYPE'] + ']').attr('checked','checked');

	if(sts['EMAIL_HOSTING_TYPE'])
		$('.emails input[value=' + sts['EMAIL_HOSTING_TYPE'] + ']').attr('checked','checked');

	if(sts['PASSWORD_DEF'])
		$('input[name=PASSWORD_DEF]').val(sts['PASSWORD_DEF']);

	var sss=sts['EMAIL_HOSTING']+'';
	if(sts['EMAIL_HOSTING'])
		$('textarea[name=EMAIL_HOSTING]').val(sss.replace(',', ', '));




//Now events to input



	$('input[type=radio]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).click(function(){ //maybe somebode clicked radioboxes, we should save it
		  highlightChange(this);
		  storeOption(this.name, this.value);
		})
	});
	$('input[type=checkbox]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).click(function(){ //maybe somebody clicked checkboxes, we should save it
		  highlightChange(this);
		  storeOption(this.name, this.checked);
		})
	});
	$('textarea, input[type=text]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).change(function(){ //maybe somebode changed inputs, we should save it
		  highlightChange(this);
		  storeOption(this.name, $(this).val());
		})
	});
	$('textarea.save_as_array, input.save_as_array[type=text]').each(function(i,el){
		if($(el).hasClass('__dont_save')) return;
		$(el).unbind('change');
		$(el).change(function(){ //maybe somebode changed inputs, we should save it
		  highlightChange(this);
		  storeOption(this.name, $(this).val().split(' ').join('').split(','));
		})
	});
	$('#hotkey_typical').click(function(){	//assign typical hotkey
		dropHotkeyAssign();		//drop others
		window.hotKeyBind='typical';	//main reason
		$('#hotkey_typical_input').addClass('assign-in-process');  //helps to see what we're going to assign
	});
});

// Saves options to localStorage.
function save_options() {
	localStorage['MagicInputs_defaultPreset']=(JSON.stringify(window.sts));
	$('changed').fadeOut();
	window.onbeforeunload=null;
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
