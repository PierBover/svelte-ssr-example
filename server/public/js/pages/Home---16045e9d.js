function t(){}function n(t){return t()}function e(){return Object.create(null)}function r(t){t.forEach(n)}function o(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(t,n){t.appendChild(n)}function u(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function s(t){return document.createTextNode(t)}function l(){return s(" ")}function d(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function h(t){return Array.from(t.childNodes)}function m(t,n,e,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;for(;n<o.attributes.length;){const t=o.attributes[n];e[t.name]?n++:o.removeAttribute(t.name)}return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):f(n)}function p(t,n){for(let e=0;e<t.length;e+=1){const r=t[e];if(3===r.nodeType)return r.data=""+n,t.splice(e,1)[0]}return s(n)}function g(t){return p(t," ")}let $;function v(t){$=t}function y(t){(function(){if(!$)throw new Error("Function called outside component initialization");return $})().$$.on_mount.push(t)}const b=[],x=[],_=[],w=[],E=Promise.resolve();let S=!1;function A(t){_.push(t)}let H=!1;const N=new Set;function j(){if(!H){H=!0;do{for(let t=0;t<b.length;t+=1){const n=b[t];v(n),k(n.$$)}for(b.length=0;x.length;)x.pop()();for(let t=0;t<_.length;t+=1){const n=_[t];N.has(n)||(N.add(n),n())}_.length=0}while(b.length);for(;w.length;)w.pop()();S=!1,H=!1,N.clear()}}function k(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(A)}}const C=new Set;function D(t,n){t&&t.i&&(C.delete(t),t.i(n))}function F(t,e,c){const{fragment:a,on_mount:u,on_destroy:i,after_update:f}=t.$$;a&&a.m(e,c),A(()=>{const e=u.map(n).filter(o);i?i.push(...e):r(e),t.$$.on_mount=[]}),f.forEach(A)}function I(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function M(t,n){-1===t.$$.dirty[0]&&(b.push(t),S||(S=!0,E.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function O(n,o,c,a,u,f,s=[-1]){const l=$;v(n);const d=o.props||{},m=n.$$={fragment:null,ctx:null,props:f,update:t,not_equal:u,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:e(),dirty:s};let p=!1;if(m.ctx=c?c(n,d,(t,e,...r)=>{const o=r.length?r[0]:e;return m.ctx&&u(m.ctx[t],m.ctx[t]=o)&&(m.bound[t]&&m.bound[t](o),p&&M(n,t)),e}):[],m.update(),p=!0,r(m.before_update),m.fragment=!!a&&a(m.ctx),o.target){if(o.hydrate){const t=h(o.target);m.fragment&&m.fragment.l(t),t.forEach(i)}else m.fragment&&m.fragment.c();o.intro&&D(n.$$.fragment),F(n,o.target,o.anchor),j()}v(l)}class T{$destroy(){I(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}function V(n){let e,r,o,c,$,v;return{c(){e=f("div"),r=f("a"),o=s("Home"),c=l(),$=f("a"),v=s("Fruits"),this.h()},l(t){e=m(t,"DIV",{class:!0});var n=h(e);r=m(n,"A",{href:!0,class:!0});var a=h(r);o=p(a,"Home"),a.forEach(i),c=g(n),$=m(n,"A",{href:!0,class:!0});var u=h($);v=p(u,"Fruits"),u.forEach(i),n.forEach(i),this.h()},h(){d(r,"href","/"),d(r,"class","svelte-h6nama"),d($,"href","/fruits"),d($,"class","svelte-h6nama"),d(e,"class","Menu svelte-h6nama")},m(t,n){u(t,e,n),a(e,r),a(r,o),a(e,c),a(e,$),a($,v)},p:t,i:t,o:t,d(t){t&&i(e)}}}class q extends T{constructor(t){super(),O(this,t,null,V,c,{})}}function z(t){let n,e,r,o,c,$,v;const y=new q({});return{c(){var a;(a=y.$$.fragment)&&a.c(),n=l(),e=f("h1"),r=s("Home"),o=l(),c=f("div"),$=s(t[0]),this.h()},l(a){var u,f;u=y.$$.fragment,f=a,u&&u.l(f),n=g(a),e=m(a,"H1",{class:!0});var s=h(e);r=p(s,"Home"),s.forEach(i),o=g(a),c=m(a,"DIV",{});var l=h(c);$=p(l,t[0]),l.forEach(i),this.h()},h(){d(e,"class","svelte-jph6jc")},m(t,i){F(y,t,i),u(t,n,i),u(t,e,i),a(e,r),u(t,o,i),u(t,c,i),a(c,$),v=!0},p(t,[n]){(!v||1&n)&&function(t,n){n=""+n,t.data!==n&&(t.data=n)}($,t[0])},i(t){v||(D(y.$$.fragment,t),v=!0)},o(t){!function(t,n,e,r){if(t&&t.o){if(C.has(t))return;C.add(t),(void 0).c.push(()=>{C.delete(t),r&&(e&&t.d(1),r())}),t.o(n)}}(y.$$.fragment,t),v=!1},d(t){I(y,t),t&&i(n),t&&i(e),t&&i(o),t&&i(c)}}}function B(t,n,e){let{dateString:r}=n;return y(()=>{setInterval(()=>{e(0,r=(new Date).toString()+" Client-side rendered!")},1e3)}),t.$set=t=>{"dateString"in t&&e(0,r=t.dateString)},[r]}export default class extends T{constructor(t){super(),O(this,t,B,z,c,{dateString:0})}}
