window.sts={};
function storeOption(optionName, optionValue){
	sts[optionName]=optionValue;
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
	}
	dropHotkeyAssign();	
});

$(document).ready(function(){
	$('#use_hotkeys').click(function(){ //maybe somebode clicked 'use hotkeys' checkbox, we should save it
		storeOption('USE_HOTKEYS', this.checked);
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
	alert('Saved');
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

	if(sts['USE_HOTKEYS'])
		$('#use_hotkeys').attr('checked','checked');

	//And show on frontend
	if(sts['typical_hotkey'])
		$('#hotkey_typical_input').val(convertEventToHotkeyString(sts['typical_hotkey']));
});

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