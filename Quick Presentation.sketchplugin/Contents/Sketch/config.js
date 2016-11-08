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
  [alert addTextFieldWithValue: userDefaults.docSize] // 1

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

  [alert addAccessoryView: creatCheckbox({name: 'Add Shadow Behind Artboards', value: 'true'}, userDefaults.createArtboardShadows)] //16

  [alert addTextLabelWithValue: 'Shadow Color (Hex value only)'] // 17
  [alert addTextFieldWithValue: userDefaults.shadowColor] // 18

  [alert addTextLabelWithValue: 'Shadow Opacity (0-1)'] // 19
  [alert addTextFieldWithValue: userDefaults.shadowAlpha] // 20

  [alert addTextLabelWithValue: 'Shadow Offset X'] // 21
  [alert addTextFieldWithValue: userDefaults.shadowOffsetX] // 22

  [alert addTextLabelWithValue: 'Shadow Offset Y'] // 23
  [alert addTextFieldWithValue: userDefaults.shadowOffsetY] // 24

  [alert addTextLabelWithValue: 'Shadow Blur Radius'] // 25
  [alert addTextFieldWithValue: userDefaults.shadowBlurRadius] // 26

  [alert addTextLabelWithValue: 'Shadow Spread'] // 27
  [alert addTextFieldWithValue: userDefaults.shadowSpread] // 28

  [alert addTextLabelWithValue: 'Export Format'] // 29
  var exportOptions = ['PNG', 'JPG', 'TIFF', 'PDF', 'EPS', 'SVG']
  [alert addAccessoryView: createSelect(exportOptions, userDefaults.exportFormat.toUpperCase())] //30

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
      userDefaults.createArtboardShadows = true;
    } else {
      userDefaults.createArtboardShadows = false;
    }

    userDefaults.shadowColor = valueAtIndex(alert, 18)

    userDefaults.shadowAlpha = parseFloat(valueAtIndex(alert, 20))

    userDefaults.shadowOffsetX = parseInt(valueAtIndex(alert, 22))

    userDefaults.shadowOffsetY = parseInt(valueAtIndex(alert, 24))

    userDefaults.shadowBlurRadius = parseInt(valueAtIndex(alert, 26))

    userDefaults.shadowSpread = parseInt(valueAtIndex(alert, 28))

    userDefaults.exportFormat = valueAtIndex(alert, 30).toLowerCase();

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
  var checkbox = [[NSButton alloc] initWithFrame: NSMakeRect(0, 0, 300, 40)];
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

  var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,200,25))
  comboBox.addItemsWithObjectValues(items)
  var selectedIndex = items.indexOf(String(selectedItemIndex));
  comboBox.selectItemAtIndex(selectedIndex)

  return comboBox
}
