import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import {PropTypes} from 'prop-types';
import AllBooks from './AllBooks';


class BookSearch extends Component {
  /*
  we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    books: []
  };

  /*
  Here, we are getting all the books from the API, and presenting
  the state of the book which the user has placed on the shelf.
  Books have the same state on both the search page and
  the main application page: If a book is on a bookshelf, with a "Current Reading" status,
  that status is reflected in search location until the book is removed from the shelf. This
  will automatically set the status to None in the search list
  */
  getAllBooks() {
    BooksAPI.getAll().then((books) => this.setState({books}))
  };

  componentDidMount() {
    this.getAllBooks()
  }

  /*
  This function updates the search query, and trims out any white space
  */
  updateQuery = (query) => {
    this.setState({query: query.trim()});
    this.searchBook(query)
  };

  /*
  This function updates the bookshelf status. If a book has not not been placed
  on the shelf, the status of that book on the shelf is set to none.
  */
  updateShelfStatus = (books) => {
    let bookLists = this.props.searchedBooks;
    for (let book of books) {
      book.shelf = 'none';
    }
    for (let book of books) {
      for (let bl of bookLists) {
        if (bl.id === book.id) {
          book.shelf = bl.shelf
        }
      }
    }
    return books
  };

  clearQuery = () => {
    this.setState({query: ''})
  };

  /*
  Here, we are returning the search result for the books in the API.
  As the User types a book, the search result is limited to a certain
  amount.
  */
  searchBook = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => book.imageLinks);
          books = this.updateShelfStatus(books);
          this.setState({books})
        }
        else {
          this.setState({books: []})
        }
      })
    } else {
      this.setState({books: [], query: ''})
    }
  };


  render() {
    const {query, books} = this.state;
    const {onUpdateShelf} = this.props;

    let showingBooks;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = books.filter((book) => match.test(book.title))

    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'));

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                     placeholder="Search by title or author"
                     value={query}
                     onChange={event => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            {showingBooks.length !== books.length && (
              <div>
                <span>Showing {showingBooks.length} of {books.length} Books</span>
                <button onClick={this.clearQuery}>Show All</button>
              </div>
            )}
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <AllBooks
                  key={book.id}
                  book={book}
                  onUpdateShelf={(shelf) => onUpdateShelf(book, shelf)}/>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookSearch;
