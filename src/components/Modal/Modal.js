import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ image, onBackDrop, tags, onEscape }) => {
  useEffect(() => {
    const onCloseByEsc = event => {
      if (event.code === 'Escape') {
        onEscape();
      }
    };
    window.addEventListener('keydown', onCloseByEsc);

    console.log('mount');
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
      console.log('unmount');
    };
  }, [onEscape]);

  // componentDidMount(prevProps, prevState) {
  //   window.addEventListener('keydown', this.onCloseByEsc);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onCloseByEsc);
  // }

  return (
    <Overlay className="overlay" onClick={onBackDrop}>
      <ModalWindow className="modal">
        <img src={image} alt={tags} width="500px" height="600px" />
      </ModalWindow>
    </Overlay>
  );
};
Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onBackDrop: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
