const inquirer = require('inquirer');
const fs = ('fs');
const createRM = require('./js/createReadMe');

const askQuestions = () => {
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Project Name?',
        
        validate: titleInput => {
            if (titleInput) {
                return true;
            }
            else {
                console.log('No Title Entered, Try Again');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter A Brief Description Of Your Project.',
        
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            }
            else {
                console.log('Enter A Description');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTableOfContents',
        message: 'Add A Table Of Contents?',
    },
    {
        type: 'input',
        name: 'installSteps',
        message: 'Enter Steps For Installation, Seperate With A '-'',
        
        validate: installStepsInput => {
            if (installStepsInput) {
                return true;
            }
            else {
                console.log('Enter Some Instruction Steps');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Explain How To Use',
        
        validate: usageInput => {
            if (usageInput) {
                return true;
            }
            else {
                console.log('Enter Usage Explanation');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCredit',
        message: 'Would You Like To Add A Credits Section?',
        default: true,
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Enter Contributor Names Separated With A '-'',
        
        validate: creditsInput => {
            if (creditsInput) {
                return true;
            }
            else {
                console.log('Enter Contributor Name(s)');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'Choose A License',
        choices: [
            'MIT',
            'Apache',
            'GPL',
            'BSD-3-Clause',
            'None'
        ],
        default: false
    },
    {
        type: "confirm",
        name: "confirmOptionals",
        message: "Would you like to add optional sections? (e.g. Features, How to Contribute, Tests)",
        default: false
    },
    
    ])
}
