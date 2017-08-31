Toy Robot Simulator
---------------

 The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

 - There are no other obstructions on the table surface.
 - The robot is free to roam around the surface of the table, but must be
prevented from falling to destruction. 
 - Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
 - This simulator application takes input in form of text commands of the following form 

 `
  PLACE X,Y,F 
  MOVE 
  LEFT  
  RIGHT  
  REPORT`

. PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
. The origin (0,0) can be considered to be the SOUTH WEST most corner.
. The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
. MOVE will move the toy robot one unit forward in the direction it is currently facing.
. LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
. REPORT will announce the X,Y and F of the robot.

 
## Tech/framework used ##

**Built with**

This application was developed using Javascript. 

**Input Sample**

    PLACE 0,0,NORTH
    MOVE
    REPORT
**Output**: 0,1,NORTH

  **Simulator Testing**
  
 - Node Test:
     1. Make sure nodejs is installed and running on your machine [ "Node Installation"](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm).
     2. Switch command line to node folder.
     3. Install the Package by running `npm install`.
     4. For input file test: `node test-node.js filename`
         Test files are provided under node/test_files folder. Each file is named after its expected output.
     
 - Automated test: run test files in Jasmine Spec folder:       
   - node jasmin-test/RobotSpec.js
   - node jasmin-test/RobotContSpec.js
   - node jasmin-test/ParserSpec.js
        
      

       

    