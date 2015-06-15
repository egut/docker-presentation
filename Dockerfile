FROM node:0.10-onbuild
MAINTAINER Erik Günther egu@mensa.se

EXPOSE 3000

COPY Gruntfile.js /usr/src/app/
RUN grunt release