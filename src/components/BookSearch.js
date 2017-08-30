import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';
import AllBooks from './AllBooks';


class BookSearch extends Component {
  /*
  we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    newBook: [],
    noSearch: false
  };

  /*
  Here, we are getting all the books from the API, and presenting
  the state of the book which the user has placed on the shelf.
  Books have the same state on both the search page and
  the main application page: If a book is on a bookshelf, with a "Current Reading" status,
  that status is reflected in search location until the book is removed from the shelf. This
  will automatically set the status to None in the search list
  */

  // getAllBooks() {
  //   BooksAPI.getAll().then((books) => this.setState({books}))
  // };

  // componentDidMount() {
  //   this.getAllBooks()
  // }
  //
  // /*
  // This function updates the search query, and trims out any white space
  // */
  // updateQuery = (query) => {
  //   this.setState({query: query.trim()});
  //   this.searchBook(query)
  // };
  //
  // /*
  // This function updates the bookshelf status. If a book has not not been placed
  // on the shelf, the status of that book on the shelf is set to none.
  // */
  // updateShelfStatus = (books) => {
  //   let bookLists = this.props.searchedBooks;
  //   for (let book of books) {
  //     book.shelf = 'none';
  //   }
  //   for (let book of books) {
  //     for (let bl of bookLists) {
  //       if (bl.id === book.id) {
  //         book.shelf = bl.shelf
  //       }
  //     }
  //   }
  //   return books
  // };

  searchedBooks = (event) => {
    const query = event.target.value;
    this.setState({query: query});

    // Begin the search as user types in data
    // If the user search get results, the search error is not shown.
    // Otherwise, a no search error is raised.
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        books.length > 0 ? this.setState({newBook: books, noSearch: false}) : this.setState({
          newBook: [],
          noSearch: true
        })
      })
    } else {
      //  Everything is back to default
      this.setState({newBook: [], noSearch: true})
    }
  };

  clearQuery = () => {
    this.setState({query: ''})
  };

  /*
  Here, we are returning the search result for the books in the API.
  As the User types a book, the search result is limited to a certain
  amount.
  */
  // searchBook = (query) => {
  //   if (query.length !== 0) {
  //     BooksAPI.search(query, 10).then((books) => {
  //       if (books.length > 0) {
  //         books = books.filter((book) => book.imageLinks);
  //         books = this.updateShelfStatus(books);
  //         this.setState({books})
  //       }
  //       else {
  //         this.setState({books: []})
  //       }
  //     })
  //   } else {
  //     this.setState({books: [], query: ''})
  //   }
  // };


  render() {
    const {query, newBook, noSearch} = this.state;
    const {books, onUpdateShelf} = this.props;

    let showingBooks;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = newBook.filter((book) => match.test(book.title))

    } else {
      showingBooks = newBook
    }

    showingBooks.sort(sortBy('title'));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={query}
                   onChange={this.searchedBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length > 0 && (
            <div>
              <div className="">
                <span>Showing {showingBooks.length}  Books</span>
                {/*<button onClick={this.clearQuery}>Show All</button>*/}
              </div>

              <ol className="books-grid">
                {showingBooks.map((book) => (
                  <AllBooks
                    key={book.id}
                    book={book}
                    books={books}
                    onUpdateShelf={onUpdateShelf}/>
                ))}
              </ol>
            </div>
          )}
          {noSearch && (
            <div>
              <div className="">
                <h3>Searching....</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BookSearch;
