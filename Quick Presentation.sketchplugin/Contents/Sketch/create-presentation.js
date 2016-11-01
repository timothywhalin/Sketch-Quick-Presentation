@import 'util.js'
@import 'config.js'

function createwithoutTitles(context) {
  var app = NSApplication.sharedApplication()
  var selection = context.selection;
  var selectedCount = selection.count();
  if ( selectedCount < 2 ) {
    app.displayDialog_withTitle("Select at least two artboards to use this plugin.", "Nothing is selected.")
    return false;
  }
  createArtboard(context);
};

function createwithTitles(context) {
  var app = NSApplication.sharedApplication()
  var selection = context.selection;
  var selectedCount = selection.count();
  if ( selectedCount < 2 ) {
    app.displayDialog_withTitle("Select at least two artboards to use this plugin.", "Nothing is selected.")
  }
  createArtboard(context, 'addTitles')
};
