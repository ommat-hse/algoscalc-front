FROM node:22-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package-lock.json package.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx && \
    chmod -R 755 /usr/share/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]