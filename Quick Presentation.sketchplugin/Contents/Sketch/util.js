@import 'config.js'

function createArtboard(context, addTitles) {
  var doc = context.document,
    selection = context.selection,
    selectedCount = selection.count(),
    firstArtboard = selection.objectAtIndex(0).frame(),
    lastArtboard = selection.objectAtIndex(selectedCount-1).frame(),
    minX=firstArtboard.minX(),
    minY=firstArtboard.minY(),
    maxX=lastArtboard.maxX(),
    maxY=lastArtboard.maxY();
  for (var i = 0; i < selectedCount; i++) {
    if(selection.objectAtIndex(i).frame().minX() < minX) {
      minX=selection.objectAtIndex(i).frame().minX();
    }
    if(selection.objectAtIndex(i).frame().minY() < minY) {
      minY=selection.objectAtIndex(i).frame().minY();
    }
    if(selection.objectAtIndex(i).frame().maxX() > maxX) {
      maxX=selection.objectAtIndex(i).frame().maxX();
    }
    if(selection.objectAtIndex(i).frame().maxY() > maxY) {
      maxY=selection.objectAtIndex(i).frame().maxY();
    }
  }

  var totalwidth = maxX-minX, // Last artboards X most point to the first artboard's minimum X most point
  totalheight = maxY-minY;

  artboard = MSArtboardGroup.new();
  frame = artboard.frame();
  frame.setWidth(totalwidth + (userDefaults.margin*2));
  frame.setHeight(totalheight + (userDefaults.margin*2));
  frame.setX(minX-userDefaults.margin);
  frame.setY(minY-userDefaults.margin);
  artboard.setName(userDefaults.presentationTitle);
  artboard.setHasBackgroundColor(true);
  artboard.backgroundColor=MSColor.colorWithNSColor(NSColor.colorWithHex(userDefaults.artboardColor));
  artboard.setConstrainProportions(false);
  var newArtboard = doc.currentPage().addLayers([artboard]);
  var slice = [[artboard exportOptions] addExportFormat]
  slice.setFileFormat(userDefaults.exportFormat)

  artboard.select_byExpandingSelection(true, false);
  MSLayerMovement.moveToBack([artboard]);

  if(addTitles !== undefined){
    // Add extra height to artboard for text
    var addToArtboard = (userDefaults.fontSize*1.25)*userDefaults.docSize; // Specifies extra space to add text
    frame.setWidth((frame.width()))
    frame.setHeight((frame.height()+addToArtboard))
    frame.setY((frame.minY()-addToArtboard))

    // Add Text layers
    for (var i = 0; i < selectedCount; i++) {
      if (userDefaults.titleAboveScreens != '') {
        var artboardName = userDefaults.titleAboveScreens;
      } else {
        var artboardThis = selection.objectAtIndex(i)
        var artboardName = [artboardThis name];
        var maxLength = selection.objectAtIndex(i).frame().width() / (userDefaults.fontSize*0.6*userDefaults.docSize);
        if (artboardName.length() > maxLength){
          artboardName = artboardName.substring(0,maxLength);
          artboardName += '…';
        }
      }
      var titleFontSize = userDefaults.fontSize * userDefaults.docSize,
          x = selection.objectAtIndex(i).frame().minX() - frame.minX(),
          y = selection.objectAtIndex(i).frame().minY() - frame.minY() - (addToArtboard+10);
      if(userDefaults.createArtboardDescription == true){
        createText(context, x, y, artboard, artboardName, titleFontSize);
        createText(context, x, y + lineHeight, artboard, "Enter a description.");
      }
      else {
        createText(context, x, y, artboard, artboardName, titleFontSize);
      }
    }
  }
  if(userDefaults.createArtboardShadows == true){
    for (var i = 0; i < selectedCount; i++) {
      var shadowX = selection.objectAtIndex(i).frame().minX() - frame.minX(),
          shadowY = selection.objectAtIndex(i).frame().minY() - frame.minY(),
          shadowW = selection.objectAtIndex(i).frame().width(),
          shadowH = selection.objectAtIndex(i).frame().height(),
          artboardThis = selection.objectAtIndex(i),
          artboardName = [artboardThis name];
      createShadow(context, shadowX, shadowY, shadowW, shadowH, artboard, artboardName);
    }
  }

  return artboard;
};

function createText(context, x, y, artboard, text, fontSize){
  var doc = context.document;
  var textLayer = MSTextLayer.new();
  textLayer.setStringValue(text);
  textLayer.setName(text);
  textLayer.setFontSize(fontSize);
  textLayer.setFontPostscriptName(userDefaults.fontType);
  textLayer.setTextColor(MSColor.colorWithNSColor(NSColor.colorWithHex(userDefaults.fontColor)))
  textLayer.frame().setX(x);
  textLayer.frame().setY(y);
  textLayer.setTextBehaviour(1);
  textLayer.setTextBehaviour(0);
  var newText = artboard.addLayers_([textLayer]);
}


function actionWithType(type,context) {
  var doc = context.document;
  var controller = doc.actionsController();

  if (controller.actionWithName) {
    return controller.actionWithName(type);
  } else if (controller.actionWithID) {
    return controller.actionWithID(type);
  }
}

function createShadow(context, x, y, w, h, artboard, artboardName){
  var rect = MSRectangleShape.alloc().init();
  rect.frame = MSRect.rectWithRect(NSMakeRect(x, y, w, h));
  rect.setName(artboardName + ' shadow');

  // Draw rectangle behind artboard
  var shapeGroup = MSShapeGroup.shapeWithPath(rect);

  // TODO: make rectangle and shadow properties configurable too

  // Add white fill to rectangle
  var white = MSColor.colorWithNSColor(NSColor.colorWithHex("#FFFFFF"));
  shapeGroup.style().addStylePartOfType(0);
  shapeGroup.style().fills().firstObject().setColor(white);

  // Add subtle shadow to rectangle
  shapeGroup.style().addStylePartOfType(2);
  var black = MSColor.colorWithNSColor(NSColor.colorWithHex(userDefaults.shadowColor));
  black.alpha = userDefaults.shadowAlpha;
  shapeGroup.style().shadows().firstObject().setColor(black);
  shapeGroup.style().shadows().firstObject().setOffsetX(userDefaults.shadowOffsetX);
  shapeGroup.style().shadows().firstObject().setOffsetY(userDefaults.shadowOffsetY);
  shapeGroup.style().shadows().firstObject().setBlurRadius(userDefaults.shadowBlurRadius);
  shapeGroup.style().shadows().firstObject().setSpread(userDefaults.shadowSpread);

  artboard.addLayers([shapeGroup]);
}
