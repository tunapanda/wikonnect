module.exports = async (ctx, next)=>{

  try {
    const badWords = ['Donald Trump', 'Mr.Burns', 'Sathan'];
    const description = ctx.request.body.comment;
    let isInclude = badWords.some(word => description.includes(word));
    console.log('Comment includes', isInclude);
  } catch (e) {

  }
}