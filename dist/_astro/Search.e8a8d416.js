import{r as u}from"./index.ed373d49.js";function x(u){return Array.isArray?Array.isArray(u):"[object Array]"===iu(u)}let fu=1/0;function du(u){if("string"==typeof u)return u;let e=u+"";return"0"==e&&1/u==-fu?"-0":e}function Bu(u){return null==u?"":du(u)}function p(u){return"string"==typeof u}function nu(u){return"number"==typeof u}function gu(u){return!0===u||!1===u||pu(u)&&"[object Boolean]"==iu(u)}function ru(u){return"object"==typeof u}function pu(u){return ru(u)&&null!==u}function f(u){return null!=u}function z(u){return!u.trim().length}function iu(u){return null==u?void 0===u?"[object Undefined]":"[object Null]":Object.prototype.toString.call(u)}let mu="Incorrect 'index' type",xu=u=>`Invalid value for key ${u}`,Mu=u=>`Pattern length exceeds max of ${u}.`,yu=u=>`Missing ${u} property in key`,_u=u=>`Property 'weight' in key '${u}' must be a positive integer`,X=Object.prototype.hasOwnProperty;class Su{constructor(u){this._keys=[],this._keyMap={};let e=0;u.forEach(u=>{let t=Fu(u);e+=t.weight,this._keys.push(t),this._keyMap[t.id]=t,e+=t.weight}),this._keys.forEach(u=>{u.weight/=e})}get(u){return this._keyMap[u]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function Fu(u){let e=null,t=null,D=null,r=1,n=null;if(p(u)||x(u))D=u,e=Z(u),t=H(u);else{if(!X.call(u,"name"))throw Error(yu("name"));let s=u.name;if(D=s,X.call(u,"weight")&&(r=u.weight)<=0)throw Error(_u(s));e=Z(s),t=H(s),n=u.getFn}return{path:e,id:t,weight:r,src:D,getFn:n}}function Z(u){return x(u)?u:u.split(".")}function H(u){return x(u)?u.join("."):u}function wu(u,e){let t=[],D=!1,r=(u,e,n)=>{if(f(u)){if(e[n]){let s=e[n],i=u[s];if(f(i)){if(n===e.length-1&&(p(i)||nu(i)||gu(i)))t.push(Bu(i));else if(x(i)){D=!0;for(let u=0,t=i.length;u<t;u+=1)r(i[u],e,n+1)}else e.length&&r(i,e,n+1)}}else t.push(u)}};return r(u,p(e)?e.split("."):e,0),D?t:t[0]}let Iu={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},bu={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(u,e)=>u.score===e.score?u.idx<e.idx?-1:1:u.score<e.score?-1:1},Ru={location:0,threshold:.6,distance:100},vu={useExtendedSearch:!1,getFn:wu,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var a={...bu,...Iu,...Ru,...vu};let Lu=/[^ ]+/g;function Nu(u=1,e=3){let t=new Map,D=Math.pow(10,e);return{get(e){let r=e.match(Lu).length;if(t.has(r))return t.get(r);let n=1/Math.pow(r,.5*u),s=parseFloat(Math.round(n*D)/D);return t.set(r,s),s},clear(){t.clear()}}}class G{constructor({getFn:u=a.getFn,fieldNormWeight:e=a.fieldNormWeight}={}){this.norm=Nu(e,3),this.getFn=u,this.isCreated=!1,this.setIndexRecords()}setSources(u=[]){this.docs=u}setIndexRecords(u=[]){this.records=u}setKeys(u=[]){this.keys=u,this._keysMap={},u.forEach((u,e)=>{this._keysMap[u.id]=e})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,p(this.docs[0])?this.docs.forEach((u,e)=>{this._addString(u,e)}):this.docs.forEach((u,e)=>{this._addObject(u,e)}),this.norm.clear())}add(u){let e=this.size();p(u)?this._addString(u,e):this._addObject(u,e)}removeAt(u){this.records.splice(u,1);for(let e=u,t=this.size();e<t;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(u,e){return u[this._keysMap[e]]}size(){return this.records.length}_addString(u,e){if(!f(u)||z(u))return;let t={v:u,i:e,n:this.norm.get(u)};this.records.push(t)}_addObject(u,e){let t={i:e,$:{}};this.keys.forEach((e,D)=>{let r=e.getFn?e.getFn(u):this.getFn(u,e.path);if(f(r)){if(x(r)){let u=[],e=[{nestedArrIndex:-1,value:r}];for(;e.length;){let{nestedArrIndex:t,value:D}=e.pop();if(f(D)){if(p(D)&&!z(D)){let e={v:D,i:t,n:this.norm.get(D)};u.push(e)}else x(D)&&D.forEach((u,t)=>{e.push({nestedArrIndex:t,value:u})})}}t.$[D]=u}else if(p(r)&&!z(r)){let u={v:r,n:this.norm.get(r)};t.$[D]=u}}}),this.records.push(t)}toJSON(){return{keys:this.keys,records:this.records}}}function cu(u,e,{getFn:t=a.getFn,fieldNormWeight:D=a.fieldNormWeight}={}){let r=new G({getFn:t,fieldNormWeight:D});return r.setKeys(u.map(Fu)),r.setSources(e),r.create(),r}function ju(u,{getFn:e=a.getFn,fieldNormWeight:t=a.fieldNormWeight}={}){let{keys:D,records:r}=u,n=new G({getFn:e,fieldNormWeight:t});return n.setKeys(D),n.setIndexRecords(r),n}function k(u,{errors:e=0,currentLocation:t=0,expectedLocation:D=0,distance:r=a.distance,ignoreLocation:n=a.ignoreLocation}={}){let s=e/u.length;if(n)return s;let i=Math.abs(D-t);return r?s+i/r:i?1:s}function ku(u=[],e=a.minMatchCharLength){let t=[],D=-1,r=-1,n=0;for(let s=u.length;n<s;n+=1){let s=u[n];s&&-1===D?D=n:s||-1===D||((r=n-1)-D+1>=e&&t.push([D,r]),D=-1)}return u[n-1]&&n-D>=e&&t.push([D,n-1]),t}let b=32;function Ou(u,e,t,{location:D=a.location,distance:r=a.distance,threshold:n=a.threshold,findAllMatches:s=a.findAllMatches,minMatchCharLength:i=a.minMatchCharLength,includeMatches:F=a.includeMatches,ignoreLocation:c=a.ignoreLocation}={}){let o;if(e.length>32)throw Error(Mu(32));let h=e.length,l=u.length,C=Math.max(0,Math.min(D,l)),A=n,d=C,g=i>1||F,B=g?Array(l):[];for(;(o=u.indexOf(e,d))>-1;)if(A=Math.min(k(e,{currentLocation:o,expectedLocation:C,distance:r,ignoreLocation:c}),A),d=o+h,g){let u=0;for(;u<h;)B[o+u]=1,u+=1}d=-1;let m=[],y=1,M=h+l,v=1<<h-1;for(let D=0;D<h;D+=1){let n=0,i=M;for(;n<i;)k(e,{errors:D,currentLocation:C+i,expectedLocation:C,distance:r,ignoreLocation:c})<=A?n=i:M=i,i=Math.floor((M-n)/2+n);M=i;let F=Math.max(1,C-i+1),o=s?l:Math.min(C+i,l)+h,S=Array(o+2);S[o+1]=(1<<D)-1;for(let n=o;n>=F;n-=1){let s=n-1,i=t[u.charAt(s)];if(g&&(B[s]=+!!i),S[n]=(S[n+1]<<1|1)&i,D&&(S[n]|=(m[n+1]|m[n])<<1|1|m[n+1]),S[n]&v&&(y=k(e,{errors:D,currentLocation:s,expectedLocation:C,distance:r,ignoreLocation:c}))<=A){if(A=y,(d=s)<=C)break;F=Math.max(1,2*C-d)}}if(k(e,{errors:D+1,currentLocation:C,expectedLocation:C,distance:r,ignoreLocation:c})>A)break;m=S}let S={isMatch:d>=0,score:Math.max(.001,y)};if(g){let u=ku(B,i);u.length?F&&(S.indices=u):S.isMatch=!1}return S}function $u(u){let e={};for(let t=0,D=u.length;t<D;t+=1){let r=u.charAt(t);e[r]=(e[r]||0)|1<<D-t-1}return e}class ou{constructor(u,{location:e=a.location,threshold:t=a.threshold,distance:D=a.distance,includeMatches:r=a.includeMatches,findAllMatches:n=a.findAllMatches,minMatchCharLength:s=a.minMatchCharLength,isCaseSensitive:i=a.isCaseSensitive,ignoreLocation:F=a.ignoreLocation}={}){if(this.options={location:e,threshold:t,distance:D,includeMatches:r,findAllMatches:n,minMatchCharLength:s,isCaseSensitive:i,ignoreLocation:F},this.pattern=i?u:u.toLowerCase(),this.chunks=[],!this.pattern.length)return;let c=(u,e)=>{this.chunks.push({pattern:u,alphabet:$u(u),startIndex:e})},o=this.pattern.length;if(o>32){let u=0,e=o%32,t=o-e;for(;u<t;)c(this.pattern.substr(u,32),u),u+=32;if(e){let u=o-32;c(this.pattern.substr(u),u)}}else c(this.pattern,0)}searchIn(u){let{isCaseSensitive:e,includeMatches:t}=this.options;if(e||(u=u.toLowerCase()),this.pattern===u){let e={isMatch:!0,score:0};return t&&(e.indices=[[0,u.length-1]]),e}let{location:D,distance:r,threshold:n,findAllMatches:s,minMatchCharLength:i,ignoreLocation:F}=this.options,c=[],o=0,h=!1;this.chunks.forEach(({pattern:e,alphabet:l,startIndex:C})=>{let{isMatch:A,score:d,indices:g}=Ou(u,e,l,{location:D+C,distance:r,threshold:n,findAllMatches:s,minMatchCharLength:i,includeMatches:t,ignoreLocation:F});A&&(h=!0),o+=d,A&&g&&(c=[...c,...g])});let l={isMatch:h,score:h?o/this.chunks.length:1};return h&&t&&(l.indices=c),l}}class _{constructor(u){this.pattern=u}static isMultiMatch(u){return q(u,this.multiRegex)}static isSingleMatch(u){return q(u,this.singleRegex)}search(){}}function q(u,e){let t=u.match(e);return t?t[1]:null}class Tu extends _{constructor(u){super(u)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(u){let e=u===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class Pu extends _{constructor(u){super(u)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(u){let e=-1===u.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,u.length-1]}}}class zu extends _{constructor(u){super(u)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(u){let e=u.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}}class Hu extends _{constructor(u){super(u)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(u){let e=!u.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,u.length-1]}}}class Ku extends _{constructor(u){super(u)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(u){let e=u.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[u.length-this.pattern.length,u.length-1]}}}class Vu extends _{constructor(u){super(u)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(u){let e=!u.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,u.length-1]}}}class au extends _{constructor(u,{location:e=a.location,threshold:t=a.threshold,distance:D=a.distance,includeMatches:r=a.includeMatches,findAllMatches:n=a.findAllMatches,minMatchCharLength:s=a.minMatchCharLength,isCaseSensitive:i=a.isCaseSensitive,ignoreLocation:F=a.ignoreLocation}={}){super(u),this._bitapSearch=new ou(u,{location:e,threshold:t,distance:D,includeMatches:r,findAllMatches:n,minMatchCharLength:s,isCaseSensitive:i,ignoreLocation:F})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(u){return this._bitapSearch.searchIn(u)}}class hu extends _{constructor(u){super(u)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(u){let e=0,t,D=[],r=this.pattern.length;for(;(t=u.indexOf(this.pattern,e))>-1;)e=t+r,D.push([t,e-1]);let n=!!D.length;return{isMatch:n,score:n?0:1,indices:D}}}let K=[Tu,hu,zu,Hu,Vu,Ku,Pu,au],uu=K.length,Wu=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Uu="|";function Yu(u,e={}){return u.split("|").map(u=>{let t=u.trim().split(Wu).filter(u=>u&&!!u.trim()),D=[];for(let u=0,r=t.length;u<r;u+=1){let r=t[u],n=!1,s=-1;for(;!n&&++s<uu;){let u=K[s],t=u.isMultiMatch(r);t&&(D.push(new u(t,e)),n=!0)}if(!n)for(s=-1;++s<uu;){let u=K[s],t=u.isSingleMatch(r);if(t){D.push(new u(t,e));break}}}return D})}let Gu=new Set([au.type,hu.type]);class Qu{constructor(u,{isCaseSensitive:e=a.isCaseSensitive,includeMatches:t=a.includeMatches,minMatchCharLength:D=a.minMatchCharLength,ignoreLocation:r=a.ignoreLocation,findAllMatches:n=a.findAllMatches,location:s=a.location,threshold:i=a.threshold,distance:F=a.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:t,minMatchCharLength:D,findAllMatches:n,ignoreLocation:r,location:s,threshold:i,distance:F},this.pattern=e?u:u.toLowerCase(),this.query=Yu(this.pattern,this.options)}static condition(u,e){return e.useExtendedSearch}searchIn(u){let e=this.query;if(!e)return{isMatch:!1,score:1};let{includeMatches:t,isCaseSensitive:D}=this.options;u=D?u:u.toLowerCase();let r=0,n=[],s=0;for(let D=0,i=e.length;D<i;D+=1){let i=e[D];n.length=0,r=0;for(let e=0,D=i.length;e<D;e+=1){let D=i[e],{isMatch:F,indices:c,score:o}=D.search(u);if(F){if(r+=1,s+=o,t){let u=D.constructor.type;Gu.has(u)?n=[...n,...c]:n.push(c)}}else{s=0,r=0,n.length=0;break}}if(r){let u={isMatch:!0,score:s/r};return t&&(u.indices=n),u}}return{isMatch:!1,score:1}}}let V=[];function Ju(...u){V.push(...u)}function W(u,e){for(let t=0,D=V.length;t<D;t+=1){let D=V[t];if(D.condition(u,e))return new D(u,e)}return new ou(u,e)}let O={AND:"$and",OR:"$or"},U={PATH:"$path",PATTERN:"$val"},Y=u=>!!(u[O.AND]||u[O.OR]),Xu=u=>!!u[U.PATH],Zu=u=>!x(u)&&ru(u)&&!Y(u),eu=u=>({[O.AND]:Object.keys(u).map(e=>({[e]:u[e]}))});function lu(u,e,{auto:t=!0}={}){let D=u=>{let r=Object.keys(u),n=Xu(u);if(!n&&r.length>1&&!Y(u))return D(eu(u));if(Zu(u)){let D=n?u[U.PATH]:r[0],s=n?u[U.PATTERN]:u[D];if(!p(s))throw Error(xu(D));let i={keyId:H(D),pattern:s};return t&&(i.searcher=W(s,e)),i}let s={children:[],operator:r[0]};return r.forEach(e=>{let t=u[e];x(t)&&t.forEach(u=>{s.children.push(D(u))})}),s};return Y(u)||(u=eu(u)),D(u)}function qu(u,{ignoreFieldNorm:e=a.ignoreFieldNorm}){u.forEach(u=>{let t=1;u.matches.forEach(({key:u,norm:D,score:r})=>{let n=u?u.weight:null;t*=Math.pow(0===r&&n?Number.EPSILON:r,(n||1)*(e?1:D))}),u.score=t})}function ue(u,e){let t=u.matches;e.matches=[],f(t)&&t.forEach(u=>{if(!f(u.indices)||!u.indices.length)return;let{indices:t,value:D}=u,r={indices:t,value:D};u.key&&(r.key=u.key.src),u.idx>-1&&(r.refIndex=u.idx),e.matches.push(r)})}function ee(u,e){e.score=u.score}function te(u,e,{includeMatches:t=a.includeMatches,includeScore:D=a.includeScore}={}){let r=[];return t&&r.push(ue),D&&r.push(ee),u.map(u=>{let{idx:t}=u,D={item:e[t],refIndex:t};return r.length&&r.forEach(e=>{e(u,D)}),D})}class L{constructor(u,e={},t){this.options={...a,...e},this.options.useExtendedSearch,this._keyStore=new Su(this.options.keys),this.setCollection(u,t)}setCollection(u,e){if(this._docs=u,e&&!(e instanceof G))throw Error("Incorrect 'index' type");this._myIndex=e||cu(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(u){f(u)&&(this._docs.push(u),this._myIndex.add(u))}remove(u=()=>!1){let e=[];for(let t=0,D=this._docs.length;t<D;t+=1){let r=this._docs[t];u(r,t)&&(this.removeAt(t),t-=1,D-=1,e.push(r))}return e}removeAt(u){this._docs.splice(u,1),this._myIndex.removeAt(u)}getIndex(){return this._myIndex}search(u,{limit:e=-1}={}){let{includeMatches:t,includeScore:D,shouldSort:r,sortFn:n,ignoreFieldNorm:s}=this.options,i=p(u)?p(this._docs[0])?this._searchStringList(u):this._searchObjectList(u):this._searchLogical(u);return qu(i,{ignoreFieldNorm:s}),r&&i.sort(n),nu(e)&&e>-1&&(i=i.slice(0,e)),te(i,this._docs,{includeMatches:t,includeScore:D})}_searchStringList(u){let e=W(u,this.options),{records:t}=this._myIndex,D=[];return t.forEach(({v:u,i:t,n:r})=>{if(!f(u))return;let{isMatch:n,score:s,indices:i}=e.searchIn(u);n&&D.push({item:u,idx:t,matches:[{score:s,value:u,norm:r,indices:i}]})}),D}_searchLogical(u){let e=lu(u,this.options),t=(u,e,D)=>{if(!u.children){let{keyId:t,searcher:r}=u,n=this._findMatches({key:this._keyStore.get(t),value:this._myIndex.getValueForItemAtKeyId(e,t),searcher:r});return n&&n.length?[{idx:D,item:e,matches:n}]:[]}let r=[];for(let n=0,s=u.children.length;n<s;n+=1){let s=u.children[n],i=t(s,e,D);if(i.length)r.push(...i);else if(u.operator===O.AND)return[]}return r},D=this._myIndex.records,r={},n=[];return D.forEach(({$:u,i:D})=>{if(f(u)){let s=t(e,u,D);s.length&&(r[D]||(r[D]={idx:D,item:u,matches:[]},n.push(r[D])),s.forEach(({matches:u})=>{r[D].matches.push(...u)}))}}),n}_searchObjectList(u){let e=W(u,this.options),{keys:t,records:D}=this._myIndex,r=[];return D.forEach(({$:u,i:D})=>{if(!f(u))return;let n=[];t.forEach((t,D)=>{n.push(...this._findMatches({key:t,value:u[D],searcher:e}))}),n.length&&r.push({idx:D,item:u,matches:n})}),r}_findMatches({key:u,value:e,searcher:t}){if(!f(e))return[];let D=[];if(x(e))e.forEach(({v:e,i:r,n:n})=>{if(!f(e))return;let{isMatch:s,score:i,indices:F}=t.searchIn(e);s&&D.push({score:i,key:u,value:e,idx:r,norm:n,indices:F})});else{let{v:r,n:n}=e,{isMatch:s,score:i,indices:F}=t.searchIn(r);s&&D.push({score:i,key:u,value:r,norm:n,indices:F})}return D}}L.version="6.6.2",L.createIndex=cu,L.parseIndex=ju,L.config=a,L.parseQuery=lu,Ju(Qu);let tu=["en-EN"];var Eu={exports:{}},$={},se=u,De=Symbol.for("react.element"),ne=Symbol.for("react.fragment"),re=Object.prototype.hasOwnProperty,ie=se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fe={key:!0,ref:!0,__self:!0,__source:!0};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Au(u,e,t){var D,r={},n=null,s=null;for(D in void 0!==t&&(n=""+t),void 0!==e.key&&(n=""+e.key),void 0!==e.ref&&(s=e.ref),e)re.call(e,D)&&!Fe.hasOwnProperty(D)&&(r[D]=e[D]);if(u&&u.defaultProps)for(D in e=u.defaultProps)void 0===r[D]&&(r[D]=e[D]);return{$$typeof:De,type:u,key:n,ref:s,props:r,_owner:ie.current}}$.Fragment=ne,$.jsx=Au,$.jsxs=Au,Eu.exports=$;var E=Eu.exports;function ce({datetime:u,size:e="sm",className:t}){return E.jsxs("div",{className:`flex items-center space-x-2 opacity-80 ${t}`,children:[E.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:`${"sm"===e?"scale-90":"scale-100"} inline-block h-6 w-6 fill-skin-base`,"aria-hidden":"true",children:[E.jsx("path",{d:"M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"}),E.jsx("path",{d:"M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"})]}),E.jsx("span",{className:"sr-only",children:"Posted on:"}),E.jsx("span",{className:`italic ${"sm"===e?"text-sm":"text-base"}`,children:E.jsx(oe,{datetime:u})})]})}let oe=({datetime:u})=>{let e=new Date(u),t=e.toLocaleDateString(tu,{year:"numeric",month:"long",day:"numeric"}),D=e.toLocaleTimeString(tu,{hour:"2-digit",minute:"2-digit"});return E.jsxs(E.Fragment,{children:[t,E.jsx("span",{"aria-hidden":"true",children:" | "}),E.jsx("span",{className:"sr-only",children:"\xa0at\xa0"}),D]})};function ae({href:u,frontmatter:e,secHeading:t=!0}){let{title:D,pubDatetime:r,description:n}=e;return E.jsxs("li",{className:"my-6",children:[E.jsx("a",{href:u,className:"inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0",children:t?E.jsx("h2",{className:"text-lg font-medium decoration-dashed hover:underline",children:D}):E.jsx("h3",{className:"text-lg font-medium decoration-dashed hover:underline",children:D})}),E.jsx(ce,{datetime:r}),E.jsx("p",{children:n})]})}let he=/[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;function su(u,e){return"string"!=typeof u?"":(e||(u=u.toLowerCase()),u.replace(he,"").replace(/ /g,"-"))}let Du=u=>u.postSlug?su(u.postSlug):su(u.title);function Ae({searchList:e}){let t=u.useRef(null),[D,r]=u.useState(""),[n,s]=u.useState(null),i=u.useMemo(()=>new L(e,{keys:["title","description"],includeMatches:!0,minMatchCharLength:2,threshold:.5}),[e]);return u.useEffect(()=>{let u=new URLSearchParams(window.location.search).get("q");u&&r(u),setTimeout(function(){t.current.selectionStart=t.current.selectionEnd=u?.length||0},50)},[]),u.useEffect(()=>{if(s(D.length>1?i.search(D):[]),D.length>0){let u=new URLSearchParams(window.location.search);u.set("q",D);let e=window.location.pathname+"?"+u.toString();history.replaceState(null,"",e)}else history.replaceState(null,"",window.location.pathname)},[D]),E.jsxs(E.Fragment,{children:[E.jsxs("label",{className:"relative block",children:[E.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-2 opacity-75",children:E.jsx("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:E.jsx("path",{d:"M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"})})}),E.jsx("input",{className:`block w-full rounded border border-skin-fill 
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75 
        focus:border-skin-accent focus:outline-none`,placeholder:"Search for anything...",type:"text",name:"search",value:D,onChange:u=>{r(u.currentTarget.value)},autoComplete:"off",autoFocus:!0,ref:t})]}),D.length>1&&E.jsxs("div",{className:"mt-8",children:["Found ",n?.length,n?.length&&n?.length===1?" result":" results"," ","for '",D,"'"]}),E.jsx("ul",{children:n&&n.map(({item:u,refIndex:e})=>E.jsx(ae,{href:`/posts/${Du(u.data)}`,frontmatter:u.data},`${e}-${Du(u.data)}`))})]})}export{Ae as default};