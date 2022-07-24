---
title: "Gatsbyで内部リンクをSPA的に使う方法"
date: "2022-07-24T18:30:00"
description: "Gatsbyで内部リンクをリロードせずにSPA的に表示させる方法について解説します。"
slug: gatsby-internal-link
tags:
  - Gatsby
  - ブログ
  - 内部リンク
  - SPA
keywords: Gatsby, ブログ, 内部リンク, SPA
---

このページでは、Gatsby で内部リンクを SPA 的に使う方法について解説します。

# 結論

`gatsby-plugin-catch-links`を用います。

```
npm install gatsby-plugin-catch-links
```

Markdown で gatsby-transformer-remark を用いているため、gatsby-config.js に以下のように追記しました。

```js
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins[
      ・・・
      `gatsby-plugin-catch-links`,
    ]
  }
}
```

Markdown で書く場合は例えば以下のようになります。

```
[Google検索エンジンの使い方](/google-search-engine)
```

この場合は、https://(ドメイン)/google-search-engine などのようにリンクされます。

クリックすると、外部ページへの遷移のようにリロードするのではなく、SPA のように必要なコンポーネントのみがリロードされる形になります。

# 参考

- [雑記ブログ：内部リンクをリロードさせない](https://blog.qrac.jp/posts/add-gatsby-plugin-catch-links-not-reload/)

- [Qiita 記事 - gatsby-plugin-catch-links](https://qiita.com/Takumon/items/da8347f81a9f021b637f#gatsby-plugin-catch-links)
- [Gatsby Official Plugin - gatsby-plucin-gatch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)
- [Example](https://using-remark.gatsbyjs.org/copy-linked-files-intercepting-local-links/#intercepting-local-links)
