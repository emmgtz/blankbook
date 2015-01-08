(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, HTML.Raw("\n    <header>\n      <h1>My Self</h1>\n    </header>\n\n    "), Blaze.Each(function() {
    return Spacebars.call(view.lookup("books"));
  }, function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("book")), "\n    " ];
  }), "\n\n  ");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("book");
Template["book"] = new Template("Template.book", (function() {
  var view = this;
  return HTML.TEXTAREA({
    name: "booktext",
    "class": "write",
    value: function() {
      return [ "    ", Spacebars.mustache(view.lookup("booktext")), "\n  " ];
    }
  });
}));

})();
