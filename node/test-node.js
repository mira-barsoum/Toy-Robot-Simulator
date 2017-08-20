 var _robot_handler = require('../js/main.js');
 var fs = require('fs')
function main()
{
	if (process.argv.length < 2)
	{
		console.log("file name missing");
		return;
	}
	
	var file_name = process.argv[2];
 	fs.readFile(file_name, 'utf8', function(err, contents) {
	var command_list = 	contents;		 //inpt file contents
	var controller = new _robot_handler.RobotController(new _robot_handler.Robot()); 
	var parser = new _robot_handler.CommandParser();
	//console.log(command_list);
	if(command_list!=null && command_list.length >0)
		parser.parseText(command_list, controller);


	});
  
}
 

main();
  
