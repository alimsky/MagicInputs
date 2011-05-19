
function Generator(){
	this.searchRegExp=/{{.*?}}/g;
	this.innerRegExp=/(?!{).*(?=(}}))/g;
	this.couldNotBeDetermined="F*WEJNH##@YHQE@#*R";
	this.got=[];
	this.got['CONSONANTS']=['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','x','z','ch','sh','fr','th','q','k', 'l','m','n','p','s','t','b','c','d','f','g'];
	this.got['VOWELS']=['a','e','i','o','u','y','a','e','i','o','u','y','oo', 'ou', 'ae', 'ea'];

	this.word=function(lngth, firstLetterLower){
			//Define length of word
			if(!lngth)
					lngth=Math.floor(Math.random()*10)+3;
			
			var resultWord='';
			var odd=true; //alternation of vowels and consonants

			//Too obvious to comment anything here
			while (resultWord.length < lngth){
					newSymbol = odd?this.got['CONSONANTS'][Math.floor(Math.random()*this.got['CONSONANTS'].length)]:this.got['VOWELS'][Math.floor(Math.random()*this.got['VOWELS'].length)];
					odd=!odd;
					resultWord+=newSymbol;
			}

			//Make uppercase first letter of generated word
			if(!firstLetterLower)
				resultWord = resultWord[0].toUpperCase() + resultWord.substring(1);

			return resultWord;
	}


	this.number=function(offset,max){
		offset=offset?offset:0;
		max=max?max:100;
		max++;
		return Math.floor(Math.random()*(max-offset))+offset;
	}

	this.parseCommand=function(command){
		command=command.toString();
		var A=command.substring(0,1);	
		var B=command.substring(1);
		if(A==='n'){
			if(B===''){
				return this.number();
			}
		} else if(A==='w'){
			if(B===''){
				return this.word();
			}
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
	return this;
	}

g=Generator();
window.onload=function(){
	window.em=document.getElementById('email');
	window.mt=document.getElementById('nume');
	em.onkeyup=function(){
		window.mt.innerHTML= g.work(em.value);
	}
}
//for (this.p=0; p<100; p++)
//	console.log(g.number(5,0));
