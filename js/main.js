

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
/* ==================== TRUTILS ==================== */

/**
 *  @class
 *  <p>General utility class</p>
 */

function TRUtils () {
};


/**
 *  Indicates whether an object implements a given method, useful to check if a delegate
 *  object implements a given delegate method.
 *  
 *  @param {Object} object The object purported to implement a given method.
 *  @param {String} methodNameAsString The method name as a <code>String</code>.
 *
 *  @returns {bool} Whether the object implements the given method.
 */
TRUtils.objectHasMethod = function (object, methodNameAsString) {
  return (  object !== null &&
            object !== undefined &&
            object[methodNameAsString] !== undefined &&
            typeof object[methodNameAsString] == 'function'
         );
};
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


Robot.Wraps = [ 'x', //Horizontal placement of the robot.
				'y', //Vertical placement of the robot.
				'f' //Facing  NORTH,SOUTH, EAST or WEST. 
				];
function Robot () 
{


	this._x = 0;
	this._y = 0;
	this._f = 0;

	for(var i = 0; i< Robot.Wraps.length; i++)
   	 this.defineProperty(Robot.Wraps[i]);
   	return this;
};
Robot.prototype = Object.create(Object.prototype);


Robot.prototype.defineProperty = function ( propertyName) {
  var camel_ready = propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
  var getter_name = 'get' + camel_ready;
  var setter_name = 'set' + camel_ready;
  
  // check on function availability
  var has_getter = TRUtils.objectHasMethod(this, getter_name);
  var has_setter = TRUtils.objectHasMethod(this, setter_name);
 
  
  if (has_setter) {
    var specified_setter_function = function (newValue) {
      this[setter_name].call(this, newValue);
      
    };
    specified_setter_function.displayName = 'Specified setter for .' + propertyName + ' on ' + this.constructor.name;
    this.__defineSetter__(camel_ready, specified_setter_function);
  }
  // otherwise just assign to _propertyName
  else {
    var default_setter_function = function (newValue) {
      this['_' + propertyName] = newValue;
      
    };
    default_setter_function.displayName = 'Default setter for .' + propertyName + ' on ' + this.constructor.name;
    this.__defineSetter__(camel_ready, default_setter_function);
  }
  
  // assign the getter function if we have one
   if (has_getter) {
    this.__defineGetter__(camel_ready, this[getter_name]);
  }
  // otherwise just return _propertyName
  else {
    var default_getter_function = function () {
      return this['_' + propertyName];
    };
    default_getter_function.displayName = 'Default getter for .' + propertyName + ' on ' + this.constructor.name;
    this.__defineGetter__(camel_ready, default_getter_function);
  }
   var _this = this;
	this.__defineGetter__('Facing', function() { 
		return TABLE_DIRECTIONS[_this._f]; });

};


Robot.prototype.ignore = function (error) {
	 
	throw 'Invalid placement: ' + error; 
	return -1;
};

Robot.prototype.setX = function (newValue) {

	if(newValue < TABLE_H_OFFSET || newValue >= TABLE_H_OFFSET + TABLE_WIDTH)
		return this.ignore("X =  " + newValue) ;

	this._x = newValue;
 };



Robot.prototype.setY = function (newValue) {

	if(newValue < TABLE_V_OFFSET || newValue >= TABLE_V_OFFSET + TABLE_HEIGHT)
		return this.ignore("Y =  " + newValue) ;
	 	
	this._y = newValue;
	 
 };



Robot.prototype.setF = function (newValue) {
	
	if(newValue < FACING_NORTH || newValue > FACING_WEST)
		return this.ignore("Wrong direction: " + newValue) ;
	

	this._f = newValue;
	 
 };

 

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

function RobotController (_robot) 
{

	this.robot = _robot;	 
};

RobotController.prototype.Place = function(x,y,f)
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
};

RobotController.prototype.LEFT = function()
{
	 this.robot.F = (this.robot.F == FACING_NORTH)? FACING_WEST: this.robot.F -1;
};

RobotController.prototype.RIGHT = function()
{
	 this.robot.F = (this.robot.F == FACING_WEST)? FACING_NORTH: this.robot.F + 1;
};

RobotController.prototype.Move = function()
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

};

RobotController.prototype.Report = function()
{ 
	return (this.robot.X +","+ this.robot.Y +","+ this.robot.Facing).toString();
   
};
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

function CommandParser()
{
	this.validPlacement = false;
	return this;
}

CommandParser.prototype.parseText = function(commands_text, controller)
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
				this.validPlacement = false;
				 
			}

				
		} 
		

};

CommandParser.prototype.parseCommand = function(command_text, controller)
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


//* ==================== Logger ==================== */

/**
 *  @class
 *  <p>Logger</p>
 */

Logger = {};
//default logger using console. ovveride by UI
Logger.log  = function( message, message_type)
{
	if( message_type ==0 || message_type == null || message_type == undefined) //LOG
		console.log(message);

	if(message_type == 1 )//Error
		console.error(message);

};

exports.Robot  = Robot;
exports.RobotController  = RobotController;
exports.CommandParser  = CommandParser;
exports.Logger  = Logger;




