import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types'

class BookLists extends Component {

  /*
  First, we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  /*
  Here, an array that nests the shelf status of all the
  books is implemented. We are assigning the book state to a particular status.
  The status of the book, is based on the book on the shelf
  */
  shelves = [
    {
      status: `currentlyReading`,
      title: `Currently Reading`
    },
    {
      status: `wantToRead`,
      title: `Want To Read`
    },
    {
      status: `read`,
      title: `Read`
    }
  ];

  render() {
    /*
    We make variables that comes from this.props
    */
    const {books, onUpdateShelf} = this.props;
    const shelves = this.shelves;

    return (
      /*
      Here, we are returning the JSX representation of the
      Book List, which is the parent of the Book Shelf component. The
      Book List component is passed to the App.js to be displayed in the
      DOM. It carries the properties of the child component 'Book Shelf',
      to App.js, which also displays this to the DOM.
      */
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, index) => (
              <BookShelf
                key={index}
                title={shelf.title}
                books={books.filter((book) => book.shelf === shelf.status)}
                onUpdateShelf={onUpdateShelf}
              />
            ))}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BookLists;
