import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    urlModal: '',
  };

  toggleModal = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: e,
    }));
  };

  render() {
    const { showModal, urlModal } = this.state;
    return (
      <>
        <ul className={css.imagegallery}>
          {this.props.data.map(image => {
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
      </>
    );
  }
}
