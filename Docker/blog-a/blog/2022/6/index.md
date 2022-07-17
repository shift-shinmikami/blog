---
title: D3.js x React.js 基礎
date: "2022-07-17T14:00:00"
description: "D3(Data Driven Document)とReactを組み合わせたデータ可視化方法の基礎"
slug: react-d3-basic
tags:
  - React
  - D3
keywords: D3, D3.js, React, React.js, データ可視化, Dataviz, Data visualization
---

# D3 について

# React について

# なぜ D3 と React を組み合わせるのか

# Victory のデータを CSV で読み込む

D3.js と React.js を組み合わせたデータ可視化については様々な文献がある一方、難易度が高く理解し難いのが現状です。
Youtube で分かりやすいビデオを見つけることが出来ましたため共有したいと思います。

`youtube:https://www.youtube.com/embed/OacqgtI30pk`

詳細は動画で説明されているため割愛させていただくことにして、エッセンスだけ抜き出して説明します。

元々の index.js のファイルは以下のようです。

```js
import React, { useState } from "react"
import ReactDOM from "react-dom"

import { VictoryBar, VictoryChart } from "Victory"
```
