---
title: NginxのWebサイトをLet's EncryptでSSL対応する方法
date: "2022-07-19T13:44:00"
description: "NginxのWebサイトをフリーのサーバ証明書発行サービスであるLet's Encryptを用いてSSL対応する方法について。ドメイン取得にお名前.comを使う方法についても解説します。"
slug: Nginx-LetsEncrypt
tags:
  - Nginx
  - SSL/TLS
  - ドメイン
  - ブログ
keywords: Nginx, SSL/TLS, Let's Encrypt, お名前.com, サーバ証明書, ブログ
---

# Nginx 設定ファイル(/etc/nginx/nginx.conf)

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
また、Web サーバには Nginx を用いています。Apache を用いる場合は、別途`python-certbot-apache`もインストールする必要があります。

```sh
sudo yum install epel-release
sudo yum install certbot
```

## SSL/TLS サーバ証明書の取得

証明書取得コマンドの実行

```
certbot certonly --webroot -w /var/www/html -d www.shin-tech25.com
```

`youtube:https://www.youtube.com/embed/ZB23tAxKqmU`

### cron を使用して自動で SSL 証明書を更新出来るようにする

cron は`* * * * *`の 5 箇所を指定して、起動時間を設定します。左から「分」「時」「日」「月」「曜日」を指定します。

```
// cronの起動時間設定
* * * * * （起動したい処理）
| | | | |
| | | | |- 曜日
| | | |--- 月
| | |----- 日
| |------- 時
|--------- 分
```

Let's Encrypt は、90 日間で有効期限が切れるため、2 ヶ月間隔で SSL 証明書を更新できるように設定しました。

2 ヶ月間隔で処理を実行する書き方は以下です。

```
# 2ヶ月毎に起動する（2/1 00:00, 4/1 00:00, 6/1 00:00・・・12/1 00:00）
0 0 1 */2 * (起動したい処理)
```

`sudo certbot renew`コマンドを打つためには、Nginx が停止している必要があるため、直前に Nginx 停止、直後に Nginx 再起動するような処理を行います。

```
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl restart nginx"
```

まとめると以下のような crontab の書き方になります。

```
0 0 1 */2 *  sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl restart nginx"
```

crontab の設定には、`crontab -u root -e`で root ユーザの crontab を設定することができます。

cron を書き換えたら、サービスの再起動を行っておきましょう。

```bash
sudo systemctl restart crond
```

# 参考

- [Docker の nginx:latest(1.15.5)で SSL/TLS を使えるようにする最低限の Dockerfile を作りました](https://oki2a24.com/2018/11/06/enable-ssl-tls-in-docker-nginx/)
- [nginx リバースプロキシ環境で Let's Encrypt による SSL/TLS 化](https://qiita.com/__juiblex__/items/fe599755dc321b7489b8)
- [無料 SSL 証明書の Let's Encrypt とは？](https://ssl.sakura.ad.jp/column/letsencrypt/)
- [Let's Encrypt の使い方](https://free-ssl.jp/usage/)
- [Let's Encrypt の SSL 証明書を更新する(手動と cron による自動更新)](https://it-jog.com/khow/serv/renewletsencrypt)
- [cron の日時指定を、基礎から学ぶ（分,時,日,月,曜日の指定、○ 分ごと、月末起動、など）](https://www.yoheim.net/blog.php?q=20190902)
- [crontab の書き方](https://www.server-memo.net/tips/crontab.html)
