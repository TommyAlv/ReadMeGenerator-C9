// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const { table } = require("console");
const { rejects } = require("assert");
const { resolve } = require("path");
const generateMarkdown = require('./utils/generateMarkdown');

// Questions to be used to create the read me file.
const promptQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please provide a title to continue, thank you.");
                    return false; 
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description for your project.",
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmTable",
            message: "Would you like to have a table of contents?",
            default: true
        },
        {
            type: "input",
            name: "installation",
            message: "Enter install instructions and seperate each step with a '-'",
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log("Please input install instructions to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "usage",
            message: "Enter instructions on usage and seperate each step with a '-'",
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log("Please input usage steps to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmCredits",
            message: "Would you like to add credit to contributors?",
            default: true

        },
        {
            type: "input",
            name: "credits",
            message: "Enter name for credit and seperate each name with a '-'",
            when: ({ confirmCredits }) => confirmCredits,
            validate: creditsInput => {
                if (creditsInput) {
                    return true;
                } else {
                    console.log("Please input names of those needing credit to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "license",
            message: "Select a license",
            choices: ["MIT", "Apache", "GPL", "BSD-3-Clause", "None"],
            default: "None"
        },
        {
            type: "confirm",
            name: "confirmOptionals",
            message: "Would you like to include optional sections? (Features, How to Contribute, Tests)",
            default: false
        },
        {
            type: "input",
            name: "features",
            message: "If your project has notable features list them here and separate each one with a '-'",
            when: ({ confirmOptionals }) => confirmOptionals,
            validate: featuresInput => {
                if (featuresInput) {
                    return true;
                } else {
                    console.log("Please add your features to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter steps to contribute to this project and seperate steps with a '-'",
            when: ({ confirmOptionals }) => confirmOptionals,
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log("Please add contribution steps to continue, thank you.");
                    return false;
                }
            }

        },
        {
            type: "input",
            name: "tests",
            message: "Enter testing instructions and seperate each step with a '-'",
            when: ({ confirmOptionals }) => confirmOptionals,
            validate: testsInput => {
                if (testsInput) {
                    return true;
                } else {
                    console.log("Please add steps on how to test to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address",
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("Please enter an email address to continue, thank you.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username",
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username to continue, thank you.");
                    return false;
                }
            }
        }
    ])
};

// Create a function to write README file
// This function writes the the file using the data provided and adds it to the "readMeFiles folder then provides a success message or throws an error and returns it."
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./readMeFiles/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: "Your README file has been created and added to the readMeFiles folder, thank you."
            });
        });
    })

};

// Function to run functions to generate and write file or return errors.
promptQuestions().then(readMedata => {
    return generateMarkdown(readMedata);
})
    .then(markup => {
        return writeFile(markup);
    })
    .then(result => {
        console.log(result.message);
    })
    .catch(err => {
        console.log(err);
    });
