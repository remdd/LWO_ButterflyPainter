Butterfly painter app notes

***********************

Process steps:
1)	Unity app 'Butterflies.exe' is launched
2)	Butterfly is painted by user within butterflyPainter.htmnl
3)	Once complete, html button triggers export of 'NewButterfly.png' file to browser default download folder (ie 'user/Downloads') - uses 'FileSaver.js'
4)	'Butterflies.exe' monitors its assigned download folder for new file called 'NewButterfly.png' and executes 'FormatImage.bat' when that file is created
5)	'FormatImage.bat' applies 'Image Magick' (https://www.imagemagick.org/) command line tool to format the image as required for Unity & copies to 'wing folder'
6)	'FormatImage.bat' deletes original 'NewButterfly.png' from download folder - this is a required step in order for subsequent butterflies to be named correctly
7)	'Butterflies.exe' monitors 'wing folder' for new files, overwrites an existing wing .png with new .png, maps the new wing to a new butterfly & adds to the display

***********************

Requirements
.)	Path to browser download folder must be correct in Unity app in order to monitor for new 'NewButterfly.png' files arriving
.)	Path to 'wing folder' must be correct in Unity app in order to monitor for new formatted wing
.)	Path to 'FormatImage.bat' must be correct in Unity app
.)	Paths must be correct in 'FormatImage.bat'


***********************

FormatImage.bat =

	@ECHO OFF
	ECHO.
	ECHO Processing Image...
	ECHO.

	magick "C:\Users\munkr\Downloads\NewButterfly.png" -extent "1024x1024" -transpose -rotate "180" "C:\Butterflies\Wings\NewButterfly.png"
	del "c:\Users\munkr\Downloads\NewButterfly.png"

	CLS
	EXIT

***********************

Other notes =




