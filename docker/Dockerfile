FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY ../package.json .
RUN npm install
COPY ../ .
RUN npm run build

FROM nginx:1.27.0-alpine AS production

ENV NODE_ENV production

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Add a user for running the application
RUN adduser -D -u 1000 appuser

# Copy the build artifacts and Nginx configuration
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx.conf /etc/nginx/nginx.conf

# Create necessary directories and set appropriate permissions
RUN mkdir -p /var/cache/nginx \
    && mkdir -p /var/run/nginx \
    && chown -R appuser:appuser /var/cache/nginx \
    && chown -R appuser:appuser /etc/nginx \
    && chown -R appuser:appuser /var/log/nginx \
    && chown -R appuser:appuser /usr/share/nginx/html \
    && chown -R appuser:appuser /var/run/nginx

RUN touch /var/run/nginx.pid && \
    chown -R appuser:appuser /var/run/nginx.pid

# Switch to the non-root user
USER appuser

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]