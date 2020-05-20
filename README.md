    ## Project -3 Name?

## Authors 

- Fatima Romagnoli
- Marissol Karczeski
- Anna Panayiotou
- Huong Nguyen

## Overview

This is an application to support parents to motivate kids to work on their chores. There will be two types of users:a parent or caregiver and a child. Both of them will need to login to have access to the website. The parent/caregiver will choose a list of chores for the child who will login and see what are the tasks/chores that she/he needs to accomplish for the day/week... 
After completing the designated chore, the child will mark it as complete and earn points for it. There will be different number of points depending on what the parent/caregiver had chosen when setting up the list of chores. After having all of the items on the list as "completed," the child would be rewarded. Rewards decisions are for the parents to decide. 

## Debug 

In order to run this app in your local environment, run the following commands:
1) npm install
2) npm run-script dev

The server code will run on port 8080 and the React app on port 3000.

## Seed the database

Extract the file \server\database\mongo_seed.zip in any any folder and run the file run.bat
This will create a user "mom" with a password "mom" with one child and two chores.
Once we go to the home page, it should show these tasks, and when the "mom" logs in, she should
see the configuration page to add chores and children.

## Github