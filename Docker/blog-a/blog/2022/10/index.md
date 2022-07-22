---
title: gatsby buildからgit push するまでのバッチファイル作成
date: "2022-07-21T09:00:00"
description: "gatsby buildからgit pushするまでのバッチファイルを作成し、更にデプロイしやすくしました。"
slug: blog-tools
tags:
  - ブログ
  - git
  - bat
  - CI/CD
keywords: ブログ, git, bat, CI/CD
---

# Gatsby でのデプロイまでの流れ

Gatsby では、執筆 → ビルドします。GitHub Actions などの CI/CD パイプラインを用いている場合は、`git push`を起点にしてワークフローが起動します。

そこで、gatsby build → git add . → git commit → git push

までの一連の流れをバッチファイルにしました。

```bat:deploy.bat
@echo off
echo deploy bat called...
call gatsby build
call git add .
call git commit -m "deploy %date% %time%"
call git push
```

# GitHub Actions

GitHub Actions では、master ブランチでの push を起点にして動作します。

```YAML:.github/workflows/deploy-blog.yml
# 条件
on:
  push:
    branches:
      - 'master'
    paths:
      - '(Gatsbyの作業ディレクトリ)'
      - '.github/workflows/deploy-blog.yml'

# ジョブ
jobs:
  DeployBlog:
    runs-on: ubuntu-latest
    steps:
      # 実際の処理を以下に記載
```
