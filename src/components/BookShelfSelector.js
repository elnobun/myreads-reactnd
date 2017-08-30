import React, {Component} from 'react';
import PropTypes from 'prop-types';


class BookShelfSelector extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  };
  render(){
    const {book, books, onUpdateShelf} = this.props;

    // Let the current shelf status be set to 'none'
    let currentShelf = 'none';

    // If a book is in a shelf list, set the current shelf status to the book shelf
    for (let item of books) {
      if (item.id === book.id) {
        currentShelf = item.shelf;
        break
      }
    }
    return (
      <div className="book-shelf-changer">
        <select  onChange={(event) => onUpdateShelf(book, event.target.value)}
                 defaultValue={ currentShelf }>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfSelector
