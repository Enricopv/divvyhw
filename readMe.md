# Divvy HW For Mobile Software Engineer Position

Hello there! Here is repo for the homework assignment. I had intially wanted to do a bunch of fancy stuff with react-native-renanimated2, but I opted to focus on:

- Only wanting to use one Line Graph component with many props available to allow for customization
- Ability to add any number of data sets AND chart options to configure their color
- Interacting with the graph through JavaScript to native iOS
- Updating the UI via native iOS chart interaction to JavaScript state

I look forward to hearing from you all!

# Running the project
It is built for iOS. To run build and run this project you will need to:

- `yarn install`
- 'cd ios'
  - If M1 mac user do: `arch -x86_64 pod install`
  - If not M1 mac user: `pod install`
- 'cd ..' to the root directory
- `yarn ios --simulator="iPhone 13"


