#!/bin/bash
docker build --build-arg DATE_CREATED=now --build-arg VERSION=0.1.0 -t local/freenalytics .
docker run -it --rm -p 4000:4000 local/freenalytics /bin/sh
