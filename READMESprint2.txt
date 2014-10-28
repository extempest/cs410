Summary of Unit testing and Integration testing
for sprint 2.

Parser Components:


1. Checking commit object (Manual testing)
Input: one raw text file of git log that includes implmentation details.
Output: Array lists of commit objects
Test:  Checking whether the component is parsing right amount of commits. Using github.com, I figured out how many commits have been made, and checked if parser is creating right amount of commit object using temporary counter variable. I ran few times with different input text files of git projects, and size of output was always matching with the amount of commits written in github.

2. Checking data correctness of author and date (Manual testing)
Input: raw text file of git log with various authors in one projects and dates.
Output: Author information in string format and date in number format
Test: Checking if information of date is parsed in number format by printing out in html ( whether the string of date is splited correctly or not, whether word of month has converted correctly into number format or not). Checking if author information in string format is parsed correctly by comparing with raw text file one by one.

3. Checking java file addition/modification/deletion is classified correctly (Manual testing)
Input: raw text file of git log
Output: 3 arrays of strings of file name
Test:  Have to make sure if parser only reads the changes of java files. raw text file contains various files already and output did not show any other files but java. Also we have to check if the files are classified correctly per each commit. There was shorter version of input to do manual tesing (mockByengProject.txt) to 
test this. and all modification/addtion/deletion data was retrieved successfully.

4. Checking parent/child relationship is parsed correctly (Manual testing)
Input: one raw text file of git log of mock projects that involves lot of 'implements' 'extends' changes
Output: key(index) is the name of child and each key is mapping to array of parents
Test: First of all, I checked the data correctness. Using moctTest.txt, I printed out all the filname that has been added or modified in html per each commit to make sure I have right key in the array of output. (and there was.) After that I printed out the array that maps to the corresponding key. I already had expected output in text file, so I manually compared if array has right data or not.

5. Checking all output is successfully converted to json format from php array (Manual testing)
Input: php array
Output: json array in string format
Test: This testing failed at this sprint. I printed out php array in html format, and also printed out json array in html, but they were not equally printed. This error will be handled at the next sprint. Eventually this components will be the connector to the visualizer.



Visualization Components:

1.visualizing the classes as a room underground
Input:	mock data with classes and their parent/child information
Output:	a visualization
Test:	mock data with class, parent/child information in the commit, and checking throught the commit data, then creating rooms to underground. Checked with several commits.

2.checking the visualization for ants moving to the next position
Input:	random x coordinates
Output:	a visualization
Test:	from the current position, check if the ant moves to the next position.

3.checking the visualization for ants changing direction when moving
Input:	random x coordinates
Output:	a visualization
Test:	from the current position, we move the ant to a new position, and depending on ant moving left or right, change the direction of the ant to the corresponding direction.

4.checking the visualization of ants, sun and moon
Input:	x and y coordinates, and length
Output:	a visualization
Test:	setting the x and y coordinats and length, width and radius using drawing fuctions so that we are able to create images of ants, sun and moon desired.

5.checking the visualization of ants moving at certain time
Input:	mock data with time information in a commit and random positon
Output:	a visualization
Test:	we set a "time" in a commit, and check if the ants move to the random positon at that setted time.

6.
Input: different colors for the sky according to the time
Output: a visualization of a sky getting brighter during the day and getting darker during the night
Test: checking the visualization of a sky color transition at a certain time. For example, when the simulator starts at 0:00, the sky is black. It gradually turns brighter and reaches its maximum brightness at 12:00 and then slowly turns darker. This process repeats until the project ends. 

7.
Input: changes in opacity of stars according to the time
Output: a visualization of stars disappearing during the day and appearing during the night.
Test: checking the visualization of stars at a certain time. At 0:00, stars show the full opacity, which is 1, and then their opacity slowly changes to 0 until 12:00. The process repeats until the project ends. When implementing it, we tried to make sure the stars show the correct opacity at a certain time. 

8. 
Input: random color of ants and rooms whenever they are generated
Output: a visualization of ants and rooms in random color
Test: checking the visualization of the colors of ants and rooms. For example, when the project starts and the ants and rooms appear on the screen one by one, we made sure that the color of each item is automatically chosen at random. 
