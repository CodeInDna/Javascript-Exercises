### Explaination of important canvas properties and methods ###

------------------------------------------------------------------------------------------------------------

-> getContext(): The canvas element has a DOM method called getContext, used to obtain the rendering context and its drawing functions. This function takes one parameter, the type of context 2d.

-> lineJoin: This property sets or returns the type of corner created, when two lines meet. It can be set to round, miter(pointed) and bevel(squared).

-> lineCap: This property sets the style of end cap for a line. It can be set to round, butt and squared (round and squared gives a longer line than butt). 

-> lineWidth: This property sets the width of the line.

-> beginPath(): This method begin or reset the current path.

-> moveTo(x, y): This method tells where to start from. x and y are the starting coordinates.

-> lineTo(x, y): This method tells where to end. x and y are the ending coordinates.

-> stroke(): This method draws the path you have defined with all those moveTo() and lineTo() methods.


