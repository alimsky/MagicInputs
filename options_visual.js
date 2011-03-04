
window.animationFast=800;
window.animationEasy='easeInOutBack';

function saveStateOfSegments(){
	var ss=[];
	$('segment').each(function(i,el){
		ss[i]=$(el).hasClass('closed')?'0':'1';
	});
	localStorage['MagicInputs_optionsSegments']=ss;
}
function loadStateOfSegments(){
	if(localStorage['MagicInputs_optionsSegments'])
		ss=localStorage['MagicInputs_optionsSegments'].split(',');
	for(t in ss){
		if(ss[t]==1){ 
			$($('segment')[t]).addClass('opened');
			$($('segment')[t]).removeClass('closed');
			$('content', $($('segment')[t])).show();
		} else {
			$($('segment')[t]).removeClass('opened');
			$($('segment')[t]).addClass('closed');
			$('content', $($('segment')[t])).hide();
		}
	}
}

$(document).ready(function(){
	$('changed').hide()	
	poss=[]; page_poss=[];
	page_poss['options']=2; page_poss['about']=3;
	$(window).resize(pos_pages_i);
	pos_pages_i();

	loadStateOfSegments();

	$('segment').each(function(id, sw){
		$(sw).click(function(){
			if($('content', this).is(':hidden'))
			{
				$('content', this).slideDown(window.animationFast, window.animationEasy);
				$(this).removeClass('closed');
				$(this).addClass('opened');
				saveStateOfSegments();
			}
		});
	});
	$('segment switcher').each(function(id, sw){
		$(sw).click(function(e){
			$('content', $(this).parent()).slideUp(window.animationFast/2,  'easeOutCirc');
			$(this).parent().addClass('closed');
			$(this).parent().removeClass('opened');
			saveStateOfSegments();
		});
	});

});

function go_right(){ for(var t in page_poss){ page_poss[t]--;} pos_pages(); }
function go_left(){ for(var t in page_poss){ page_poss[t]++; } pos_pages(); }
function pos_pages(){ 
	for(var t in page_poss){ 
		animEase = (page_poss[t]==2)?'easeOutCirc':'easeInCirc';
		animSpeed = (page_poss[t]==2)?400:300;
		$('page#'+t).animate({
				left:poss[page_poss[t]]
			}, animSpeed, animEase);
		} 
}
function pos_pages_i(){
	for (var a=0; a<4; a++){
		poss[a]=$('body').width()*(a-1.5) - $('page').width()/2 - 20;
	}
	for(var t in page_poss){ 
		$('page#'+t).css('left', poss[page_poss[t]]+'px');
	}
}

