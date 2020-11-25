async function returnType(parent) {
  if (parent.length == undefined) {
    parent.comment.forEach(comment => {
      return comment.type = 'comment';
    });
  } else {
    parent.forEach(mod => {
      mod.comment.forEach(comment => {
        return comment.type = 'comment';
      });
    });
  }
}

async function reactionType(parent) {
  if (parent.length == undefined) {
    parent.comment.forEach(comment => {
      return comment.type = 'reaction';
    });
  } else {
    parent.forEach(mod => {
      mod.comment.forEach(comment => {
        return comment.type = 'reaction';
      });
    });
  }
}

async function achievementType(parent) {
  if (parent.length == undefined) {
    parent.achievement.forEach(data => {
      return data.type = 'achievement';
    });
  } else {
    parent.forEach(mod => {
      mod.achievement.forEach(data => {
        return data.type = 'achievement';
      });
    });
  }
}

module.exports = {
  returnType,
  achievementType,
  reactionType
};