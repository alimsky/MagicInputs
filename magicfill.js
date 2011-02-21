(function(){

function valueGenerator(){
		//Some hardcoded data... TODO:Drop it to options.html
		this.EMAIL=['mail'];
		this.NUMBER=['numb', 'integer', 'price', 'size', 'val'];
		this.EMAIL_HOSTING=['gmail.com','hotmail.com','yahoo.com','mail.ru'];
		this.CONSONANTS=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh', 'fr','q'];
		this.VOWELS=['a','e','i','o','u','y', 'oo', 'ou', 'ae', 'ea'];

		//generate word function
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

		//generate whole phrases, inserting big letter in beggining and the dot at the end. Writing comments is so boring...
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

		//generate email with random word and random selected email_hosting
		this.generateEmail=function(){
				return this.generateWord(null, true)+'@'+this.EMAIL_HOSTING[Math.floor(Math.random()*this.EMAIL_HOSTING.length)];
		}

		//Select random option in dropdown... but it works weird. TODO:Look into it.
		this.selectValue=function(select_control){
				rVal = Math.floor(Math.random()*(select_control.options.length));
				console.log(rVal);
 				select_control.selectedIndex = rVal;
		};

		//check randomly
		this.checkValue=function(checkbox){
			checkbox.checked = (Math.random()>0.5)?'checked':'';
		};

		//check one of radios
		this.radioValue=function(radio){
			var radios=[];
			var pretendents=document.getElementsByName(radio.name);

			//Select only true RADIO buttons :)
			for(var i in pretendents) {
				if(pretendents[i].type=="radio")  //malo li
					radios.push(pretendents[i]);
			}

			//Do the magic!
			radios[Math.floor(Math.random()*radios.length)].checked=true;

		}

		//Is any entries of the string ST equal to any lements of Array AR
		this.isAnyEqual=function(st, ar){
			for (elm in ar){
				if(st.indexOf(ar[elm])>0){
					return true;
				}
			}
			return false;
		}

		//Return random value based on id, class and name of input
		this.valueBasedOnType=function(inp){
			q=inp.id+' '+inp.name+' '+inp.className;
			if(this.isAnyEqual(q, this.EMAIL))
				return this.generateEmail();
			else if(this.isAnyEqual(q, this.NUMBER))
				return (Math.random()*10000);
			else 
				return this.generateWord();
		}

		this.scanTheDomAndMakeSomeMagic=function(){
				//Find all the inputs, and operate with them
				el=document.getElementsByTagName('input');
				for(var i in el) {
					if(el[i].type=="text")
						el[i].value=this.valueBasedOnType(el[i]);
					else if(el[i].type=="password")
						el[i].value="123123"; // TODO: unhardcode
					else if(el[i].type=="checkbox")
						this.checkValue(el[i]);
					else if(el[i].type=="radio")
						this.radioValue(el[i]);
				}

				//Find all the textareas and insert phrases in it.
				el=document.getElementsByTagName('textarea');
				for(var i=0; i<el.length; i++) {
					el[i].value=this.generatePhrase();
				}

				//Select something in all selects
				el=document.getElementsByTagName('select');
				for(var i=0; i<el.length; i++) {
					this.selectValue(el[i]);
				}
				return 'All right!';
		}
}

if(!window.vG) 
	window.vG=new valueGenerator();

window.vG.scanTheDomAndMakeSomeMagic();

})();
