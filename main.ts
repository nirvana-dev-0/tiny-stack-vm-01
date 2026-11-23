import{readdirSync as R,readFileSync as F,writeFileSync as W,mkdirSync as M}from'fs'
const P="000112239999999922222221222122292229999999999999011009999999999912999999999999991101"
function V(p,q){let s=[],t=[],m=[],o=[],ip=0,pc=0,st=0
try{for(;;){
if(s.length>256)throw 3;if(t.length>64)throw 7
if(st++==1e6)throw 10
if((pc>>>0)>=p.length)throw 9
let op=p[pc],po=+P[op]
if(!(po<9))throw 5
let im=op<3?[0,1,4][op]:(op>47&&op<52)*2,nx=pc+1+im
if(nx>p.length)throw 9
pc=nx
if(s.length<po)throw 2
if(!op)return{o,c:0}
if(op>0&&op<3){s.push(op==1?p[nx-1]<<24>>24:p.readInt32LE(nx-4));continue}
if(op>2&&op<8){if(op==3)s.pop();else s.push(op==4?s.at(-1):op==6?s.at(-2):s.splice(op==5?-2:-3,1)[0]);continue}
if(op>15&&op<35){if(op==23||op==27){let a=s.length-1;s[a]=op==23?-s[a]|0:~s[a]}else{let b=s.pop(),a=s.pop(),r=[a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b|0,(a>>>0)/(b>>>0)|0,(a>>>0)%(b>>>0)|0,,a&b,a|b,a^b,,a<<b,a>>b,a>>>b|0,,a==b?1:0,a<b?1:0,(a>>>0)<(b>>>0)?1:0][op-16];if(op>18&&op<23&&!b)throw 4;s.push(r)}continue}
if(op>47&&op<52){if(op==51){t.push(nx);pc=p[nx-2]|p[nx-1]<<8}else if(op==48||(op==49)==(s.pop()==0))pc=nx+p.readInt16LE(nx-2);continue}
if(op==52){if(!t.length)throw 8;pc=t.pop();continue}
if(op>63&&op<66){let a=s.pop();if(a<0||a>255)throw 6;if(op==64)s.push(m[a]||0);else m[a]=s.pop();continue}
if(op==80){let b=''+s.pop();if(o.length+b.length>65536)throw 11;o.push(...Buffer.from(b));continue}
if(op==81){if(o.length>65535)throw 11;o.push(s.pop()&255);continue}
if(op==82){s.push(ip<q.length?q[ip++]:-1);continue}
if(op==83)return{o,c:s.pop()&255}
}}catch(e){return{o,c:e}}}
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output'
for(let d of R(I)){let x=I+'/'+d+'/',y=O+'/'+d+'/',r=V(F(x+'program.bin'),F(x+'input.bin'));M(y,{recursive:true});W(y+'stdout.bin',Buffer.from(r.o));W(y+'exit.txt',''+r.c)}