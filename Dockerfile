FROM nginx:1.22
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/webapp/
