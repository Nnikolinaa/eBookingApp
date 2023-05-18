import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

export default class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory  = this.onChangeCategory.bind(this);
        this.onChangeCoverImage = this.onChangeCoverImage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            author: '',
            description: '',
            category:'',
            coverImage: '',
        }
    }

    onChangeTitle(b){
        this.setState({
            title: b.target.value
        });
    }

    onChangeAuthor(b){
        this.setState({
            author: b.target.value
        });
    }

    onChangeDescription(b){
        this.setState({
            description: b.target.value
        });
    }

    onChangeCategory(selectedOption){
        this.setState({
            category: selectedOption.value,
        });
    }

    onChangeCoverImage(b){
        this.setState({
            coverImage: b.target.value
        });
    }


    onSubmit(b) {
        b.preventDefault();
    
        const book = {
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
          category: this.state.category,
          coverImage: this.state.coverImage
        };
    
        axios.post('http://localhost:5000/books/add', book)
          .then(res => console.log(res.data))
          .catch(err => console.log("Error submitting form: ", err));
    
        this.setState({
          title: '',
          author: '',
          description: '',
          category: '',
          coverImage: ''
        });
      }

    render() {


        const categoryOptions = [
            { value: 'Fiction', label: 'Fiction' },
            { value: 'Non-Fiction', label: 'Non-Fiction' },
            { value: 'Science Fiction', label: 'Science Fiction' },
            { value: 'Mystery', label: 'Mystery' },
            { value: 'Thriller', label: 'Thriller' },
            { value: 'Horror', label: 'Horror' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Biography', label: 'Biography' },
            { value: 'Autobiography', label: 'Autobiography' },
            { value: 'Action & Adventure Fiction', label: 'Action & Adventure' },
            { value: 'Art', label: 'Art' },
            { value: 'Award Winners & Critics\' Choice', label: 'Award Winners & Critics\' Choice' },
            { value: 'Biography & Memoir', label: 'Biography & Memoir' },
            { value: 'Business', label: 'Business' },
            { value: 'Career & Growth', label: ' Career & Growth' },
            { value: 'Children\'s', label: 'Children\'s' },
            { value: 'Classics', label: 'Classics' },
            { value: 'Comics & Graphic Novels', label: 'Comics & Graphic Novels' },
            { value: 'Computers', label: ' Computers' },
            { value: 'Contemporary Fiction', label: 'Contemporary' },
            { value: 'Cooking, Food & Wine', label: 'Cooking, Food & Wine' },
            { value: 'Erotica', label: 'Erotica' },
            { value: 'Finance & Money Management', label: 'Finance & Money Management' },
            { value: 'Foreign Language Studies', label: 'Foreign Language Studies' },
            { value: 'Games & Activities', label: 'Games & Activities' },
            { value: 'General Fiction', label: 'General' },
            { value: 'Historical Fiction', label: 'Historical' },
            { value: 'History', label: 'History' },
            { value: 'Home & Garden', label: 'Home & Garden' },
            { value: 'Horror Fiction', label: 'Horror' },
            { value: 'Humor & Satire', label: 'Humor & Satire' },
            { value: 'Identity & Culture Fiction', label: 'Identity & Culture' },
            { value: 'LGBTQIA+ Fiction', label: 'LGBTQIA+' },
            { value: 'Language Arts & Discipline', label: 'Language Arts & Discipline' },
            { value: 'Law', label: 'Law' },
            { value: 'Lifestyle', label: 'Lifestyle' },
            { value: 'Literary Criticism', label: 'Literary Criticism' },
            { value: 'Literary Fiction', label: 'Literary' },
            { value: 'Mystery, Thriller & Crime Fiction', label: 'Mystery, Thriller & Crime' },
            { value: 'News', label: 'News' },
            { value: 'Pets', label: 'Pets' },
            { value: 'Philosophy', label: 'Philosophy' },
            { value: 'Poetry', label: 'Poetry' },
            { value: 'Politics', label: 'Politics' },
            { value: 'Reference', label: 'Reference' },
            { value: 'Religion & Spirituality', label: 'Religion & Spirituality' },
            { value: 'Novel', label: 'Novel' },
          ];

        const stars = [];
        for (let i = 1; i <= this.state.ratings; i++) {
          stars.push(<span key={i} className="fa fa-star checked"></span>);
        }
        for (let i = this.state.ratings + 1; i <= 5; i++) {
          stars.push(<span key={i} className="fa fa-star"></span>);
        }


        return (
            <div>
               <h3>Add a New Book</h3>
               <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                 type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
                </div>
                <div className="form-group">
                    <label>Author: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.author}
                    onChange={this.onChangeAuthor}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Category: </label>
                    <Select
              options={categoryOptions}
              value={categoryOptions.find(option => option.value === this.state.category)}
              onChange={this.onChangeCategory}
              placeholder="Select a category"
            />
                </div>
                <div className="form-group">
                    <label>Cover Image: </label>
                    <input type="text"
                required
                className="form-control"
                value={this.state.coverImage}
                onChange={this.onChangeCoverImage}
                />
                </div>
                <img src={this.state.coverImage} alt="" />

                <div className="form-group">
                <button type="submit" className="btn btn-primary">Create Book</button>
                </div>
               </form>
            </div>
        )
    }
}