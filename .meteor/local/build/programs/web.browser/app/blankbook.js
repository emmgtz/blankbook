(function(){// simple-todos.js

BlankBooks = new Mongo.Collection("blankbooks");

if (Meteor.isClient) {
  // This code only runs on the client
  
  Template.body.helpers({
    books: function () {
      //return BlankBooks.findOne({ owner: "John Doe", booktitle: "blank"});
      //return BlankBooks.find({});
      return BlankBooks.find({owner: "Pepe", booktitle: "MyBB"});
    }
  });
  
  Template.book.events({
    "keyup .write": function (event) {
      
      var booktext = event.target.booktext.value;
      
      BlankBooks.update( this._id, { $set: {booktext: booktext}});
      
      // Clear form
      // event.target.booktext.value = "";
      
      // Prevent default form submitted
      return false;
    }
  });

}

})();
