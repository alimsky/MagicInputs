
function Generator(){
	this.inBr='{{';
	this.outBr='}}';
	this.number=function(max,min){
		offset=offset?offset:0;
		max=max?max:100;
		max++;
		return Math.floor(Math.random()*(max-offset))+offset;
	}
	this.till=function(str){
		str=str?str.toString():'';
		var r={}
		r.pre=str.substr(0,str.indexOf(this.inBr));
		str=str.substr(str.indexOf(this.inBr));
		operator=str.substr(this.inBr.length,str.toString().indexOf(this.outBr)-this.outBr.length);
		r.post=str.substr(str.indexOf(this.outBr) + this.outBr.length);
		r.operand=operator.substr(0,1);
		r.args=operator.substr(1).split(',');
		return r;
		}
	this.work=function(q){
		q=q?q:'{{w}}';
		var r='';
		f=this.till(q);
		while(f.operand!=''){
			q=f.post;
			r=+f.pre;
			switch (f.operand){
				case 'w':
					r=+'__WORD__';
					break;
				default:
					r+='';
					break;
				}
			f=this.till(q);
		}
		return r;
	}
	return this;
	}

g=Generator();
//for (var p=0; p<100; p++)
//	console.log(g.number(5,0));
