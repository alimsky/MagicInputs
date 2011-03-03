
$(document).ready(function(){
	$('#hotkey_typical').click(function(){
		window.hotKeyBind='typical';
	});
});

$(document).keyup(function(e){
	if((window.hotKeyBind)&&(window.hotKeyBind!='')){
		var ch='';
		if(!e.keyCode) return;
		ch=String.fromCharCode(e.keyCode);
		ch=(e.ctrlKey?'Ctrl + ':'') +
			(e.altKey?'Alt + ':'') +
			(e.shiftKey?'Shift + ':'') + ch;
		$('#hotkey_'+window.hotKeyBind+'_input').val(ch);
	}
	window.hotKeyBind='';
});

// Saves options to localStorage.
function save_options() {
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
	status.innerHTML = "";
  }, 750);
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
