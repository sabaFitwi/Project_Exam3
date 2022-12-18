# Semester Project 2

## Goal of the project

To build an auction website using the knowledge gained over the last three semesters.

## Table of Contents

- [General Information](#general-information)
- [Project Requirments](#project-requirments)
- [Setup](#setup)
- [How to run the project locally](#how-to-run-the-project-locally)
- [Required Links](#required-Links)

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

  - CSS processors
    [x] SASS/SCSS`used`
    [ ] PostCSS
  - CSS frameworks
    [x] Bootstrap (>5)`used`
    [ ] Tailwind (>3)
    [ ] MUI (>5)

- Must be hosted on an approved Static Host

  - Hosting services
    - [ ] GitHub Pages
    - [x] Netlify`used`

- Must use an approved Design Application

  - Design applications
    - [ ] Adobe XD
    - [x] Figma`used`
    - [ ] Sketch

- Must use an approved Planning Application
  - Planning applications
    - [x] Trello`used`
    - [ ] GitHub Projects

## Setups

To start the setup process first opened a project folder in visual studio

`git init`

Installed dependencies (bootstrap)

`npm i`

Build CSS files from SASS

`npm run build`

Installed prettier as dev dependency

`npm install --save-dev prettier`

Installed ESLint as a dev dependency

`npm install eslint --save-dev `

ESLint was setup

`npx eslint --init`

pre-commit hooks were created

`npx mrm@2 lint-staged`

## How to run the project locally

First install bootstrap `npm i bootstrap`
Then open it on the live server by runing `npm run watch`

## Required Links

<table>
  <thead>
    <tr>
      <th>Resource</th>
      <td>URL</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Gantt Chart</th>
      <td><img src="https://i.ibb.co/cb75Z3Z/gantt-chart.png" alt="gantt-chart">"Gantt Chart Images</a></td>
    </tr>
    <tr>
      <th>Design Prototype</th>
      <td><a href="https://www.figma.com/file/clsxOgVTxVSzJMufZRL0Y1/project-exam-3?t=P5HQwAW1LzIpiqZD-1">Prototype</a> </td>
    </tr>
    <tr>
      <th>Style Guide</th>
      <td><a href="https://www.figma.com/file/r3m4XlfoPzC2i1xzLa98KG/style-tiles?node-id=0%3A1&t=P5HQwAW1LzIpiqZD-1">Style Guide</a></td>
    </tr>
    <tr>
      <th>Kanban Board</th>
      <td><a href="https://trello.com/invite/b/PeUzpPbS/ATTIafa5d4a05de9e10cce4d92bde2b32b76206A3818/kanban-template">Project Board Link</a></td>
    </tr>
    <tr>
      <th>Repository</th>
      <td><a href="https://github.com/sabaFitwi/Project_Exam3.git">Project Repository</a></td>
    </tr>
    <tr>
      <th>Hosted Demo</th>
      <td><a href="">Live Site</a></td>
    </tr>
  </tbody>
</table>
