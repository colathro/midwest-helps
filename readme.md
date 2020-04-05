# getthehotdish
The one-stop shop for showing how all the local businesses are handling COVID-19

## Running the project locally
In order to see it in all its glory, you must run both the back-end and the front-end. However, both can be run by themselves without being dependent on the other (e.g. just running the back-end and test API calls with Postman or something).
### The back-end
1. Open `getthehotdish.csproj` in Visual Studio, then run the `getthehotdish` project
2. This runs the back-end on `localhost:5000`
### The front-end
1. Install [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/docs/install)
2. Open a terminal to the `ClientApp` directory and run the command `yarn`
   * (this installs all package dependencies)
3. Once that command is done, run `yarn start`, which runs the front-end on `localhost:3000` (and opens a browser tab to that location)
### Troubleshooting
If you get a C# error that says something along the lines of `System.ArgumentNullException: 'Value cannot be null. (Parameter 'accountKey')'`. Please annoy the contributors of this project until they give you the necessary secrets to run the thing locally.

## Developing
### The back-end
When updating API's, please update the [project's wiki](https://github.com/colathro/getthehotdish/wiki/API-Docs)
### The front-end
Please refer to the [client development readme](ClientApp/README.md) before making any code changes.
## New Features and Bugs
Please use the [repository issues page](https://github.com/colathro/getthehotdish/issues) to record any future work

## API Docs
Check out the [wiki page](https://github.com/colathro/getthehotdish/wiki/API-Docs)
