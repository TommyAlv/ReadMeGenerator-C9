// Function that will format the responses and returns items on seperate lines.
const formatSection = (section) => {
  let items = [];
  section.split("-").map((word) => {
    items.push(word.trim());
  });
  return `${items.join("\n- ")}`;
};
// Create a function that returns a license badge based on which license is passed in
const renderLicenseBadge = (license) => {
  if (license === "None") {
    return `[![License](https://img.shields.io/static/v1?label=License&message=Unlicense&color=critical&style=for-the-badge)](https://opensource.org/licenses/unlicense)`;
  }
  if (license === "GPL") {
    return `[![License](https://img.shields.io/static/v1?label=License&message=GPL&color=yellow&style=for-the-badge)](https://opensource.org/licenses/GPL-3.0)`;
  }
  if (license === "MIT") {
    return `[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=for-the-badge)](https://opensource.org/licenses/MIT)`;
  }
  if (license === "Apache") {
    return `[![License](https://img.shields.io/static/v1?label=License&message=Apache&color=blue&style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)`;
  }
  if (license === "BSD-3-Clause") {
    return `[![License](https://img.shields.io/static/v1?label=License&message=BSD&color=yellowgreen&style=for-the-badge)](https://opensource.org/licenses/BSD-3-Clause)`;
  }
};

// Create a function that returns the license link
const renderLicenseLink = (license) => {
  if (license === "None") {
    return `(https://opensource.org/licenses/unlicense)`;
  }
  if (license === "GPL") {
    return `(https://opensource.org/licenses/GPL-3.0)`;
  }
  if (license === "MIT") {
    return `(https://opensource.org/licenses/MIT)`;
  }
  if (license === "Apache") {
    return `(https://opensource.org/licenses/Apache-2.0)`;
  }
  if (license === "BSD-3-Clause") {
    return `(https://opensource.org/licenses/BSD-3-Clause)`;
  }
};

//  Create a function that returns the license section of README
const renderLicenseSection = (license, username) => {
  if (license === "None") {
    return `
  ## License
  Currently this project is not under a [license]${renderLicenseLink(license)}.
      `;
  }

  return `
  ## License
  Copyright (c) ${username}. All rights reserved.
  Licensed under the [${license}]${renderLicenseLink(license)} license.
    `;
};

const addCredits = (credits) => {
  if (!credits) {
    return "";
  }
  return `
  ## Credits
  ${formatSection(credits)}`;
};
const generateTable = (table, credits, optionals) => {
  if (!table) {
    return "";
  }

  if (!optionals && !credits) {
    return `
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)
    `;
  } else if (!optionals && credits) {
    return `
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)
    `;
  } else if (optionals && !credits) {
    return `
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Features](#features)
  - [How to Contribute](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
    `;
  } else if (optionals && credits) {
    return `
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
  - [How to Contribute](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
    `;
  }
};

const optionalSections = (optional, optionals) => {
  if (!optional) {
    return "";
  }

  return `
  ## Features
  ${formatSection(optionals.features)}
  
  ## Contributing
  ${formatSection(optionals.contributing)}
  
  ## Tests
  ${formatSection(optionals.tests)}`;
};


//  Create a function to generate markdown for README
// exports this function to be used in the index.js
module.exports = (generateMarkdown) => {
  const {
    title,
    description,
    confirmTable,
    installation,
    usage,
    confirmCredits,
    credits,
    license,
    confirmOptionals,
    ...rest
  } = generateMarkdown;

  return `
  # ${title}   ${renderLicenseBadge(license)}
    
  ## Description
  ${description}
  
  ${generateTable(confirmTable, confirmCredits, confirmOptionals)}
  
  ## Installation
  ${formatSection(installation)}
  
  ## Usage
  ${formatSection(usage)}
  
  ${addCredits(credits)}
  ${renderLicenseSection(license, rest.username)}
  ${optionalSections(confirmOptionals, rest)}
  
  ## Questions
  If you have any questions about the repo, open an issue or contact [via email](mailto:${rest.email
    }). or [on GitHub](https://github.com/${rest.username}).
    `;
};