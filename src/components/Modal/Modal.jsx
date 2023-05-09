import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { ModalOverlay, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root');

// export default class Modal extends Component {
//   static propTypes = {
//     selectedImage: PropTypes.string,
//     tags: PropTypes.string,
//     onClose: PropTypes.func,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const { selectedImage, tags } = this.props;

//     return createPortal(
//       <ModalOverlay onClick={this.handleBackdropClick}>
//         <ModalContainer>
//           <img src={selectedImage} alt={tags} />
//         </ModalContainer>
//       </ModalOverlay>,
//       modalRoot
//     );
//   }
// }

export default function Modal({ selectedImage, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={selectedImage} alt={tags} />
      </ModalContainer>
    </ModalOverlay>,
    modalRoot
  );
}
Modal.propTypes = {
  selectedImg: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
