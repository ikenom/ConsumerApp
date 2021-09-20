# Consumer App

# Setup

### Install React Native
 Link to react-native offical docs: https://reactnative.dev/docs/environment-setup.

Make sure install react native locally before going through the setup: `npm install react-native`.

### Install XCode
Link to apple store: https://apps.apple.com/us/app/xcode/id497799835?mt=12

Configure a few devices on Xcodes simulator: https://developer.apple.com/documentation/xcode/running-your-app-in-the-simulator-or-on-a-device

The iphone 8, iphone X and iphone 12 are usually the different screens we use for validating UI.


# First time running app
We use `yarn` as the package manager for the app.

1. Clone the repository locally `git clone https://github.com/ikenom/ConsumerApp.git`.
2. Install dependencies with `yarn install`.
3. Make sure you have created an iPhone X and iPhone 8 in your xcode simulator.
4. Run the app `yarn ios`. This should open the aoo in the ios emulated device.



# Running storybook

React Native is a little weird with storybook.

1. Make sure in `App.tsx` to uncomment the storybook code at the bottom of the file: https://github.com/ikenom/ConsumerApp/blob/master/App.tsx#L83 

2. Run the app `yarn ios`. This will launch storybook on your device emulator.

