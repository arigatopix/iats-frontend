FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY ../package.json .

RUN npm install

COPY ../ .

RUN npm run build

FROM nginx:1.27.0-alpine AS production
ENV NODE_ENV production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ../nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]