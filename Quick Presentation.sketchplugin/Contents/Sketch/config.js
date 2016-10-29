@import 'pluginDefaults.js'

//--------------------------------------
//  Initialize Defaults
//--------------------------------------

var presets = {
  docSize: 1, // Defaults to 1 for designing at 1x. Change it to '2' if you're designing at 2x.
  margin: 20, // Sets the margin around your presentation.
  artboardColor: '#E6E6E6', //Sets the artboard background color. Default: #E6E6E6
  presentationTitle: 'example', //Sets the title for the new artboard presentation that will be created.
  titleAboveScreens: '', // Sets the default text for screen titles. If this is empty, then it will use the artboard title as the text.
  fontType: 'Helvetica', // Font type for titles above artboards.
  fontColor: '#2F5060', // Font color for titles above artboards.
  fontSize: 18 // Base font size for titles. This will double when docSize set to 2.
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
