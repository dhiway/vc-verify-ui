# Issuer-Agent: Verifiable Credentials on CORD Blockchain

## Verification Assist Service

This repo helps in the people with issuer-agent deployed to provide a verification service.

The tool only supports 2 endpoints, both returning HTML.

1. '/verify/:id', where id is the id of VC, if found, gives a simple tabular view of VC
2. '/*' catch-all page, which provides a textbox to get the ID manually entered.


Launching this service is optional, and assumes the generated VC is stored in the DB of issuer-agent.

Benefit of having this service is, one can have a separate subdomain to this service, and use it as a URL for QR code which can be added in any print friendly documents, which would point people to the particular VC.


