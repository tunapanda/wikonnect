# Wikonnect

Wikonnect is an open-source e-learning platform that is designed to allow anyone to learn, create content, and contribute to the code. The initial courses offered on the platform will be around digital literacy, to get more people using the internet in more productive ways. Developed by Tunapanda Institute in Nairobi, Kenya. The original platform (called 'swag') was used to provide technology, design, and business training in low-income communities with low bandwidth.

Getting Started
--
The front-end is developed using Ember.js. We recommend [getting started](https://guides.emberjs.com/release/getting-started/quick-start/) with Ember by going through the tutorials.

The back-end is developed using [KoaJS](https://koajs.com/).

## Prerequisites
### Tech Stack

- [EmberJS](https://guides.emberjs.com) for frontend
- [Postgres](https://www.postgresql.org/) with [Objection.js](https://vincit.github.io/objection.js/) and [knex](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977) for database management
- [KoaJS](https://koajs.com/) a node.js web framework for building the API(server)
- [chai](https://www.chaijs.com/) for writing unit tests.
  - chai-http
- [Cypress](https://cypress.io) for integration testing
- [Yarn](https://yarnpkg.com/) project package manager

Development Setup
--


### Installing Node.js
Follow instructions for downloading and [installing Node.js](https://nodejs.org/en/download/) for your operating system from the official Node.js website.

Ensure you are installing Node 10 or greater and npm 6 or greater.

### Set up PostgreSQL
- [Ubuntu installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
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
_______

Now let's set up the **server**. First, go into the server directory and install the node packages.

```
cd server/
yarn
```

Then, rename the  file `server/config/db.example.js` to `server/config/db.js`, then edit the credentials that will provide access to your development database. (Do not use the development database in a production environment)

```js
development: {
    host: 'localhost',
    database: 'my_database',
    user: 'my_user',
    password: 'my_password',
  },
```

#### Next, you will want to set up your database and start your server.

Running `knex migrate:latest ` in the `server/` directory will use the migration files in `server/migrations` to create and format the tables so that they will work with wikonnect.

To populate the database with dummy data (defined in `server/db/seeds`), run `knex seed:run`.

Now start your server! `yarn start`

If you see an Elasticsearch error, don't worry, you don't need Elasticsearch to run the app.

### Front End set-up
_______

#### Get Ember up and running

Install the node packages for the Ember app. Run `yarn` in wikonnect/frontend.

Now start your server!

```
yarn start
```
Now point your favorite browser to http://localhost:4200/ and you will be able to see the app.

Contributing
--
- You should join our [Discourse](https://discord.gg/tT9Ug6D) server to get connected with people interested in this project and to be aware of our future announcements.
- Please read the suggested [steps to contribute code to the Wikonnect project](https://github.com/tunapanda/wikonnect/blob/master/CONTRIBUTING.md) before creating issues, forking, or submitting any pull requests.