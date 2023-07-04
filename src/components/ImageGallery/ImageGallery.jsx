import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    image: [],
    showModal: false,
    page: 1,
    urlModal: '',
    error: null,
    status: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.Value !== prevProps.Value ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=37974323-76ad61b78f2a64298e7c10a6a&q=${this.props.Value}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
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
          if (this.state.page !== prevState.page) {
            this.setState(({ image }) => ({
              image: [...image, ...img.hits],
              status: 'resolved',
            }));
          } else {
            this.setState({ image: img.hits, status: 'resolved' });
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: e,
    }));
  };

  togglePage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { image, showModal, urlModal, error, status } = this.state;

    // if (image !== [] && image.length < 1) {
    //   return  <div>По вашому запиту нічого не знайдено</div>;
    // }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.imagegallery}>
            {image &&
              image.map(image => {
                return (
                  <ImageGalleryItem
                    key={image.id}
                    url={image.webformatURL}
                    urlModal={image.largeImageURL}
                    onOpen={this.toggleModal}
                  />
                );
              })}
          </ul>
          {showModal && <Modal onClose={this.toggleModal} url={urlModal} />}
          {image && <Button click={this.togglePage} />}
        </>
      );
    }
  }
}
