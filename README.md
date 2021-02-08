# Typing Test

![Typing Test](https://res.cloudinary.com/dcqt5zx6z/image/upload/v1612481456/Screenshots%20for%20projects/thetypingtestscreenshotmostrecent_b8fqs2.png)

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

HOMEPAGE in the server .env file needs to pointed at the origin URL of the client.

## Deployment

To build optimized client build:

yarn build

Check out my deployment [here](http://typingtest.brandonlove.ca).

## Licence

[MIT](https://choosealicense.com/licenses/mit/)

