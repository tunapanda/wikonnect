define({
  "name": "Wikonnect",
  "version": "0.4.0",
  "description": "Wikonnect community docs",
  "title": "Wikonnect community docs",
  "url": "/v1/api",
  "order": [
    "Courses",
    "Modules",
    "Lessons",
    "GetCourses",
    "GetACourse",
    "PostACourse",
    "PutACourse",
    "DeleteACourse",
    "GetModules",
    "GetAModule",
    "PostAModule",
    "PutAModule",
    "DeleteAModule",
    "GetLessons",
    "GetALesson",
    "PostALesson",
    "PutALesson",
    "DeleteALesson"
  ],
  "header": {
    "title": "Getting Started",
    "content": "<h1>Wikonnect</h1>\n<p>Wikonnect is an open-source e-learning platform that is designed to allow anyone to learn, create content, and contribute to the code. The initial courses offered on the platform will be around digital literacy, to get more people using the internet in more productive ways. Developed by Tunapanda Institute in Nairobi, Kenya. The original platform (called 'swag') was used to provide technology, design, and business training in low-income communities with low bandwidth.</p>\n<h2>Getting Started</h2>\n<p>The front-end is developed using Ember.js. We recommend <a href=\"https://guides.emberjs.com/release/getting-started/quick-start/\">getting started</a> with Ember by going through the tutorials.</p>\n<p>The back-end is developed using <a href=\"https://koajs.com/\">KoaJS</a>.</p>\n<h2>Prerequisites</h2>\n<h3>Tech Stack</h3>\n<ul>\n<li><a href=\"https://guides.emberjs.com\">EmberJS</a> for frontend</li>\n<li><a href=\"https://www.postgresql.org/\">Postgres</a> with <a href=\"https://vincit.github.io/objection.js/\">Objection.js</a> and <a href=\"https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977\">knex</a> for database management</li>\n<li><a href=\"https://koajs.com/\">KoaJS</a> a node.js web framework for building the API(server)</li>\n<li><a href=\"https://www.chaijs.com/\">chai</a> for writing unit tests.\n<ul>\n<li>chai-http</li>\n</ul>\n</li>\n<li><a href=\"https://cypress.io\">Cypress</a> for integration testing</li>\n<li><a href=\"https://yarnpkg.com/\">Yarn</a> project package manager</li>\n</ul>\n<h2>Development Setup</h2>\n<h3>Installing Node.js</h3>\n<p>Follow instructions for downloading and <a href=\"https://nodejs.org/en/download/\">installing Node.js</a> for your operating system from the official Node.js website.</p>\n<p>Ensure you are installing Node 10 or greater and npm 6 or greater.</p>\n<h3>Set up PostgreSQL</h3>\n<ul>\n<li><a href=\"https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04\">Ubuntu installation</a></li>\n<li><a href=\"https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb\">OSX installation</a></li>\n<li><a href=\"http://www.postgresqltutorial.com/install-postgresql/\">Windows installation</a></li>\n</ul>\n<p>You should create a postgres user (with password), and set up database. (Don't forget to grant privileges to your user on the database!)</p>\n<pre class=\"prettyprint lang-SQL\">=# CREATE USER my_user WITH PASSWORD 'my_password';\n=# CREATE DATABASE my_database;\n=# GRANT ALL PRIVILEGES ON DATABASE my_database TO my_user;\n</pre>\n<h2>Starting the Development Server</h2>\n<p>Open up Terminal/Powershell/bash and navigate to the directory where you want the project to live.</p>\n<p>Clone this repository:</p>\n<pre class=\"prettyprint\">git clone https://github.com/tunapanda/wikonnect.git\n</code></pre>\n<p>Install the node packages in the <strong>main project directory</strong>...</p>\n<pre class=\"prettyprint\">cd wikonnect/\nyarn\n</code></pre>\n<h3>Server(API) setup</h3>\n<hr>\n<p>Now let's set up the <strong>server</strong>. First, go into the server directory and install the node packages.</p>\n<pre class=\"prettyprint\">cd server/\nyarn\n</code></pre>\n<p>Then, rename the  file <code>server/config/db.example.js</code> to <code>server/config/db.js</code>, then edit the credentials that will provide access to your development database. (Do not use the development database in a production environment)</p>\n<pre class=\"prettyprint lang-js\">development: {\n    host: 'localhost',\n    database: 'my_database',\n    user: 'my_user',\n    password: 'my_password',\n  },\n</pre>\n<h4>Next, you will want to set up your database and start your server.</h4>\n<p>Running <code>knex migrate:latest </code> in the <code>server/</code> directory will use the migration files in <code>server/migrations</code> to create and format the tables so that they will work with wikonnect.</p>\n<p>To populate the database with dummy data (defined in <code>server/db/seeds</code>), run <code>knex seed:run</code>.</p>\n<p>Now start your server! <code>yarn start</code></p>\n<p>If you see an Elasticsearch error, don't worry, you don't need Elasticsearch to run the app.</p>\n<h3>Front End set-up</h3>\n<hr>\n<h4>Get Ember up and running</h4>\n<p>Install the node packages for the Ember app. Run <code>yarn</code> in wikonnect/frontend.</p>\n<p>Now start your server!</p>\n<pre class=\"prettyprint\">yarn start\n</code></pre>\n<p>Now point your favorite browser to http://localhost:4200/ and you will be able to see the app.</p>\n<h2>Contributing</h2>\n<ul>\n<li>You should join our <a href=\"https://discord.gg/tT9Ug6D\">Discourse</a> server to get connected with people interested in this project and to be aware of our future announcements.</li>\n<li>Please read the suggested <a href=\"https://github.com/tunapanda/wikonnect/blob/master/CONTRIBUTING.md\">steps to contribute code to the Wikonnect project</a> before creating issues, forking, or submitting any pull requests.</li>\n</ul>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2020-02-27T12:11:17.161Z",
    "url": "http://apidocjs.com",
    "version": "0.20.0"
  }
});
