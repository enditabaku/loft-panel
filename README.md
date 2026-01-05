## How to run

* Clone the repo: git clone http://
* Change the directory to the downloaded folder: cd 
* Install the necessary packages: yarn install
* Run the project: npm run dev


## Built With

* https://nextjs.org/
* https://www.typescriptlang.org/
* https://v3.tailwindcss.com/
* https://eslint.org/

## Project Structure

   Package.json file
    
It contains an object with the main project information, such as project name, project version, scripts to run the project, and dependencies (packages installed) for the project
    
   Main Folders
    
    * src/components => It contains global components for the project grouped in folders based on functionality
    * src/app/(site) or src/app/auth => The display folder has subfolders named after the project screen. Each subfolder has an .tsx file which is
                  the main file to render the screen and it may also contain a child folder named components which includes components created only for that screen (not global)
    * src/services => It has subfiles with all the services for api requests grouped in subfolders based on their functionality

### Built 