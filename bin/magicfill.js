
function magicInputsOptions(){

		this.defaultOptions=[];

		//eto ya vines v otdelnuu funkciuu na vsyakiy pojarniy
		this.setOption=function(option,value,storage){
			storage[option]=value;
		}

		/*/Is there any preset?
		if(_localStorage('preset'))
			localSettings = JSON.parse(_localStorage(_localStorage('preset')));
		else
			localSettings = (_localStorage('MagicInputs_defaultPreset'))?JSON.parse(_localStorage('MagicInputs_defaultPreset')):[];
		*/		


		//Try to get option from localStorage (where options.html saves it's cookies) if there is no such there take default value.
		//gO is shortcut for getOption to comfortable use in code.
		this.gO=function(optionName){
			var preset=(localStorageCopy[preset])?localStorageCopy[preset]:'MagicInputs_defaultPreset';

			if((!this.localSettings))
				if(localStorageCopy[preset])
					this.localSettings=JSON.parse(localStorageCopy[preset]);
				else
					this.localSettings=[];


			if(this.localSettings[optionName]){
					return this.localSettings[optionName];
			}

			//No such options defined, use default
			if(this.defaultOptions[optionName])
				return this.defaultOptions[optionName];
		}

		//Presetted options
		this.setHardcodedOptions=function(storage){

				this.setOption('EMAIL',['mail'], storage);
				this.setOption('CONFIRM',['confirm'], storage);
				this.setOption('NUMBER',['numb', 'integer', 'price', 'size', 'code'], storage);
				this.setOption('CREDITCARDNUMBER',['cc_number', 'cc-number', 'cardnumber', 'credit_card'], storage);
				this.setOption('CREDITCARDCVV',['cvv'], storage);
				this.setOption('ISPHONE',['phone', 'fax'], storage);
				this.setOption('ISDAY',['day'], storage);
				this.setOption('ISMONTH',['month'], storage);
				this.setOption('ISYEAR',['year'], storage);

				this.setOption('USE_HOTKEYS',false, storage);
				this.setOption('PASSWORD_TYPE', 'const', storage);
				this.setOption('PASSWORD_DEF',['123123'], storage);

				this.setOption('EMAIL_USERNAME_TYPE', 'generate', storage);
				this.setOption('EMAIL_USERNAME_DEF','username', storage);

				this.setOption('EMAIL_HOSTING_TYPE','one', storage);
				this.setOption('EMAIL_HOSTING',['gmail.com','hotmail.com','yahoo.com','mail.ru'], storage);

				this.setOption('CONSONANTS',['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh','fr','th','q','k', 'l','m','n','p','s','t','b','c','d','f','g'], storage);
				this.setOption('VOWELS',['a','e','i','o','u','y','a','e','i','o','u','y','oo', 'ou', 'ae', 'ea'], storage);
		}
		//Put presetted to defaults
		this.setHardcodedOptions(this.defaultOptions);
}
window.o = new magicInputsOptions();
function valueGenerator(){

		this.options=new magicInputsOptions();

		//generate word function
		this.generateWord=function(lngth, firstLetterLower){

				//Define length of word
				if(!lngth)
						lngth=Math.floor(Math.random()*10)+3;
				
				var resultWord='';
				var odd=true; //alternation of vowels and consonants

				//Too obvious to comment anything here
				while (resultWord.length < lngth){
						newSymbol = odd?this.options.gO('CONSONANTS')[Math.floor(Math.random()*this.options.gO('CONSONANTS').length)]:this.options.gO('VOWELS')[Math.floor(Math.random()*this.options.gO('VOWELS').length)];
						odd=!odd;
						resultWord+=newSymbol;
				}

				//Make uppercase first letter of generated word
				if(!firstLetterLower)
					resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);

				return resultWord;
		}

		//generate secure password
		this.generatePassword=function(){
			var pass='';
			var diapNum=0;
			var diap=[{l:10, s:48}, {l:10, s:48}, {l:26, s:97}, {l:4, s:35}, {l:26, s:97}];	
				while (pass.length < 16){
					diapNum=Math.floor(Math.random()*3);
					pass += (String.fromCharCode(Math.floor(Math.random()*diap[diapNum]['l']+diap[diapNum]['s'])));
				}
			return pass;
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
			var username = (this.options.gO('EMAIL_USERNAME_TYPE')=='constant')?this.options.gO('EMAIL_USERNAME_DEF'):this.generateWord(null, true);
			if(this.options.gO('EMAIL_HOSTING_TYPE')=='one')
				return username+'@'+this.getRandomElement(this.options.gO('EMAIL_HOSTING'));
			else
				return this.generateWord(null, true)+'@'+this.generateWord(null, true)+'.com';
		}

		//Select random option in dropdown... but it works weird. TODO:Look into it.
		this.selectValue=function(select_control){
				rVal = Math.floor(Math.random()*(select_control.options.length-1))+1;
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
			this.getRandomElement(radios).checked=true;

		}

		//gets one random element of array
		this.getRandomElement=function(ar){
			return ar[Math.floor(Math.random()*ar.length)];
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
			//generate full string
			q=(inp.id+inp.name+inp.className).toLowerCase();
			//choose type and generate
			if(this.isAnyEqual(q, this.options.gO('CONFIRM')))
				return this.lastValueBOT;
			else if(this.isAnyEqual(q, this.options.gO('EMAIL')))
				return this.generateEmail();
			else if(this.isAnyEqual(q, this.options.gO('ISDAY')))
				return Math.floor((Math.random()*27)); //TODO unhardcode
			else if(this.isAnyEqual(q, this.options.gO('ISPHONE')))
				return Math.floor((Math.random()*49))+'(' + Math.floor((Math.random()*999)) +')' + Math.floor((Math.random()*899)+100) + '-'+Math.floor((Math.random()*89)+10)+'-'+Math.floor((Math.random()*89)+10); //TODO unhardcode
			else if(this.isAnyEqual(q, this.options.gO('ISMONTH')))
				return Math.floor((Math.random()*12)); //TODO unhardcode
			else if(this.isAnyEqual(q, this.options.gO('ISYEAR')))
				return Math.floor((Math.random()*300)+1800); //TODO unhardcode
			else if(this.isAnyEqual(q, this.options.gO('NUMBER')))
				return Math.floor((Math.random()*10000)); //TODO unhardcode
			else if(this.isAnyEqual(q, this.options.gO('CREDITCARTNUMBER')))
				return Math.floor((Math.random()*10000)); //TODO unhardcode
			else 
				return this.generateWord();
		}

		this.scanTheDomAndMakeSomeMagic=function(magicMode){
				var stackMessages=[];
				//Find all the inputs, and operate with them
				el=document.getElementsByTagName('input');
				for(var i in el) {
					if((el[i].type=="text")||(el[i].type=="search")){
						this.lastValueBOT=this.valueBasedOnType(el[i]);
						el[i].value=this.lastValueBOT;
						if(el[i].onkeydown) el[i].onkeydown();
						if(el[i].onkeyup) el[i].onkeyup();
					}
					else if(el[i].type=="password")

						if(this.options.gO('PASSWORD_TYPE')=='random')
							el[i].value=this.generatePassword();
						else if(this.options.gO('PASSWORD_TYPE')=='special')
						{
							var pass=this.generatePassword();
							el[i].value=pass;
							stackMessages.push('Generated password to field '+el[i].name+' = ' + pass);
						}
						else {
							el[i].value=(this.options.gO('PASSWORD_DEF'));
						}

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

				if(stackMessages.length>0){
					message='';
					for(var b in stackMessages) {
						message=message+(stackMessages[b])+'\n';
					}
					alert(message);
				}
				return 'All right!';
		}

		this.aHotKey=function(eve){
			if(!this.options.gO('USE_HOTKEYS')) return;
			tH = this.options.gO('typical_hotkey');
			if(!tH) return;
			if((tH.ctrlKey==eve.ctrlKey)&&
				(tH.shiftKey==eve.shiftKey)&&
				(tH.altKey==eve.altKey)&&
				(tH.keyCode==eve.keyCode))
				{
					this.scanTheDomAndMakeSomeMagic();
			}
//			if(eve.ctrlKey&&eve.altKey)
//				this.scanTheDomAndMakeSomeMagic();
		}

}

(function(){
  chrome.extension.sendRequest(null, function(response) {
	localStorageCopy=response.result?response.result:{};
	if(!window.vG) 
		window.vG=new valueGenerator();
	document.onkeyup=function(e){window.vG.aHotKey(e)};
  });


})();
