# Same layer as production
FROM node:20-bookworm AS build
WORKDIR /app
# copy over dependencies and lockfile(if lockfile changes cache busts)
COPY package.json yarn.lock ./
# install all dependencies including devDependencies
RUN yarn install
# copy over the source code
COPY . .
# transpile TypeScript to JavaScript
RUN yarn build

# Production
FROM node:20-bookworm
# install playwright browsers, browser dependencies
RUN npx -y playwright@1.47.1 install --with-deps chromium
WORKDIR /app
COPY package.json yarn.lock ./
# install only production dependencies
RUN yarn install --production
# copy over the built javascript files
COPY --from=build /app/dist ./dist
CMD ["node", "dist/index.js"]