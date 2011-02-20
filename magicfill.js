(function(){
//generate word function
var CONSONANTS=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh', 'fr','q'];
var VOWELS=['a','e','i','o','u','y', 'oo', 'ou', 'ae', 'ea'];
function generateWord(lngth, firstLetterLower){

		//Define length of word
    if(!lngth)
        lngth=Math.floor(Math.random()*10)+3;
    
    var resultWord='';
    var odd=true; //alternation of vowels and consonants

		//Too obvious to comment anything here
    while (resultWord.length < lngth){
        newSymbol = odd?CONSONANTS[Math.floor(Math.random()*CONSONANTS.length)]:VOWELS[Math.floor(Math.random()*VOWELS.length)];
        odd=!odd;
        resultWord+=newSymbol;
    }

		//Make uppercase first letter of generated word
		if(!firstLetterLower)
			resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);

    return resultWord;
}

function generatePhrase(lngth){
		var resultPhrase='';
    if(!lngth){
        lngth=Math.floor(Math.random()*24)+5;
    };
		for (var word=0; word<=lngth; word++){
			if (word==lngth)
				resultPhrase=resultPhrase + generateWord(null, true) + '.';
			else if(word==1)
				resultPhrase=generateWord()+' ';
			else
				resultPhrase=resultPhrase + generateWord(null, true) + ' ';
		}
		return resultPhrase;
}

el=document.getElementsByTagName('input');
for(var i=0; i<el.length; i++) {
	if(el(i).type=="text")
		el(i).value=generateWord();
	if(el(i).type=="pass")
		el(i).value="123123";
}

el=document.getElementsByTagName('textarea');
for(var i=0; i<el.length; i++) {
	el(i).value=generatePhrase();
}

el=document.getElementsByTagName('select');
for(var i=0; i<el.length; i++) {
	el(i).selectedIndex = Math.floor(Math.random()*(el(i).options.length+1));
}

})();
