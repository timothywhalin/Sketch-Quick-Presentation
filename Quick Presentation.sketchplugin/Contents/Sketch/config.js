@import 'pluginDefaults.js'

//--------------------------------------
//  Initialize Defaults
//--------------------------------------

var presets = {
  docSize: 1,                   // Specify 1 for 1x, 2 for 2x, etc. for what size you're designing at.
  margin: 20,                   // Sets the margin around your presentation.
  artboardColor: '#E6E6E6',     //Sets the artboard background color. Default: #E6E6E6
  presentationTitle: 'example', //Sets the title for the new artboard presentation that will be created.
  titleAboveScreens: '',        // Sets the default text for titles above artboards. If this is empty, then it will use the artboard title as the text.
  fontType: 'Helvetica',        // Font type for titles above artboards.
  fontColor: '#2F5060',         // Font color for titles above artboards.
  fontSize: 18,                 // Base font size for titles. This will double when docSize set to 2.
  createArtboardDescription: false,     // Add description text layer below the title
  createArtboardShadows: false,  // Draw a shape with shadow behind each artboard (true or false)
  shadowColor:'#000000',        // Sets shadow color, if shadow is turned on.
  shadowAlpha:0.2,              // Sets shadow opacity.
  shadowOffsetX:0,              // Sets shadow X offset.
  shadowOffsetY:1,              // Sets shadow Y offset.
  shadowBlurRadius:2,           // Sets shadow blur radius.
  exportFormat:'png',           // Set export format for presentation.
  shadowSpread:0                // Sets shadow spread radius.
}

var pluginDomain = "com.sketchapp.quickpresentation"

var userDefaults = initDefaults(pluginDomain, presets)

//--------------------------------------
var run = function() {

  var alert = [COSAlertWindow new];
  [alert addButtonWithTitle: 'Save'];
  [alert addButtonWithTitle: 'Cancel'];

  [alert addButtonWithTitle: 'Reset Defaults'];

  [alert setMessageText: 'Quick Presentation Settings']

  [alert addTextLabelWithValue: 'Are you designing at 1x, 2x, or 3x?'] // 0
  var docSizes = ['1', '2', '3']
  [alert addAccessoryView: createSelect(docSizes, userDefaults.docSize)] // 1

  [alert addTextLabelWithValue: 'Margin around presentation'] // 2
  [alert addTextFieldWithValue: userDefaults.margin] // 3

  [alert addTextLabelWithValue: 'Artboard Background Color (Hex value only)'] // 4
  [alert addTextFieldWithValue: userDefaults.artboardColor] // 5

  [alert addTextLabelWithValue: 'Presentation Artboard Title'] // 6
  [alert addTextFieldWithValue: userDefaults.presentationTitle] // 7

  [alert addTextLabelWithValue: 'Default screen titles instead of artboard name'] // 8
  [alert addTextFieldWithValue: userDefaults.titleAboveScreens] // 9

  [alert addTextLabelWithValue: 'Screen Title Font'] // 10
  [alert addTextFieldWithValue: userDefaults.fontType] // 11

  [alert addTextLabelWithValue: 'Screen Font Color (Hex value only)'] // 12
  [alert addTextFieldWithValue: userDefaults.fontColor] // 13

  [alert addTextLabelWithValue: 'Screen Font Size'] // 14
  [alert addTextFieldWithValue: userDefaults.fontSize] // 15

  [alert addAccessoryView: creatCheckbox({name: 'Add Text Description Layer Below Title', value: 'true'}, userDefaults.createArtboardDescription)] //16

  [alert addAccessoryView: creatCheckbox({name: 'Add Shadow Behind Artboards', value: 'true'}, userDefaults.createArtboardShadows)] //17

  [alert addTextLabelWithValue: 'Shadow Color (Hex value only)'] // 18
  [alert addTextFieldWithValue: userDefaults.shadowColor] // 19

  [alert addTextLabelWithValue: 'Shadow Opacity (0-1)'] // 20
  [alert addTextFieldWithValue: userDefaults.shadowAlpha] // 21

  [alert addTextLabelWithValue: 'Shadow Offset X'] // 22
  [alert addTextFieldWithValue: userDefaults.shadowOffsetX] // 23

  [alert addTextLabelWithValue: 'Shadow Offset Y'] // 24
  [alert addTextFieldWithValue: userDefaults.shadowOffsetY] // 25

  [alert addTextLabelWithValue: 'Shadow Blur Radius'] // 26
  [alert addTextFieldWithValue: userDefaults.shadowBlurRadius] // 27

  [alert addTextLabelWithValue: 'Shadow Spread'] // 28
  [alert addTextFieldWithValue: userDefaults.shadowSpread] // 29

  [alert addTextLabelWithValue: 'Export Format'] // 30
  var exportOptions = ['PNG', 'JPG', 'TIFF', 'PDF', 'EPS', 'SVG']
  [alert addAccessoryView: createSelect(exportOptions, userDefaults.exportFormat.toUpperCase())] //31

  var response = [alert runModal]

  if (response == "1000") {

    userDefaults.docSize = parseInt(valueAtIndex(alert, 1))

    userDefaults.margin = parseInt(valueAtIndex(alert, 3))

    userDefaults.artboardColor = valueAtIndex(alert, 5)

    userDefaults.presentationTitle = valueAtIndex(alert, 7)

    userDefaults.titleAboveScreens = valueAtIndex(alert, 9)

    userDefaults.fontType = valueAtIndex(alert, 11)

    userDefaults.fontColor = valueAtIndex(alert, 13)

    userDefaults.fontSize = parseInt(valueAtIndex(alert, 15))

    if( checkedAtIndex(alert, 16) ) {
      userDefaults.createArtboardDescription = true;
    } else {
      userDefaults.createArtboardDescription = false;
    }

    if( checkedAtIndex(alert, 17) ) {
      userDefaults.createArtboardShadows = true;
    } else {
      userDefaults.createArtboardShadows = false;
    }

    userDefaults.shadowColor = valueAtIndex(alert, 19)

    userDefaults.shadowAlpha = parseFloat(valueAtIndex(alert, 21))

    userDefaults.shadowOffsetX = parseInt(valueAtIndex(alert, 23))

    userDefaults.shadowOffsetY = parseInt(valueAtIndex(alert, 25))

    userDefaults.shadowBlurRadius = parseInt(valueAtIndex(alert, 27))

    userDefaults.shadowSpread = parseInt(valueAtIndex(alert, 29))

    userDefaults.exportFormat = valueAtIndex(alert, 31).toLowerCase();

    saveDefaults(userDefaults)

  } else if (response == "1002") {
    saveDefaults(presets)
  }
}

var elementAtIndex = function(view, index) {
  return [view viewAtIndex: index]
}

var valueAtIndex = function(view, index) {
  var element = elementAtIndex(view, index);
  return [element stringValue]
}

var creatCheckbox = function(item, checked) {
  checked = (checked == false)? NSOffState: NSOnState;
  var checkbox = [[NSButton alloc] initWithFrame: NSMakeRect(0, 0, 300, 25)];
  [checkbox setButtonType: NSSwitchButton]
  [checkbox setBezelStyle: 0]
  [checkbox setTitle: item.name]
  [checkbox setTag: item.value]
  [checkbox setState: checked]
  return checkbox;
}

var checkedAtIndex = function(view, index) {
  var element = elementAtIndex(view, index);
  return [element state]
}

function createSelect(items, selectedItemIndex){

  var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,300,25))
  comboBox.addItemsWithObjectValues(items)
  var selectedIndex = items.indexOf(String(selectedItemIndex));
  comboBox.selectItemAtIndex(selectedIndex)

  return comboBox
}
