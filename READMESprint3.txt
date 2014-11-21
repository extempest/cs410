Summary of Unit testing and Integration testing
for sprint 3.

Parser Components:


1. 
Input: 
Output: 
Test:  

2. 
Input: 
Output: 
Test:  

3. 
Input: 
Output: 
Test:  

4. 
Input: 
Output: 
Test:  

5.
Input: 
Output: 
Test:  

JavaScript Parser Components:

1. Make days depending on the size of php out
Input: php outputs size X in length
Outputs: X days is generated

2. Room Grid Auto Adujusting System
Input: php data array have overlapping room
Output: move room so it wont overlap
Test: 1st file: animal, 2nd file: tools, 3rd file: cat, 4th file: dog, 5th file: hammer. After the 5th file inputted the 'tools' branch should move

3. Room Creation System
Input: an array of files added in length X
Output: rooms of X array created

4. Ant Movement Creation
Input: array of filesModified, filesCreated
Output: depending on the structure of the hive move to the modified and created room
 

Visualization Components:

1.Checking the drag function for groups of rooms and ants 
Input: multiple groups of rooms and ants appended to the same outermost group with a drag feature.
Output: a visualization of a scrollable group containing all the rooms and ants.
Test: click on any point of the visualization and drag it to see if the x positions of ants and groups change at the same time.

2.Visualizing a tooltip for each room hovered.
Input: div.tooltip data, a mouseover function that makes a tooltip appear when a cursor is placed on a selected object, a mouseout function that implements the event when a cursor is moved out of the object, and a mousemove function which makes a tooltip to follow around the cursor in the object.
Output: When you put a mouse on top of an object, a tooltip appears. A tooltip follows around the mouse until the mouse moves out of the object.
Test: checking if the tooltip appears on the screen when a mouse is on an object, and checking if fonts, color, stroke-width, and etc. are showing correctly according to the data. Also, check if the tooltip disappears once the mouse is out.

3. visualizing the text file of the name and dependency of each room.
Input: parsed data file containing the names and dependency relationships, and a tooltip.html that contains the attributes of names and dependencies.
Output: a tooltip that displays the information (a name and dependency) of a selected room.
Test: check if the correct name and dependency values are shown for a selected room.   

4. visualizing the name of a contributor for each ant. 
Input: the data file that contains the names of contributors, and groups of ant elements with text attributes. 
Output: a visualization of each ant with its contributor name attached on the body. 
Test: check if the correct contributor name appears for each ant. 

5.
Input: 
Output: 
Test:  

6.
Input: 
Output: 
Test:  

7.
Input: 
Output: 
Test:  

8. 
Input: 
Output: 
Test:  
