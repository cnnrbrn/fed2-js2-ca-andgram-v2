import{l as p}from"./auth-fjUhtDne.js";const d="5c2b19a4-bb48-4221-aa05-d7a9ac84c8c7",s="https://v2.api.noroff.dev",n=`${s}/auth`,A=`${n}/login`,I=`${n}/register`,a=`${s}/social`,f=`${a}/posts`,u=`${a}/profiles`;function m(){const e=new Headers,o=p();return e.append("X-Noroff-API-Key",d),o&&e.append("Authorization",`Bearer ${o}`),e.append("Content-Type","application/json"),e}function T(e,o="error",r="Something went wrong"){let t=e;typeof e=="string"&&(t=document.querySelector(e));const i=`
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                ${o==="success"?"bg-green-500":"bg-red-500"} 
                text-white p-4 rounded-md shadow-md text-center transition-opacity duration-500 opacity-100" 
                role="alert">
        <p>${r}</p>
    </div>
    `;t.innerHTML="",t.innerHTML=i;const c=t.querySelector("div");setTimeout(()=>{c.style.opacity="0",setTimeout(()=>{t.innerHTML=""},500)},3e3)}export{f as A,u as a,A as b,I as c,T as d,m as h};
