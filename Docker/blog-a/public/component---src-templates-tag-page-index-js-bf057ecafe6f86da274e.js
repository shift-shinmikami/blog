(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{262:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(35),i=a(256),l=a(255),m=a(263),c=a(7),p=a(29),s=a(30),d=c.c.div.withConfig({displayName:"style__Wrapper",componentId:"sc-1egg6ft-0"})([".top{padding-top:30px;padding-bottom:110px;text-align:center;h1{font-size:1.8rem;font-weight:600;padding-bottom:15px;display:flex;justify-content:center;align-items:center;svg{margin-right:5px;margin-bottom:3px;color:",";}}p{font-size:0.9rem;}}"],Object(p.a)(s.a.text,.4));a.d(t,"pageQuery",(function(){return g}));t.default=function(e){var t=e.data,a=e.location,n=e.pageContext.slug,c=t.allMarkdownRemark.edges;return o.a.createElement(i.a,{location:a,title:"title"},o.a.createElement(l.a,{title:"タグ: "+n,description:n+"タグを含む記事の一覧ページです",noindex:!0}),o.a.createElement(d,{className:"inner"},o.a.createElement("div",{className:"top"},o.a.createElement("h1",null,o.a.createElement(r.h,null),o.a.createElement("span",null,n)),o.a.createElement("p",null,o.a.createElement("b",null,c.length),"件の投稿があります")),c.map((function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return o.a.createElement(m.a,{title:a,key:t.fields.slug,slug:"/"+t.frontmatter.slug+"/",date:t.frontmatter.date,description:t.frontmatter.description,excerpt:t.excerpt,tags:t.frontmatter.tags})}))))};var g="3623058454"},263:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(7),i=a(39),l=a(29),m=a(257),c=a(30),p=r.c.article.withConfig({displayName:"blog__BlogWrapper",componentId:"sc-yln0ve-0"})(["margin-bottom:35px;padding-bottom:35px;border-bottom:1px solid ",";&:last-child{border-bottom:none;}a{text-decoration:none;}h2{font-size:1.2rem;font-weight:600;padding-bottom:5px;a{transition:0.3s ease;&:hover{color:var(--primary);}}}.info{display:flex;justify-content:space-between;}p{line-height:1.8;padding:15px 0 25px 0;font-size:0.95rem;}@media screen and (max-width:780px){margin-bottom:25px;padding-bottom:25px;.info{flex-direction:column;.date{margin-bottom:7px;}}}"],Object(l.a)(c.a.gray,.3));t.a=function(e){var t=e.description||e.excerpt;return t.length>=105&&(t=t.substr(0,105)+"..."),o.a.createElement(p,{key:e.slug,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},o.a.createElement("div",null,o.a.createElement("h2",{itemProp:"name"},o.a.createElement(i.a,{to:e.slug,itemProp:"url"},e.title))),o.a.createElement("section",null,o.a.createElement("p",{itemProp:"headline",dangerouslySetInnerHTML:{__html:t}})),o.a.createElement("div",{className:"info"},o.a.createElement(m.a,{date:e.date}),o.a.createElement(m.b,{tags:e.tags})))}}}]);
//# sourceMappingURL=component---src-templates-tag-page-index-js-bf057ecafe6f86da274e.js.map