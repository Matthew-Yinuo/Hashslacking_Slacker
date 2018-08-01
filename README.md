# Hashslacker slacker

This repository contains a Slack clone app that it brought together through React, GraphQL, and NodeJS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Postgres 10.0+ (For local server)
NodeJS (Talk to the server)
Redis (Handle chat subscriptions)
Docker(Image builder)
```

### Installing

Clone this project and update path accordingly:

```sh
git clone https://github.com/Matthew-Yinuo/slashin.git
cd slashin
```

Install the dependencies:

```sh
yarn install
```

Note: if you don't have `yarn` installed, feel free to use `npm`.

Open the `.index` in models folder and update the variables to your settings:

```sh
cd models index .code
```
Go into the server folder and start the server:

```sh
cd slashin
yarn start
```
Go into the client folder and start the react app:

```sh
cd slashin-client
yarn start
```

Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

Go to [http://localhost:3000/signup](http://localhost:3000/register) to create an
account and get started.

## Deployment

Add additional notes about how to deploy this on a live system


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Shout out to Ben Awad for invaluable advice on Discord
