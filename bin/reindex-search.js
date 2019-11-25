const client = require('../server/utils/search');
const Models = {
  learning_path: require('../server/models/learning_path'),
  course: require('../server/models/course'),
  module: require('../server/models/module'),
  lesson: require('../server/models/lesson'),
  chapter: require('../server/models/chapter')
};

const indexModels = Object.keys(Models).map(async (modelName) => {
  console.log(`indexing ${modelName}s...`)
  const results = await Models[modelName].query();

  return await Promise.all(results.map((result) => result.$indexForSearch()));
});

Promise.all(indexModels).then(() => process.exit()).catch(() => process.exit(0));