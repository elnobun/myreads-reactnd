import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AllBooks extends Component {
  /*
  we specify the types of each props we are passing in this component,
  and also setting the type to required.
  */
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };


  /*
  This event function handles the changes to the shelf of an input value
  */
  handleShelfChange = (e) => {
    this.props.onUpdateShelf(e.target.value)
  };

  render() {
    /*
    We make variable that comes from this.props, and image link from the book API
    */
    const {book} = this.props;
    const imageLink = book.imageLinks.thumbnail || book.imageLinks.smallThumbnail;

    return (
      /*
      Here, we are returning the JSX representation of the
      Book Shelf. The Book Shelf component shows the status of the
      shelf, as well as the book that is present on a particular shelf.
      */
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={{
                   width: 128,
                   height: 193,
                   backgroundImage: `url("${imageLink}")`
                 }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.handleShelfChange} value={book.shelf}>
                <option value disabled>Move to...</option>
                <option value="none">None</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default AllBooks
