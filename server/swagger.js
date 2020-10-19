const swaggerAutogen = require('swagger-autogen')();
const YAML = require('yaml');
const doc = new YAML.Document();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./index.js');
});

doc.contents = outputFile;

console.log(doc.toString());