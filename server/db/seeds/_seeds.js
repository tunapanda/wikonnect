const faker = require('faker');
faker.locale = 'en';
const seed_number = process.env.SEEDS === undefined ? 10 : process.env.SEEDS;

module.exports = {
  faker,
  seed_number
};
