(this.webpackJsonpthetypingtest=this.webpackJsonpthetypingtest||[]).push([[0],{30:function(e,t,a){e.exports=a(75)},35:function(e,t,a){},36:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),s=a.n(c),l=(a(35),a(11)),u=a(1),o=(a(36),a(3)),i=a(5),m=function(){return r.a.createElement("div",{className:"title"},r.a.createElement(o.a,{icon:i.b})," Typing"," ",r.a.createElement("span",{className:"page-title-bold"},"Test"))},d=a(4),b=a.n(d),f=a(10),p=a(25),v=a(9),E=(a(18),a(26)),h=a.n(E),j=a(27),O=a.n(j),N=(a(67),function(){return r.a.createElement(v.a,{nested:!0,modal:!0,trigger:r.a.createElement("button",{className:"netWPM-tooltip-button"}," ",r.a.createElement(o.a,{icon:i.c})," ")},r.a.createElement("div",null," Net words per minute is determined by measuring a typist's gross speed in words per minute and subtracting any uncorrected errors made during that period."))}),g=function(e){var t=e.wordPerMin,a=e.incorrectEntries,c=e.isTestDone,s=e.isSubmitted,l=e.setIsSubmitted,m=Object(n.useState)(null),d=Object(u.a)(m,2),v=d[0],E=d[1],j=Object(n.useState)(!1),g=Object(u.a)(j,2),y=g[0],w=g[1],S=Object(n.useState)(""),x=Object(u.a)(S,2),T=x[0],W=x[1],k=Object(n.useState)(t-a),C=Object(u.a)(k,2),M=C[0],I=(C[1],Object(n.useState)("Unknown")),P=Object(u.a)(I,2),D=P[0],A=P[1],R=Object(n.useState)(!0),F=Object(u.a)(R,2),z=F[0],L=F[1],J=Object(n.useState)(!0),_=Object(u.a)(J,2),B=_[0],U=_[1],V=Object(n.useState)(!0),Y=Object(u.a)(V,2),H=Y[0],K=Y[1],$=Object(n.useState)(!1),q=Object(u.a)($,2),G=q[0],Q=q[1],X=Object(n.useState)(null),Z=Object(u.a)(X,2),ee=Z[0],te=Z[1],ae=Object(n.useState)(!1),ne=Object(u.a)(ae,2),re=ne[0],ce=ne[1],se=new RegExp(/^[a-z\d\-_\s]+$/,"i"),le=new h.a,ue=Object(n.useRef)(),oe=function(){var e=Object(f.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://ec2-3-138-153-47.us-east-2.compute.amazonaws.com:8000/api/scores/");case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,t&&!t.error&&(E(a),w(!0)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),ce(!0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),ie=function(){var e=Object(f.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.a.v4();case 3:t=e.sent,A(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),ce(!0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),me=function(){var e=Object(f.a)(b.a.mark((function e(t){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(T.length<2||T.length>32)){e.next=5;break}L(!1),e.next=28;break;case 5:if(!0===se.test(T)||""===T){e.next=9;break}U(!1),e.next=28;break;case 9:if(!le.isProfane(T)){e.next=13;break}K(!1),e.next=28;break;case 13:return a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:T,netWPM:M,location:"Unknown",mobile:p.isMobile,ip:D})},Q(!0),w(!1),e.prev=16,e.next=19,fetch("https://ec2-3-138-153-47.us-east-2.compute.amazonaws.com:8000/api/scores",a).then((function(e){return e.json()})).then((function(e){te(e)}));case 19:return e.next=21,oe();case 21:Q(!1),l(!0),e.next=28;break;case 25:e.prev=25,e.t0=e.catch(16),l(!1);case 28:case"end":return e.stop()}}),e,null,[[16,25]])})));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){void 0!==ue.current&&ue.current.scrollIntoView({})}),[s]),Object(n.useEffect)((function(){oe(),ie()}),[]),r.a.createElement("div",{className:"leaderboard-popup"},!s&&c?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row "},r.a.createElement("div",{className:"column"},r.a.createElement("h2",{className:"leaderboard-sub-heading"},"Submit your result"),r.a.createElement("span",{className:"leaderboard-sub-heading"},"Enter your name below to submit your result"),r.a.createElement("form",{onSubmit:me},r.a.createElement("input",{className:"name-input leaderboard-sub-heading",placeholder:"Your Name",type:"text",value:T,onChange:function(e){return W(e.target.value)}}),r.a.createElement("button",{type:"submit",className:"submit-button",disabled:G},r.a.createElement(o.a,{icon:i.a})),z?null:r.a.createElement("div",{className:"name-valid-warning"},"Names must be at least two characters and no more than 32 characters in length"),B?null:r.a.createElement("div",{className:"name-valid-warning"},"Names may only contain alphanumerical characters, space, _ or -"),H?null:r.a.createElement("div",{className:"name-valid-warning"},"Names may not contain profanities."))),r.a.createElement("div",{className:"column"},r.a.createElement("div",{className:"stat-container"},r.a.createElement("div",{className:"stat-boxes"},r.a.createElement("div",{className:"stat-heading"},"Your Result"),M,r.a.createElement("div",{className:"align-right"},"Net WPM")))))):null,r.a.createElement("h1",{className:"leaderboard-heading"},"Leaderboard"),re?r.a.createElement("div",null,"Cannot connect to the leaderboard, please try again later! "):null,r.a.createElement("table",{className:"leaderboard-results"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"table-col-1"},"Position"),r.a.createElement("th",{className:"table-col-2"},"Name"),r.a.createElement("th",{className:"table-col-3"},"Net WPM ",r.a.createElement(N,null))),y?v.map((function(e,t){return null!==ee&&e._id===ee.message?r.a.createElement("tr",{className:"current-score",ref:ue,key:t},r.a.createElement("td",{className:"table-col-1"},t+1),r.a.createElement("td",{className:"table-col-2"},e.name),r.a.createElement("td",{className:"table-col-3"},e.netWPM)):r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"table-col-1"},t+1),r.a.createElement("td",{className:"table-col-2"},e.name),r.a.createElement("td",{className:"table-col-3"},e.netWPM))})):null)))},y=(a(68),function(e){var t=e.testWords,a=e.userInputWords,c=e.currentWordNum,s=e.currentCharNum,l=e.isTestActive,m=e.isTestDone,d=e.resetTestState,b=(e.resetTest,Object(n.useState)(0)),f=Object(u.a)(b,2),p=f[0],E=f[1],h=Object(n.useState)(0),j=Object(u.a)(h,2),O=j[0],N=j[1],y=Object(n.useState)(0),w=Object(u.a)(y,2),S=w[0],x=w[1],T=Object(n.useState)(0),W=Object(u.a)(T,2),k=W[0],C=W[1],M=Object(n.useState)(0),I=Object(u.a)(M,2),P=I[0],D=I[1],A=Object(n.useState)(!1),R=Object(u.a)(A,2),F=R[0],z=R[1];Object(n.useEffect)((function(){var e=null;return l&&(e=setInterval((function(){N((function(e){return e+.05}))}),50)),function(){return clearInterval(e)}}),[O,l]),Object(n.useEffect)((function(){d&&(E(0),N(0),x(0),C(0),z(!1)),_(),B()}),[a,O,d]);var L=Object(n.useRef)();Object(n.useEffect)((function(){L.current=a[c],U()}),[a]);var J=L.current,_=function(){var e=0;a.forEach((function(a,n){for(var r=0;r<a.length;r++)a[r]!==t[n][r]&&(e+=1)})),D(e)},B=function(){var e=Math.round(S/5/(O/60));E(Number.isNaN(e)||!isFinite(e)?0:e)},U=function(){void 0===J||J.length>a[c].length||(a[c].slice(-1)===t[c][s-1]?(C(k+1),x(S+1)):x(S+1))};return r.a.createElement("div",null,r.a.createElement(v.a,{open:m,modal:!0,nested:!0,className:"my-popup",trigger:r.a.createElement("button",{className:"leaderboard-button"}," Leaderboard ")},(function(e){return r.a.createElement("div",null,r.a.createElement(g,{wordPerMin:p,incorrectEntries:P,isTestDone:m,isSubmitted:F,setIsSubmitted:z}),r.a.createElement("button",{className:"leaderboard-close",type:"submit",onClick:function(){e()}},r.a.createElement(o.a,{icon:i.d})))})),r.a.createElement("div",{className:"stat-container"},r.a.createElement("div",{className:"stat-boxes"},r.a.createElement("div",{className:"stat-heading"},"Words Per Min."),p)),r.a.createElement("div",{className:"stat-container"},r.a.createElement("div",{className:"stat-boxes"},r.a.createElement("div",{className:"stat-heading"},"Accuracy"),0===S?0:Math.round(k/S*100),r.a.createElement("span",{className:"percent-sign"},"%"))))}),w=a(28),S=(a(69),function(e){var t=e.remainingTime,a=e.resetTest,n=e.resetCircle;return 0===t?r.a.createElement("button",{className:"reset-button",onMouseDown:function(e){e.preventDefault(),a(),n()}}," Click Here to Start Over! "):r.a.createElement("div",{className:"timer"},r.a.createElement("div",{className:"value"},t),r.a.createElement("div",{className:"text"},"seconds"))}),x=function(e){var t=e.isTestActive,a=e.testComplete,c=e.resetTest,s=(e.isTestDone,Object(n.useState)(0)),l=Object(u.a)(s,2),o=l[0],i=l[1],m=Object(n.useState)(window.matchMedia("(max-width: 768px)").matches?90:150),d=Object(u.a)(m,2),b=d[0],f=d[1];return Object(n.useEffect)((function(){function e(){window.matchMedia("(max-width: 768px)").matches?f(90):f(150)}e(),window.addEventListener("resize",e)})),r.a.createElement("div",{className:"timer-wrapper"},r.a.createElement(w.CountdownCircleTimer,{key:o,isPlaying:t,duration:2,colors:[["#4CC053",.415],["#FFD300",.415],["#FF554c",.17]],size:b,onComplete:function(){return a()}},r.a.createElement(S,{resetTest:c,resetCircle:function(){i((function(e){return e+1}))}})))},T=a(16),W=(a(70),function(e){var t=e.style,a=e.char;return r.a.createElement("span",{className:t},a)}),k=(a(71),Object(n.memo)((function(e){var t=e.word,a=e.isCurrentWord,c=e.userInputWords,s=e.currentWordNum,l=e.resetTestState,o=e.isTestActive,i=t.split("").map((function(e,t){return{char:e,style:"default",key:t}})),m=Object(n.useState)(i),d=Object(u.a)(m,2),b=d[0],f=d[1],p=Object(n.createRef)(),v=Object(n.useRef)(),E=Object(n.useRef)();Object(n.useEffect)((function(){v.current=c,E.current=s}),[c,s]);var h=v.current,j=E.current;Object(n.useEffect)((function(){l&&f(i),a&&p.current.scrollIntoView({block:"center"}),a&&j===s&&function(){if(c.length<=t.length&&o){var e=b.map((function(e,t){var a=c[t],n=Object(T.a)(Object(T.a)({},e),{},{style:"default"});return e.char===a?n.style="correct-char":a&&a!==e.char&&(n.style="incorrect-char"),n}));f(e)}c.length>=t.length&&h.length>c.length?f((function(e){return e.slice(0,-1)})):c.length>t.length&&f((function(e){return e.concat({char:c.slice(-1),style:"incorrect-char",key:e.length})}))}()}),[c,s,l]);return r.a.createElement("li",{ref:p,className:a?"current-word li-word":"default li-word"},b.map((function(e){return t=e.key,a=e.char,n=e.style,r.a.createElement(W,{key:t,style:n,char:a});var t,a,n})))}),(function(e,t){return!t.resetTestState&&(t.currentWordNum+1!==t.index&&(t.currentWordNum!==t.index&&t.currentWordNum-1!==t.index))}))),C=(a(72),function(e){var t=e.userInputWords,a=e.currentWordNum,n=e.testWords,c=e.resetTestWords,s=e.isTestActive;return r.a.createElement("div",{className:"wordlist-wrapper"},n.map((function(e,n){return function(e,n,l){return r.a.createElement(k,{key:e,index:e,word:n,isCurrentWord:l,currentWordNum:a,resetTestState:c,userInputWords:t[a],isTestActive:s})}(n,e,n===a)})))}),M=(a(73),a(29)),I=function(){return r.a.createElement("div",{className:"page-footer"},r.a.createElement("a",{href:"https://github.com/blove239/thetypingtest"},r.a.createElement(o.a,{icon:M.a}))," ","/ Made by"," ",r.a.createElement("a",{href:"http://brandonlove.ca"},"Brandon Love."))},P=a(15),D=a.n(P),A=(a(74),function(){var e=Object(n.useState)(0),t=Object(u.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(0),o=Object(u.a)(s,2),i=o[0],d=o[1],b=Object(n.useState)([""]),f=Object(u.a)(b,2),p=f[0],v=f[1],E=Object(n.useState)(""),h=Object(u.a)(E,2),j=h[0],O=h[1],N=Object(n.useState)(D()({exactly:250})),g=Object(u.a)(N,2),w=g[0],S=g[1],T=Object(n.useState)(!1),W=Object(u.a)(T,2),k=W[0],M=W[1],P=Object(n.useState)(!1),A=Object(u.a)(P,2),R=A[0],F=A[1],z=Object(n.useState)(!1),L=Object(u.a)(z,2),J=L[0],_=L[1],B=Object(n.useRef)(null);return r.a.createElement("div",{onClick:function(){B.current.focus()},className:"app"},r.a.createElement("input",{className:"input",ref:B,onKeyDown:function(e){8===e.keyCode&&function(){if(p.length>1&&0===p[a].length)v(p.slice(0,-1)),c(a-1),d(p.slice(0,-1).length);else if(p[a].length>0){d(i-1);var e=Object(l.a)(p);e[a]=e[a].slice(0,-1),v(e)}}()},onChange:function(e){k||(M(!0),_(!1));var t=e.target.value[e.target.value.length-1];e.target.value.length>j.length&&(" "===t?w[a].length<=p[a].length&&(v([].concat(Object(l.a)(p),[""])),c(a+1),d(0)):function(e){d(i+1);var t=Object(l.a)(p);t[a]=t[a].concat(e),v(t)}(t)),O(e.target.value)},type:"text",disabled:R,autoFocus:!0}),r.a.createElement("div",{className:"app-container"},r.a.createElement(m,null),r.a.createElement(C,{currentWordNum:a,currentCharNum:i,testWords:w,resetTestWords:J,userInputWords:p,isTestActive:k}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column"},r.a.createElement(x,{isTestActive:k,isTestDone:R,testComplete:function(){M(!1),F(!0)},resetTest:function(){c(0),d(0),v([""]),O(""),S(D()({exactly:250})),M(!1),F(!1),_(!0)}})),r.a.createElement("div",{className:"column"},r.a.createElement(y,{testWords:w,userInputWords:p,currentWordNum:a,currentCharNum:i,isTestActive:k,isTestDone:R,resetTestState:J}))),r.a.createElement(I,null)))});s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.9e0d0ce2.chunk.js.map