import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };
  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      handleToggleModal();
    }
  };

  return (
    <>
      <Item className="gallery-item">
        <Image src={webformatURL} alt={tags} onClick={handleToggleModal} />
      </Item>
      {isOpen && (
        <Modal
          image={largeImageURL}
          onBackDrop={handleBackDropClick}
          onEscape={handleToggleModal}
          tags={tags}
        />
      )}
    </>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
