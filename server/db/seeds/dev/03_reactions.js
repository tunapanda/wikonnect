exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reactions').del();
  const userIds = await knex('users').pluck('id');
  const chapterIds = await knex('chapters').where('approved',true).pluck('id');

  const totalChapters = chapterIds.length;
  const partitionCount = Math.floor(totalChapters/3);


  const reactions = [];

  for (let i = 0; i < userIds.length; i++) {
    const shuffledChapterIds = chapterIds.sort(() => .5 - Math.random());
    const chaptersToLike = shuffledChapterIds.slice(0, partitionCount);
    const chaptersToDislike = shuffledChapterIds.slice(partitionCount, partitionCount + partitionCount);

    for (let j = 0; j < chaptersToLike.length; j++) {
      reactions.push({
        reaction: 'like',
        chapter_id: chaptersToLike[j],
        user_id: userIds[i],
      });
    }
    for (let k = 0; k < chaptersToDislike.length; k++) {
      reactions.push({
        reaction: 'dislike',
        chapter_id: chaptersToDislike[k],
        user_id: userIds[i],
      });
    }

  }

  return knex('reactions').insert(reactions);

};
