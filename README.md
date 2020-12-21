# Typing Test

A typing test with leaderboard functionality. Front end uses Reactjs. The backend uses Expressjs, NeDB and is designed to be served using Node. This was my first full stack project!

## Installation

git clone https://github.com/blove239/thetypingtest.git

cd thetypingtest

cd client

yarn install

cd ..

cd server

yarn install

## Development

FOR CLIENT:
yarn start

FOR BACKEND:
node server.js

Note: Environment variables for client and server will need to be updated. For the client,
REACT_APP_API_URL needs to be pointed at the Node.js server.

HOMEPAGE in the server .env file needs to pointed at the origin of URL of the client.

## Deployment

To build optimized client build:
yarn build

## Licence

[MIT](https://choosealicense.com/licenses/mit/)