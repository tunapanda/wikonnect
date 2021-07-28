const slugify = require('../../utils/slugGen');

exports.up = async (knex)=> {

  //1) fetch all chapters with tags,
  const chapters = await knex('chapters').whereNotNull('tags');
  return knex.transaction(async (trx)=>{
    await Promise.all(chapters.map(async (chapter)=>{
      const filteredChapterTags = chapter.tags.filter((tag) => tag); // filter for null tag names i.e. [null]

      if (filteredChapterTags.length === 0) {
        return 1;
      }
      
      //prepare queries data
      const parsedInsertTags = filteredChapterTags.map((tag) => {
        return {
          name: tag.trim(),
          slug: slugify(tag.trim()),
          can_delete: true,
          creator_id: chapter.creator_id,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        };
      });

      const parsedTagSlugs = filteredChapterTags.reduce((acc, tag) => {
        acc.push(slugify(tag.trim()));
        return acc;
      }, []);
      
      const results= await trx.with('queryX', (qb)=>{
        //2) create tag if it does not exist
        qb.insert(parsedInsertTags)
          .into('tags')
          .onConflict('slug')
          .ignore() //we will ignore rather than updating
          .returning('id');})
        .select('*')
        .from('queryX')
        .union(function() { //since ignored rows above will not return any Id, union select == avoids locks &
          // triggering unnecessary events
          this.select('id').from('tags').whereIn('slug',parsedTagSlugs);
        });

      const parsedChapterTags = results.map((record)=>{
        return {
          chapter_id:chapter.id,
          tag_id: record.id,
          creator_id:chapter.creator_id,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        };
      });
      //3) insert chapter to tags relation data
      return  trx.insert(parsedChapterTags).into('chapter_tags');
    }));
    
  }).then(()=>{
    //4) drop chapter.tags column
    return knex.schema.table('chapters',table=>{
      table.dropColumn('tags');
    });
    
  });
};

exports.down = async (knex)=>{
  return knex.schema.table('chapters', table => {
    //1) create tags column
    table.specificType('tags', 'text ARRAY');
  }).then(()=>{
    return knex.transaction(async (trx)=> {
      //2) select chapter + tags
      const tagsRelation = await trx('chapter_tags')
        .join('tags','chapter_tags.tag_id','tags.id')
        .select('tags.name','chapter_tags.chapter_id');
      //3) for each chapter+tags relation, update chapter tags column
      const mapped= tagsRelation.reduce((acc,relation)=>{ //mapping will optimize inserts
        if(acc[relation.chapter_id]){
          acc[relation.chapter_id].push(relation.name);
        }else{
          acc[relation.chapter_id] =[relation.name];
        }
        return acc;
      },{});
      await Promise.all(
        Object.keys(mapped)
          .map((id)=>{
            return trx('chapters').where('id',id)
              .update({
                tags: knex.raw('array_cat(tags,?)',[mapped[id]])
              });
          }));
      //4. clear chapter tags column
      await trx('chapter_tags').del();
    });
  });
  
};
