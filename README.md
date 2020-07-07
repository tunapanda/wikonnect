<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <img  height="200" src="https://app.wikonnect.org/images/icons/wikonnect-primary.svg">
</p>


<h1 align="center">Welcome to wikonnect 👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://docs.wikonnect.org/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>

  <a href="#" target="_blank">
    <img alt="Issues" src="https://img.shields.io/github/issues/tunapanda/wikonnect" />
  </a>

  <a href="#" target="_blank">
    <img alt="Forks" src="https://img.shields.io/github/forks/tunapanda/wikonnect" />
  </a> 
  <a href="#" target="_blank">
    <img alt="Stars" src="https://img.shields.io/github/stars/tunapanda/wikonnect" />
  </a>
</p>



# Wikonnect

Wikonnect is an open-source e-learning platform that is designed to allow anyone to learn, create content, and contribute to the code. The initial courses offered on the platform will be around digital literacy, to get more people using the internet in more productive ways. Developed by Tunapanda Institute in Nairobi, Kenya. The original platform (called 'swag') was used to provide technology, design, and business training in low-income communities with low bandwidth.


Getting Started
--
The front-end is developed using Ember.js. We recommend [getting started](https://guides.emberjs.com/release/getting-started/quick-start/) with Ember by going through the tutorials.

The back-end is developed using [KoaJS](https://koajs.com/). API doc is hosted at [tunapanda.github.io/wikonnect)](https://tunapanda.github.io/wikonnect)

## Prerequisites

### Tech Stack

- [EmberJS](https://guides.emberjs.com) for frontend
- [Postgres](https://www.postgresql.org/) with [Objection.js](https://vincit.github.io/objection.js/) and [knex](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977) for database management
- [KoaJS](https://koajs.com/) a node.js web framework for building the API(server)
- [chai](https://www.chaijs.com/) for writing unit tests.
  - chai-http
- [Cypress](https://cypress.io) for integration testing
- [Yarn](https://yarnpkg.com/) project package manager
- [ElasticSearch](https://www.elastic.co/) search and indexing tool

## Development Setup

### Installing Node.js

Follow instructions for downloading and [installing Node.js](https://nodejs.org/en/download/) for your operating system from the official Node.js website.

Ensure you are installing Node 10 or greater.

### Set up PostgreSQL

- [Ubuntu installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
- [Fedora installation](https://fedoraproject.org/wiki/PostgreSQL)
- [OSX installation](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
- [Windows installation](http://www.postgresqltutorial.com/install-postgresql/)

You should create a postgres user (with password), and set up database. (Don't forget to grant privileges to your user on the database!)

```SQL
=# CREATE USER my_user WITH PASSWORD 'my_password';
=# CREATE DATABASE my_database;
=# GRANT ALL PRIVILEGES ON DATABASE my_database TO my_user;
```

## Starting the Development Server

Open up Terminal/Powershell/bash and navigate to the directory where you want the project to live.

Clone this repository:

```
git clone https://github.com/tunapanda/wikonnect.git
```

Install the node packages in the **main project directory**...

```
cd wikonnect/
yarn
```

### Server(API) setup

---

Now let's set up the **server**. First, go into the server directory and install the node packages.

```
cd server/
yarn
```

Then, rename the file `server/config/db.example.js` to `server/config/db.js`, then edit the credentials that will provide access to your development database. (Do not use the development database in a production environment)

```js
development: {
    host: 'localhost',
    database: 'my_database',
    user: 'my_user',
    password: 'my_password',
  },
```

#### Next, you will want to set up your database and start your server.

Ensure that you have redis-server running locally in your pc.

For Macos and Windows systems, check out the [Download page](https://redis.io/download) to download redis-server

To install it in a linux system, run the command below:
```
sudo apt-get install redis-server
```
To confirm that the service is active, use the command below:
```
sudo service redis-server status
```
If the service is not running, use the command below to start it:
```
sudo service redis-server start
```

To run the knex commands that follow later, there are 2 possible options:
- Install knex CLI globally
- prefix all the knex commands with npx e.g `npx knex migrate:latest`  (If you have [npx](https://www.npmjs.com/package/npx) installed)

To check if knex CLI is installed globally, run the command below which shows the Knex CLI version:
```
knex --version
```
If knex CLI is not installed globally, install it using the command below and make sure to confirm that the installation was successful using the command above:
```
npm install -g knex
```

Running `knex migrate:latest` in the `server/` directory will use the migration files in `server/migrations` to create and format the tables so that they will work with wikonnect.

To populate the database with dummy data (defined in `server/db/seeds`), run `knex seed:run`.

Now start your server! `yarn start`

If you see an Elasticsearch error, don't worry, you don't need Elasticsearch to run the app.



### Designs


<table>
 
  <tr>
    <td><img src="screenshots/1.png" width=270 height=480></td>
    <td><img src="screenshots/2.png" width=270 height=480></td>
    <td><img src="screenshots/3.png" width=270 height=480></td>
  </tr>
 </table>

Head over to [Adobe XD](https://xd.adobe.com/view/4373354a-a52e-4413-4a61-8831bd731d75-3542/grid) to see the complete design.

### Front End set-up

---

#### Get Ember up and running

Install the node packages for the Ember app. Run `yarn` in wikonnect/frontend.

Now start your server!

```
yarn start
```

Now point your favorite browser to http://localhost:4200/ and you will be able to see the app.

## Contributing

- You should join our [Discourse](https://discord.gg/tT9Ug6D) server to get connected with people interested in this project and to be aware of our future announcements.
- Please read the suggested [steps to contribute code to the Wikonnect project](https://github.com/tunapanda/wikonnect/blob/master/CONTRIBUTING.md) before creating issues, forking, or submitting any pull requests.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mosesokemwa"><img src="https://avatars0.githubusercontent.com/u/13944912?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Moses Okemwa</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=mosesokemwa" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mrlarso"><img src="https://avatars1.githubusercontent.com/u/5390448?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mrlarso</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=mrlarso" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!