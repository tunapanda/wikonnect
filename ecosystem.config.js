module.exports = {
  apps: [{
    "name": 'api',
    "script": 'server/index.js',
    "watch": true,
    "watch": ['frontend'],
    "watch_delay": 10000,
    "ignore_watch": ['server/public', 'node_modules', 'docs'],
    "instances": 1,
    "autorestart": true,
    "max_memory_restart": '1G',
    "env": {
      "NODE_ENV": 'development'
    },
    "env_production": {
      "NODE_ENV": 'production'
    }
  }],
  deploy: {
    "production": {
      "user": 'ubuntu',
      "host": 'ubuntu@ec2-52-87-174-219.compute-1.amazonaws.com',
      "ref": 'origin/master',
      "repo": 'git@github.com:tunapanda/wikonnect.repo.git',
      "path": '/var/www/wikonnect',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      "ssh_options": "StrictHostKeyChecking=no",
      "pre-setup": "apt-get install git",
      "post-setup": "cd server yarn; cd ../frontend yarn; yarn build --prod",
      "pre-deploy-local": "echo 'This is a local executed command'",
      // Commands to be executed on the server after the repo has been cloned
      "post-deploy": "yarn; cd server yarn; cd ../frontend yarn; yarn build --prod; pm2 startOrRestart ecosystem.json --env production"
    },
    "staging": {
      "user": "node",
      "host": "212.83.163.1",
      "ref": "origin/master",
      "repo": "git@github.com:repo.git",
      "path": "/var/www/development",
      "ssh_options": ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      "post-deploy": "pm2 startOrRestart ecosystem.json --env dev",
      "env": {
        "NODE_ENV": "staging"
      }
    }
  }
};
