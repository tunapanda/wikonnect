const Lesson = require('../../models/lesson');
const Achievement = require('../../models/achievement');
const { userPermissions } = require('../../middleware/_helpers/roles');

const environment = process.env.NODE_ENV;
const config = require('../../knexfile.js')[environment];
const knex = require('knex')(config);


async function anonymousUser(modules, userId) {
  const achievement = await Achievement.query().where('user_id', userId);
  let achievementChapters = [];
  achievement.forEach(element => {
    if (element.targetStatus === 'completed') {
      achievementChapters.push(element.target);
    }
  });

  let lesson = await Lesson.query().eager('chapters(selectNameAndId)');

  if (modules.length === undefined) {
    if (modules.lessons.length === 0) {
      return modules.progress = parseInt(0);
    }

    for (let index = 0; index < modules.lessons.length; index++) {
      const element = modules.lessons[index];
      lesson.forEach(chap => {
        if (chap.chapters.length === 0) {
          return modules.progress = parseInt(0);
        }
        if (element.id === chap.id) {
          let completionMetric = parseInt((achievementChapters.length / chap.chapters.length) * 100);
          return modules.progress = completionMetric >= 0 ? completionMetric : parseInt(0);
        }
      });
    }
  } else {
    modules.forEach(mod => {
      if (mod.lessons.length === 0) {
        return mod.progress = parseInt(0);
      }
      for (let index = 0; index < mod.lessons.length; index++) {
        const element = mod.lessons[index];
        lesson.forEach(chap => {
          if (element.id === chap.id) {
            let completionMetric = parseInt((achievementChapters.length / chap.chapters.length) * 100);
            return mod.progress = completionMetric >= 0 ? completionMetric : parseInt(0);
          }
        });
      }
    });
  }
}

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.lessons.forEach(lesson => {
      return lesson.type = 'lessons';
    });
  } else {
    parent.forEach(mod => {
      mod.lessons.forEach(lesson => {
        return lesson.type = 'lessons';
      });
    });
  }
}


async function insertType(model, collection, parent_id) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    let data = {
      'lesson_id': element,
      'module_id': parent_id
    };
    await knex(model).insert(data);
  }
}

async function permissionsType(user, modules) {
  modules.forEach(child => {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (!user) {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.delete = 'false';
          userPermissions.create = 'false';
        } else if (user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (user.data.id === child.creatorId || user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else if (user.data.id != child.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.create = 'false';
          userPermissions.delete = 'false';
        } else if (child.status === 'draft' && user.data.id === child.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        }
        return child.permission = userPermissions;
      });
  });

}

module.exports = {
  anonymousUser,
  returnType,
  insertType,
  permissionsType
};