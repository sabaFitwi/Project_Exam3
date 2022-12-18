# Semester Project 2

## Goal of the project

To take the skills learned over the past three semesters and create an auction website.

## Table of Contents

- [General Info](#general-information)
- [Project Requirments](#project-requirments)
- [Setup](#setup)
- [Project Status](#project-status)
- [Acknowledgements](#acknowledgements)

## General Information

This auction site plans to build a website where users can list products for auction and place bids on items that other users have listed.

A new user on the website is offered 1000 credits to use on the site. By selling goods, they can earn credits, which they can then use to purchase goods. Non-registered users can browse the listings, but only registered users can place bids on postings.

## Project Requirments

An existing application is responsible for managing all API functionality. Only the front-end application for the API is covered in this project.
The API which are using for this project can be found under Auction EndPoints in the [Noroff API documentation](https://content.noroff.dev/semester-project-2/brief.html#requirements)

### The following User stories are required

- A user with a stud.noroff.no email may register
- A registered user may login
- A registered user may logout
- A registered user may update their avatar
- A registered user may view their total credit
- A registered user may create a Listing with a title, deadline date, media gallery and description
- A registered user may add a Bid to another user’s Listing
- A registered user may view Bids made on a Listing
- A registered user may use credit to make a Bid on another user’s Listing
- An unregistered user may search through Listings

### The following technical restrictions are required:

- Must use an approved CSS Framework
  `CSS processors [x]SASS/SCSS [] PostCSS CSS frameworks [x] Bootstrap (>5) [] Tailwind (>3) [] MUI (>5)`
  Must be hosted on an approved Static Host
  Hosting services
  -GitHub Pages
  Netlify
  Must use an approved Design Application
  Must use an approved Planning Application

The following features must be automatically tested with unit tests:

- The login function returns a valid token when provided with valid credentials
- The logout function clears the token from browser storage
- The create item function creates a new item on the API

The following features must be automatically tested with end-to-end tests:

- The login form validates user inputs correctly based on API restrictions
- The create item form validates user inputs correctly based on API restrictions
- The logout button logs the user out when clicked

## Setup

To start the setup process first download/ clone the repo to your destination folder and open this file in your editor and initialise a new Git repository

`git init`

Install dependencies

`npm i`

Build CSS files from SASS

`npm run build`

### Configuring formatter

Install prettier as dev dependency

`npm install --save-dev prettier`

Install ESLint as a dev dependency

`npm install eslint --save-dev `

Setting up ESLint

`npx eslint --init`

```
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
```

Add lint to package file

```
"scripts": {
  "lint": "eslint src/**/*.js",
  "lint-fix": "eslint src/**/*.js --cache --fix"
},
```

Creating pre-commit hooks

`npx mrm@2 lint-staged`

Add lint-stage to package file

```"lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.html": [
      "prettier --write"
    ],
    "*.scss": [
      "prettier --write"
    ]
  }
```

Add settings for VSC, .vscode/settings.json

```
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript"
    ],
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[javascript][javascriptreact][typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[json][jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[css][scss][less]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
}
```
