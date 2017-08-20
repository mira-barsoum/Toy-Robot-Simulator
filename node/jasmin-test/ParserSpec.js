

describe("CommandParser", function() {
  
  var _robot_handler = require('../../js/main.js');
  var robot ;
  var controller;
  var parser ;

beforeEach(function() {
  robot = new _robot_handler.Robot();
  controller = new _robot_handler.RobotController(robot); 
  parser = new _robot_handler.CommandParser();
  });

it("Happy Path", function() {
    
  var command_list = "PLACE 1,2,EAST\n" +
                      "MOVE\n" +
                      "MOVE\n" +
                      "LEFT\n" +
                      "MOVE\n" +
                      "REPORT";

    parser.parseText(command_list, controller);
    expect(controller.Report() ).toEqual("3,3,NORTH");

  });

    it("Ignore all commands till a valid PLACE command occures", function() {
    
  var command_list =  "INVALID_START\n"+
                      "PLACE 3,2,EAST\n" +
                      "MOVE\n" + //4,2,E
                      "RIGHT\n" +//4,2,S    
                      "MOVE\n" +//4,1,S
                      "LEFT\n" + //4,1,E
                      "LEFT\n" + //4,1,N
                      "MOVE\n" +//4,2,E
                      "REPORT";

    parser.parseText(command_list, controller);
    expect(controller.Report() ).toEqual("4,2,NORTH");

  });
              
  it("Ignore Invalid input in the middle", function() {
    
  var command_list =  
                      "PLACE 3,2,EAST\n" +
                      "MOVE\n" + //4,2,E
                      "RIGHT\n" +//4,2,S    
                      "MOVE\n" +//4,1,S
                      "INVALID_MID\n"+
                      "LEFT\n" + //4,1,E
                      "LEFT\n" + //4,1,N
                      "MOVE\n" +//4,2,E
                      "REPORT";

    parser.parseText(command_list, controller);
    expect(controller.Report() ).toEqual("4,2,NORTH");

  });
  
  it("Ignore invalid moves", function() {
 
  var command_list =  
                    "PLACE 3,2,EAST\n" +
                   "MOVE\n" + //4,2,E
                   "MOVE\n" + //4,2,E - IGNORE
                   "RIGHT\n"+   //4,2,S    
                   "MOVE\n" +   //4,1,S
                   "LEFT\n" + //4,1,E
                   "LEFT\n" + //4,1,N
                   "MOVE\n" +   //4,2,N
                   "MOVE\n" +   //4,3,N
                   "MOVE\n" +   //4,4,N
                   "MOVE\n" +   //4,4,N//IGNORE
                   "LEFT\n" + //4,4,W
                   "MOVE\n" + //3,4,W
                   "REPORT";   

    parser.parseText(command_list, controller);
    expect(controller.Report() ).toEqual("3,4,WEST");

  });
  
  
});