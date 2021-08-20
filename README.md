To install and run the project please make sure that you have the `npm` or `yarn` package manager
installed for yarn for exmaple type on your terminal
​
### `yarn -v` 
it will show a yarn version if you can install it from https://classic.yarnpkg.com/en/docs/install/#debian-stable


### Installation   


1- clone the project repo through the command line (you can use the HTTPs provided link, I pasted the SSH one)
```bash
git clone git@github.com:MalekWahada/web_rtc_front.git
```  
** if you don't have an SSH key follow these steps https://docs.gitlab.com/ee/ssh/  and add it to your Github account  

2- create your `.env.local` file, next copy the content of the `.env` to it and define the `REACT_APP_BACK_BASE_URL`.  

e.g.: for your local environment you can put this value 
```bash
REACT_APP_BACK_BASE_URL = http://localhost:5000
```
** Please not that if you are planning to deploy it provide later in the `.env` file the deployed back URI
    


3- run the followiong command to install packages
```bash
yarn install
```

4- start the server by runnning 
```bash
yarn start
```
** if you haven't had a successful set-up of the back-client projects please refer to the internet/docs if you have experienced some errors or feel free to start an issue on the repo 😁😁😁😁😁😁😁😁😁😁😁😁😁.