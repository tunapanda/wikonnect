const {faker} = require('../_seeds');
const TriggersModel = require('../../../models/triggers');

exports.seed = async (knex)=>{
  // Deletes ALL existing entries
  await knex(TriggersModel.tableName).del();

  const actionTriggers = [];
  const triggers = ['chapter_create', 'chapter_publish', 'comment_create','comment_reply'];

  for (let index = 0; index < triggers.length; index++) {
    actionTriggers.push({
      description: faker.lorem.words(),
      name: triggers[index]
    });
  }

  // Inserts seed entries
  return knex(TriggersModel.tableName).insert(actionTriggers);
};


