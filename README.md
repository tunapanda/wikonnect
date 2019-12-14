# Wikonnect

Swag is an open-source e-learning platform that is designed to allow anyone to learn, create content, and contribute to the code. Developed by Tunapanda Institute in Nairobi, Kenya.

## Getting Started

The front-end is developed using Ember.js. We recommend getting started with Ember by going through the tutorials.

The back-end is developed using Node.js.

### Prerequisites

#### In order to get Wikonnect running locally:

Ensure that [Ember-cli](https://ember-cli.com/) and [Node.js](https://nodejs.org/en/) are installed. You will also need Yarn ([Ubuntu Installation](https://www.hostinger.com/tutorials/how-to-install-yarn-on-ubuntu/)), and [knex](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977).

#### Set up PostgreSQL

[Ubuntu installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

[OSX installation](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

[Windows installation](http://www.postgresqltutorial.com/install-postgresql/)

You should create a postgresql user (with password), and set up database. (Don't forget to grant privileges to your user on the database!)
```
=# CREATE USER my_user WITH PASSWORD 'my_password';
=# CREATE DATABASE my_database;
=# GRANT ALL PRIVILEGES ON DATABASE my_database TO my_user;
```
### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repository
```
git clone https://github.com/tunapanda/wikonnect.git
```

Install the node packages in the main project directory...

```
cd wikonnect/
yarn
```

Now let's set up the server. First, go into the server directory and install the node packages.

```
cd server/
yarn
```

Then, rename the  file *server/config/db.example.js* to *server/config/db.js*, then edit the credentials that will provide access to your development datbase. (Do not use the development database in a production environment)

```
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

Now start your server! `yarn start`.

If you see an Elasticsearch error, don't worry, you don't need Elasticsearch to run the app.

#### Get Ember up and running

Now start your server! 
```
yarn start.
```
Get Ember up and running

Install the node packages for the Ember app. Run `yarn` in wikonnect/frontend.

Start the app!

```
yarn start.
```
Now point your favorite browser to http://localhost:4200/ and you will be able to see the app.
