
window.animationFast=800;
window.animationEasy='easeInOutBack';


$(document).ready(function(){
	
	poss=[]; page_poss=[];
	page_poss['options']=2; page_poss['about']=3;
	$(window).resize(pos_pages_i);
	pos_pages_i();

	$('segment').each(function(id, sw){
		$(sw).click(function(){
			if($('content', this).is(':hidden'))
			{
				$('content', this).slideDown(window.animationFast, window.animationEasy);
				$(this).removeClass('closed');
				$(this).addClass('opened');
			}
		});
	});
	$('segment switcher').each(function(id, sw){
		$(sw).click(function(e){
			$('content', $(this).parent()).slideUp(window.animationFast/2,  'easeOutCirc');
			$(this).parent().addClass('closed');
			$(this).parent().removeClass('opened');
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

