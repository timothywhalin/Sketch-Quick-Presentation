# Sketch-Quick-Presentation

A Sketch plugin to quickly share multiple artboards with an optional title.

## Download and installation

1. [Download the plugin ZIP](https://github.com/timothywhalin/Sketch-Quick-Presentation/archive/master.zip).
2. Unzip the downloaded file and double click "Quick Presentation.sketchplugin". It will be automatically installed into Sketch.

## Create an artboard around selected artboards

Plugins → Quick Presentation → Without Titles

![Generate artboard without titles](README-Screenshots/without-titles.gif)

## Create an artboard around selected artboards and add a title above each

Plugins → Quick Presentation → With Titles

![Generate artboard with titles](README-Screenshots/with-titles.gif)

## Customize the plugin

To edit: Plugins → Quick Presentation → Settings

- **Are you designing at 1x, 2x, or 3x?**: Defaults to 1 for designing at 1x. Change it to '2' if you're designing at 2x. Do not include 'x'.
- **Margin around presentation**: Sets the margin around your presentation. Default: 20
- **Artboard Background Color**: Sets the artboard background color. Default: #E6E6E6. Only enter hex values.
- **Presentation Artboard Title**: Sets the title for the new artboard presentation that will be created. Default: example
- **Default screen titles instead of artboard name**: This is an optional setting to set the text for screen titles. If this is empty,  it will use the artboard title as the text.
- **Screen Title Font**: Font type for titles above artboards. Default: Helvetica
- **Screen Font Color**: Font color for titles above artboards. Default: #2F5060.  Only enter hex values.
- **Screen Font Size**: Base font size for titles. This will double when docSize set to 2. Default: 18
- **Add Shadow Behind Artboards**: Draw a shape with shadow behind each artboard (true or false)
 - **Shadow Color (Hex value only)**: Sets shadow color, if shadow is turned on.
 - **Shadow Opacity (0-1)**: Sets shadow opacity.
 - **Shadow Offset X**: Sets shadow X offset.
 - **Shadow Offset Y**: Sets shadow Y offset.
 - **Shadow Blur Radius**: Sets shadow blur radius.
  - **Shadow Spread**: Sets shadow spread radius.
- **Export Format**: Set export format for presentation.

## Feature requests and feedback
Ping me on [twitter](http://twitter.com/timothywhalin) or follow for updates.

## Special thanks
to [Jason Burns](https://github.com/sonburn/) for help on getting the artboard to the back.

to [Ale Muñoz](https://github.com/bomberstudios) for help on adding the setting menu within Sketch.
