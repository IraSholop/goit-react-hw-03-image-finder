import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const KEY = '37974323-76ad61b78f2a64298e7c10a6a';

export class App extends React.Component {
  state = {
    image: [],
    page: 1,
    error: null,
    loader: false,
    value: '',
    moreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page, image } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.setState({ loader: true });

      fetch(
        `https://pixabay.com/api/?key=${KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error('По вашому запиту нічого не знайдено')
          );
        })
        .then(img => {
          if (page !== prevState.page) {
            this.setState(({ image }) => ({
              image: [...image, ...img.hits],
            }));
          } else {
            this.setState({ image: img.hits });
          }
          return img;
        })
        .then(img => {
          if (img.total === image.length) {
            this.setState({ moreBtn: false });
          } else this.setState({ moreBtn: true });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ loader: false });
        });
    }
  }

  formSubmitHandler = ({ value }) => {
    this.setState({ value });
  };

  togglePage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { error, image, loader, moreBtn } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {error && <div>{error.message}</div>}
        {loader && <Loader />}
        <ImageGallery data={image} />
        {moreBtn && <Button click={this.togglePage} />}
      </>
    );
  }
}
