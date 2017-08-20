describe("Robot", function() {
 var _robot_handler = require('../../js/main.js');
 var robot = new _robot_handler.Robot();
  beforeEach(function() {
  
  });
//Happy Path tests
  it("Set X position of the robot", function() {
    robot.X = 1;
    expect(robot.X ).toEqual(1);
    expect(robot._x).toEqual(1);
  });



  it("Set Y position of the robot", function() {
    robot.Y = 1;
    expect(robot.Y).toEqual(1);
    expect(robot._y).toEqual(1);
  });


  it("Set Facing direction of the robot", function() {
    robot.F = 0;
    expect(robot.F).toEqual(0 );
    expect(robot._f).toEqual( 0);
    expect(robot.Facing).toEqual("NORTH" );

  });


//Testing   Boundries
it("Testing X Left Boundries of the robot", function() {
    try {
        var org = robot.X ;
        robot.X = -1;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.X ).toEqual(org);
      expect(robot._x).toEqual(org);
    }   
    });

it("Testing X Right Boundries of the robot", function() {
    try {
        var org = robot.X ;
        robot.X = 5;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.X ).toEqual(org);
      expect(robot._x).toEqual(org);
    }    });

it("Testing Y bottom Boundries of the robot", function() {
    try {
        var org = robot.Y ;
        robot.Y = -1;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.Y).toEqual(org);
      expect(robot._y).toEqual(org);
 
    }  
   });

it("Testing Y top Boundries of the robot", function() {
   try {
        var org = robot.Y ;
        robot.Y = 5;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.Y).toEqual(org);
      expect(robot._y).toEqual(org);
 
    }  
  });

//Invalid Facing Direction

it("Testing Facing Boundries of the robot test 1", function() {
    try {
        var org = robot.F ;
        robot.F = -1;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.F).toEqual(org);
      expect(robot._f).toEqual(org);
 
    }  
   });


it("Testing Facing Boundries of the robot test 2", function() {
    try {
        var org = robot.F ;
        robot.F = 4;
          
    } catch (err) 
    {
      console.log("Throw: " + err)
    }
    finally
    {
      expect(robot.F).toEqual(org);
      expect(robot._f).toEqual(org);
 
    }  
   });
});
