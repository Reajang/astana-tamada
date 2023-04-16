FROM openresty/openresty:1.15.8.3-2-centos

#RUN opm get knyar/nginx-lua-prometheus

RUN mkdir /usr/local/openresty/nginx/modules && curl -L https://github.com/opentracing-contrib/nginx-opentracing/releases/download/v0.9.0/linux-amd64-nginx-1.15.8-ngx_http_module.so.tgz \
    | tar -xvz -C /usr/local/openresty/nginx/modules/

ENV BACKEND_UPSTREAM backend:8080

COPY ./docker/entrypoint.sh /sbin/entrypoint.sh

RUN chmod 755 /sbin/entrypoint.sh

COPY ./docker/nginx.conf /etc/nginx/nginx.conf.tpl
COPY ./docker/robots.txt /usr/share/nginx/html/
COPY ./dist/astana-ui /usr/share/nginx/html

ENTRYPOINT ["/sbin/entrypoint.sh"]
