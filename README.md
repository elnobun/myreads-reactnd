## Introduction

This is a simple React Application called MyReads.  
This application uses the [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## What You're Getting (Project Structure)
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- Components
  |-- AllBooks.js - This returns the books in the shlef, and their status
  |-- BookLists.js - This handles the List of books in its descriptive state.
  |-- BookSearch.js - This is the component that displays current books in the shelf, as well as seached books.
  |-- BookShelf.js - This is the shelf status
 +-- icons/ - Helpful images for your app. Use at your discretion.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - This is the root of the app. Contains static HTML right now.
 |-- App.css - Styles for the app. Feel free to customize this as you desire.
 |-- App.test.js - Used for testing. Provided with Create React App. 
 Testing is encouraged, but not required.
 |-- BooksAPI.js - A JavaScript API for the provided backend. 
 
 Instructions for the methods are below.
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms 
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Backend Server

The provided file [`BooksAPI.js`](src/utils/BooksAPI.js) contains the methods needed 
to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. 

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, 
which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). 
That list of terms are the _only_ terms that will work with the backend

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). 
You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## How to run Application

* Most importantly, ensure that you have [Node](https://nodejs.org/en/download/) or [Yarn](https://yarnpkg.com/en/docs/install) installed.
* Navigate to the project folder `cd myreads-reactnd`.
* In the terminal, run `npm install` or `yarn add`. This will install the contents of package.json.
* Then run `npm start` or `yarn start` to start the application.

## Contributing

This project is made possible by the generous assistance ofo collegues and coaches in the `slack community`.