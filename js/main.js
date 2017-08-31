

/**
 *  The table dimentions.
 *  @constant
 *  @type int
 */
const TABLE_H_OFFSET = 0;
const TABLE_V_OFFSET = 0;
const TABLE_WIDTH = 5;
const TABLE_HEIGHT= 5;


const DEBUG = true;
/* ==================== ROBOT ==================== */

/**
 *  @class
 *
  *
 *  <p>The ROBOT class represents toy robot moving on a square tabletop</p>
 *   
 *
 *  <p> The origin (0,0) can be considered to be the SOUTH WEST most corner.
 *	The first valid command to the robot is a PLACE command, aXer that, any
 *	sequence of commands may be issued, in any order, including another PLACE command. 
 *	The application should discard all commands in the sequence until a valid PLACE command has been executed.
	</p>
 */

/**
 *  The facing directions.
 *  @constant
 *  @type int
 */
 
const FACING_NORTH = 0;
const FACING_EAST  = 1;
const FACING_SOUTH = 2;
const FACING_WEST = 3; 
const TABLE_DIRECTIONS  = [ 'NORTH' , 'EAST'  , 'SOUTH','WEST'  ];

 class Robot {
    constructor () {
	this._x = 0;
	this._y = 0;
	this._f = 0;

    }
    set X  (x)  {
		  if(x < TABLE_H_OFFSET || x >= TABLE_H_OFFSET + TABLE_WIDTH)
		      return this.ignore("X =  " + x) ;
		  this._x = x;
		}
    get X  ()       { return this._x;               }
    set Y (y) {
		if(y < TABLE_V_OFFSET || y >= TABLE_V_OFFSET + TABLE_HEIGHT)
			    return this.ignore("Y =  " + y) ;
			    
		    this._y = y;
	      }
    get Y ()       { return this._y; }
    
    
    set F (f) {
	
	if(f < FACING_NORTH || f > FACING_WEST)
		return this.ignore("Wrong direction: " + f) ;
      
	this._f = f;
	 
    }

    get F() {return  this._f;}
    get Facing() {return TABLE_DIRECTIONS[this._f];}
    
    ignore (error) {
	 
	throw 'Invalid placement: ' + error; 
	return -1;
    }
  

}				 
 

 

 

/* ==================== ROBOT Controller ==================== */

/**
 *  @class
 *
  *
 *  <p>The ROBOT Controller class controls robot movement</p>
 *   
 *
 *  <p> PLACE will put the toy robot on the table in position X,Y and facing NORTH,SOUTH, EAST or WEST.
 * MOVE will move the toy robot one unit forward in the direction it is currently facing.
 * LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
 * REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient</p>
 */
class RobotController {
    constructor (robot) {
	this.robot = robot;	 


    }
    
     
Place(x,y,f)
{

 	var placement = {x: this.robot.X , y: this.robot.Y ,f: this.robot.F };
	try 
	{
     	this.robot.X = x;
     	this.robot.Y = y;
     	this.robot.F = f ;

  	} catch (err) 
  	{
  		//rollback
  		 
     	this.robot.X = placement.x;
     	this.robot.Y = placement.y;
     	this.robot.F = placement.f ;
        Logger.log(err, 1);
        return -1;
	}
	return 0 ;
}
LEFT()  {  this.robot.F = (this.robot.F == FACING_NORTH)? FACING_WEST: this.robot.F -1; }

RIGHT() { this.robot.F = (this.robot.F == FACING_WEST)? FACING_NORTH: this.robot.F + 1;  };

Move()
{
    switch(this.robot.F) {
    case  FACING_NORTH:
    	 return this.Place(this.robot.X, this.robot.Y + 1, this.robot.F) ;
        break;
    case  FACING_EAST:
    	 return this.Place(this.robot.X + 1, this.robot.Y , this.robot.F) ;
         
        break;

 	case  FACING_SOUTH:
    	 return this.Place(this.robot.X, this.robot.Y -1, this.robot.F) ;
         
        break;
    case  FACING_WEST:
         
    	 return this.Place(this.robot.X- 1 , this.robot.Y , this.robot.F) ;
        
        break;
    default:
         
  }

}

Report() {  return (this.robot.X +","+ this.robot.Y +","+ this.robot.Facing).toString(); }
}
/*
 *  The Input Commands.
 *  @constant
 *  @type string
 */
const COMMAND_PLACE = "PLACE";
const COMMAND_LEFT  = "LEFT";
const COMMAND_RIGHT = "RIGHT";
const COMMAND_MOVE  = "MOVE";
const COMMAND_REPORT  = "REPORT";
 
 /* ==================== Command Parser ==================== */

/**
 *  @class
 *  <p>Command Parser</p>
 */

class CommandParser
{
    constructor ( ) {
      this.validPlacement = false;

    }
parseText(commands_text, controller)
{
		var lines = commands_text.split('\n');
		var commands = [];
		for(var i =0; i < lines.length; i ++) //Prepare commands
		{
			var command = lines[i].trim();
			if(command.length ==0)
				continue;
			
			 
			commands.push(command);

		}

		  
		for(  i =0; i < commands.length; i ++) //parse commands
		{
			var result = this.parseCommand(commands[i], controller);
			if(result!== 0)
			{
				Logger.log(result, 1);//Error
				 
			}

				
		} 
		

};

parseCommand(command_text, controller)
{
	var args  = command_text.replace(/,/g,' ').split(' ');
	for(var i=0; i<args.length; i++)
	{
		var command = args[0];
		switch(command)
		{
			case COMMAND_PLACE : 

				if(args.length <4 )
					return "command: " +command_text + ". Insufficient arguments : " + command ;
				var x  = parseInt(args[1]);
				if(isNaN(x)) 
					return "command: " +command_text + ". Invalid X position : " + args[1] ;

				var y  = parseInt(args[2]);
				if(isNaN(y)) 
					return "command: " +command_text+ ". Invalid Y position : " + args[2] ;
				
				var f  = TABLE_DIRECTIONS.indexOf(args[3]);
				if(f==-1 ) 
					return "command: " +command_text + ". Invalid direction : " + args[3] ;
					if (controller.Place(x,y, f) == 0)
					{
						this.validPlacement = true;
						return 0;	 
					} 
					 return -1;
				break;
			case COMMAND_LEFT  :  if(this.validPlacement ) controller.LEFT();  	break;
			case COMMAND_RIGHT :  if(this.validPlacement ) controller.RIGHT(); 	break;
			case COMMAND_MOVE  :  if(this.validPlacement ) return controller.Move() ;   break;
			case COMMAND_REPORT:  if(this.validPlacement ) Logger.log (controller.Report());  break;
			default:
				return "Invalid argument : " + command ;

		}

	}
	return 0;
};
}

//* ==================== Logger ==================== */

/**
 *  @class
 *  <p>Logger</p>
 */

class Logger  {
  constructor ( ) { }
  log( message, message_type)
  {
	  if( message_type ==0 || message_type == null || message_type == undefined) //LOG
		  console.log(message);
  
	  if(message_type == 1 )//Error
		  console.error(message);
  
  };
}
exports.Robot  = Robot;
exports.RobotController  = RobotController;
exports.CommandParser  = CommandParser;
exports.Logger  = Logger;


exports.FACING_NORTH = FACING_NORTH;
exports.FACING_EAST  = FACING_EAST ;
exports.FACING_SOUTH = FACING_SOUTH;
exports.FACING_WEST =  FACING_WEST ; 

