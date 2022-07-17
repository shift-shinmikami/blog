---
title: D3.js x React.js 基礎
date: "2022-07-17T17:00:00"
description: "D3(Data Driven Document)とReactを組み合わせたデータ可視化方法の基礎"
slug: react-d3-basic4
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
