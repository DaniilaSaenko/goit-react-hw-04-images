import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    modalImageURL: null,
  };

  static propeTypes = {
    key: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  handleImageClick = largeImageURL => {
    this.setState({ modalImageURL: largeImageURL });
  };

  closeModal = () => {
    this.setState(prevState => ({ modalImageURL: !prevState.modalImageURL }));
  };

  render() {
    const { webformatURL, largeImageURL, id } = this.props;
    const { modalImageURL } = this.state;

    return (
      <>
        {modalImageURL && (
          <Modal url={modalImageURL} onClose={this.closeModal} />
        )}

        <GalleryItem
          key={id}
          onClick={() => this.handleImageClick(largeImageURL)}
        >
          <GalleryItemImage src={webformatURL} alt={largeImageURL} />
        </GalleryItem>
      </>
    );
  }
}
