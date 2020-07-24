## ChoreZ

## Authors 

- Fatima Romagnoli
- Marissol Karczeski
- Anna Panayiotou
- Huong Nguyen

## Overview

This is an application to support parents to motivate kids to work on their chores. There will be two types of users:a parent or caregiver and a child. Both of them will need to login to have access to the website. The parent/caregiver will choose a list of chores for the child who will login and see what are the tasks/chores that she/he needs to accomplish for the day/week... 
After completing the designated chore, the child will mark it as complete and earn points for it. There will be different number of points depending on what the parent/caregiver had chosen when setting up the list of chores. After having all of the items on the list as "completed," the child would be rewarded. Rewards decisions are for the parents to decide. 

## References

This project was based off many tutorials and post at StackOverflow.
The most important are the following:
- Full stack app with NodeJS, React, and MongoDB: https://dev.to/thisk8brd/my-fullstack-setup-node-js-react-js-and-mongodb-2a4k
- MERN app with passport authentication: https://medium.com/@brendt_bly/simple-mern-passport-app-tutorial-4aec2105e367
- Using Boostrap with React: https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121/
- How to deploy a React+NodeJS+MongoDB app to Heroku: https://dev.to/pacheco/how-to-deploy-a-webapp-to-heroku-node-js-react-js-and-mongodb-5a7g 


## Debug 

In order to run this app in your local environment, run the following commands:
1) npm install
2) npm run dev

The server code will run on port 8080 and the React app on port 3000.

## Debug Heroku deployment

You will need to install the Heroku-CLI before you can monitor the logs.
1) Install the Heroku-CLI for your machine from here: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
2) Start a Windows Command Prompt (CMD) or Git Bash and enter the following command: heroku logs -t --app chorezz

## Seed the database

Extract the file \server\database\mongo_seed.zip in any any folder and run the file run.bat
This will create a user "mom" with a password "mom" with one child and two chores.
Once we go to the home page, it should show these tasks, and when the "mom" logs in, she should
see the configuration page to add chores and children.

## Heroku

Test the current deployment by going to the following URL:
https://chorezz.herokuapp.com/


## Github

- https://github.com/solka2019/ChoreZ