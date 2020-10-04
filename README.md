# Drag & Scale Challenge
Show your dominance in front end vanilla JavaScript by creating a movable scaleable object!

## Requirements
Use the prepared tamplate and save it in your solution repo under index.html.
Your'e allowed to add any element to the file as long as it follows the following requirements:

* Your solution should have an element with the id="playground" streching over most of the window.
* Inside "playground" you should have an element with the id="main".
* Inside "main" you should have an element with the id "header".
* When pressing the mouse-left-button over "header" and daragging it, the "main" element should move accordingly.
* When the mouse isn't preesed nothing should appen.
* The "main" element shouldn't move beyond the "playground" borders. exmpale: if "main" touches the right border it stops moving right but can still move any other direction.
* When pressing the mouse-left-button over "main" less then 5px from it's border (towards the center), and then dragging, the border should move and resize the box accordingly, until releasing it.
* When dragging "main"'s left or right border only the width should be affected.
* When dragging "main"'s top or bottom border only the height should be affected.
* Scaling "main" by dragging it's borders shouldn't move the box. The only border that should move is the one being dragged.
* Scaling takes priority over moving. For example, if "header" is located over the top 5px of "main", pressing the top 5px of "main" and dragging it should resize it, *but shoud not move it!*
* When pressing the mouse-left-button over "main" less then 5px from it's corner (for example: less then 5px from it's left border *and* less then 5px from it's top border), and then dragging, the corner should move and resize the box accordingly, until releasing it.
* Scaling "main" by dragging it's corners shouldn't move the box. That means that the opposite corner to the one that's being dragged should stay put.
* When dragging one of "main"'s corners and moving the mouse only horizontally, "main"'s height shoudn't be affected.
* When dragging one of "main"'s corners and moving the mouse only vertically, "main"'s width shoudn't be affected.
* Scailing "main"'s width and height to less then 100px each shouldn't be possible.
* While resizing, the box shouldn't grow beyond the borders. If it touches any border it cannot grow to that direction any more
