import React, {Component} from 'react'
import AllBooks from './AllBooks';
import PropTypes from 'prop-types';


class BookShelf extends Component {
  /*
  we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };
  render() {

    /*
    We make variables that comes from this.props
    */
    const {title, books, onUpdateShelf} = this.props;

    return (
      /*
      Here, we are returning the JSX representation of the
      Book Shelf. The Book Shelf component shows the status of the
      shelf, as well as the book that is present on a particular shelf.
      */
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <AllBooks
                key={book.id}
                book={book}
                books={books}
                onUpdateShelf={onUpdateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
