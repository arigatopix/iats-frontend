FROM node:20.14.0-alpine AS builder

WORKDIR /app


COPY ../package.json .

RUN npm install

COPY ../ .

RUN npm run build

FROM nginx:1.27.0-alpine AS production

ENV NODE_ENV production

RUN adduser -D -u 1000 appuser

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ../nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R appuser:appuser /usr/share/nginx/html \
    && chown -R appuser:appuser /etc/nginx/conf.d

USER appuser

CMD ["nginx", "-g", "daemon off;"]