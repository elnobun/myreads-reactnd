import React, {Component} from 'react'
import AllBooks from './AllBooks';
import {PropTypes} from 'prop-types';


class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };
  render() {
    const {title, books, onUpdateShelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <AllBooks
                key={index}
                book={book}
                onUpdateShelf={(shelf) => onUpdateShelf(book, shelf)}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
