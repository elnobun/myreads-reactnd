import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelfSelector from './BookShelfSelector';

class AllBooks extends Component {
  /*
  we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };


  /*
  This event function handles the changes to the shelf of an input value
  */
  // handleShelfChange = (e) => {
  //   this.props.onUpdateShelf(e.target.value)
  // };

  render() {
    // We make variable that comes from this.props, and image link from the book API
    const {book, books, onUpdateShelf} = this.props;

    // Create a fallback for missing title, author name or images.
    const title = book.title ? book.title : 'No title';
    const authors = (book.authors === undefined) ? [] : book.authors;
    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'noCover';



    return (
      /*
      Here, we are returning the JSX representation of the
      Book Shelf. The Book Shelf component shows the status of the
      shelf, as well as the book that is present on a particular shelf.
      */
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={{
                   width: 128,
                   height: 193,
                   backgroundImage: `url(${coverImg})`
                 }}></div>
            <BookShelfSelector
              book={book}
              books={books}
              onUpdateShelf={onUpdateShelf}
            />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{`by ${authors.join(', ')}`}</div>
        </div>
      </li>
    )
  }
}

export default AllBooks
