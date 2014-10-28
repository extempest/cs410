Summary of Unit testing and Integration testing
for sprint 2.

Parser Components:


1. Checking commit object
Input: one raw text file of git log that includes implmentation details.
Output: Array lists of commit objects
Test:  Checking whether the component is parsing right amount of commits. Using github.com, I figured out how many commits have been made, and checked if parser is creating right amount of commit object using temporary counter variable. I ran few times with different input text files of git projects, and size of output was always matching with the amount of commits written in github.

2. Checking data correctness of author and date
Input: raw text file of git log with various authors in one projects and dates.
Output: Author information in string format and date in number format
Test: 





Visualization Components:

1.
Input:	mock data with classes and their parent/child information
Output:	a visualization
Test:	visualizing the classes as a room undeground

2.
Input:	random x coordinates
Output:	a visualization
Test:	checking the visualization for ants moving to the next position

3.
Input:	random x coordinates
Output:	a visualization
Test:	checking the visualization for ants changing direction when moving

4.
Input:	x and y coordinates, and length
Output:	a visualization
Test:	checking the visualization of ants, sun and moon

5.
Input:	mock data with time information
Output:	a visualization
Test:	checking the visualaztion of ants moving at certain time
