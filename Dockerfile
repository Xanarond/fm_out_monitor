FROM node:14-alpine  as build-stage
WORKDIR /app
COPY . .
RUN npm i yarn
RUN yarn
RUN yarn build


# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 8443
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]