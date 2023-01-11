import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, id }) => {
  const [modalImageURL, setModalImageURL] = useState(null);

  const handleImageClick = largeImageURL => {
    setModalImageURL(largeImageURL);
  };

  const closeModal = () => {
    setModalImageURL(prevState => !prevState);
  };

  return (
    <>
      {modalImageURL && <Modal url={modalImageURL} onClose={closeModal} />}

      <GalleryItem key={id} onClick={() => handleImageClick(largeImageURL)}>
        <GalleryItemImage src={webformatURL} alt={largeImageURL} />
      </GalleryItem>
    </>
  );
};

ImageGalleryItem.propeTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};