import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  handleFormSubmit = pictureName => {
    console.log(pictureName);
  };
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=34527642-ac518720cead8e0413be90d5a&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(picture => this.setState({ picture }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {this.state.loading && <h1>Загружаем...</h1>} */}

        {/* {this.state.picture && <div>{this.state.picture.id}</div>} */}
      </div>
    );
  }
}
