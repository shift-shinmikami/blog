---
title: React Hooks 基礎
date: "2022-07-17T12:00:00"
description: "React Hooks基礎。考え方から、State, Props, Effect, Memo, Refの基本的な使い方まで。"
slug: react-hooks-basic
tags:
  - React
keywords: React,React Hooks,State, Props, useEffect, useMemo, useRef
---

## フックとは何か

React のバージョン 16.8.0 で追加された機能であり、簡潔に言ってしまえば関数コンポーネントで利用できる関数のこと。
React には様々な機能を持つフックが組み込まれており、それらを利用すれば関数コンポーネントで state 管理などを行うことが出来る。

フックを利用することで以下のようなメリットがあります。

・同等の機能を実装する場合、クラスコンポーネントよりもコード量が少なくなる。
・ロジックを分離することができるため、ロジックの再利用やテストがしやすい。

公式ドキュメントのフックの解説は難解に感じると思いますが、誤解を恐れず、簡潔に言うとフックはただの関数です。
「関数コンポーネントで利用できる便利な関数」ぐらいな認識で良いと思います。

## useState

state と state 更新関数を返すフック。
このフックを利用することで、コンポーネント内で state 管理を行うことができます。
state の特徴として、値が更新されれば再レンダーされます。

### useState の構文

```js
const [state, state更新関数] = useState(stateの初期値)
```

次の例では、useState にオブジェクトを持っています。

```js
import React, { useState } from "react"

export default function App() {
  const [vote, setVote] = useState({ kinoko: 0, takenoko: 0 })

  const voteKinoko = () => {
    setVote({ ...vote, kinoko: vote.kinoko + 1 })
  }

  const voteTakenoko = () => {
    setVote({ ...vote, takenoko: vote.takenoko + 1 })
  }

  return (
    <>
      <p>きのこ: {vote.kinoko}</p>
      <p>たけのこ: {vote.takenoko}</p>
      <button onClick={voteKinoko}>きのこ</button>
      <button onClick={voteTakenoko}>たけのこ</button>
    </>
  )
}
```

## useEffect

`useEffect()`は、コンポーネントに副作用を追加するフックです。
副作用は、次のような処理を実行する関数です。

- React から生成された DOM の変更
- API との通信
- 非同期処理
- console.log

「副作用」のイメージが掴みづらいかもしれませんが、「コンポーネントのレンダー後かアンマウント後に何らかの処理を実行させたい時に`useEffect()`を利用する」という認識で問題ないかと思います。

### useEffect の構文

```js
useEffect(副作用, 依存配列)
```

依存配列は、副作用が依存している値が格納された配列です。引数の渡し方によって副作用が実行されるタイミングは異なります。

### 使用例

#### 第２引数なし（毎回実行）

次のように副作用だけ渡すと、コンポーネントがレンダーされた後に副作用は毎回実行されます。

```js
useEffect(() => {
  console.log("completed render")
})
```

#### 依存配列あり

useEffect の第２引数には、副作用が依存している値を配列で渡すことが出来ます。
副作用が依存している値を指定すれば、その値が更新された時だけ副作用が実行されます。

```js
useEffect(() => {
  console.log(message)
}, [message])
```

#### 初回のみ実行

第２引数に空配列（[]）を指定すれば、コンポーネントがレンダーされた後に一度だけ副作用が実行されます。

```js
useEffect(() => {
  console.log("completed render")
}, [])
```

## useRef

`useRef()`は、ref オブジェクト（React.createRef の戻り値）を返すフックです。

ref オブジェクトを利用することで、DOM の参照や、コンポーネント内で値を保持できます。

「値を保持する」という点に関しては、`useState`と同じです。

しかし、`useState`とは異なり、`useRef`で生成した値を更新してもコンポーネントは再レンダーされない。

そのため、レンダーには関係ない`state`を扱いたい時（コンポーネント内で値を保持したいが、値を更新してもコンポーネントを再レンダーしたくない時）などに利用します。

### useRef の構文

```js
const ref オブジェクト = useRef(初期値);
```

useRef の引数に渡した値が、ref オブジェクトの current プロパティの値になります。

そのため、次のように useRef に 0 を渡せば、ref オブジェクトの curret プロパティの値は 0 になります。

```js
const count = useRef(0)
console.log(count.current) //-> 0
```

current プロパティの値を更新したい時は、次のように更新することができます。

```js
count.current = count.current + 1
```

### 使用例

#### DOM の参照

useRef で DOM を参照したい場合、作成した ref オブジェクトを HTML 要素の ref 属性に指定する必要があります。

```js
const inputEl = useRef(null)
<input ref={inputEl} type="text" />
```

このようにすることで、`inputEl.current`で DOM を参照することが出来ます。

次の例では、`prevCountRef.current` に`count`の値を設定する処理内容を`useEffect`に記述しています。
button onClick によって`count`は更新されます。これによってコンポーネントは再レンダリングした後に前回の count の値を prevCountRef に代入します。
※実際には、レンダリングの方が useEffect の処理より先のため、前回の count の値と更新された count の値を比較した後に prevCountRef.current が更新されます。

```js
import React, { useState, useEffect, useRef } from "react"

export default function App() {
  const [count, setCount] = useState(10)
  const prevCountRef = useRef(0)

  useEffect(() => {
    prevCountRef.current = count
  })

  return (
    <>
      <p>
        現在のcount: {count}、前回のcount: {prevCountRef.current}
      </p>
      <p>前回のcountより{prevCountRef.current > count ? "小さい" : "大きい"}</p>
      <button onClick={() => setCount(Math.floor(Math.random() * 11))}>
    </>
  );
}
```

次のサンプルコードでは、useRef で ref オブジェクトを作成し、それを HTML 要素の ref 属性に指定して DOM を参照しています。

```js
import React, { useRef } from "react"

export default function App() {
  const inputEl = useRef(null)
  const onClick = () => {
    if (!inputEl.current) return

    inputEl.current.focus()
  }

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onClick}>input 要素をフォーカスする</button>
    </>
  )
}
```

## useMemo

React では、不要な再計算やコンポーネントの再レンダーを抑えることが、パフォーマンス最適化の基本的な戦略となります。

それらを実現するための手段として、React.memo、useCallback、useMemo を利用します。
React.memo、useCallback の解説は割愛させていただきます。

### useMemo の構文

```js
useMemo(() => 値を計算するロジック, 依存配列)
```

依存配列は、値を計算するロジックが依存している値（値の計算に必要な値）が格納された配列です。
例えば、count という変数の値を２倍にした値をメモ化したい場合は次のようになります。

```js
const result = useMemo(() => count * 2, [count])
```

依存している値が更新されれば、値が再計算されます。

#### 使用例

次のサンプルコードでは、useMemo を利用して不要な再計算をスキップしています。

```js
import React, { useState, useMemo } from "react"

export default function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  const double = count => {
    let i = 0
    while (i < 1000) i++
    return count * 2
  }

  const doubledCount = useMemo(() => double(count2), [count2])

  return (
    <>
      <h2>Increment(fast)</h2>
      <p>Counter: {cuont1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment(fast)</button>

      <h2>Increment(slow)</h2>
      <p>
        Counter: {count2}, {doubledCount}
      </p>
      <button onClick={() => setCount2(count2 + 1)}>Increment(slow)</button>
    </>
  )
}
```
