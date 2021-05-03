# Random-GitHub-Status
Randomly selects a status from a list and sets it as your GitHub status. This is really nothing special. Just for fun.

## Usage
I've made this project so it can be hosted on vercel and called via a service like easycron and this readme will show how I did that. First,
create a list of statuses that the script will pull from by changing the contents of `status.json`.
We need to set some environment variables for the application to work, so add a .env file or, if you are deploying this on vercel, add them through vercel. 
The first we need to set is the `GITHUB_USER_TOKEN`. This is a personal access token which the user scope. Next is the `REQUEST_PASSWORD`. This is a string that 
a request needs to set to make sure no one else can change your status if you are hosting this script online. Now you are ready to use the script. Deploy it on
vercel and create a easycron job that calls the endpoint and has the `password` query argument set to the password you've set.
