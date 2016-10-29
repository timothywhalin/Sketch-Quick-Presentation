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
    var textX = selection.objectAtIndex(i).frame().minX() - frame.minX(),
        textY = selection.objectAtIndex(i).frame().minY() - frame.minY() - ((fontSize*docSize) + 12),
        shadowX = selection.objectAtIndex(i).frame().minX() - frame.minX(),
        shadowY = selection.objectAtIndex(i).frame().minY() - frame.minY(),
        shadowW = selection.objectAtIndex(i).frame().width(),
        shadowH = selection.objectAtIndex(i).frame().height();
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
    if(createShadows){
      createShadow(context, shadowX, shadowY, shadowW, shadowH, artboard, artboardName);
    }
    createText(context, textX, textY, artboard, artboardName);
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
  textLayer.setName(artboardName + ' label');
  var newText = artboard.addLayers_([textLayer]);
}

function createShadow(context, x, y, w, h, artboard, artboardName){
  var rect = MSRectangleShape.alloc().init();
  rect.frame = MSRect.rectWithRect(NSMakeRect(x, y, w, h));
  rect.setName(artboardName + ' bg');

  // Draw rectangle behind artboard
  var shapeGroup = MSShapeGroup.shapeWithPath(rect);

  // Add white fill to rectangle
  var white = MSColor.colorWithSVGString("#ffffff");
  shapeGroup.style().addStylePartOfType(0);
  shapeGroup.style().fills().firstObject().setColor(white);

  // Add subtle shadow to rectangle
  shapeGroup.style().addStylePartOfType(2);
  var black = MSColor.colorWithSVGString("#000000");
  black.alpha = 0.2;
  shapeGroup.style().shadows().firstObject().setColor(black);
  shapeGroup.style().shadows().firstObject().setOffsetY(1);
  shapeGroup.style().shadows().firstObject().setBlurRadius(2);

  artboard.addLayers([shapeGroup]);
}