const Module = require('../../models/module');
const Lesson = require('../../models/lesson');
const Achievement = require('../../models/achievement');
const Enrollment = require('../../models/enrollment');

const environment = process.env.NODE_ENV;
const config = require('../../knexfile.js')[environment];
const knex = require('knex')(config);


async function userEnrolledCourse(courseData, userId) {
  const enrollment = await Enrollment.query().where('user_id', userId);

  let enrollmentCourses = [];
  enrollment.forEach(element => {
    enrollmentCourses.push(element.courseId);
  });

  courseData.forEach(course => {
    const element = course.id;
    const status = enrollmentCourses.indexOf(element);
    if (status >= 0) {
      return course.enrolled = true;
    }
    if (status === -1) {
      return course.enrolled = false;
    }
  });
}
async function userProgress(courseData, userId) {
  const achievement = await Achievement.query().where('user_id', userId);
  let achievementChapters = [];
  achievement.forEach(element => {
    if (element.targetStatus === 'completed') {
      achievementChapters.push(element.target);
    }
  });

  let modules = await Module.query().eager('lessons(selectNameAndId)');
  let lesson = await Lesson.query().eager('chapters(selectNameAndId)');

  courseData.forEach(course => {
    for (let index = 0; index < course.modules.length; index++) {
      const element = course.modules[index];
      modules.forEach(mod => {
        if (element.id === mod.id) {
          for (let index = 0; index < mod.lessons.length; index++) {

            const element = mod.lessons[index];
            lesson.forEach(chap => {
              if (element.id === chap.id) {
                let completionMetric = parseInt((achievementChapters.length / chap.chapters.length) * 100) > 0 ? parseInt((achievementChapters.length / chap.chapters.length) * 100) : 0;
                course.progress = completionMetric;
                return course.progress = completionMetric;
              }
            });
          }
        }
      });
    }
  });
}
async function returnType(parent) {
  if (parent.length == undefined) {
    parent.modules.forEach(lesson => {
      return lesson.type = 'modules';
    });
  } else {
    parent.forEach(mod => {
      mod.modules.forEach(lesson => {
        return lesson.type = 'modules';
      });
    });
  }
}

async function userEnrollmentType(parent) {

  if (parent.length == undefined) {
    parent.enrollments.forEach(enrollment => {
      console.log(enrollment);
      return enrollment.type = 'enrollments';
    });
  } else {
    parent.forEach(mod => {
      mod.enrollments.forEach(enrollment => {
        return enrollment.type = 'enrollments';
      });
    });
  }
}

async function insertType(model, collection, course_id) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    let data = {
      'module_id': element,
      'course_id': course_id
    };
    await knex(model).insert(data);
  }
}

module.exports = {
  userProgress,
  returnType,
  insertType,
  userEnrolledCourse,
  userEnrollmentType
};