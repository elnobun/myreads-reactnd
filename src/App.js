import React from 'react'
import {Route} from 'react-router-dom';

import BookSearch from './components/BookSearch';
import BookLists from './components/BookLists';
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  /*
  First, we set the initial state of the book to an empty array.
  This will be used to hold the list of books that will be fetched
  from the Books API.
  */

  state = {
    books: []
  };

  /*
  Here, we create a function `getAllBooks`, to fetch all the books from the Books API,
  and set the books state to the Books from the API.
  */
  getAllBooks() {
    BooksAPI.getAll().then((books) => this.setState({books}))
  };

  /*
  Then we call the componentDidMount Life Cycle hook, and mount the
  getAllBooks function.
  */
  componentDidMount() {
    this.getAllBooks()
  }

  /*
  Then we declare a function `updateBookShelf`. This function takes
  two argument (book id, and shelf status). This function updates the books on the
  shelf from its current state to another state. This function will cycle between
  "currently reading", "Will Read", and "Reading".
  We achieve this by calling the Update function from the Book API, which will
  update the book 'id' parameter, on a particular shelf.
  */
  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => this.getAllBooks())
  }


  render() {
    const {books} = this.state;

    return (
        /*
        Here, we are returning the JSX representation of the
        Book Search and Book List. We are also using the REACT ROUTER to switch between
        the book search and book list components.
        */
        <div className="app">
          <Route path="/search" render={({history}) => (
              <BookSearch
                searchedBooks={books}
                onUpdateShelf={(id, shelf) => {this.updateBookShelf(id, shelf);
                history.push('/')}}
              />
          )}/>

          <Route exact path="/" render={() => (
              <BookLists
                  books={books}
                  onUpdateShelf={(id, shelf) => (this.updateBookShelf(id, shelf))}
              />
          )}/>
        </div>
    )
  }
}

export default BooksApp
