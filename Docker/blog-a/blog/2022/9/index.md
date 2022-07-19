---
title: Dockerで動くNginx WebサイトをSSL/TLS対応する方法
date: "2022-07-19T13:44:00"
description: "Dockerで動くNginx WebサイトをSSL/TLS対応する方法について。"
slug: ssltls-nginx-docker
tags:
  - Docker
  - Nginx
  - SSL/TLS
keywords: Docker, Nginx, SSL/TLS, Let's Encrypt
---

# CICD パイプライン

CICD パイプラインには GitHub Actions を用いています。GitHub の runner から対象のホストに対して docker-deploy.yml をばら撒くことでコンテナを配置しています。

```YAML
on:
  push:
    branches:
      - 'master'
    paths:
      - 'Docker/blog-a/**'

jobs:
  CICD:
    runs-on: ubuntu-latest
    steps:
      # CI Phase
      - name: Checkout
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Build and push
        uses: docker/build-push-action@v2
        with:
         context: Docker/blog-a/
         file:  Docker/blog-a/Dockerfile
         push: true
         tags:  ${{ secrets.DOCKER_HUB_USERNAME }}/blog:latest

      # CD Phase
      - name: deploy docker image
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa
          chmod 700 ~/.ssh/id_rsa
          eval $(ssh-agent -s)
          ssh-add ~/.ssh/id_rsa
          ssh-keyscan -p 22 -H shin-tech25.com >> ~/.ssh/known_hosts  # Blog
          cd Ansible/
          ansible-playbook -i inventory/hosts.yml playbooks/docker-deploy.yml --private-key ~/.ssh/id_rsa --extra-vars 'docker_deploy_host=shin-tech25.com docker_image="${{ secrets.DOCKER_HUB_USERNAME }}/blog:latest" docker_container_name=blog'
```

# Playbook(docker-deploy.yml)

docker-deploy.yml は以下のように role を import しています。role はそれぞれの処理を担当します。

```YAML
- name: Docker Deploy
  hosts: "{{ docker_deploy_host }}"
  become: true
  gather_facts: true

  roles:
    - role: firewalld_tcp_port_open
      tags: firewalld_tcp_port_open
      vars:
        firewalld_tcp_port: 80
    - role: firewalld_tcp_port_open
      tags: firewalld_tcp_port_open
      vars:
        firewalld_tcp_port: 443

    - role: docker_image_prune
      tags: docker_image_prune

    - role: docker_container_stop
      tags: docker_container_stop

    - role: docker_container_prune
      tags: docker_container_prune

    - role: docker_pull_image
      tags: docker_pull_image

    - role: docker_container_run
      tags: docker_container_run
```

# Dockerfile

nginx:latest のイメージをベースに必要なライブラリのインストールを行った後、ssl.conf をイメージにコピーして含ませるということをしています。
public/は今回は静的サイトジェネレーター(Gatsby)のビルド成果物が含まれているフォルダです。この部分は適宜各々の環境で読み替えてください。

Dockerfile

```YAML
FROM nginx:latest

RUN apt-get update && apt-get install -y \
  openssl \
  ssl-cert \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY public/  /usr/share/nginx/html/
COPY ./ssl.conf /etc/nginx/conf.d/

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
```

ssl.conf

```conf
server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      /etc/ssl/certs/ssl-cert-snakeoil.pem;
    ssl_certificate_key  /etc/ssl/private/ssl-cert-snakeoil.key;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

# Let's Encrypt について

Let's Encrypt はフリーで証明書を発行してくれる認証局です。米国の非営利団体である ISRG(Internet Security Research Group)により運営されています。全ての Web サイトを暗号化することを目指したプロジェクトです。証明書有効期限は 90 日と短いですが、コマンドで自動更新が可能です。

- [Let's Encrypt](https://letsencrypt.org/ja/)
- [Let's Encrypt 総合ポータル](https://free-ssl.jp/)

非営利団体ですが、現在では Facebook やシスコシステムズ、Akamai Technologies、Verizon といった数多くの大手企業に支えられているため、財務基盤に問題があるわけではありません。

Let's Encrypt では、90 日間有効な DV(Domain Validation)SSL 証明書を 2 つの認証方式（ドメイン認証、DNS 認証）で提供しています。SSL 証明書は無料で提供されていますが、暗号強度などは一般的に販売されている SSL 署名書と同じです。

また、大きな特徴として ACME(Automated Certificate Management Environment)プロトコルと呼ばれる SSL 証明書を自動発行する仕組みを利用している点です。他の認証局と異なり、認証してから数秒で SSL 証明書が発行され、すぐにサーバーへデプロイ出来るという非常に高度な SSL 証明書発行インフラを運用しています。

管理者（root）権限のあるサーバーで Let's Encrypt を利用する場合は、一般的に certbot などのアプリケーションが利用されています。事前にスクリプトが定期的に実行されるように設定しておけば、レンタルサーバーの無料 SSL 機能と同様の自動更新が比較的簡単に実現できます。

# Let's Encrypt の使い方

Let's Encrypt はクライアントソフトウェア「Certbot」を使用することで、SSL/TLS サーバ証明書の取得・更新作業を自動化出来る仕組みになっています。一般の認証局では、証明書署名要求＝ CSR(Certificate Signing Request)が必要ですが、これらの作業を Certbot クライアントが自動的に行います。

## Certbot クライアントの準備

私の環境では、CentOS Stream-8 を用いています。CentOS に準じて解説します。

```sh
// インストール
sudo yum install epel-release
sudo yum install certbot python-certbot-apache

// クライアント起動
certbot
```

## テスト実行（結果）

特に問題ない場合は、Certbot クライアントが起動して、TUI 画面に以下のように表示されます。

```
No names were found in your configuration files.
You should specify ServerNames in your config files in order to allow for accurate installation of your certificate.
If you do use the default vhost, you may specify the name manually.
Would you like to continue ?
```

このメッセージの後、NO を選択して、SSL/TLS サーバ証明書の取得に進みます。

## SSL/TLS サーバ証明書の取得

証明書取得コマンドの実行

```
certbot certonly --webroot -w /var/www/html -d shin-tech25.com -d www.shin-tech25.com
```

# 参考

- [Docker の nginx:latest(1.15.5)で SSL/TLS を使えるようにする最低限の Dockerfile を作りました](https://oki2a24.com/2018/11/06/enable-ssl-tls-in-docker-nginx/)
- [nginx リバースプロキシ環境で Let's Encrypt による SSL/TLS 化](https://qiita.com/__juiblex__/items/fe599755dc321b7489b8)
- [無料 SSL 証明書の Let's Encrypt とは？](https://ssl.sakura.ad.jp/column/letsencrypt/)
- [Let's Encrypt の使い方](https://free-ssl.jp/usage/)
