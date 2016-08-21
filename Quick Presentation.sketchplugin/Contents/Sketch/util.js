@import 'config.js'

function createArtboard(context) {
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

  var totalwidth=maxX-minX; // Last artboards X most point to the first artboard's minimum X most point
  var totalheight=maxY-minY;

  artboard = MSArtboardGroup.new()
  frame = artboard.frame()
  frame.setWidth(totalwidth + (margin*2))
  frame.setHeight(totalheight + (margin*2))
  frame.setX(minX-margin)
  frame.setY(minY-margin)
  artboard.setName(artboardTitle)
  artboard.setHasBackgroundColor(true);
  artboard.backgroundColor=MSColor.colorWithSVGString(artboardColor)
  artboard.setConstrainProportions(false);
  var newArtboard = doc.currentPage().addLayers([artboard])
  [[artboard exportOptions] addExportFormat]

  artboard.select_byExpandingSelection(true, false);
  actionWithType("MSMoveToBackAction",context).moveToBack(null);

  return artboard;
};

function actionWithType(type,context) {
  var doc = context.document;
  var controller = doc.actionsController();

  if (controller.actionWithName) {
    return controller.actionWithName(type);
  } else if (controller.actionWithID) {
    return controller.actionWithID(type);
  }
}
