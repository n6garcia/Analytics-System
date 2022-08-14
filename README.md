# Analytics-System
Bespoke analytics system for portfolio website which logs most basic data about the user and assigns them an ID

## How it works
The project has two parts, a collector script and a REST Endpoint for the script to consume. The REST endpoint interfaces with MYSQL Database to store data on the server. each entry within the Database contains the users ID and time of when the data is collected.

## Data Collected
misc client data like agent string and screen dimensions, page load time, any user activity like clicks, mouse move, scroll etc...
