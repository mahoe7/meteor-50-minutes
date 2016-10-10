/**
 * Created by mhoe1 on 10/9/2016.
 */
Tasks = new Mongo.Collection('tasks');

if(Meteor.isClient) {
  Template.tasks.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.tasks.events({
    "submit .add-task": function(event){
      var name = event.target.name.value;

      Tasks.insert({
        name: name,
        createdAt: new Date()
      });

      event.target.name.value = '';

      return false;
    },

    "click .delete-task": function(event){
      if(confirm('Delete Task?')) {
        Tasks.remove(this._id);
      }
      return false;
    }
  });
}

if(Meteor.isServer) {

}

Meteor.methods({
  addTask: function(name) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('No Access');
    }
    Tasks.insert({
      name: name,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
  },

  deleteTask: function(taskId) {
    Tasks.remove(taskId);
  }
})