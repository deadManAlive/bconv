var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function i(t,n){t.appendChild(n)}function l(t,n,e){t.insertBefore(n,e||null)}function c(t){t.parentNode&&t.parentNode.removeChild(t)}function a(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function p(){return f(" ")}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n){n=""+n,t.data!==n&&(t.data=n)}function h(t,n){t.value=null==n?"":n}let $;function m(t){$=t}const v=[],y=[];let b=[];const x=[],_=Promise.resolve();let w=!1;function E(t){b.push(t)}const k=new Set;let A=0;function I(){if(0!==A)return;const t=$;do{try{for(;A<v.length;){const t=v[A];A++,m(t),j(t.$$)}}catch(t){throw v.length=0,A=0,t}for(m(null),v.length=0,A=0;y.length;)y.pop()();for(let t=0;t<b.length;t+=1){const n=b[t];k.has(n)||(k.add(n),n())}b.length=0}while(v.length);for(;x.length;)x.pop()();w=!1,k.clear(),m(t)}function j(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(E)}}const M=new Set;function N(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];b.forEach((r=>-1===t.indexOf(r)?n.push(r):e.push(r))),e.forEach((t=>t())),b=n}(e.after_update),r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function O(t,n){-1===t.$$.dirty[0]&&(v.push(t),w||(w=!0,_.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function B(s,i,l,a,u,f,p,d=[-1]){const g=$;m(s);const h=s.$$={fragment:null,ctx:[],props:f,update:t,not_equal:u,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(g?g.$$.context:[])),callbacks:e(),dirty:d,skip_bound:!1,root:i.target||g.$$.root};p&&p(h.root);let v=!1;if(h.ctx=l?l(s,i.props||{},((t,n,...e)=>{const r=e.length?e[0]:n;return h.ctx&&u(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),v&&O(s,t)),n})):[],h.update(),v=!0,r(h.before_update),h.fragment=!!a&&a(h.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);h.fragment&&h.fragment.l(t),t.forEach(c)}else h.fragment&&h.fragment.c();i.intro&&((y=s.$$.fragment)&&y.i&&(M.delete(y),y.i(b))),function(t,e,s,i){const{fragment:l,after_update:c}=t.$$;l&&l.m(e,s),i||E((()=>{const e=t.$$.on_mount.map(n).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...e):r(e),t.$$.on_mount=[]})),c.forEach(E)}(s,i.target,i.anchor,i.customElement),I()}var y,b;m(g)}class C{$destroy(){N(this,1),this.$destroy=t}$on(n,e){if(!o(e))return t;const r=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return r.push(e),()=>{const t=r.indexOf(e);-1!==t&&r.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function L(t,n,e){const r=t.slice();return r[6]=n[e],r}function S(t,n,e){const r=t.slice();return r[9]=n[e],r}function T(t){let n,e,r,o,s=t[9]+"";return{c(){n=u("div"),e=u("p"),r=f(s),o=p(),d(n,"class","bit svelte-1p0gr5f"),d(n,"id","exponent")},m(t,s){l(t,n,s),i(n,e),i(e,r),i(n,o)},p(t,n){4&n&&s!==(s=t[9]+"")&&g(r,s)},d(t){t&&c(n)}}}function q(t){let n,e,r,o,s=t[6]+"";return{c(){n=u("div"),e=u("p"),r=f(s),o=p(),d(n,"class","bit svelte-1p0gr5f"),d(n,"id","mantissa")},m(t,s){l(t,n,s),i(n,e),i(e,r),i(n,o)},p(t,n){4&n&&s!==(s=t[6]+"")&&g(r,s)},d(t){t&&c(n)}}}function z(n){let e,r,o,s,$,m,v,y,b,x,_,w,E,k,A,I,j,M,N,O,B,C,z,P,U,D,G,H,J,K,Q,R,V,W,X,Y,Z,tt,nt,et,rt,ot,st,it,lt,ct,at,ut=n[2].binary+"",ft=n[2].sign+"",pt="0"===n[2].sign?"+":"-",dt=parseInt(n[2].exponent,2)+"",gt=F("0."+n[2].mantissa)+"",ht=("0"===n[2].sign?1:-1)+"",$t=(0===Math.abs(n[3])?-126:parseInt(n[2].exponent,2)-127)+"",mt=n[2].exponent,vt=[];for(let t=0;t<mt.length;t+=1)vt[t]=T(S(n,mt,t));let yt=n[2].mantissa,bt=[];for(let t=0;t<yt.length;t+=1)bt[t]=q(L(n,yt,t));return{c(){e=p(),r=u("div"),o=u("div"),s=u("input"),$=p(),m=u("h2"),v=f("Binary: "),y=u("code"),b=f(ut),x=p(),_=u("div"),w=u("div"),E=u("div"),k=u("p"),A=f(ft),I=p(),j=u("strong"),M=f(pt),N=p(),O=u("div"),B=u("div");for(let t=0;t<vt.length;t+=1)vt[t].c();C=p(),z=u("strong"),P=f(dt),U=p(),D=u("div"),G=u("div");for(let t=0;t<bt.length;t+=1)bt[t].c();H=p(),J=u("strong"),K=f(n[1]),Q=f(" + "),R=f(gt),V=p(),W=u("h2"),X=u("span"),Y=f(ht),Z=f("\n\t\t×\n\t\t"),tt=u("span"),nt=f("2"),et=u("sup"),rt=f($t),ot=f("\n\t\t×\n\t\t"),st=f(n[4]),it=f("\n\t\t= "),lt=f(n[3]),d(s,"type","text"),d(s,"id","input"),d(s,"placeholder","Insert float here..."),d(s,"class","svelte-1p0gr5f"),d(o,"width","100%"),d(E,"class","bit svelte-1p0gr5f"),d(E,"id","sign"),d(j,"class","svelte-1p0gr5f"),d(w,"id","sign-container"),d(w,"class","svelte-1p0gr5f"),d(B,"class","bit-container svelte-1p0gr5f"),d(z,"class","svelte-1p0gr5f"),d(O,"class","struct-div svelte-1p0gr5f"),d(G,"class","bit-container svelte-1p0gr5f"),d(J,"class","svelte-1p0gr5f"),d(D,"class","struct-div svelte-1p0gr5f"),d(_,"class","output-container svelte-1p0gr5f")},m(t,c){l(t,e,c),l(t,r,c),i(r,o),i(o,s),h(s,n[0]),i(r,$),i(r,m),i(m,v),i(m,y),i(y,b),i(r,x),i(r,_),i(_,w),i(w,E),i(E,k),i(k,A),i(w,I),i(w,j),i(j,M),i(_,N),i(_,O),i(O,B);for(let t=0;t<vt.length;t+=1)vt[t]&&vt[t].m(B,null);i(O,C),i(O,z),i(z,P),i(_,U),i(_,D),i(D,G);for(let t=0;t<bt.length;t+=1)bt[t]&&bt[t].m(G,null);var a,u,f,p;i(D,H),i(D,J),i(J,K),i(J,Q),i(J,R),i(r,V),i(r,W),i(W,X),i(X,Y),i(W,Z),i(W,tt),i(tt,nt),i(tt,et),i(et,rt),i(W,ot),i(W,st),i(W,it),i(W,lt),ct||(a=s,u="input",f=n[5],a.addEventListener(u,f,p),at=()=>a.removeEventListener(u,f,p),ct=!0)},p(t,[n]){if(1&n&&s.value!==t[0]&&h(s,t[0]),4&n&&ut!==(ut=t[2].binary+"")&&g(b,ut),4&n&&ft!==(ft=t[2].sign+"")&&g(A,ft),4&n&&pt!==(pt="0"===t[2].sign?"+":"-")&&g(M,pt),4&n){let e;for(mt=t[2].exponent,e=0;e<mt.length;e+=1){const r=S(t,mt,e);vt[e]?vt[e].p(r,n):(vt[e]=T(r),vt[e].c(),vt[e].m(B,null))}for(;e<vt.length;e+=1)vt[e].d(1);vt.length=mt.length}if(4&n&&dt!==(dt=parseInt(t[2].exponent,2)+"")&&g(P,dt),4&n){let e;for(yt=t[2].mantissa,e=0;e<yt.length;e+=1){const r=L(t,yt,e);bt[e]?bt[e].p(r,n):(bt[e]=q(r),bt[e].c(),bt[e].m(G,null))}for(;e<bt.length;e+=1)bt[e].d(1);bt.length=yt.length}2&n&&g(K,t[1]),4&n&&gt!==(gt=F("0."+t[2].mantissa)+"")&&g(R,gt),4&n&&ht!==(ht=("0"===t[2].sign?1:-1)+"")&&g(Y,ht),12&n&&$t!==($t=(0===Math.abs(t[3])?-126:parseInt(t[2].exponent,2)-127)+"")&&g(rt,$t),16&n&&g(st,t[4]),8&n&&g(lt,t[3])},i:t,o:t,d(t){t&&c(e),t&&c(r),a(vt,t),a(bt,t),ct=!1,at()}}}function F(t){const n=t.split(".");if(parseInt(n[0],2)>1)throw new Error("This function only works for normalized value!");const e=n.join("");let r=0;for(let t=0;t<e.length;t++)r+=+e[t]*Math.pow(2,-t);return r}function P(t,n,e){let r,o,s=0,i=0,l=0;return t.$$.update=()=>{if(1&t.$$.dirty&&e(3,r=null===s?"0":s),8&t.$$.dirty&&e(2,o=function(t){const n=new Float32Array([t]);let e=new Uint32Array(n.buffer)[0],r="";for(;r+=e%2,e=Math.floor(e/2),!(e<1););for(;r.length<32;)r+="0";return r=r.split("").reverse().join(""),{binary:r,sign:r[0],exponent:r.slice(1,9),mantissa:r.slice(9)}}(r)),6&t.$$.dirty){e(1,i="00000000"==o.exponent?"0":"1");let t=i+"."+o.mantissa;e(4,l=F(t))}},[s,i,o,r,l,function(){s=this.value,e(0,s)}]}return new class extends C{constructor(t){super(),B(this,t,P,z,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
