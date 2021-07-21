import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        title: "",
        author: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        author: author
      }
    }));
  }

  getBook(id) {
    BookDataService.get(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(
      this.state.currentBook.id,
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Book was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBook() {    
    BookDataService.delete(this.state.currentBook.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/books')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBook.author}
                  onChange={this.onChangeAuthor}
                />
              </div>

              {}
            </form>

            {}

            <button
              className="btn btn-danger"
              onClick={this.deleteBook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateBook}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}