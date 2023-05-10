#!/bin/bash

set -m

envsubst '\$BACKEND_UPSTREAM' < /etc/nginx/nginx.conf.tpl > /usr/local/openresty/nginx/conf/nginx.conf

nginx -g 'daemon off;'
