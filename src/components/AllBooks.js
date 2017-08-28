import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class AllBooks extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  handleShelfChange = (e) => {
    this.props.onUpdateShelf(e.target.value)
  };

  render() {
    const {book} = this.props;
    const imageLink = book.imageLinks.thumbnail || book.imageLinks.smallThumbnail;
    return (
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
