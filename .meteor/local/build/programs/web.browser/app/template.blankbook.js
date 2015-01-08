(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n    ", HTML.HEADER("\n      ", HTML.H1("\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n          ", Blaze.View(function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "username"));
    }), "'s\n        " ];
  }, function() {
    return "\n          My\n        ";
  }), " Book\n      "), "\n      \n      ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n    \n    "), "\n    \n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("bookExist"));
    }, function() {
      return [ "\n          ", Blaze.Each(function() {
        return Spacebars.call(view.lookup("books"));
      }, function() {
        return [ "\n            ", Spacebars.include(view.lookupTemplate("book")), "\n          " ];
      }), "\n      " ];
    }, function() {
      return [ "\n            ", HTML.FORM({
        "class": "new-book"
      }, "\n              ", HTML.INPUT({
        type: "text",
        name: "booktitle",
        placeholder: "Type book title"
      }), "\n            "), "\n      " ];
    }), "\n      \n    " ];
  }), "\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("book");
Template["book"] = new Template("Template.book", (function() {
  var view = this;
  return HTML.TEXTAREA({
    name: "booktext",
    "class": "write",
    value: function() {
      return Spacebars.mustache(view.lookup("booktext"));
    }
  });
}));

})();
