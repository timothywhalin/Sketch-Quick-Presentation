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
  var artboard = createArtboard(context)
  frame = artboard.frame()

  // Add extra height to artboard for text
  var addToArtboard = (fontSize+3)*docSize; // Specifies extra space to add text
  frame.setWidth((frame.width()))
  frame.setHeight(frame.height()+addToArtboard))
  frame.setY((frame.minY()-addToArtboard))

  // Add Text layers
  for (var i = 0; i < selectedCount; i++) {
    var x = selection.objectAtIndex(i).frame().minX() - frame.minX(),
    y = selection.objectAtIndex(i).frame().minY() - frame.minY() - ((fontSize*docSize) + 12);
    if (typeof titleAboveScreens !== 'undefined') {
      var artboardName = titleAboveScreens;
    } else {
      var artboardThis = selection.objectAtIndex(i)
      var artboardName = [artboardThis name];
      var maxLength = selection.objectAtIndex(i).frame().width  () / (11.4*docSize);
      if (artboardName.length() > maxLength){
        artboardName = artboardName.substring(0,maxLength);
        artboardName += '…';
      }
    }
    createText(context, x, y, artboard, artboardName);
  }
};

function createText(context, x, y, artboard, artboardName){
  var doc = context.document;
  var textLayer = MSTextLayer.new();
  textLayer.setStringValue(artboardName);
  textLayer.setFontSize(fontSize*docSize);
  textLayer.setFontPostscriptName(fontType);
  textLayer.setTextColor(MSColor.colorWithSVGString(fontColor))
  textLayer.frame().setX(x);
  textLayer.frame().setY(y);
  textLayer.setTextBehaviour(1);
  textLayer.setTextBehaviour(0);
  var newText = artboard.addLayers_([textLayer]);
}
