FROM openresty/openresty:1.15.8.3-2-centos

ENV BACKEND_UPSTREAM backend:8080

COPY ./docker/entrypoint.sh /sbin/entrypoint.sh

RUN chmod 755 /sbin/entrypoint.sh

COPY ./docker/nginx.conf /etc/nginx/nginx.conf.tpl
COPY ./docker/robots.txt /usr/share/nginx/html/
COPY ./dist/astana-ui /usr/share/nginx/html

ENTRYPOINT ["/sbin/entrypoint.sh"]
