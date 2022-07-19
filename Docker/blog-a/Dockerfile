FROM nginx:latest

RUN apt-get update && apt-get install -y \
  openssl \
  ssl-cert \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY public/  /usr/share/nginx/html/
COPY ./ssl.conf /etc/nginx/conf.d/

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
