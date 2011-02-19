//generate word function
var CONSONANTS=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh', 'fr','q'];
var VOWELS=['a','e','i','o','u','y', 'oo', 'ou', 'ae', 'ea'];
function generateWord(lngth){

		//Define length of word
    if(!lngth){
        lngth=Math.floor(Math.random()*10)+2;
    };
    var resultWord='';
    var odd=true; //alternation of vowels and consonants

		//Too obvious to comment anything here
    while (resultWord.length < lngth){
        newSymbol = odd?CONSONANTS[Math.floor(Math.random()*CONSONANTS.length)]:VOWELS[Math.floor(Math.random()*VOWELS.length)];
        odd=!odd;
        resultWord+=newSymbol;
    }

		//Make uppercase first letter of generated word
		resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);

    return resultWord;
}

//generate email function
var EMAILHOSTS=['gmail.com', 'hotmail.com', 'yahoo.com'];
function generateEmail(){
	resultEmail=EMAILHOSTS(Math.random(3));
}


        $$('.required').each(function(key){
            if(!evt.shiftKey){if(key.value!=''){return;}}
            if(key.hasClassName('validate-email')){
                key.value= generateWord() + '@a-' + generateWord(22) +'.com';
            }else{
                if((key.id.indexOf('date')!=-1)||key.hasClassName('validate-date')){
                    key.value = '07/'+(Math.floor(Math.random()*14)+10)+'/10';

                }else if((key.id.indexOf('_zip')!=-1)){
                    key.setValue('10001');
                    key.focus();
                    if(key.blur){key.blur();}
                }else if(key.hasClassName('validate-digits')||key.hasClassName('validate-number')||key.hasClassName('validate-positive-number-date')){
                    if(key.value=='')
                        key.value=Math.floor(Math.random()*100000);
                }else{
                    key.value=generateWord();
                }
            }
        }.bind(evt));
