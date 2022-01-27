# Important
For now, to test the code, to log as Superuser the credentials are written in 'db.json' file under the properties of Customer {username, password}. Use cypress to test the app. In the '/cypress/integration' folder there a description of various tests.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Rental Car

## DB
In this React project the goal is to simulate an application that manage the bookings of cars. The fake DB it has been done thanks to [json-server](https://github.com/typicode/json-server). 
The possible users are: Superuser and Customer. 

### Customer
Every Customer has an email and a password and others details like name, surname, date and the card id number (that in Italy normally is a string) that reflect his uniqueness in the db. Every Customer can rent a Car just one at a time and every rent request have to be denied or accepted from the Superuser. So the Customer can have multiple Bookings but not more than one Booking not accepted. 

### Car
The Car entity has some details like model, tipology (SUV, MINIVAN, CLASSIC), date of creation, his id number plate and the brand. 

### Booking
A Booking can be done from a Customer and it is relate to a Car so his property are: period of the reservations (start date/end date), the Car, the Customer, an id and a state that represents if the Superuser have accepted or denied the Booking. 

### Superuser
The goal of the Superuser is to add/cancel a Car, modify/cancel/add Customer, accept/deny/cancel Bookings.



# UI
A User can access to the application via his username and password where is put on the Customer entity. There is also a 'role' attribute that indicates if a certain Customer is just a Customer or a Superuser.

### Superuser UI
In the Superuser UI there is an Header where he can navigate through the app. There is the page for the Bookings with the appropriate actions, a page for Customers with the appropriate actions and the page of Cars with appropriate actions. Every list of entities is rappresented by a table where the user can sort by a certain field and search some data based on some filter. Every page can have at most ten elements, if more, a paging will allow the user to navigate through all the data.

### Customer UI
Also here there is an Header where he can navigate through the app. There is a page that shows all his Bookings, a page where he can update the Booking and a page where he can see and rent a Car. A Customer can update a Booking just if the initial date of the reservation is far at least two days from the new Booking.  
