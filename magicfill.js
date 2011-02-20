(function(){

function valueGenerator(){
//generate word function
this.CONSONANTS=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh', 'fr','q'];
this.VOWELS=['a','e','i','o','u','y', 'oo', 'ou', 'ae', 'ea'];
this.generateWord=function(lngth, firstLetterLower){

		//Define length of word
    if(!lngth)
        lngth=Math.floor(Math.random()*10)+3;
    
    var resultWord='';
    var odd=true; //alternation of vowels and consonants

		//Too obvious to comment anything here
    while (resultWord.length < lngth){
        newSymbol = odd?this.CONSONANTS[Math.floor(Math.random()*this.CONSONANTS.length)]:this.VOWELS[Math.floor(Math.random()*this.VOWELS.length)];
        odd=!odd;
        resultWord+=newSymbol;
    }

		//Make uppercase first letter of generated word
		if(!firstLetterLower)
			resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);

    return resultWord;
}

this.generatePhrase=function(lngth){
		var resultPhrase='';
    if(!lngth){
        lngth=Math.floor(Math.random()*24)+5;
    };
		for (var word=0; word<=lngth; word++){
			if (word==lngth)
				resultPhrase=resultPhrase + this.generateWord(null, true) + '.';
			else if(word==1)
				resultPhrase=this.generateWord()+' ';
			else
				resultPhrase=resultPhrase + this.generateWord(null, true) + ' ';
		}
		return resultPhrase;
};
this.selectValue=function(select_control){
	select_control.selectedIndex = Math.floor(Math.random()*(select_control.options.length+1));
};
this.checkValue=function(checkbox){
	checkbox.checked = (Math.random()>0.5)?'checked':'';
};
}

if(!window.vG) 
	window.vG=new valueGenerator();


//Find all the inputs, and operate with them
el=document.getElementsByTagName('input');
for(var i=0; i<el.length; i++) {
	if(el(i).type=="text")
		el(i).value=window.vG.generateWord();
	if(el(i).type=="pass")
		el(i).value="123123";
	if(el(i).type=="checkbox")
		window.vG.checkValue(el(i));
}

//Find all the textareas and insert phrases in it.
el=document.getElementsByTagName('textarea');
for(var i=0; i<el.length; i++) {
	el(i).value=window.vG.generatePhrase();
}

//Select something in all selects
el=document.getElementsByTagName('select');
for(var i=0; i<el.length; i++) {
	window.vG.selectValue(el(i));
}

})();
