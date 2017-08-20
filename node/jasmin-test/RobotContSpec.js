describe("RobotContorller", function() {
 var _robot_handler = require('../../js/main.js');
  var robot = new _robot_handler.Robot();
  var controller = new _robot_handler.RobotController(robot); 
   beforeEach(function() {
  
  });


//Happy Path tests


  it("Report Current position", function() {
     
    expect(controller.Report() ).toEqual("0,0,NORTH");
     
  });

  it("Place in a valid position", function() {
     
    controller.Place(2,2,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");
     
  });


 it("Valid MOVE command  ", function() {
     
    controller.Move(); 
    expect(controller.Report() ).toEqual("3,2,EAST");
     
  });

it("Full Cycle left Rotation ", function() {
  
  //first set robot any valid position faxing North   
    controller.Place(0,0,_robot_handler.FACING_NORTH) ;
  
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,0,WEST");
     
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,0,SOUTH");
     
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,0,EAST");
     
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,0,NORTH");
      
     
  });

it("Full Cycle RIGHT Rotation ", function() {
  
  //first set robot any valid position faxing North   
    controller.Place(0,0,_robot_handler.FACING_NORTH) ;
  
    controller.RIGHT(); 
    expect(controller.Report() ).toEqual("0,0,EAST");
     
    controller.RIGHT(); 
    expect(controller.Report() ).toEqual("0,0,SOUTH");
     
    controller.RIGHT(); 
    expect(controller.Report() ).toEqual("0,0,WEST");
     
    controller.RIGHT(); 
    expect(controller.Report() ).toEqual("0,0,NORTH");
      
     
  });

it("Test a valid sequence ", function() {
     
   controller.Place(1,2,_robot_handler.FACING_EAST) ;
   controller.Move(); 
   controller.Move(); 
   controller.LEFT()
   controller.Move(); 
  expect(controller.Report() ).toEqual("3,3,NORTH");
     
  });




// Now we test Invalid input
 it("Place in an Invalid position", function() {
     
    //first set to a valid position we test rolling back t0
    controller.Place(2,2,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");

    controller.Place(-2,2,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");


    controller.Place(2,-2,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");

    controller.Place(7,2,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");

    controller.Place(2,5,_robot_handler.FACING_EAST); 
    expect(controller.Report() ).toEqual("2,2,EAST");

    controller.Place(2,2,-1); 
    expect(controller.Report() ).toEqual("2,2,EAST");

    controller.Place(2,2,4); 
    expect(controller.Report() ).toEqual("2,2,EAST");

     
  });
  
  it("Move outside boundries", function() {

    //Place in bottom left corner facing WEST
    controller.Place(0,0,_robot_handler.FACING_WEST); 
    controller.Move();
    expect(controller.Report() ).toEqual("0,0,WEST");

    //Place in bottom left corner facing SOUTH
    controller.Place(0,0,_robot_handler.FACING_SOUTH); 
    controller.Move();
    expect(controller.Report() ).toEqual("0,0,SOUTH");

    //Place in bottom Right corner facing EAST
    controller.Place(4,0,_robot_handler.FACING_EAST); 
    controller.Move();
    expect(controller.Report() ).toEqual("4,0,EAST");

    //Place in bottom Right Right facing SOUTH
    controller.Place(4,0,_robot_handler.FACING_SOUTH); 
    controller.Move();
    expect(controller.Report() ).toEqual("4,0,SOUTH");

    //Place in top Right corner facing EAST
    controller.Place(4,4,_robot_handler.FACING_EAST); 
    controller.Move();
    expect(controller.Report() ).toEqual("4,4,EAST");

    //Place in top  Right facing NORTH
    controller.Place(4,4,_robot_handler.FACING_NORTH); 
    controller.Move();
    expect(controller.Report() ).toEqual("4,4,NORTH");

     //Place in top left corner facing WEST
    controller.Place(0,4,_robot_handler.FACING_WEST); 
    controller.Move();
    expect(controller.Report() ).toEqual("0,4,WEST");

    //Place in top  left facing NORTH
    controller.Place(0,4,_robot_handler.FACING_NORTH); 
    controller.Move();
    expect(controller.Report() ).toEqual("0,4,NORTH");
 
  });
 

 //NOW testing a sequence with some invalid inputs
 
  it("sequence with some invalid inputs", function() {

    controller.Place(2,2,_robot_handler.FACING_WEST); //start with a valid position
    controller.Move();
    expect(controller.Report() ).toEqual("1,2,WEST");
    controller.Move();
    expect(controller.Report() ).toEqual("0,2,WEST");
    controller.Move(); //INVALID MOVE
    expect(controller.Report() ).toEqual("0,2,WEST");
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,2,SOUTH");
    controller.Move();
    expect(controller.Report() ).toEqual("0,1,SOUTH");
    controller.Move();
    expect(controller.Report() ).toEqual("0,0,SOUTH");
    controller.Move(); //INVALID MOVE
    expect(controller.Report() ).toEqual("0,0,SOUTH");//INVALID MOVE
    controller.Place(-2,2,_robot_handler.FACING_WEST);  
    expect(controller.Report() ).toEqual("0,0,SOUTH");
    controller.LEFT(); 
    expect(controller.Report() ).toEqual("0,0,EAST");
    controller.Move(); 
    expect(controller.Report() ).toEqual("1,0,EAST");



  });
 
 });







