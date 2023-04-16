#!/bin/bash

set -m
#echo resolver $(awk 'BEGIN{ORS=" "} $1=="nameserver" {print $2}' /etc/resolv.conf) " ipv6=off;" > /etc/nginx/resolver.conf

envsubst '\$BACKEND_UPSTREAM' < /etc/nginx/nginx.conf.tpl > /usr/local/openresty/nginx/conf/nginx.conf

nginx -g 'daemon off;'
