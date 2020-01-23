import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default class CourseModel extends Model {
  @attr() name;
  @attr() slug;
  @attr() description;
  @attr() status;
  @attr() slug;
<<<<<<< HEAD
  @attr() enrolled;
=======
>>>>>>> b0906f3eaa8f4d75e231d5eed9f9dc8c8c5ea4a8
  @attr('number') progress;
  @attr() permission;
  @belongsTo('user') creator;
  @hasMany('module') modules;

  // get progressval(){
  //   this.progress
  // }
}
