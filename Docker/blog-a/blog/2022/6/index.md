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

# D3.js について

D3.js(Data-Driven Documents)はデータを基盤として、文書を操作するための JavaScript ライブラリーです。これを利用すると、あるデータを DOM にバインディングした後、チャートやグラフとしてビジュアライズすることが可能です。

- 協力なデータ可視化ライブラリー
- WEB 標準に準拠
- HTML、SVG、CSS を操作できる
- メソッドチェーンを利用
- Firefox・Chrome・Safari・IE9 以上・Android・iOS に対応

# React について

React は、Facebook 社が開発した Web サイト上の UI パーツを構築するための JavaScript ライブラリです。

以下のような特徴があります。

- 宣言的な View（Declarative）
- コンポーネントベース（Component-Based）
- 一度学習すれば、どこでも使える（Learn Once, Write Anywhere）

# なぜ D3 と React を組み合わせるのか

コンポーネント指向の React と SVG によるデータ可視化の D3 を組み合わせるとメリットがあります。D3 だけだとコード量が膨大になりがちで、可読性が悪く、再利用性もあまりありませんが、コンポーネント化し、データ読み込みを変数化することで可読性、再利用性を向上させることが出来ます。

この点が D3 と React を組み合わせるメリットです。

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

const data = [
  { quarter: "a", earnings: 13000 },
  { quarter: "b", earnings: 16500 },
  { quarter: "c", earnings: 14250 },
  { quarter: "d", earnigns: 19000 },
]

const App = () => (
  <VictoryChart
    style={{ tickLabels: { fontSize: 120 } }}
    width="960"
    height="500"
    domainPadding={50}
    padding={{ top: 10, bottom: 40, left: 80, right: 10 }}
  >
    <VictoryBar data={data} x="quarter" y="earnings" />
  </VictoryChart>
)

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
```

CSV からデータを読み取るようにした場合は以下のようになります。

```js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {csv} from 'd3';

import { VictoryBar, VictoryChart } from 'Victory';

const row = d => {
  d.population = +d.population;
  return d;
};

const App () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    csv('data.csv', row).then(setData);
  }, []);

  return (
    <VictoryChart
      style={{tickLabels: {fontSize: 120}}}
      width='960'
      height='500'
      domainPadding={50}
      padding={{top: 10, bottom: 40, left: 80, right: 10}}
    >
      <VictoryBar data={data} x="country" y="population" />
    </VictoryChart>
  )

  const rootElement = document.getElementById("root")
  ReactDOM.render(<App />, rootElement)
}

```

ポイントとしては

- d3 のライブラリ読み込み
- csv の raw データを setData()で渡す
- データを渡す場合には第２引数が空配列の初回実行 useEffect を用いる
- データパース関数も別で用意して、d3.csv()の第２引数に渡す。

上の４点かなと思います。

D3.js と React.js の組み合わせはデータビジュアライゼーションに置いて非常にポテンシャルが高いと感じておりますので今後も継続して勉強していく予定です。

また何か考えたことや分かったことあったらアップしていきます。
