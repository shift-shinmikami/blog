---
title: JavaScriptによる配列操作
date: "2022-07-17T09:00:00"
description: "JavaScript 配列操作まとめ"
slug: JavaScript-Array-Manipulation
tags:
  - JavaScript
keywords: JavaScript, 配列, map, filter, forEach, find, findIndex, 関数
---

# 概要

フロントエンド開発で JavaScript を触る機会が増えてきたため、勉強も兼ねて配列操作方法をまとめました。
このページでは、JavaScript で用いる配列操作関数である、`map()`、`filter()`、`forEach()`、`find()`、`findIndex()`を学ぶことができます。

# それぞれの関数の使い方

## map()

配列のメソッドとして実行し、返り値として結果からなる新しい配列を返すのが特徴です。

```js
const (新しい配列) = (古い配列).map(処理内容)
```

例えば、以下の例では 1~5 の数字が入った配列をもとに、2 倍して新たな配列を返しています。

```js
const numbers = [1, 2, 3, 4, 5]

const newNumbers = numbers.map(number => number * 2)

// 出力
console.log(newNumbers)
// [2, 4, 6, 8, 10]
```

また、次の例のように、第一引数をアンダースコア`_`で表現し、第二引数（インデックス）の値に従って処理を行うことも可能です。

```js
const array2 = [1, 4, 9, 16]
const map2 = array2.map((_, i) => _ * i)
// array2 = [ 1, 8, 27, 64 ]
console.log(map2)
```

### どんな時に使う？

## filter()

`filter()`は、`map()`と似ていて、配列のメソッドとして実行し、特定の条件を満たす要素だけを取り出す関数です。

配列の中から奇数だけを取り出す

```js
const data = [1, 4, 7, 12, 21]
const result = data.filter(value => {
  return value % 2 === 1
})
console.log(result)
```

## forEach()

## find()

## findIndex()

# まとめ

# 参考

- [【JS】配列操作まとめ（map, filter, forEach, find, findIndex）](https://zenn.dev/yuji6523/articles/24ae6dbcc791b5)
- [ アンダーバーのみの変数の意味 ](https://ja.stackoverflow.com/questions/65430/%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E3%81%BF%E3%81%AE%E5%A4%89%E6%95%B0%E3%81%AE%E6%84%8F%E5%91%B3)
