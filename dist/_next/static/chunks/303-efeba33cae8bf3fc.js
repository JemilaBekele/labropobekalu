"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[303],{9141:function(e,r,a){var t=a(7437);a(2265),r.Z=e=>{var r;let{data:a}=e,s=(null===(r=a.find(e=>{let[r]=e;return"Recommendation"===r}))||void 0===r?void 0:r[1].result)||"";return(0,t.jsxs)("div",{className:"mt-6",children:[(0,t.jsx)("h2",{className:"text-lg font-bold mt-4",children:"Recommendations"}),s?(0,t.jsx)("p",{className:"border px-4 py-2",children:s}):(0,t.jsx)("p",{children:"No recommendations to display."})]})}},9999:function(e,r,a){var t=a(7437);a(2265),r.Z=e=>{let{items:r,formData:a,handleChange:s,title:l,resultOptions:o}=e;return(0,t.jsxs)("div",{className:"p-4 border rounded-lg shadow-md",children:[(0,t.jsx)("h1",{className:"block mb-4 font-semibold text-2xl text-yellow-400",children:l}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:r.map(e=>{var r;return(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("label",{className:"flex-shrink-0 w-1/4 font-semibold text-base",htmlFor:"".concat(e,"-result"),children:[e," Result"]}),(0,t.jsxs)("select",{id:"".concat(e,"-result"),name:"result",value:(null===(r=a[e])||void 0===r?void 0:r.result)||"",className:"flex-grow border border-slate-100 text-lg font-light tracking-wide text-gray-500 outline-none  rounded-md  ",onChange:r=>s(r,e),children:[(0,t.jsx)("option",{value:"",children:"Select"}),o.map((e,r)=>(0,t.jsx)("option",{value:e,children:e},r))]})]},e)})})]})}},3291:function(e,r,a){var t=a(7437);a(2265),r.Z=e=>{let{items:r,formData:a,handleChange:s,title:l}=e;return(0,t.jsxs)("div",{className:"p-4 border rounded-lg",children:[(0,t.jsx)("h1",{className:"block mb-4 font-semibold text-2xl text-yellow-400",children:l}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:r.map(e=>{var r;return(0,t.jsxs)("div",{className:"flex flex-col",children:[(0,t.jsxs)("label",{className:"font-semibold mb-1",htmlFor:"".concat(e,"-result"),children:[e," Result"]}),(0,t.jsx)("input",{type:"text",id:"".concat(e,"-result"),name:"result",value:(null===(r=a[e])||void 0===r?void 0:r.result)||"",className:"w-full border-b border-slate-300 text-lg font-light tracking-wide text-gray-500 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",onChange:r=>s(r,e)})]},e)})})]})}},5063:function(e,r,a){var t=a(7437);a(2265),r.Z=e=>{let{data:r}=e,a=[["Color","","Yellow",""],["Appearance","","Clear",""],["Specific Gravity","","1.005-1.030",""],["PH","","5-8",""],["Protein","","Negative",""],["Glucose","","Negative",""],["Bilirubin","","Negative",""],["Urobilinogen","","Normal",""],["Nitrite","","Negative",""],["Ketone","","Negative",""],["Blood","","Negative",""],["Leukocyte","","Negative",""],["HCG","","Negative",""]];r.forEach(e=>{let[r,{result:t,remark:s}]=e,l=a.find(e=>e[0]===r);l&&(l[1]=t,l[3]=s)});let s=a.filter(e=>""!==e[1]),l=[["WBC","","0-4/HPF"],["RBC","","1-3/HPF"],["Epithelial","","2-4 LPF"],["WBC cast","","Negative"],["RBC cast","","Negative"],["Granular cast","","Negative"],["Hyaline cast","","Negative"],["Cal-Oxalet","","Negative"],["Cystal","","Negative"],["Bacteria","","Negative"],["Parasite","","Negative"]];r.forEach(e=>{let[r,{result:a}]=e,t=l.find(e=>e[0]===r);t&&(t[1]=a)});let o=l.filter(e=>""!==e[1]);return(0,t.jsxs)("div",{className:"mt-6",children:[(0,t.jsx)("h2",{className:"text-lg font-bold",children:"Urinalysis Test Results"}),s.length>0?(0,t.jsxs)("table",{className:"table-auto w-full mt-2",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:["Test Name","Result","Ref.Range","Remark"].map((e,r)=>(0,t.jsx)("th",{className:"border px-4 py-2",children:e},r))})}),(0,t.jsx)("tbody",{children:s.map((e,r)=>(0,t.jsx)("tr",{children:e.map((e,r)=>(0,t.jsx)("td",{className:"border px-4 py-2",children:e},r))},r))})]}):(0,t.jsx)("p",{children:"No  Test 1 results to display."}),(0,t.jsx)("h2",{className:"text-lg font-bold mt-4",children:"Microscopy Results"}),o.length>0?(0,t.jsxs)("table",{className:"table-auto w-full mt-2",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{children:["Test Name","Result","Ref.Range"].map((e,r)=>(0,t.jsx)("th",{className:"border px-4 py-2",children:e},r))})}),(0,t.jsx)("tbody",{children:o.map((e,r)=>(0,t.jsx)("tr",{children:e.map((e,r)=>(0,t.jsx)("td",{className:"border px-4 py-2",children:e},r))},r))})]}):(0,t.jsx)("p",{children:"No Microscopy Test results to display."})]})}},8064:function(e,r,a){var t=a(7437);a(2265),r.Z=e=>{let{profileData:r,handleProfileChange:a}=e;return(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"client-name",children:"Patient Name:"}),(0,t.jsx)("input",{type:"text",id:"client-name",name:"clientName",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.clientName,onChange:a,placeholder:"Enter client name"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"SampleId",children:"Sample Id"}),(0,t.jsx)("input",{type:"number",id:"SampleId",name:"SampleId",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.SampleId,onChange:a,placeholder:"Enter SampleId"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"client-name",children:"CRN"}),(0,t.jsx)("input",{type:"text",id:"CRN",name:"CRN",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.CRN,onChange:a,placeholder:"Enter CRN"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"location",children:"Location"}),(0,t.jsx)("input",{type:"text",id:"location",name:"location",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.location,onChange:a,placeholder:"Enter location"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"client-name",children:"MRN"}),(0,t.jsx)("input",{type:"text",id:"MRN",name:"MRN",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.MRN,onChange:a,placeholder:"Enter MRN"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"report-date",children:"Report Date & Time"}),(0,t.jsx)("input",{type:"datetime-local",id:"report-date",name:"reportDate",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.reportDate,onChange:a,placeholder:"Enter report date and time"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"age",children:"Age"}),(0,t.jsx)("input",{type:"number",id:"age",name:"age",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.age,onChange:a,placeholder:"Enter age"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"sex",children:"Sex"}),(0,t.jsxs)("select",{id:"sex",name:"sex",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.sex,onChange:a,children:[(0,t.jsx)("option",{value:"",children:"Select sex"}),(0,t.jsx)("option",{value:"Male",children:"Male"}),(0,t.jsx)("option",{value:"Female",children:"Female"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("label",{className:"block  w-20 border-b border-transparent text-base font-semibold tracking-wide text-gray-900 outline-none focus:border-gray-300 focus:shadow-sm",htmlFor:"phoneNumber",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",id:"phoneNumber",name:"phoneNumber",className:"block w-full border-b border-transparent text-base font-light tracking-wide text-gray-900 bg-blue-80 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm",value:r.phoneNumber,onChange:a,placeholder:"Enter phone number"})]})]})}}}]);