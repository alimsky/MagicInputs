
function Generator(){

	this.searchRegExp=/{{.*?}}/g;
	this.innerRegExp=/(?!{).*(?=(}}))/g;
	this.couldNotBeDetermined="F*WEJNH##@YHQE@#*R";
	this.got=[];
	this.got['CONSONANTS']=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh','fr','th','q','k', 'l','m','n','p','s','t','b','c','d','f','g'];
	this.got['VOWELS']=['a','e','i','o','u','y','a','e','i','o','u','y','oo', 'ou', 'ae', 'ea'];

	this.word=function(lngth, firstLetterLower){

		var resultWord='';
		var odd=true; //alternation of vowels and consonants

		//Define length of word
		lngth=lngth?lngth:Math.floor(Math.random()*10)+3;

		//Too obvious to comment anything here
		while (resultWord.length < lngth){
			if(odd){
				newSymbol = this.got['CONSONANTS'][Math.floor(Math.random()*this.got['CONSONANTS'].length)];
			} else {
				newSymbol = this.got['VOWELS'][Math.floor(Math.random()*this.got['VOWELS'].length)];
			}
			odd=!odd;
			resultWord+=newSymbol;
		}
		resultWord=resultWord.substring(0,lngth);

		//Capitalize word
		if(!firstLetterLower) {
			resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);
		}

		return resultWord;
	};

this.paragraph = function ( lngth ) {

	lngth=lngth?lngth:Math.floor(Math.random()*30)+5;

	var result = this.word();

	for(var wn=1; wn<lngth; wn++){
		result = result + ' ' + this.word(null, true);
	}

	return result;
}


this.number=function(offset, max){
	offset=offset?parseInt(offset):0;
	max=max?parseInt(max):100;
	max++;
	return Math.floor(Math.random()*(max-offset))+offset;
}

this.parseCommand=function(command){
	command=command.toString();
	var A=command.substring(0,1);	
	var B=command.substring(1);
	if(A==='n'){
		if(B!==''){
			aB=B.split(',');
			return this.number(aB[0], aB[1]);
		}
		return this.number();
	} else if(A==='w') {
		if (parseInt(B)>0) {
			return this.word(parseInt(B), true);
		}
		return this.word(null, true);
	} else if(A==='W'){
		if (parseInt(B)>0) {
			return this.word(parseInt(B));
		}
		return this.word(null);
	} else if(A==='p'){
		return this.paragraph(parseInt(B));
	} else if(A==='r' && B!==''){
		aB=B.split(B.substing(1));
		return this.paragraph(parseInt(B));
	} else {
		return this.couldNotBeDetermined;
	}
};
this.work=function(q){
	return (q.replace(this.searchRegExp, function(qq, place, str){
		var nl=qq.match(this.innerRegExp)[0];
		if(this.parseCommand(nl)===this.couldNotBeDetermined) {
			return qq;
		} else {
			return this.parseCommand(nl);
		}
	}));
}

//
//gets one random element of array
//
this.getRandomElement=function(ar){
	return ar[Math.floor(Math.random()*ar.length)];
}

return this;
}

//for (this.p=0; p<100; p++)
//	console.log(g.number(5,0));
