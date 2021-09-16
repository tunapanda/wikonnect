<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <img  height="200" src="https://app.wikonnect.org/images/icons/wikonnect-primary.svg">


<h1 align="center">Welcome to Wikonnect 👋</h1>
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

Wikonnect is an open-source e-learning platform designed to allow anyone to learn, create educational content, and
contribute to building the platform as a designer or a software developer. The initial courses offered on the platform will be around digital literacy, to get more people
using the internet in more productive ways. Developed by [Tunapanda Institute](https://tunapanda.org/) in Nairobi, Kenya. The original platform (called 'Swag') was used to provide technology, design, and business training in low-income communities with low
bandwidth.

Come say hi 👋 on our [Wikonnect Community Discord Server!](https://discord.gg/tT9Ug6D)


Getting Started
--
The frontend is developed using Ember.js. We
recommend [getting started](https://guides.emberjs.com/release/getting-started/quick-start/) with Ember by going through
the tutorials.

The backend is developed using [KoaJS](https://koajs.com/). The API docs are hosted
at [tunapanda.github.io/wikonnect](https://tunapanda.github.io/wikonnect)

## Wikonnect Tech Stack

- [EmberJS](https://guides.emberjs.com) for frontend.
- [KoaJS](https://koajs.com/) for backend API.
- [Objection.js](https://vincit.github.io/objection.js/) as an ORM
  and [Knex.js](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977) for building SQL queries
- [PostgreSQL](https://www.postgresql.org/) for main persistence storage.
- [chai](https://www.chaijs.com/) for backend unit tests.
- [Cypress](https://cypress.io) for frontend integration tests.
- [Yarn](https://yarnpkg.com/) project package manager.

  #### Optional:
- [ElasticSearch](https://www.elastic.co/) for search and indexing services
- [Docker](https://www.docker.com/) for containerization

## Development setup

- Clone the project using [Git](https://git-scm.com/) into your workspace:

```
  git clone https://github.com/tunapanda/wikonnect.git
 ```

- Proceed to set up the development environment [manually](#manual-project-setup) or using [Docker](#docker-project-setup).

### Docker project setup

---

#### Prerequisites

- Docker Engine

##### Docker engine installation

- [Ubuntu installation](https://docs.docker.com/engine/install/ubuntu/)
- [Fedora installation](https://docs.docker.com/engine/install/fedora/)
- [Debian installation](https://docs.docker.com/engine/install/debian/)
- [Mac installation](https://docs.docker.com/docker-for-mac/install/) - Installed as docker desktop
- [Windows installation](https://docs.docker.com/docker-for-windows/install/)  - Installed as docker desktop

##### Starting a development server

1) If your Docker engine instance is running on your terminal, navigate into the **project root directory**:

```
cd wikonnect/
```

2) **Copy** the `.env-sample` configuration file to `.env`. (Never commit this file)

3) Update the above `.env` file configurations to match your desired setup.

4) Build and run the project container services using the `docker-compose` command:
    ```
      docker-compose up --build
    ````

**NOTE** The ``NODE_ENV`` should be set as ``development`` to allow live reload on code changes.


### Manual project setup

---

#### Prerequisites

- Node.js v14.16.0
- PostgreSQL database server

##### Setting up Node.js

Follow instructions on how to download and install Node.js based on your operating system from
the [official Node.js website](https://nodejs.org/en/download/).

Ensure you install Node v14.16.0

##### Setting up PostgreSQL

- [Ubuntu installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
- [Fedora installation](https://fedoraproject.org/wiki/PostgreSQL)
- [OSX installation](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
- [Windows installation](http://www.postgresqltutorial.com/install-postgresql/)

Create a postgres user (with password), and set up a database for the project (Don't forget to grant privileges to the user
on the database!). :

```SQL
=# CREATE USER wikonnect_user WITH PASSWORD 'password';
=# CREATE DATABASE wikonnect;
=# GRANT ALL PRIVILEGES ON DATABASE wikonnect TO wikonnect_user;
```

#### Starting a development server

Install the project-wide dependencies on the **root project directory**...

```
cd wikonnect/
yarn
```

##### Backend (API) setup

---

Backend set up steps:

1) Navigate into the **server** directory
    ```
    cd server/
    ```
2) Install the backend dependencies
    ```
    yarn
    ```

3) **Copy** the database configuration file `server/config/db.example.js` to `server/config/db.js`

4) Replace the database configuration to match your development database. (Do not use the development database in a
   production environment)

    ```js
    development: {
        host: 'localhost',
        database: 'my_database',
        user: 'my_user',
        password: 'my_password',
      }
    ```
5) **Copy** the email configuration file `server/config/email.example.js` to `server/config/email.js`

6) You can use Mailtrap for an email sandbox environment. Set up a [mailtrap.io](https://mailtrap.io/) account and copy the credentials provided for Nodemailer setup into the development section of the `server/config/email.js` file eg:

    ```js
    development: {
        provider: "smtp.mailtrap.io",
        auth: {
          user: "xxxxxxxxxxxx",
          pass: "xxxxxxxxxxxx",
        },
        defaultFrom: process.env.FROM_EMAIL_ADDRESS,
      },
    ```

5) Assuming the Postgres server is ready and above [configuration](server/config/db.js) credentials are correct, run the
   latest migrations (defined in `server/migrations`):
    ```
     yarn db:init
    ```

6) **Optionally**, one can populate the database with dummy data (defined in `server/db/seeds`) by running:
    ```
     yarn db:seed
    ```

7) If the above steps were successful, you can finally start the backend server
   ```
   yarn start
   ```

**NOTE**: You can safely ignore any Elasticsearch connection error.

##### Frontend setup

---
Frontend set up steps:

1) Navigate into the **frontend** directory
    ```
    cd frontend/
    ```
2) Install the frontend dependencies
    ```
    yarn
    ```
3) Start the frontend server
   ```
   yarn start
   ```
4) If the above steps were successful, navigate to your favorite browser and go to http://localhost:4200/ to see the running
   app.

***NOTE***: For easy Ember addons installation and project files generation using available blueprints, we highly
recommend installing [Ember CLI](https://github.com/ember-cli/ember-cli) globally:
```
yarn install -g ember-cli
```

## UI/UX Designs

---

### Learn

- [Authentication](https://xd.adobe.com/view/ce0b8ac3-0e43-4ccd-ad2f-ca86803f522f-9b58/)
- [Password Reset](https://xd.adobe.com/view/c8cdd600-0ec7-4557-a497-7bcf80177a5e-9d9e/)
- [Course Builder](https://xd.adobe.com/view/9b6c6240-2411-40da-bc02-39c409e62f88-ce3f/)
- [Single Chapter Page](https://xd.adobe.com/view/87f725be-e199-4bf6-bd01-7f4ead3c9e6c-d2a4/)

### Teach
- [Teach landing page (unauthenticated)](https://xd.adobe.com/view/f3336f85-ec94-47a0-9ed1-1c16d09fd346-a660/)
- [Chapter Creation](https://xd.adobe.com/view/7b76ab64-b1e6-4c55-9add-3e15624234c7-2e25/) 
- [Dashboard for Content Creators](https://xd.adobe.com/view/0ef6c435-70eb-4508-95df-5899d2821970-5ba5/)

### Admin Dashboard
- [Content Approval](https://xd.adobe.com/view/8e585111-f208-4fd8-9c09-f0f71221b61f-db0b/)
- [Leaderboad and Badge Management](https://xd.adobe.com/view/744fa986-7674-4c71-b77a-fdb50a4e806b-211c/)
- [User Management](https://xd.adobe.com/view/743f7d0d-7153-4842-a024-73168a04efea-216c/)
- [Monitoring and Evaluation Survey Managment](https://xd.adobe.com/view/cdf5137c-29dc-4154-b5d3-166a2daa699c-98a6/)


## Contributing

- You should join our [Discord](https://discord.gg/tT9Ug6D) server to get connected with people interested in this
  project and to be aware of our future announcements.
- Please read the
  suggested [steps to contribute code to the Wikonnect project](https://github.com/tunapanda/wikonnect/blob/master/CONTRIBUTING.md)
  before creating issues, forking, or submitting any pull requests.

## License

This project is licensed under MIT. See the [license](license) file for details

## Authors 🧙

### Developers

- **[Moses Okemwa](https://github.com/mosesokemwa)** - _Lead Backend developer and maintainer_
- **[Proverbial Ninja](https://github.com/proverbial-ninja)** - _Lead Frontend developer and maintainer_
- **[Murage Martin](https://github.com/mimidotsuser)** - _Full Stack Developer_
- **[Brian Marete](https://github.com/brianmarete)** - _Frontend Developer_


### UI/UX Designers
- **[Yego Kelvins](https://www.behance.net/kevinsyego)**
- **[Nathan Macharia](https://github.com/macharian8)**
### Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mosesokemwa"><img src="https://avatars0.githubusercontent.com/u/13944912?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Moses Okemwa</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=mosesokemwa" title="Code">💻</a> <a href="#design-mosesokemwa" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/proverbial-ninja"><img src="https://avatars3.githubusercontent.com/u/2375904?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kiki</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=proverbial-ninja" title="Code">💻</a> <a href="#design-proverbial-ninja" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/mrlarso"><img src="https://avatars1.githubusercontent.com/u/5390448?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mrlarso</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=mrlarso" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Jakeii"><img src="https://avatars2.githubusercontent.com/u/1731150?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jake Lee Kennedy</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=Jakeii" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bkmgit"><img src="https://avatars1.githubusercontent.com/u/1679477?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Benson Muite</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=bkmgit" title="Code">💻</a></td>
    <td align="center"><a href="http://colleowino.github.io/"><img src="https://avatars3.githubusercontent.com/u/2420182?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cliff Owino</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=colleowino" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Mutugiii"><img src="https://avatars3.githubusercontent.com/u/48474421?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mutugi</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=Mutugiii" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/avicndugu"><img src="https://avatars1.githubusercontent.com/u/37213663?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Avic Ndugu</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=avicndugu" title="Code">💻</a></td>
    <td align="center"><a href="https://bonfacemunyoki.com/"><img src="https://avatars0.githubusercontent.com/u/11820306?v=4?s=100" width="100px;" alt=""/><br /><sub><b>BonfaceKilz</b></sub></a><br /><a href="https://github.com/tunapanda/wikonnect/commits?author=BonfaceKilz" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<div align="center">
  <br>
  <h3>Happy Coding ❤︎</h3>
</div>

