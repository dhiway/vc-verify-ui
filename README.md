# Issuer-Agent: Verifiable Credentials on CORD Blockchain

## Verification Assist Service

This repo helps in the people with issuer-agent deployed to provide a verification service.

The tool only supports 2 endpoints, both returning HTML.

1. '/verify/:id', where id is the id of VC, if found, gives a simple tabular view of VC
2. '/*' catch-all page, which provides a textbox to get the ID manually entered.


Launching this service is optional, and assumes the generated VC is stored in the DB of issuer-agent.

Benefit of having this service is, one can have a separate subdomain to this service, and use it as a URL for QR code which can be added in any print friendly documents, which would point people to the particular VC.


## Build and Run

One option is building docker image, and run it with relevant section.

```
$ docker build -t dhiway/vc-verify-ui:latest .

$ # snippet from docker-compose
...

    vc-verify:
        image: dhiway/vc-verify-ui:latest
        container_name: vc-verify
        environment:
            - PORT=${PORT}
            - TYPEORM_HOST=${STUDIO_TYPEORM_HOST}
            - TYPEORM_PORT=${TYPEORM_PORT}
            - TYPEORM_USERNAME=${STUDIO_TYPEORM_USERNAME}
            - TYPEORM_PASSWORD=${STUDIO_TYPEORM_PASSWORD}
            - TYPEORM_DATABASE=${STUDIO_TYPEORM_DATABASE}
        ports:
            - ${PORT}:${PORT}
        depends_on:
            - postgres
        networks:
            - local
        command: node dist/index.js

...
```


locally, one needs to run with below steps:

```
$ yarn
$ yarn build
$ # set ENV variables for PORT and TYPEORM related constants
$ cp -a view/ dist/    # this is required to copy the html template files
$ yarn start

```
