
/*
db.blankbooks.insert({ 
    _id: Meteor.userId(),
    owner: Meteor.user().username,
    booktitle: booktitle,
    booktext: ""
});
*/
BlankBooks = new Mongo.Collection("blankbooks");

/******************************************************************************************************
 *
 * Client side logic.
 * This code only runs on the client.
 *
******************************************************************************************************/
if (Meteor.isClient) {
  
  Meteor.subscribe("blankbooks");
  
  Template.body.helpers({
    
    bookExist: function () {
      
      var bookExist = BlankBooks.findOne({_id: Meteor.userId()});
      
      if( bookExist ) {
          return true;
      }

      return false;
    },
      
    books: function () {
      
      console.log("_id: " + Meteor.userId());
      console.log("owner: " + Meteor.user().username);

      return BlankBooks.find({_id: Meteor.userId(), owner: Meteor.user().username});
    }
    
  });
  
  Template.body.events({
    
    "submit .new-book": function (event) {
      
      var booktitle = event.target.booktitle.value;
        
      //console.log("owner: " + Meteor.userId());
      //console.log("booktitle: " + booktitle);

      Meteor.call("addBook", booktitle);

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

/******************************************************************************************************
 *
 * Meteor methods.
 *
******************************************************************************************************/
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

/******************************************************************************************************
 *
 * This code only runs on the Server side.
 *
******************************************************************************************************/

if (Meteor.isServer) {
  Meteor.publish("blankbooks", function () {
    return BlankBooks.find({_id: this.userId});
  });
}