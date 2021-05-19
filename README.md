# Consumer App

This repo is the fytr consumer app used by users who can order meals.

# Setup

### Install React Native
 Link to react-native offical docs: https://reactnative.dev/docs/environment-setup.

Make sure install react native locally before going through the setup: `npm install react-native`.


# Running storybook

React Native is a little weird with storybook. In order for it to work the storybook component in `./storybook/index.js` needs to be returned as the root component of the react app. Here are the steps to running storybook.

1. Make sure in `App.tsx` the default export in `export default Storybook;`

2. Run storybook `yarn storybook`. This will launch storybook on port 7007 and it will be waiting for you to start your emulator. Open it on in the browser **not on the device**.

3. Run the ios app. In one terminal run `yarn start` to run the bundler. In another terminal run `yarn ios`.

4. Refresh storybook in the browser and put it side to side with the emulator. You should see something like this:

![](react-native-storybook.gif)
