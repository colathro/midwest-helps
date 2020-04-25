# Developing the front-end

Please follow these instructions before making any code changes on the front end

## Setting up your developer environment

1. Install [Visual Studio Code](https://code.visualstudio.com/download)
2. VS Code extensions to install
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
3. Install [Node](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/docs/install)
4. Open a terminal to the `ClientApp` directory and run the command `yarn`
   - (this installs all package dependencies)
5. Open Visual Studio Code to the `ClientApp` directory
   - **THIS IS REALLY IMPORTANT** because the `.vscode` directory has specific editor settings for this project that won't be picked up by VS Code unless `ClientApp` is the root directory
6. Get to hackin 👨‍💻

## Best practices

- When creating a component that will be referenced by other components, try to follow this folder structure
  ```
  src
    -> components
      -> [ComponentName]
        -> index.ts // contains all exports
        -> [ComponentName].tsx // main component
        -> [ComponentName].scss // any component-specific styles (don't forget to import it in the main component)
        -> [SubcomponentName].tsx // any child/subcomponent that is solely used by the main component
  ```
- Use types often. If you need good examples of how to create prop types/etc please look at existing components
- Use functional components and [React Hooks](https://reactjs.org/docs/hooks-intro.html)
