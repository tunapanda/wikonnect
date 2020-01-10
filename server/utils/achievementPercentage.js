const Achievement = require('../models/achievement');

async function achievementPercentage(lesson, userId) {
  const achievement = await Achievement.query().where('user_id', userId);
  let achievementChapters = [];
  achievement.forEach(element => {
    if (element.targetStatus == 'completed') {
      achievementChapters.push(element.target);
    }
  });

  if (lesson.length == undefined) {
    let completionMetric = {
      type: 'percentage',
      percent: (achievementChapters.length / lesson.chapters.length) * 100
    };
    return lesson.percentage = completionMetric;
  } else {
    lesson.forEach(less => {
      let completionMetric = {
        type: 'percentage',
        percent: parseInt((achievementChapters.length / less.chapters.length) * 100)
      };
      return less.percentage = completionMetric;
    });
  }
}

module.exports = achievementPercentage;
