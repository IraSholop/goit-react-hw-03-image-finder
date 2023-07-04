import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, onOpen, urlModal }) => {
  return (
    <li onClick={() => onOpen(urlModal)} className={css.imagegalleryitem}>
      <img src={url} alt="" className={css.imagegalleryitemimage} />
    </li>
  );
};

ImageGalleryItem.protoType = {
  url: PropTypes.string,
  onOpen: PropTypes.func,
  urlModal: PropTypes.string
}