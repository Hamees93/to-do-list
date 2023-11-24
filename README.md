## Prerequisites:

Node.js: Ensure you have Node.js installed on your system. You can download and install it from the official website: https://nodejs.org/en/download

## Installation:

1. Clone the Repository: Clone the Git repository containing the React todo app to your local machine. You can use the following command in your terminal:
   `git clone https://github.com/Hamees93/to-do-list.git`

2. Navigate to Project Directory: Navigate to the directory containing the cloned React todo app using the following command:
   `cd <project-directory>`

Replace <project-directory> with the name of the directory where you cloned the repository.

3. In the project directory, Install Dependencies: Install the project's dependencies using the following command:
   `npm install`

This will install all the necessary dependencies for the React todo app.

4. Running the Project:

Start the Development Server: Start the development server using the following command:
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Brief explanation of Redux Toolkit's role in your project.

# State Management:

The todosSlice slice encapsulates the state related to todos, including the list of todos, loading status, error, filter, search, and sort criteria. This modular approach keeps the state management logic organized and separated from other parts of the application.

# Action Creation:

The fetchTodos action is an asynchronous action that fetches todos data from an external API. It utilizes the createAsyncThunk function provided by Redux Toolkit to handle the asynchronous nature of the operation.

# Reducer Definition:

The todosSlice slice defines reducer functions that handle different actions, such as toggling a todo's completion status, removing a todo, setting the filter, search, or sort criteria, and adding a new todo. The createSlice function simplifies reducer definition by automatically generating action creators and action types.

# Selector Creation:

The selectTodos, selectSearch, selectFilter, and selectSort selectors efficiently retrieve specific portions of the state. The createSelector function ensures that selectors are memoized, preventing unnecessary recomputations.

# Extra Reducers:

The extraReducers section handles the asynchronous action responses for fetchTodos. It updates the state with the fetched todos data, sets the loading status to false, and saves the updated todos to local storage.

# Default Behaviors:

Redux Toolkit provides default behaviors for actions, reducers, and selectors, ensuring consistent and predictable behavior throughout the application. For instance, it automatically generates action types and handles the initial state for slices.

# Error Handling:

The fetchTodos action utilizes the rejected action case to handle potential errors during the API call. It sets the error state and updates the loading status accordingly.

# Boilerplate Reduction:

Redux Toolkit eliminates the need for repetitive boilerplate code, such as manually defining action types and action creators. This simplifies the development process and reduces the risk of errors.

In summary, Redux Toolkit plays a significant role in this project by providing a structured and efficient approach to state management, action creation, reducer definition, selector creation, error handling, and boilerplate reduction. Its features contribute to a more maintainable and performant codebase.
