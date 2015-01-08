(function(){
/*
meteor:PRIMARY> db.blankbooks.insert({ owner: "John Doe", booktitle: "blank", booktext: "My Own Book"});
meteor:PRIMARY> db.blankbooks.insert({ owner: "Pepe", booktitle: "MyBB", booktext: "My Blank Book"});
*/
BlankBooks = new Mongo.Collection("blankbooks");

if (Meteor.isClient) {
  // This code only runs on the client
  
  Template.body.helpers({
    bookExist: function () {
      
      console.log("bookExist _id: " + Meteor.userId());
      console.log("owner: " + Meteor.user().username);
      
      var bookExist = BlankBooks.findOne({owner: Meteor.user().username});
      
      if( bookExist ) {
          return true;
      }

      return false;
    },
      
    books: function () {
      
      console.log("_id: " + Meteor.userId());
      console.log("owner: " + Meteor.user().username);

      return BlankBooks.find({owner: Meteor.user().username});
    }
    
  });
  
  Template.body.events({
    
    "submit .new-book": function (event) {
      
      console.log("event: " + event);
      
      var booktitle = event.target.booktitle.value;
        
      console.log("owner: " + Meteor.userId());
      console.log("booktitle: " + booktitle);

      Meteor.call("addBook", booktitle);
      /*
      BlankBooks.insert({
        _id: Meteor.userId(),
        owner: Meteor.user().username,
        booktitle: booktitle,
        booktext: inittext
      });
      */

      // Clear form
      event.target.booktitle.value = "";
      
      // Prevent default form submit
      return false;
    }
  });
  
  Template.book.events({
    "blur .write": function(event) {
      
      console.log("event: " + event);
      
      var booktext = event.target.value;
      
      Meteor.call("updateBook", this._id, booktext);
      //BlankBooks.update( this._id, { $set: {booktext: booktext}});
      
      // Prevent default form submitted
      return false;
    },
    
    "keyup .write": function (event) {
      
      if (event.target.scrollHeight > event.target.clientHeight) {
        event.target.style.height = event.target.scrollHeight + "px";
      }
    }
  });

  Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods ({
   addBook: function(booktitle) {
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
       
      BlankBooks.insert({
        _id: Meteor.userId(),
        owner: Meteor.user().username,
        booktitle: booktitle,
        booktext: ""
      });
   },
   
   updateBook: function (ownerId, booktext) {
     if (! Meteor.userId()) {
       throw new Meteor.Error("not-authorized");
     }
       
     BlankBooks.update( ownerId, { $set: {booktext: booktext}});
     
   }
});

})();
