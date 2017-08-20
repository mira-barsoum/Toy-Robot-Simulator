Toy Robot Simulator
---------------

 The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

  - There are no other obstructions on the table surface.
  - The robot is free to roam around the surface of the table, but must be
prevented from falling to destruction. 
  - Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

 ## Tech/framework used ##

**Built with**

This application was developed using Javascript. 

  **Testing**
  
  - Automated Unit Tests are run using Jasmine - node:
	    -node/jasmin-test/RobotSpec.js.
	    -node/jasmin-test/RobotContSpec.js.
	    -node/jasmin-test/ParserSpec.js.

  - HTML UI: html/test.html.

```
var controller = new RobotController(new Robot()); 
var parser = new CommandParser();

if(command_list!=null && command_list.length >0)
	parser.parseText(command_list, controller);
```
  - Node: node/test-node.js *filename*

```
var command_list = contents; //input file contents
var controller = new _robot_handler.RobotController(new _robot_handler.Robot()); 
var parser = new _robot_handler.CommandParser();
if(command_list!=null && command_list.length >0)
	parser.parseText(command_list, controller);
```
