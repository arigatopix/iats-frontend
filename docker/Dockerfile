FROM node:20.14.0-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY ../package*.json .
RUN npm i

COPY ../ .

CMD npm run build

FROM nginx:1.27.0-alpine as production

ENV NODE_ENV production

COPY ../nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
