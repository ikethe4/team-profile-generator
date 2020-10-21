const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// const universalQuestions = [{
//     type: "input",
//     message: "What is your name?",
//     name: "name"

// },
// {
//     type: "input",
//     message: "What is your email?",
//     name: "email"

// },
// {
//     type: "input",
//     message: "What is your id?",
//     name: "id"

// },
// ]
const teamMembers = [];

const engineerQuestions = [{
    type: "input",
    message: "What is your name?",
    name: "name"

},
{
    type: "input",
    message: "What is your email?",
    name: "email"

},
{
    type: "input",
    message: "What is your id?",
    name: "id"

},
{
    type: "input",
    message: "What is your github username?",
    name: "github"

},
]

const internQuestions = [{
    type: "input",
    message: "What is your name?",
    name: "name"

},
{
    type: "input",
    message: "What is your email?",
    name: "email"

},
{
    type: "input",
    message: "What is your id?",
    name: "id"

},
{

    type: "input",
    message: "What school do you attend?",
    name: "school"

},]

const managerQuestions = [{
type: "input",
message: "What is your name?",
name: "name"

},
{
type: "input",
message: "What is your email?",
name: "email"

},
{
type: "input",
message: "What is your id?",
name: "id"
},
{
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
},
]

const employeeType = [{
    type: "checkbox",
    message: "Which type of employee would you like to select?",
    choices: ["Manager", "Intern", "Engineer", "Quit"],
    name: "choice"
}];



function employeeSelect(){
    inquirer.prompt(employeeType).then(function(response){
        const choice = response.choice[0];
        if (choice === "Manager"){
            addManager();
        }
        if (choice === "Intern"){
            addIntern();
        }
        if (choice === "Engineer"){
            addEngineer();
        }
        if (choice === "Quit"){
            //send to renderhtml
            renderToHTML();
        }
    
    })
}
employeeSelect();

function addManager(){
    inquirer.prompt(managerQuestions).then(function(answers){
       const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);
       teamMembers.push(manager);
       employeeSelect();
   
    })

}

function addIntern(){
    inquirer.prompt(internQuestions).then(function(answers){
       const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
       teamMembers.push(intern);
       employeeSelect();
   
    })

}

function addEngineer(){
    inquirer.prompt(engineerQuestions).then(function(answers){
       const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);
       teamMembers.push(engineer);
       employeeSelect();
   
    })

}

function renderToHTML(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log("success")
    console.log(teamMembers);
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
