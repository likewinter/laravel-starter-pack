FROM library/php:7.4-fpm-alpine

# Install dependencies and extensions
RUN apk add --no-cache \
        postgresql-dev \
        oniguruma-dev \
        libzip-dev && \
    # Install common php extensions
    docker-php-ext-install pdo pdo_mysql pdo_pgsql pcntl mbstring zip

# Install redis extension
RUN apk add --no-cache --virtual .build-dependencies $PHPIZE_DEPS && \
    pecl install redis && docker-php-ext-enable redis && \
    # Clean
    apk del .build-dependencies && \
    rm -rf /var/cache/apk/* && \
    docker-php-source delete

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user and group for isolated run
ARG UID=1000
ENV UID ${UID}
ARG GID=1000
ENV GID ${GID}
RUN addgroup -g ${GID} -S www && \
    adduser -u ${UID} -S www -G www
USER www

# Set working directory
WORKDIR /var/www

CMD ["php-fpm"]

# Expose port 9000 and start php-fpm server
EXPOSE 9000
