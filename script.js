"use strict"

let game_canvas = document.getElementById("game_canvas");
let ctx = game_canvas.getContext("2d");
let FONT_HEIGHT = 20;
ctx.font = FONT_HEIGHT+"px Barlow-Bold";
ctx.lineWidth = 1.5;

let CANVAS_WIDTH = game_canvas.width;
let CANVAS_HEIGHT = game_canvas.height;
let BLACK = "#000000";
let LIGHT_BLUE = "#5AC8FA";
let LIGHT_ORANGE = "#FFBE5A";
let VALID_CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//ctx.fillStyle="#00FF00";
//ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
let background_image = new Image();
background_image.src = "./Spaceship_background.png";
//ctx.drawImage(background_image,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//Unmute/Mute Sound
let ICON_WIDTH = 30;
let ICON_HEIGHT = 30;

let unmute_img = new Image();
unmute_img.src ="./resources/unmute_transparent.png";
let mute_img = new Image();
mute_img.src = "./resources/mute_transparent.png";

unmute_img.onload = function(){
	ctx.drawImage(unmute_img, CANVAS_WIDTH-ICON_WIDTH, CANVAS_HEIGHT-ICON_HEIGHT, ICON_WIDTH, ICON_HEIGHT);
}
mute_img.onload = function(){
	ctx.drawImage(mute_img, CANVAS_WIDTH-ICON_WIDTH, CANVAS_HEIGHT-ICON_HEIGHT, ICON_WIDTH, ICON_HEIGHT);
}

function swap_mute_unmute()
{
	if (audio.muted)
	{
		ctx.drawImage(mute_img, CANVAS_WIDTH-ICON_WIDTH, CANVAS_HEIGHT-ICON_HEIGHT, ICON_WIDTH, ICON_HEIGHT);
	}
	else //mute == false
	{
		ctx.drawImage(unmute_img, CANVAS_WIDTH-ICON_WIDTH, CANVAS_HEIGHT-ICON_HEIGHT, ICON_WIDTH, ICON_HEIGHT);
	}
}

//Play background music (when clicked on the webpage)
let audio = new Audio("./audio/Space+Ambience+-+320bit.mp3");
audio.loop = true;
audio.autoplay = true;
audio.muted = true;
document.body.addEventListener("click", function () 
{
    audio.play();
})

//Start Screen (Character screen)
let man_pic = new Image();
man_pic.src = "./image/Spaceman/Spaceman_sprite0.png";
let woman_pic = new Image();
woman_pic.src = "./image/Spacewoman/Spacewoman_sprite0.png";

//Charater Object
let vertical_move = 8;
let horizontal_move = 8;

let HUMAN_WIDTH = 80;
let HUMAN_HEIGHT = 80;

const genders = {
	Male: "Male",
	Female: "Female",
}

const careers = {
	Food_Scientist: "Food Scientist",
	Doctor: "Doctor",
	Engineer: "Engineer",
}

const general_status = {
	Resting: "Resting",
	Sleeping: "Sleeping",
	Eating: "Eating",
	Exercising: "Exercising",
	Calling_Family: "Calling family",
	Fixing_Communication: "Fixing communication",
	Fixing_Shield: "Fixing Shield",
	Giving_Consultation: "Giving consulation",
	Receiving_Consultation: "Receiving consultation",
	Preparing_Food: "Preparing food",
	Taking_Care_Crops: "Taking care of crops",
	Giving_Treatment: "Giving treatment",
	Receiving_Treatment: "Receiving treatment",
}

class Human 
{
    constructor(name, gender, career) 
	{
        this.name = name;
		this.gender = gender;
		this.career = career;
		//center
		//this.x = CANVAS_WIDTH/2-HUMAN_WIDTH/2;
		//this.y = CANVAS_HEIGHT/2-HUMAN_HEIGHT/2;
		
		//lower left
		this.x = CANVAS_WIDTH/6*1;
		this.y = CANVAS_HEIGHT/6*4;
		this.mentality = 100; //mental health
		this.fitness = 100; //physical health
		this.pic = new Image();
		
		//animation
		this.is_moving = false;
		this.max_frame = 30;
		this.current_frame = 0;
		
		//choose the image
		if (gender == genders.Male)
		{
			this.pic.src = "./image/Spaceman/Spaceman_sprite0.png";
		}
		else
		{
			this.pic.src = "./image/Spacewoman/Spacewoman_sprite0.png";
		}
		
		//parameters for risk
		this.status = general_status.Resting;
		this.called_family = false;
		this.exercised = false;
    }
	
	reset_parameters()
	{
		this.status = general_status.Resting;
		//this.affected_by_radiation = false;
		//this.injured = false;
		this.called_family = false;
		this.exercised = false;
	}
	
	update_pic()
	{
		if (this.gender == genders.Male)
		{
			this.pic.src = "./image/Spaceman/Spaceman_sprite0.png";
		}
		else
		{
			this.pic.src = "./image/Spacewoman/Spacewoman_sprite0.png";
		}
	}
	
	update_frame()
	{
		this.current_frame += 1;
		if (this.current_frame > this.max_frame)
		{
			this.current_frame = 0;
		}
	}
	
	update_animation()
	{
		if (this.is_moving)
		{
			//speed up the time
			global_time.increase_1_sec();
			//4fps = i*8
			/*
			if (this.current_frame < 8)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite0.png":"./image/Spacewoman/Spacewoman_sprite0.png";
			}
			else if (this.current_frame < 2*8)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite1.png":"./image/Spacewoman/Spacewoman_sprite1.png";
			}
			else if (this.current_frame < 3*8)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite2.png":"./image/Spacewoman/Spacewoman_sprite2.png";
			}
			else
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite3.png":"./image/Spacewoman/Spacewoman_sprite2.png";
			}
			*/
			
			//8fps = i*4
			if (this.current_frame < 4)
			{
				
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite0.png":"./image/Spacewoman/Spacewoman_sprite0.png";
			}
			else if (this.current_frame < 2*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite1.png":"./image/Spacewoman/Spacewoman_sprite1.png";
			}
			else if (this.current_frame < 3*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite2.png":"./image/Spacewoman/Spacewoman_sprite2.png";
			}
			else if (this.current_frame < 4*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite3.png":"./image/Spacewoman/Spacewoman_sprite3.png";
			}
			else if (this.current_frame < 5*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite0.png":"./image/Spacewoman/Spacewoman_sprite0.png";
			}
			else if (this.current_frame < 6*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite1.png":"./image/Spacewoman/Spacewoman_sprite1.png";
			}
			else if (this.current_frame < 7*4)
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite2.png":"./image/Spacewoman/Spacewoman_sprite2.png";
			}
			else
			{
				this.pic.src = this.gender==genders.Male?"./image/Spaceman/Spaceman_sprite3.png":"./image/Spacewoman/Spacewoman_sprite3.png";	
			}
		}
		
		else //not moving
		{
			this.update_pic();
		}
	}
    
	say_my_name() 
	{
        console.log("My name is "+ this.name);
    }
	
	fitness_increase(level)
	{
		this.fitness += level;
		if (this.fitness >= 100)
		{
			this.fitness = 100;
		}
	}
	
	mental_increase(level)
	{
		this.mentality += level;
		if (this.mentality >= 100)
		{
			this.mentality = 100;
		}
	}
}

//Me and my Teammates
let myself = new Human("",genders.Male, careers.Engineer); //init
let Tom = new Human("Tom", genders.Male, careers.Doctor);
let Sam = new Human("Sam", genders.Female, careers.Food_Scientist);
let Alex = new Human("Alex", genders.Female, careers.Engineer); //init

//which screen to show
let is_startscreen = true;
let is_welcomescreen = false;
let is_gamescreen = false;
let is_endscreen = false;

let my_name = "";
let my_gender = genders.Male;
let my_career = careers.Engineer;

//for selection box at the start
class Rect
{
    constructor(x,y,width,height)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.index = 0;
	}	
}

//startscreen parameters
let is_entering_name = true;
let big_selection_rect = new Rect(CANVAS_WIDTH/2,0,CANVAS_WIDTH/2, CANVAS_HEIGHT/7*2);
let selecting_gender = false;
let selecting_career = false;
let small_selection_rect = "";

//Gamescreen player parameters
let show_team_data = false;
let show_problems = false;
let show_actions = false;
let current_month = 7; //7th month to go, and then countdown to 1
let in_transition = true;
let transition_timer = "";
let global_timer = "";
let in_action = false;
let action_timer = "";
let action_message = "";

//potential problems parameters
let is_shield_activated = false;
let is_crops_checked = false;
let is_food_prepared = false;
let has_eaten_num  = 0;
let problem_image = new Image();
problem_image.src = "./resources/warning_transparent.png";

//problems parameters
let is_space_radiation = false;
let is_shield_broken = false;
let is_com_broken = false;
let is_crops_wilt = false;

let problems_array = [];
let actions_array = ["Exercise","Eat","Call Family","Sleep","Activate/Deactivate Shield"];
let actions_selection_rect = new Rect(0, FONT_HEIGHT*4, CANVAS_WIDTH,FONT_HEIGHT);

//reset all problem parameters
function reset_next_month_parameters()
{
	is_space_radiation = false;
	is_shield_activated = false;
	is_food_prepared = false;
	is_crops_checked = false;
	is_crops_wilt = false;
	problems_array.splice(problems_array.indexOf("The crops wilted!"),1);
	problems_array.splice(problems_array.indexOf("There is Space Radiation!"),1);
	has_eaten_num = 0;
}

//normal deduction rate
let mental_deduct = 5;//per hour
let fitness_deduct = 5;//per hour

//end game parameters
let won = false;

class The_Time
{
	constructor()
	{
		this.h = 8;
		this.m = 0;
		this.s = 0;
	}
	
	set_8am()
	{
		this.h = 8;
		this.m = 0;
		this.s = 0;
	}
	
	increase_1_min()
	{
		this.m += 1;
		if (this.m >= 60)
		{
			this.m = 0;
			this.h += 1;
			if (problems_array.length == 0)
			{
				let random_num = Math.round(Math.random()*3);
				if (random_num == 0)
				{
					if (!is_space_radiation)
					{
						if (global_time.h >= 12)
						{
							is_space_radiation = true;
							if (!problems_array.includes("There is Space Radiation!"))
							{
								problems_array.push("There is Space Radiation!");
							}
						}
					}
				}
				else if (random_num == 1)
				{
					if (!is_shield_broken)
					{
						is_shield_broken = true;
						if (!problems_array.includes("The Shield is broken!"))
						{
							problems_array.push("The Shield is broken!");
						}
					}
				}
				else if(random_num == 2)
				{
					if (!is_com_broken)
					{
						is_com_broken = true;
						if (!problems_array.includes("Communication system is broken!"))
						{
							problems_array.push("Communication system is broken!");
						}
					}
				}
				else if (random_num == 3)
				{
					if (!is_crops_checked)
					{
						is_crops_wilt = true;
						if (!problems_array.includes("The crops wilted!"))
						{
							problems_array.push("The crops wilted!");
						}
					}
				}
			}
		}
		
		else //this.m < 60
		{
			let probability = Math.round(Math.random()*100);
			if (probability > 80)
			{
				let random_num = Math.round(Math.random()*3);
				if (random_num == 0)
				{
					if (!is_space_radiation)
					{
						if (global_time.h >= 12)
						{
							is_space_radiation = true;
							if (!problems_array.includes("There is Space Radiation!"))
							{
								problems_array.push("There is Space Radiation!");
							}
						}
					}
				}
				else if (random_num == 1)
				{
					if (!is_shield_broken)
					{
						is_shield_broken = true;
						if (!problems_array.includes("The Shield is broken!"))
						{
							problems_array.push("The Shield is broken!");
						}
					}
				}
				else if(random_num == 2)
				{
				
					if (!is_com_broken)
					{
						is_com_broken = true;
						if (!problems_array.includes("Communication system is broken!"))
						{
							problems_array.push("Communication system is broken!");
						}
					}
				}
				else if (random_num == 3)
				{
					if (!is_crops_checked)
					{
						is_crops_wilt = true;
						if (!problems_array.includes("The crops wilted!"))
						{
							problems_array.push("The crops wilted!");
						}
					}
				}
			}
		}
		
	}
	
	increase_1_sec()
	{
		this.s += 1
		if (this.s >= 60)
		{
			this.s = 0;
			this.m += 1;
		}
	}
}

let global_time = new The_Time();
function run_global_timer()
{
	global_time.increase_1_min();
	
	//normal deduction
	Tom.mentality -= mental_deduct/60;
	Tom.fitness -= fitness_deduct/60;
	
	Sam.mentality -= mental_deduct/60;
	Sam.fitness -= fitness_deduct/60;
	
	Alex.mentality -= mental_deduct/60;
	Alex.fitness -= fitness_deduct/60;
	
	myself.mentality -= mental_deduct/60;
	myself.fitness -= fitness_deduct/60;
	
	//check the damaged caused 
	if (is_space_radiation)
	{
		if (is_shield_activated)
		{
			if (is_shield_broken)
			{
				myself.fitness -= 10/60;
				Tom.fitness -= 10/60;
				Sam.fitness -= 10/60;
				Alex.fitness -= 10/60;
			}
		}
		else //shield not activated
		{
			myself.fitness -= 20/60;
			Tom.fitness -= 20/60;
			Sam.fitness -= 20/60;
			Alex.fitness -= 20/60;
		}
	}
	
	if (is_shield_activated)
	{
		myself.mentality -= 3/60;
		Tom.mentality -= 3/60;
		Sam.mentality -= 3/60;
		Alex.mentality -= 3/60;
	}
}

function show_month_to_go()
{
	in_transition = false;
	
	clearInterval(transition_timer);
	transition_timer = "";
	
	global_timer = setInterval(run_global_timer,1000);
}

//set panel rect Style
function set_panel_rect()
{
	if (myself.gender == genders.Male)
	{
		ctx.fillStyle=LIGHT_BLUE;
	}
	else
	{
		ctx.fillStyle=LIGHT_ORANGE;
	}
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//show the team data
function team_data()
{
	if (show_team_data)
	{
		//console.log("Showing team data");
		set_panel_rect();
		
		ctx.fillStyle=BLACK;
		ctx.fillText("TEAM STATUS",(CANVAS_WIDTH - ctx.measureText("TEAM STATUS").width)/2,FONT_HEIGHT*2);
		
		ctx.fillText("Name:"+myself.name+",Mental Health:"+myself.mentality.toFixed(2)+",Physical Health:"+myself.fitness.toFixed(2),
			(CANVAS_WIDTH - ctx.measureText("Name:"+myself.name+",Mental Health:"+myself.mentality.toFixed(2)+",Physical Health:"+myself.fitness.toFixed(2)).width)/2,FONT_HEIGHT*5);
		ctx.fillText("Occupation:"+myself.career+","+myself.name+"'s Status:"+myself.status,
			(CANVAS_WIDTH - ctx.measureText("Occupation:"+myself.career+","+myself.name+"'s Status:"+myself.status).width)/2,FONT_HEIGHT*6);
		
		ctx.fillText("Name:"+Tom.name+",Mental Health:"+Tom.mentality.toFixed(2)+",Physical Health:"+Tom.fitness.toFixed(2),
			(CANVAS_WIDTH - ctx.measureText("Name:"+Tom.name+",Mental Health:"+Tom.mentality.toFixed(2)+",Physical Health:"+Tom.fitness.toFixed(2)).width)/2,FONT_HEIGHT*9);
		ctx.fillText("Occupation:"+Tom.career+","+Tom.name+"'s Status:"+Tom.status,
			(CANVAS_WIDTH - ctx.measureText("Occupation:"+Tom.career+","+Tom.name+"'s Status:"+Tom.status).width)/2,FONT_HEIGHT*10);
		
		ctx.fillText("Name:"+Sam.name+",Mental Health:"+Sam.mentality.toFixed(2)+",Physical Health:"+Sam.fitness.toFixed(2),
			(CANVAS_WIDTH - ctx.measureText("Name:"+Sam.name+",Mental Health:"+Sam.mentality.toFixed(2)+",Physical Health:"+Sam.fitness.toFixed(2)).width)/2,FONT_HEIGHT*13);
		ctx.fillText("Occupation:"+Sam.career+","+Sam.name+"'s Status:"+Sam.status,
			(CANVAS_WIDTH - ctx.measureText("Occupation:"+Sam.career+","+Sam.name+"'s Status:"+Sam.status).width)/2,FONT_HEIGHT*14);
		
		ctx.fillText("Name:"+Alex.name+",Mental Health:"+Alex.mentality.toFixed(2)+",Physical Health:"+Alex.fitness.toFixed(2),
			(CANVAS_WIDTH - ctx.measureText("Name:"+Alex.name+",Mental Health:"+Alex.mentality.toFixed(2)+",Physical Health:"+Alex.fitness.toFixed(2)).width)/2,FONT_HEIGHT*17);
		ctx.fillText("Occupation:"+Alex.career+","+Alex.name+"'s Status:"+Alex.status,
			(CANVAS_WIDTH - ctx.measureText("Occupation:"+Alex.career+","+Alex.name+"'s Status:"+Alex.status).width)/2,FONT_HEIGHT*18);
			
		ctx.fillText("PRESS 'J' TO EXIT!", (CANVAS_WIDTH - ctx.measureText("PRESS 'J' TO EXIT!").width)/2,FONT_HEIGHT*21);
	}
}

//show problems
function problems()
{
	if (show_problems)
	{
		//console.log("Showing problems");
		set_panel_rect();
		
		ctx.fillStyle=BLACK;
		ctx.fillText("PROBLEMS",(CANVAS_WIDTH - ctx.measureText("PROBLEMS").width)/2,FONT_HEIGHT*2);
		
		for (let i=0; i<problems_array.length; i++)
		{
			ctx.fillText(problems_array[i], (CANVAS_WIDTH - ctx.measureText(problems_array[i]).width)/2, FONT_HEIGHT*(5+i));
		}
		
		ctx.fillText("PRESS 'K' TO EXIT!", (CANVAS_WIDTH - ctx.measureText("PRESS 'K' TO EXIT!").width)/2,FONT_HEIGHT*21);
	}
}

//show the actions can be done
function actions()
{
	if (show_actions)
	{
		set_panel_rect();
		
		ctx.fillStyle=BLACK;
		ctx.fillText("ACTIONS",(CANVAS_WIDTH - ctx.measureText("ACTIONS").width)/2,FONT_HEIGHT*2);
		
		ctx.beginPath();
		ctx.rect(actions_selection_rect.x,actions_selection_rect.y,actions_selection_rect.width,actions_selection_rect.height);
		ctx.stroke();
		
		let max_index = 0
		for (let i=0; i<actions_array.length; i++)
		{
			ctx.fillText(actions_array[i], (CANVAS_WIDTH - ctx.measureText(actions_array[i]).width)/2, FONT_HEIGHT*(5+i));
			max_index = i;
		}
		
		//set the actions_rect index and place
		if (actions_selection_rect.index > max_index)
		{
			actions_selection_rect.y =  (FONT_HEIGHT*4) + (FONT_HEIGHT*max_index);
			actions_selection_rect.index = max_index;
		}
		
		
		ctx.fillText("PRESS 'L' TO EXIT!", (CANVAS_WIDTH - ctx.measureText("PRESS 'L' TO EXIT!").width)/2,FONT_HEIGHT*21);
		ctx.fillText("PRESS 'ENTER' TO PERFORM!", (CANVAS_WIDTH - ctx.measureText("PRESS 'ENTER' TO PERFORM!").width)/2,FONT_HEIGHT*22);
	}
	
}

function check_time()
{
	//go to the other day/month
	//if (global_time.h == 8 && global_time.m == 5)
	if (global_time.h >= 23)
	{
		current_month -= 1;
		in_transition = true;
		transition_timer = setInterval(show_month_to_go,1500);
		clearInterval(global_timer);
		global_time.set_8am();
		
		//initialize everyone's postition and condition
		Tom.x = CANVAS_WIDTH/6*1;
		Tom.y = CANVAS_HEIGHT/6*1;
		Tom.reset_parameters();
		
		Sam.x = CANVAS_WIDTH/6*4.5;
		Sam.y = CANVAS_HEIGHT/6*1;
		Sam.reset_parameters();
		
		Alex.x = CANVAS_WIDTH/6*4.5;
		Alex.y = CANVAS_HEIGHT/6*4;
		Alex.reset_parameters();
		
		myself.x = CANVAS_WIDTH/6*1;
		myself.y = CANVAS_HEIGHT/6*4;
		myself.reset_parameters();
	}
}

function clear_action()
{
	in_action = false;
	
	clearInterval(action_timer);
	action_timer = "";
	
	//reset the selection rect
	console.log("clear_action()")
	actions_selection_rect.x = 0;
	actions_selection_rect.y = FONT_HEIGHT*4;
	actions_selection_rect.index = 0;
	
	global_timer = setInterval(run_global_timer,1000);
}

function perform_action(action)
{
	let time_changed = 0;
	action_message = "";
	
	if (action == "Exercise")
	{
		let exercise_equipments = ["ROCKY", "ARED", "Treadmill", "Stationary Bike"];
		let random_num = Math.round(Math.random()*(exercise_equipments.length-1));
		if (myself.exercised)
		{
			time_changed = 0.5;
			global_time.m += 30;
			if(global_time.m >=60)
			{
				let hour = Math.round(global_time.m/60);
				global_time.m -= hour*60;
				global_time.h += hour*1;
			}
			action_message = "Already done the exercise for today! Over-exersizing is bad!";
		}
		else
		{
			action_message = "Exercising with "+ exercise_equipments[random_num] +" feels good!";
			myself.exercised = true;
			myself.mental_increase(5);
			myself.fitness_increase(10);			
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;
		}
	}
	
	else if (action == "Eat")
	{
		if (has_eaten_num < 2)
		{
			has_eaten_num += 1;
			time_changed = 1;
			global_time.h += 1;
			if (is_food_prepared)
			{
				action_message = "Everyone is eating well prepared food today!";
				myself.mental_increase(time_changed*5);
				myself.fitness_increase(time_changed*5);
				
				Tom.mental_increase(time_changed*5);
				Tom.fitness_increase(time_changed*5);
				
				Sam.mental_increase(time_changed*5);
				Sam.fitness_increase(time_changed*5);
				
				Alex.mental_increase(time_changed*5);
				Alex.fitness_increase(time_changed*5);
			}
			else
			{
				action_message = "Everyone is eating packaged space food!";
				myself.mental_increase(time_changed*3);
				myself.fitness_increase(time_changed*3);
				
				Tom.mental_increase(time_changed*3);
				Tom.fitness_increase(time_changed*3);
				
				Sam.mental_increase(time_changed*3);
				Sam.fitness_increase(time_changed*3);
				
				Alex.mental_increase(time_changed*3);
				Alex.fitness_increase(time_changed*3);
			}
		}
		else
		{
			time_changed = 0.5;
			global_time.m += 30;
			if(global_time.m >=60)
			{
				let hour = Math.round(global_time.m/60);
				global_time.m -= hour*60;
				global_time.h += hour*1;
			}
			action_message = "Everyone has already ate twice today!";
		}
	
	}

	else if (action == "Call Family")
	{
		if (is_com_broken)
		{
			time_changed = 0.5;
			global_time.m += 30;
			if(global_time.m >=60)
			{
				let hour = Math.round(global_time.m/60);
				global_time.m -= hour*60;
				global_time.h += hour*1;
			}
			action_message = "Communication system is broken!";
		}
	
		else if (myself.called_family)
		{
			time_changed = 0.5;
			global_time.m += 30;
			if(global_time.m >= 60)
			{
				let hour = Math.round(global_time.m/60);
				global_time.m -= hour*60;
				global_time.h += hour*1;
			}
			action_message = "Already called! Communication resources is important so cannot overuse!";
		}
		else
		{
			action_message = "Calling my family really does comfort me!";
			myself.called_family = true;
			myself.mental_increase(10);
			
			time_changed = 1;
			global_time.h += 1;
			
			Tom.mentality -= mental_deduct*1;
			Tom.fitness -= fitness_deduct*1;
			
			Sam.mentality -= mental_deduct*1;
			Sam.fitness -= fitness_deduct*1;
			
			Alex.mentality -= mental_deduct*1;
			Alex.fitness -= fitness_deduct*1;
		}
	}

	else if (action == "Sleep")
	{
		if (global_time.h >= 20)
		{
			action_message = "Goodnight Earth!";
			global_time.h = 23;
		}
		else
		{
			time_changed = 0.5;
			global_time.m += 30;
			if(global_time.m >=60)
			{
				let hour = Math.round(global_time.m/60);
				global_time.m -= hour*60;
				global_time.h += hour*1;
			}
			action_message = "It is too early to sleep!";
		}
	}
	
	else if (action == "Activate/Deactivate Shield")
	{
		is_shield_activated = !is_shield_activated;
		time_changed = 0.5;
		global_time.m += 30;
		if(global_time.m >=60)
		{
			let hour = Math.round(global_time.m/60);
			global_time.m -= hour*60;
			global_time.h += hour*1;
		}
		if (is_shield_activated)
		{
			action_message = "Shield activated!";
		}
		else
		{
			action_message = "Shield deactivated!";
		}
	}
	
	//myself.career is Engineer
	else if (action == "Shield Maintenance")
	{
		if (!is_shield_broken)
		{
			action_message = "Shield is working perfectly!";
		}
		else if (Alex.status == general_status.Fixing_Shield)
		{
			action_message = "Alex is fixing the shield!";
		}
		else
		{
			is_shield_broken = false;
			problems_array.splice(problems_array.indexOf("The Shield is broken!"),1);
			action_message = "Done fixing broken shield!";
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;
		}
			
	}
	
	else if (action == "Communication System Maintenance")
	{
		if (!is_com_broken)
		{
			action_message = "Communication system is working perfectly!";
		}
		else if (Alex.status == general_status.Fixing_Communication)
		{
			action_message = "Alex is fixing the communication system!";
		}
		else
		{
			is_com_broken = false;
			action_message = "Done fixing broken communication system!";
			problems_array.splice(problems_array.indexOf("Communication system is broken!"),1);
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;
		}
	}

	//myself.career is Food_Scientist
	else if (action == "Prepare Food")
	{
		if (is_food_prepared)
		{
			action_message = "Food is already prepared!";
		}
		else if (Sam.status == general_status.Preparing_Food)
		{
			action_message = "Sam is preparing the food!";
		}
		else
		{
			is_food_prepared = true;
			action_message = "Done prepared the food!";
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;

		}
	}
	
	else if (action == "Check on crops")
	{
		if (is_crops_checked)
		{
			action_message = "Already checked on crops!";
		}
		else if (Sam.status == general_status.Taking_Care_Crops)
		{
			action_message = "Sam is taking care of the crops!";
		}
		else
		{
			is_crops_checked = true;
			action_message = "Done checking the crops!";
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;

		}
	}
	
	//myself.career is Doctor
	else if (action == "Gives Consultation")
	{
		if (Tom.mentality < 80 || Sam.mentality < 80 || Alex.mentality < 80)
		{
			action_message = "Gave consultations to everyone for their wellness!";
			Tom.mental_increase(20);
			Sam.mental_increase(20);
			Alex.mental_increase(20);	
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;
		}
		else
		{
			action_message = "Everyone is doing fine!";
		}
	}

	else if  (action == "Gives Treatment")
	{
		if (Tom.fitness < 80 || Sam.fitness < 80 || Alex.fitness < 80)
		{
			action_message = "Gave treatment to everyone for their wellness!";
			Tom.fitness_increase(20);
			Sam.fitness_increase(20);
			Alex.fitness_increase(20);	
			
			time_changed = 2;
			global_time.h += 2;
			
			Tom.mentality -= mental_deduct*2;
			Tom.fitness -= fitness_deduct*2;
			
			Sam.mentality -= mental_deduct*2;
			Sam.fitness -= fitness_deduct*2;
			
			Alex.mentality -= mental_deduct*2;
			Alex.fitness -= fitness_deduct*2;
		}
		else
		{
			action_message = "Everyone is doing fine!";
		}
	}
	
	//extra actions
	else if (action == "Ask Alex to fix communication system")
	{
		action_message = "Alex is fixing the communication system!";
		Alex.status = general_status.Fixing_Communication;
	}

	else if (action == "Ask Alex to fix broken shield")
	{
		action_message = "Alex is fixing the broken shield!";
		Alex.status = general_status.Fixing_Shield;
	}

	else if (action == "Ask Sam to prepare food")
	{
		action_message = "Sam is preparing the food!";
		Sam.status = general_status.Preparing_Food;
	}

	else if (action == "Ask Sam to take care of crops")
	{
		action_message = "Sam is taking care of the crops";
		Sam.status = general_status.Taking_Care_Crops;
	}

	else if (action == "Ask Tom to give consultant")
	{
		action_message = "Tom is giving consultation!";
		Tom.status = general_status.Giving_Consultation;
		Alex.status = general_status.Receiving_Consultation;
		Sam.status = general_status.Receiving_Consultation;
	}

	else if (action == "Ask Tom to give treatment")
	{
		action_message = "Tom is giving treatment!";
		Tom.status = general_status.Giving_Treatment;
		Alex.status = general_status.Receiving_Treatment;
		Sam.status = general_status.Receiving_Treatment;
	}		
	
	//update the status of teammates
	//Tom status
	if (Tom.status == general_status.Resting)
	{
		if (Alex.mental_health < 50)
		{
			Alex.status = general_status.Receiving_Consultation;
			Tom.status = general_status.Giving_Consultation;
		}
		else if (Alex.fitness < 50)
		{
			Alex.status = general_status.Receiving_Treatment;
			Tom.status = general_status.Giving_Treatment;
		}
		
		else if (Sam.mental_health < 50)
		{
			Sam.status = general_status.Receiving_Consultation;
			Tom.status = general_status.Giving_Consultation
		}
		else if (Sam.fitness < 50)
		{
			Sam.status = general_status.Receiving_Treatment;
			Tom.status = general_status.Giving_Treatment;
		}
		else if (!Tom.exercised)
		{
			Tom.status = general_status.Exercising;
		}
		
		else if (!Tom.called_family && !is_com_broken)
		{
			Tom.status = general_status.Calling_Family;
		}
	}
	else if (Tom.status == general_status.Giving_Treatment ||  Tom.status == general_status.Giving_Consultation)
	{
		Tom.status = general_status.Resting;
		if (Alex.status == general_status.Receiving_Treatment || Alex.status == general_status.Receiving_Consultation)
		{
			Alex.status = general_status.Resting;
			Alex.mental_increase(time_changed*3);
			Alex.fitness_increase(time_changed*3);
		}
		
		if (Sam.status == general_status.Receiving_Treatment || Sam.status == general_status.Receiving_Consultation)
		{
			Sam.status = general_status.Resting;
			Sam.mental_increase(time_changed*3);
			Sam.fitness_increase(time_changed*3);
		}
	}
	else if (Tom.status == general_status.Exercising)
	{
		Tom.exercised = true;
		Tom.status = general_status.Resting;
		Tom.mental_increase(time_changed*5);
		Tom.fitness_increase(time_changed*10);
	}
	else if (Tom.status == general_status.Calling_Family)
	{
		Tom.called_family = true;
		Tom.status = general_status.Resting;
		Tom.mental_increase(time_changed*10);
	}
	
	//Sam status
	if (Sam.status == general_status.Resting && Sam.mentality > 50)
	{
		if (!is_food_prepared)
		{
			Sam.status = general_status.Preparing_Food;
		}
		else if (!Sam.exercised)
		{
			Sam.status = general_status.Exercising;
		}
		else if (!Sam.called_family  && !is_com_broken)
		{
			Sam.status = general_status.Calling_Family;
		}
		else if (!is_crops_checked)
		{
			Sam.status = general_status.Taking_Care_Crops;
		}
	}
	else if (Sam.status == general_status.Preparing_Food)
	{
		is_food_prepared = true;
		Sam.status = general_status.Resting;
	}
	else if (Sam.status == general_status.Taking_Care_Crops)
	{
		is_crops_checked = true;
		Sam.status = general_status.Resting;
	}
	else if (Sam.status == general_status.Exercising)
	{
		Sam.exercised = true;
		Sam.status = general_status.Resting;
		Sam.mental_increase(time_changed*5);
		Sam.fitness_increase(time_changed*10);
	}
	else if (Sam.status == general_status.Calling_Family)
	{
		Sam.called_family = true;
		Sam.status = general_status.Resting;
		Sam.mental_increase(time_changed*10);
	}
	
	//Alex status
	if (Alex.status == general_status.Resting && Alex.mentality > 50)
	{
		if (is_shield_broken)
		{
			Alex.status = general_status.Fixing_Shield;
		}
			
		else if (is_com_broken)
		{
			Alex.status = general_status.Fixing_Communication;
		}
		
		else if (!Alex.exercised)
		{
			Alex.status = general_status.Exercising;
		}
		
		else if (!Alex.called_family  && !is_com_broken)
		{
			Alex.status = general_status.Calling_Family;
		}
	}
	else if (Alex.status == general_status.Fixing_Shield)
	{
		is_shield_broken = false;
		problems_array.splice(problems_array.indexOf("The Shield is broken!"),1);
		Alex.status = general_status.Resting;
	}
	else if (Alex.status == general_status.Fixing_Communication)
	{
		is_com_broken = false;
		problems_array.splice(problems_array.indexOf("Communication system is broken!"),1);
		Alex.status = general_status.Resting;
	}
	else if (Alex.status == general_status.Exercising)
	{
		Alex.exercised = true;
		Alex.status = general_status.Resting;
		Alex.mental_increase(time_changed*5);
		Alex.fitness_increase(time_changed*10);
	}
	else if (Alex.status == general_status.Calling_Family)
	{
		Alex.called_family = true;
		Alex.status = general_status.Resting;
		Alex.mental_increase(time_changed*10);
	}
	
	//causing problems
	let probability = Math.round(Math.random()*100);
	if (probability > 80)
	{
		let random_num = Math.round(Math.random()*3);
		if (random_num == 0)
		{
			if (!is_space_radiation)
			{
				if (global_time.h >= 12)
				{
					is_space_radiation = true;
					if (!problems_array.includes("There is Space Radiation!"))
					{
						problems_array.push("There is Space Radiation!");
					}
				}
			}
		}
		else if (random_num == 1)
		{
			if (!is_shield_broken)
			{
				is_shield_broken = true;
				if (!problems_array.includes("The Shield is broken!"))
				{
					problems_array.push("The Shield is broken!");
				}
			}
		}
		else if(random_num == 2)
		{
		
			if (!is_com_broken)
			{
				is_com_broken = true;
				if (!problems_array.includes("Communication system is broken!"))
				{
					problems_array.push("Communication system is broken!");
				}
			}
		}
		else if (random_num == 3)
		{
			if (!is_crops_checked)
			{
				is_crops_wilt = true;
				if (!problems_array.includes("The crops wilted!"))
				{
					problems_array.push("The crops wilted!");
				}
			}
		}
	}
	in_action = true;
	action_timer = setInterval(clear_action,2000);
	clearInterval(global_timer);
}

function check_my_key()
{
	if (is_startscreen) //all done in key_down
	{}

	else if (is_welcomescreen) //all done in key_down
	{}
	
	else if (is_gamescreen) //WASD in here, others in key_down
	{
		if (!show_actions && !show_problems && !show_team_data)
		{
			if(keysPressed["w"] || keysPressed["W"])
			{
				if (myself.y > 0)
				{
					myself.y -= vertical_move;
				}
				
				if (myself.y < 0)
				{
					myself.y = 0;
				} 
			}
			if(keysPressed["a"] || keysPressed["A"])
			{
				if (myself.x > 0)
				{
					myself.x -= horizontal_move;
				}
				
				if (myself.x < 0)
				{
					myself.x = 0;
				}
			}
			if(keysPressed["s"] || keysPressed["S"])
			{
				if (myself.y + HUMAN_HEIGHT < CANVAS_HEIGHT)
				{
					myself.y += vertical_move;
				}
				
				if (myself.y + HUMAN_HEIGHT > CANVAS_HEIGHT)
				{
					myself.y = CANVAS_HEIGHT - HUMAN_HEIGHT;
				}
			}
			if(keysPressed["d"] || keysPressed["D"])
			{
				if (myself.x + HUMAN_WIDTH < CANVAS_WIDTH)
				{
					myself.x += horizontal_move;
				}
				
				if (myself.x + HUMAN_WIDTH > CANVAS_WIDTH)
				{
					myself.x = CANVAS_WIDTH - HUMAN_WIDTH;
				}
			}
			
			if (keysPressed["w"] || keysPressed["W"] || keysPressed["a"] || keysPressed["A"] || keysPressed["s"] || keysPressed["S"] || keysPressed["d"] || keysPressed["D"])
			{
				myself.is_moving = true;
				myself.update_frame();
				myself.update_frame();
			}
			else
			{
				myself.is_moving = false;
				myself.current_frame = 0;
			}
			
			//console.log("myself.x:" + myself.x);
			//console.log("myself.y:" + myself.y);
		}
		
	}

	else if (is_endscreen)
	{}
	
}

//add actions to solve the problem
function add_actions()
{
	if (is_com_broken && !actions_array.includes("Ask Alex to fix communication system"))
	{
		actions_array.push("Ask Alex to fix communication system");
	}
	else if (!is_com_broken  && actions_array.includes("Ask Alex to fix communication system"))
	{
		actions_array.splice(actions_array.indexOf("Ask Alex to fix communication system"),1);
	}
	
	if (is_shield_broken && !actions_array.includes("Ask Alex to fix broken shield"))
	{
		actions_array.push("Ask Alex to fix broken shield");
	}
	else if (!is_shield_broken  && actions_array.includes("Ask Alex to fix broken shield"))
	{
		actions_array.splice(actions_array.indexOf("Ask Alex to fix broken shield"),1);
	}
	
	if (!is_food_prepared && !actions_array.includes("Ask Sam to prepare food"))
	{
		actions_array.push("Ask Sam to prepare food");
	}
	else if (is_food_prepared  && actions_array.includes("Ask Sam to prepare food"))
	{
		actions_array.splice(actions_array.indexOf("Ask Sam to prepare food"),1);
	}
	
	if (!is_crops_checked && !actions_array.includes("Ask Sam to take care of crops"))
	{
		actions_array.push("Ask Sam to take care of crops");
	}
	else if (is_crops_checked  && actions_array.includes("Ask Sam to take care of crops"))
	{
		actions_array.splice(actions_array.indexOf("Ask Sam to take care of crops"),1);
	}
	
	if ((Sam.mentality < 50 || Alex.mentality < 50) && !actions_array.includes("Ask Tom to give consultant"))
	{
		actions_array.push("Ask Tom to give consultant");
	}
	else if (!(Sam.mentality < 50 || Alex.mentality < 50)  && actions_array.includes("Ask Tom to give consultant"))
	{
		actions_array.splice(actions_array.indexOf("Ask Tom to give consultant"),1);
	}

	if ((Sam.fitness < 50 || Alex.fitness < 50) && !actions_array.includes("Ask Tom to give treatment"))
	{
		actions_array.push("Ask Tom to give treatment");
	}
	else if (!(Sam.fitness < 50 || Alex.fitness < 50)  && actions_array.includes("Ask Tom to give treatment"))
	{
		actions_array.splice(actions_array.indexOf("Ask Tom to give treatment"),1);
	}
}

//Game Loop
function gameloop()
{
	//clear screen
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.beginPath();
	
	//ctx.fillStyle="#00FF00";
	//ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	if (is_startscreen)
	{
		if (my_gender == genders.Male)
		{
			ctx.fillStyle=LIGHT_BLUE;
		}
		else if (my_gender == genders.Female)
		{
			ctx.fillStyle=LIGHT_ORANGE;
		}
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		ctx.fillStyle=BLACK;
		ctx.beginPath();
		//show the big selection rect
		ctx.rect(big_selection_rect.x, big_selection_rect.y, big_selection_rect.width, big_selection_rect.height);
		ctx.stroke(); 
		if (small_selection_rect != "")
		{
			ctx.beginPath();
			ctx.rect(small_selection_rect.x, small_selection_rect.y, small_selection_rect.width, small_selection_rect.height);
		}
		ctx.stroke(); 
		//show the name
		ctx.fillText("Name (max 10 characters):", CANVAS_WIDTH/2, CANVAS_HEIGHT/7*1);
		ctx.fillText(my_name, CANVAS_WIDTH/2, CANVAS_HEIGHT/7*1 + FONT_HEIGHT);
		
		//show the gender
		ctx.fillText("Gender:", CANVAS_WIDTH/2, CANVAS_HEIGHT/7*3);
		ctx.fillText("Male", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/6*1, CANVAS_HEIGHT/7*3.5);
		ctx.fillText("Female", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/6*4, CANVAS_HEIGHT/7*3.5);
		
		if (my_gender == genders.Male)
		{
			let size = (CANVAS_WIDTH/2)/4*3 - (CANVAS_WIDTH/2)/4*1;
			ctx.drawImage(man_pic,(CANVAS_WIDTH/2)/4*1, CANVAS_HEIGHT/5*0.5, size, size);
		}
		else if (my_gender == genders.Female)
		{
			let size = (CANVAS_WIDTH/2)/4*3 - (CANVAS_WIDTH/2)/4*1;
			ctx.drawImage(woman_pic,(CANVAS_WIDTH/2)/4*1, CANVAS_HEIGHT/5*0.5, size, size);
		}
		
		//show the general instruction
		ctx.fillText("- Use 'A' and 'D' to make the selection",0,CANVAS_HEIGHT/5*3);
		ctx.fillText("- Use 'Enter' to confirm",0,CANVAS_HEIGHT/5*3 + FONT_HEIGHT);
		ctx.fillText("- Use 'Mouse' to Mute/Unmute",0,CANVAS_HEIGHT/5*3+ FONT_HEIGHT*2);
		
		//show the specific instruction (based on big_selection_rect.index)
		if (big_selection_rect.index == 0)
		{
			ctx.fillText("- Please enter your name",0,CANVAS_HEIGHT/5*4);
			ctx.fillText("- Only alphabets & numbers",0,CANVAS_HEIGHT/5*4+FONT_HEIGHT);
		}
		else if (big_selection_rect.index == 1)
		{
			ctx.fillText("- Please choose a gender",0,CANVAS_HEIGHT/5*4);
		}	

		else if (big_selection_rect.index == 2)
		{
			if (small_selection_rect.index == 0)
			{
				//show "Engineer" description
				ctx.fillText("- Control technical parts",0,CANVAS_HEIGHT/5*4);
				ctx.fillText("- Fix technical parts",0,CANVAS_HEIGHT/5*4 + FONT_HEIGHT);
			}
			
			else if (small_selection_rect.index == 1)
			{
				//show "Food Scientist" description
				ctx.fillText("- Prepare the food",0,CANVAS_HEIGHT/5*4);
				ctx.fillText("- Take care of crops",0,CANVAS_HEIGHT/5*4 + FONT_HEIGHT);
			}
			
			else if (small_selection_rect.index == 2)
			{
				//show "Doctor" description
				ctx.fillText("- Gives consultation",0,CANVAS_HEIGHT/5*4);
				ctx.fillText("- Gives treatment",0,CANVAS_HEIGHT/5*4 + FONT_HEIGHT);
			}
		}
		
		//show the careers
		ctx.fillText("Occupation:", CANVAS_WIDTH/2, CANVAS_HEIGHT/7*5);
		ctx.fillText("Engineer", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/7*1, CANVAS_HEIGHT/7*5.5);
		ctx.fillText("Food", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/7*3, CANVAS_HEIGHT/7*5.5);
		ctx.fillText("Scientist", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/7*3, CANVAS_HEIGHT/7*5.5 +FONT_HEIGHT);
		ctx.fillText("Doctor", (CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/7*5, CANVAS_HEIGHT/7*5.5);
	}
	
	else if (is_welcomescreen)
	{		
		if (my_gender == genders.Male)
		{
			ctx.fillStyle=LIGHT_BLUE;
		}
		else if (my_gender == genders.Female)
		{
			ctx.fillStyle=LIGHT_ORANGE;
		}
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		ctx.fillStyle=BLACK;
		ctx.fillText("Hi " + myself.name +"," + "you have chosen to be " + myself.gender + " " + myself.career + "!",
			(CANVAS_WIDTH - ctx.measureText("Hi " + myself.name +"," + "you have chosen to be " + myself.gender + " " + myself.career + "!").width)/2, FONT_HEIGHT*3);
		ctx.fillText("You have 3 companions with you, which are " + Tom.name + ", " + Sam.name + " and "+ Alex.name, 
			(CANVAS_WIDTH - ctx.measureText("You have 3 companions with you, which are " + Tom.name + ", " + Sam.name + " and "+ Alex.name).width)/2, FONT_HEIGHT*4);
		ctx.fillText(Tom.name + " is a " + Tom.gender + " " + Tom.career, 
			(CANVAS_WIDTH - ctx.measureText(Tom.name + " is a " + Tom.gender + " " + Tom.career).width)/2, FONT_HEIGHT*7);
		ctx.fillText(Sam.name + " is a " + Sam.gender + " " + Sam.career, 
			(CANVAS_WIDTH - ctx.measureText(Sam.name + " is a " + Sam.gender + " " + Sam.career).width)/2, FONT_HEIGHT*8);
		ctx.fillText(Alex.name + " is a " + Alex.gender + " " + Alex.career, 
			(CANVAS_WIDTH - ctx.measureText(Alex.name + " is a " + Alex.gender + " " + Alex.career).width)/2, FONT_HEIGHT*9);
		ctx.fillText("Your mission is make sure the team survives through the Earth-Mars trip", 
			(CANVAS_WIDTH - ctx.measureText("Your mission is make sure the team survives through the Earth-Mars trip").width)/2, FONT_HEIGHT*12);
		ctx.fillText("You can use 'W','A','S','D' to move your avatar (Speed up the time)", 
			(CANVAS_WIDTH - ctx.measureText("You can use 'W','A','S','D' to move your avatar (Speed up the time)").width)/2, FONT_HEIGHT*13);
		ctx.fillText("'J' to show team status,'K' to show current problems, 'L' to show actions", 
			(CANVAS_WIDTH - ctx.measureText("'J' to show team status,'K' to show current problems, 'L' to show actions").width)/2, FONT_HEIGHT*14);		
		ctx.fillText("'Enter' to confirm selection", 
			(CANVAS_WIDTH - ctx.measureText("'Enter' to confirm selection").width)/2, FONT_HEIGHT*15);
			
		ctx.fillText("PRESS 'ENTER' TO CONTINUE", (CANVAS_WIDTH - ctx.measureText("PRESS 'ENTER' TO CONTINUE").width)/2, FONT_HEIGHT*21);
	}
	
	else if (is_gamescreen)
	{
		if (!in_transition && !in_action)
		{
			ctx.fillStyle=BLACK;
			ctx.drawImage(background_image,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			
			//draw the other player
			if (Tom.status == general_status.Resting)
			{
				ctx.fillStyle=BLACK;
				ctx.beginPath();
				//upper left
				Tom.x = CANVAS_WIDTH/6*1;
				Tom.y = CANVAS_HEIGHT/6*1;
				ctx.fillText(Tom.name, Tom.x + HUMAN_WIDTH/2 - ctx.measureText(Tom.name).width/2, Tom.y);
				//ctx.rect(Tom.x,Tom.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				ctx.drawImage(Tom.pic,Tom.x,Tom.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				//ctx.stroke();
			}
			else //Tom doing something else;
			{}
		
			if (Sam.status == general_status.Resting)
			{
				ctx.fillStyle=BLACK;
				ctx.beginPath();
				//upper right
				Sam.x = CANVAS_WIDTH/6*4.5;
				Sam.y = CANVAS_HEIGHT/6*1;
				ctx.fillText(Sam.name, Sam.x + HUMAN_WIDTH/2 - ctx.measureText(Sam.name).width/2, Sam.y);
				//ctx.rect(Sam.x,Sam.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				ctx.drawImage(Sam.pic,Sam.x,Sam.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				//ctx.stroke();
			}
			else //Sam doing something else
			{}
		
			if (Alex.status == general_status.Resting)
			{
				ctx.fillStyle=BLACK;
				ctx.beginPath();
				//lower right
				Alex.x = CANVAS_WIDTH/6*4.5;
				Alex.y = CANVAS_HEIGHT/6*4;
				ctx.fillText(Alex.name, Alex.x + HUMAN_WIDTH/2 - ctx.measureText(Alex.name).width/2, Alex.y);
				//ctx.rect(Alex.x,Alex.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				ctx.drawImage(Alex.pic,Alex.x,Alex.y,HUMAN_WIDTH,HUMAN_HEIGHT);
				//ctx.stroke();
			}
			else //Alex doing something else
			{}
			
			//show current time
			ctx.font = FONT_HEIGHT*1.5+"px Barlow-Bold";
			ctx.fillText("Time:"+ (global_time.h.toString().length==1?"0"+global_time.h:global_time.h) +
				":"+ (global_time.m.toString().length==1?"0"+global_time.m:global_time.m) +
				":"+ (global_time.s.toString().length==1?"0"+global_time.s:global_time.s),
				(CANVAS_WIDTH - ctx.measureText("Time:"+ (global_time.h.toString().length==1?"0"+global_time.h:global_time.h) +
					":"+ (global_time.m.toString().length==1?"0"+global_time.m:global_time.m) +
					":"+ (global_time.s.toString().length==1?"0"+global_time.s:global_time.s)).width)/2,(CANVAS_HEIGHT - FONT_HEIGHT*1.5)/2);	
			//show shield condition
			if (is_shield_activated)
			{
				ctx.fillText("Shield activated!", (CANVAS_WIDTH - ctx.measureText("Shield activated!").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5 + FONT_HEIGHT*1.5*2)/2)
			}
			else
			{
				ctx.fillText("Shield deactivated!", (CANVAS_WIDTH - ctx.measureText("Shield deactivated!").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5 + FONT_HEIGHT*1.5*2)/2)
			}
			ctx.font = FONT_HEIGHT+"px Barlow-Bold";			
			
			
			//check which key is pressed (W,A,S,D)
			check_my_key();
			
			//draw the player
			ctx.fillStyle=BLACK;
			ctx.beginPath();
			//lower left
			//myself.x = CANVAS_WIDTH/6*1;
			//myself.y = CANVAS_HEIGHT/6*4;
			ctx.fillText(myself.name, myself.x + HUMAN_WIDTH/2 - ctx.measureText(myself.name).width/2, myself.y);
			//ctx.rect(myself.x,myself.y,HUMAN_WIDTH,HUMAN_HEIGHT);
			myself.update_animation();
			ctx.drawImage(myself.pic,myself.x,myself.y,HUMAN_WIDTH,HUMAN_HEIGHT);
			//ctx.stroke();
			if (problems_array.length != 0)
			{
				ctx.drawImage(problem_image, myself.x, myself.y, ICON_WIDTH, ICON_HEIGHT)
			}
			
			//show team data or problems or actions
			team_data();
			problems();
			actions();
			
			//check if its time to go another month
			check_time();
			
			//add the extra actions for the problems
			add_actions();
		}
		
		else if (in_action)
		{
			if (my_gender == genders.Male)
			{
				ctx.fillStyle=LIGHT_BLUE;
			}
			else if (my_gender == genders.Female)
			{
				ctx.fillStyle=LIGHT_ORANGE;
			}
			ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
			ctx.fillStyle=BLACK;
			ctx.fillText(action_message, (CANVAS_WIDTH - ctx.measureText(action_message).width)/2, (CANVAS_HEIGHT - FONT_HEIGHT)/2);
		}
	
		else if (in_transition)//in transition
		{
			
			if (my_gender == genders.Male)
			{
				ctx.fillStyle=LIGHT_BLUE;
			}
			else if (my_gender == genders.Female)
			{
				ctx.fillStyle=LIGHT_ORANGE;
			}
			ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
			ctx.fillStyle=BLACK;
			reset_next_month_parameters();
			
			ctx.font = FONT_HEIGHT*1.5+"px Barlow-Bold";	
			if (current_month == 7)
			{
				ctx.fillText(current_month+" months to go...", (CANVAS_WIDTH - ctx.measureText(current_month+" months to go...").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5)/2);
			}
			else if (current_month >= 2 && current_month <= 6)
			{
				ctx.fillText("Done for the month", (CANVAS_WIDTH - ctx.measureText("Done for the month").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5)/2);
				ctx.fillText(current_month+" months to go...", (CANVAS_WIDTH - ctx.measureText(current_month+" month to go...").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5 + FONT_HEIGHT*1.5*2)/2);
			}
			else if (current_month == 1)
			{
				ctx.fillText(current_month+" month to go...", (CANVAS_WIDTH - ctx.measureText(current_month+" month to go...").width)/2, (CANVAS_HEIGHT - FONT_HEIGHT*1.5)/2);
			}	
			else
			{
				won = true;
				is_endscreen = true;
				is_gamescreen = false;
				if (global_timer != "")
				{
					clearInterval(global_timer);
				}
				if (transition_timer != "")
				{
					clearInterval(transition_timer);
				}
				if (action_timer != "")
				{
					clearInterval(action_timer);
			}
			}
			ctx.font = FONT_HEIGHT+"px Barlow-Bold";
		}
		
		//check if the game is over 
		if (myself.mentality< 20 || myself.fitness < 20 || Tom.mentality< 20 || Tom.fitness < 20 || Sam.mentality< 20 || Sam.fitness < 20 || Alex.mentality< 20 || Alex.fitness < 20)
		{
			won = false;
			is_endscreen = true;
			is_gamescreen = false;
			if (global_timer != "")
			{
				clearInterval(global_timer);
			}
			if (transition_timer != "")
			{
				clearInterval(transition_timer);
			}
			if (action_timer != "")
			{
				clearInterval(action_timer);
			}
		}
	}

	else if (is_endscreen)
	{
		
		if (my_gender == genders.Male)
		{
			ctx.fillStyle=LIGHT_BLUE;
		}
		else if (my_gender == genders.Female)
		{
			ctx.fillStyle=LIGHT_ORANGE;
		}
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
		ctx.fillStyle=BLACK;
		if (won)
		{
			ctx.fillText("You Win!",(CANVAS_WIDTH - ctx.measureText("You Win!").width)/2, FONT_HEIGHT*3);
		}
		else
		{
			ctx.fillText("You Lose!",(CANVAS_WIDTH - ctx.measureText("You Lose!").width)/2, FONT_HEIGHT*3);
		}
		ctx.fillText("Month(s) to go:"+current_month,(CANVAS_WIDTH - ctx.measureText("Month(s) to go:"+current_month).width)/2, FONT_HEIGHT*4);
		
		//show data
		let data = "Name:"+myself.name+",Mental Health:"+myself.mentality.toFixed(2)+",Physical Health:"+myself.fitness.toFixed(2);
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*6);
		data = "Name:"+Tom.name+",Mental Health:"+Tom.mentality.toFixed(2)+",Physical Health:"+Tom.fitness.toFixed(2);
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*7);
		data = "Name:"+Sam.name+",Mental Health:"+Sam.mentality.toFixed(2)+",Physical Health:"+Sam.fitness.toFixed(2);
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*8);
		data = "Name:"+Alex.name+",Mental Health:"+Alex.mentality.toFixed(2)+",Physical Health:"+Alex.fitness.toFixed(2);
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*9);
		
		//show credits
		data = "Team: SpaceGen"
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*12);
		data = "Name: Loh Jia Chiew";
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*13);
		data = "Name: Vikki Ting Ding Hui";
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*14);
		data = "Music:Space Ambience by Alexander Nakarada";
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*17);
		data = " (www.serpentsoundstudios.com)";
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*18);
		data = "Licensed under Creative Commons BY Attribution 4.0 License";
		ctx.fillText(data, (CANVAS_WIDTH-ctx.measureText(data).width)/2, FONT_HEIGHT*19);
	}
	
	//the mute and unmute picture
	swap_mute_unmute();
	
	
}

let keysPressed = {};

function handle_key_down(event)
{
	//entering the name in startscreen
	if (is_startscreen)
	{
		if (is_entering_name)
		{
			if (VALID_CHARACTERS.includes(event.key))
			{
				if (my_name.length < 10)
				{
					my_name += event.key;
				}
			}
			
			else if (event.key == "Backspace")
			{
				my_name = my_name.slice(0,my_name.length-1);
			}
			
			else if (event.key == "Enter")
			{
				if (big_selection_rect.index < 2)
				{
					big_selection_rect.y += big_selection_rect.height;
					big_selection_rect.index += 1;
					is_entering_name = false;
					selecting_gender = true;
					if (small_selection_rect == "")
					{
						small_selection_rect = new Rect(CANVAS_WIDTH/2, CANVAS_HEIGHT/7*3.1, (CANVAS_WIDTH/2)/2, 40);
						my_gender = genders.Male;
					}
				}
			}
			//console.log(event.key);
		}
		
		else //not entering name (in startscreen)
		{
			if (selecting_gender)
			{
				//console.log(event.key)
				if (event.key == "D" || event.key == "d")
				{
					if (small_selection_rect != "")
					{
						if (small_selection_rect.index == 0)
						{
							small_selection_rect.index += 1;
							small_selection_rect.x += (CANVAS_WIDTH/2)/2;
							my_gender = genders.Female;
						}
					}
				}
				
				else if (event.key == "A" || event.key == "a")
				{
					if (small_selection_rect != "")
					{
						if (small_selection_rect.index == 1)
						{
							small_selection_rect.index -= 1;
							small_selection_rect.x -= (CANVAS_WIDTH/2)/2;
							my_gender = genders.Male;
						}
					}
				}
				
				else if (event.key == "Enter")
				{
					if (small_selection_rect.index == 0)
					{
						my_gender = genders.Male;
					}
					else
					{
						my_gender = genders.Female;
					}
					small_selection_rect = "";
					selecting_gender = false;
					selecting_career = true;
					if (small_selection_rect == "")
					{
						small_selection_rect = new Rect((CANVAS_WIDTH/2) + (CANVAS_WIDTH/2)/7*1, CANVAS_HEIGHT/7*5.1,100, 60);
						
					}
					
				}
			}
			else if(selecting_career)
			{
				//console.log(event.key)
				if (event.key == "D" || event.key == "d")
				{
					if (small_selection_rect != "")
					{
						if (small_selection_rect.index >= 0 && small_selection_rect.index < 2)
						{
							small_selection_rect.index += 1;
							small_selection_rect.x += small_selection_rect.width;
						}
					}
				}
				
				else if (event.key == "A" || event.key == "a")
				{
					if (small_selection_rect != "")
					{
						if (small_selection_rect.index <= 2 && small_selection_rect.index > 0)
						{
							small_selection_rect.index -= 1;
							small_selection_rect.x -=  small_selection_rect.width;
						}
					}
				}
				
				else if (event.key == "Enter")
				{
					
					if (small_selection_rect.index == 0)
					{
						my_career = careers.Engineer;
					}
					else if (small_selection_rect.index == 1)
					{
						my_career = careers.Food_Scientist;
					}
					else
					{
						my_career = careers.Doctor;
					}
					small_selection_rect = "";
					selecting_career = false;			
				}
			}
		
			if (event.key == "Enter") // in startscreen
			{
				if (big_selection_rect.index < 2)
				{
					big_selection_rect.y += big_selection_rect.height;
					big_selection_rect.index += 1;
				}
				else //Done startscreen selection
				{
					myself.name = my_name;
					myself.gender = my_gender;
					myself.career = my_career;
					myself.update_pic();
					
					
					if (myself.gender == Alex.gender)
					{
						if (Alex.gender == genders.Male)
						{
							Alex.gender = genders.Female;
						}
						else
						{
							Alex.gender = genders.Male
						}
					}
					
					Alex.update_pic();
					big_selection_rect = ""
					is_startscreen = false;
					is_welcomescreen = true;
				}
			}
		}
	}
	
	else if (is_welcomescreen)
	{
		if (event.key == "Enter")
		{
			is_welcomescreen = false;
			is_gamescreen = true;
			
			if (myself.career == careers.Engineer)
			{
				actions_array.push("Shield Maintenance");
				actions_array.push("Communication System Maintenance");
			}
			else if (myself.career == careers.Food_Scientist)
			{
				actions_array.push("Prepare Food");
				actions_array.push("Check on crops");
			}
			else if (myself.career == careers.Doctor)
			{
				actions_array.push("Gives Consultation");
				actions_array.push("Gives Treatment");
			}
			
			//transition timer
			transition_timer = setInterval(show_month_to_go,1500);
		}
	}

	else if (is_gamescreen)
	{
		//console.log(event.key)
		if (event.key == "j" || event.key == "J")
		{
			show_team_data = !show_team_data;
			show_problems = false;
			show_actions = false;
		}
		else if (event.key == "k" || event.key == "K")
		{
			show_team_data = false;
			show_problems = !show_problems;
			show_actions = false;
		}
		else if (event.key == "l" || event.key == "L")
		{
			show_team_data = false;
			show_problems = false;
			show_actions = !show_actions;
		}
		
		//if it is in problem/actions
		if (show_actions)
		{
			if (event.key == "w" || event.key == "W")
			{
				if (actions_selection_rect.index > 0)
				{
					actions_selection_rect.index -= 1;
					actions_selection_rect.y -= FONT_HEIGHT;
				}
			}
			else if (event.key == "s" || event.key == "S")
			{
				if (actions_selection_rect.index >= 0 && actions_selection_rect.index < actions_array.length-1)
				{
					actions_selection_rect.index += 1;
					actions_selection_rect.y += FONT_HEIGHT;
				}
			}
			else if (event.key == "Enter")
			{
				//console.log("Enter in actions pressed! index:"+actions_selection_rect.index);
				perform_action(actions_array[actions_selection_rect.index]);
				show_actions = false;
			}
		}
	}
	keysPressed[event.key] = true;
}

function handle_key_up(event)
{
	keysPressed[event.key] = false;
}

//detect mouse event
function mouse_clicked(event)
{
	let rect = game_canvas.getBoundingClientRect()
	let real_x = Math.round(event.x-rect.left);
	let real_y = Math.round(event.y-rect.top);
	//console.log("Clicked " + real_x + "," + real_y);

	//change the mute and unmute picture
	if (real_x >= CANVAS_WIDTH-ICON_WIDTH && real_y >= CANVAS_HEIGHT-ICON_HEIGHT)
	{
		if (audio.muted)
		{
			audio.muted = false;
		}
		else //mute == false
		{
			audio.muted = true;
		}
		
		swap_mute_unmute();
	}
}
game_canvas.addEventListener("click",mouse_clicked);

window.addEventListener("keydown", handle_key_down);
window.addEventListener("keyup", handle_key_up);

//30fps, 1s = 30 frame, 1 frame = (1/30)s around 30ms
setInterval(gameloop,30);





