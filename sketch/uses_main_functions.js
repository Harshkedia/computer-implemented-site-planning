
var allUses = []; //container to store all current uses
var allUsesNames = []; // container to store each use definition
var uses_mode = "list"; // begins with mode "list" - which means that the system is intiially ready to create a new use and display the list of all uses
var currentUse = 0; // initialize "current use" variable which is the container to modify the use which is currently being operated upon by the user
var currentUsePointIndex; // record of index of a point on a use that has been clicked to be defined
var useNumber = 0; // record of total number of uses in memory
var reached = false;

///////////////////////////////////////////////////////////////////////////////
/////////////////////////// VIEWER /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function uses_generatePage(){
//In listing mode - this mode shows all the uses currently defined by the user, theres essentially a for loop creating
//the representation of such.
	push();
	stroke(255);
	drawNavigationButtons();
	drawGridDots(50);
	drawNavigationButtons();
	pop();

	if(help){		
		showHelp("Here, you will define the outlines of your housing units.\n\nYou may toggle between curves with the 'Up' and 'Down' buttons.\n\nNote: The suffix after 'U' links the unit to the pattern you drew before.\n\nOnce you've drawn your unit, you may click on the box next to each wall to define an attribute - 'a' stands for access and 'v' stands for view.\n\nNote: The units must be closed before you can click on a box.\n\nOnce you are done, Click on the 'Compute' button to move to the next step.");
	}
	
	if(reached == false){
		allUses.push(new Line);
		useNumber++;
		allUsesNames.push("U" + str(useNumber));
		reached = true;
	}

	push();
	noStroke();
	for(i=0;i<allUses.length;i++){
		if(i == currentUse){
			fill(255);
		}
		else{
			fill(150);
		}
		var useName = allUsesNames[i][1];
		textSize(30);
		text(useName,100,275+(i*50));
	}
	pop();

	if(allUses.length > 0){
		if (allUses[currentUse].points.length>0){
			allUses[currentUse].findLabelPoints();
			push();
			stroke(255);
			fill(255);
			allUses[currentUse].makePoints();
			allUses[currentUse].makeLabels();
			allUses[currentUse].makeLines();
			pop();
		}
	}

}

///////////////////////////////////////////////////////////////////////////////
/////////////////////////// CONTROLLER ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function use_keyTyped(){
	//  // here the user is allowed to insert multiple symbols into the box

	if(key == "n"){
		if(useNumber<4){
			allUses.push(new Line);
			useNumber++;
			allUsesNames.push("U" + str(useNumber));
			currentUse = useNumber - 1;
		}
	}
	if(useNumber > 0){
		if(key == "s"){
			if(currentUse < useNumber-1){
				currentUse++;
			}
		}
		else if(key == "w"){
			if(currentUse > 0){
				currentUse--;
			}
		}
		else if(key == "d"){
			uses_mode = "draw";
		}
		else if(key == "="){
			allUses[currentUse] = new Line;
		}
	}

	if(key == "p"){
		console.log(allUses);
	}	
}

function uses_MousedPressed(){


	if (mouseX>100 && mouseY>250 & mouseX<1100 && mouseY<1125){
	// until the use is closed, the user is not allowed to label any of the sides
		if (allUses[currentUse].isClosed() == false){
			uses_drawOrtho();
		}

	//once the use is closed, the user can click on the square in the middle of the line, and if he clicks on it,
	//the system checks which one and stores it to the "currentUsePointIndex" variable - this is then used in keypressed
		else{
			for(var i=0;i<allUses[currentUse].labelPoints.length;i++){
				var use_cPoint = allUses[currentUse].labelPoints[i];
				if(mouseX>use_cPoint[0]-30 && mouseY>use_cPoint[1]-30 && mouseX<use_cPoint[0]+30 && mouseY<use_cPoint[1]+30){
					currentUsePointIndex = i;
					if(allUses[currentUse].labels[i] == " "){
						allUses[currentUse].labels[i] = "v";
					}
					else if(allUses[currentUse].labels[i] == "v"){
						allUses[currentUse].labels[i] = "a";
					}
					else if(allUses[currentUse].labels[i] == "a"){
						allUses[currentUse].labels[i] = " ";
					}
					else{
						allUses[currentUse].labels[i] = " ";
					}
				}
			}
		}
	}
	
}