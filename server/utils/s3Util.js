const AWS = require('aws-sdk');
const log = require('../utils/logger');

let config, s3;

async function checkS3Credentials() {

  try {
    //Check for a config file. If no file is present files will be uploaded to local storage
    config = require('../config/s3.js');

    //Check that IAM user has credentials to get bucket policy.
    //Policy should also include read/write permissions for IAM user on bucket
    s3 = new AWS.S3(config.credentials);

    //TODO= Someone allow the route to check for correct permissions. Currently will still try to upload
    //even without correct permissions
    await s3.getBucketPolicy({ Bucket: config.bucket }).promise();

    log.info('Successfully connected to AWS S3 bucket.');
  }

  catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      log.warn('No S3 configuration found. File uploads will be stored locally');
    }
    else if (e.name === 'AccessDenied') {
      log.error('Access denied to AWS service. Ensure that permissions and policies are correct. File uploads will be stored locally');
    }
    else {
      log.error(`AWS S3 error '${e.name}'. Files will not be uploaded.`);
    }
  }

}

checkS3Credentials();


module.exports = {
  s3,
  config
};