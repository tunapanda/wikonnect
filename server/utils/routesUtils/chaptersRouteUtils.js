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

async function reactionsAggregate(parent, stateUserId) {

  if (parent.length == undefined) {
    let dislike = 0;
    let like = 0;
    let authenticated_user = null;
    parent.reaction.forEach(reaction => {
      if (reaction.userId == stateUserId) {
        authenticated_user = reaction.reaction;
      }
      if (reaction.reaction === 'dislike') {
        dislike += 1;
      }
      else if (reaction.reaction == 'like') {
        like += 1;
      }
      let data = {
        likes: like,
        authenticated_user: authenticated_user,
        dislikes: dislike
      };
      return reaction.reaction = data;
    });
  } else {
    parent.forEach(mod => {
      let dislike = 0;
      let like = 0;
      let authenticated_user = null;
      mod.reaction.forEach(reaction => {
        if (reaction.userId == stateUserId) {
          authenticated_user = reaction.reaction;
        }
        if (reaction.reaction === 'dislike') {
          dislike += 1;
        }
        else if (reaction.reaction == 'like') {
          like += 1;
        }
        let data = {
          likes: like,
          authenticated_user: authenticated_user,
          dislikes: dislike
        };
        return mod.reaction = data;
      });
    });
  }
}

module.exports = {
  returnType,
  achievementType,
  reactionsAggregate
};