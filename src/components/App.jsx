import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

import SearchingBar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import Modal from './Modal/Modal';
import Spiner from './Loader/Loader';
import LoadMoreButton from './Button/Button';

import ImageGallery from './ImageGallery/ImageGallery';
import fetchApi from './ServiceApi/ServiceApi';

axios.defaults.baseURL = 'https://pixabay.com/api/';

// export default class App extends Component {
//   static propTypes = { searchQuery: PropTypes.string };

//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     selectedImage: null,
//     alt: null,
//     status: 'idle',
//     error: null,
//   };

//   totalHits = null;

//   async componentDidUpdate(_, prevState) {
//     const { page, searchQuery } = this.state;

//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.setState({ status: 'pending' });

//       try {
//         const imageData = await fetchApi(searchQuery, page);

//         this.totalHits = imageData.total;

//         const imagesHits = imageData.hits;

//         if (!imagesHits.length) {
//           toast.warning('havent found anything, try smthg else.');
//         }

//         this.setState(({ images }) => ({
//           images: [...images, ...imagesHits],
//           status: 'resolved',
//         }));
//       } catch (error) {
//         toast.error(`Smthg went wrong, we re so sorry. ${error.message}`);
//         this.setState({ status: 'rejected' });
//       }
//     }
//   }

//   handleFormSubmit = searchQuery => {
//     if (this.state.searchQuery === searchQuery) {
//       return;
//     }
//     this.resetState();
//     this.setState({ searchQuery });
//   };

//   handleSelectedImage = (largeImageUrl, tags) => {
//     this.setState({
//       selectedImage: largeImageUrl,
//       alt: tags,
//     });
//   };

//   resetState = () => {
//     this.setState({
//       searchQuery: '',
//       page: 1,
//       images: [],
//       selectedImage: null,
//       alt: null,
//       status: 'idle',
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   closeModal = () => {
//     this.setState({
//       selectedImage: null,
//     });
//   };

//   // ---->

//   render() {
//     const { images, status, selectedImage, alt, error } = this.state;
//     return (
//       <Container>
//         <SearchingBar onSubmit={this.handleFormSubmit} />
//         <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
//         {status === 'pending' && <Spiner />}
//         {error && (
//           <h1 style={{ color: 'orangered', textAlign: 'center' }}>
//             {error.message}
//           </h1>
//         )}

//         {images.length > 0 && (
//           <ImageGallery
//             images={images}
//             selectedImage={this.handleSelectedImage}
//           />
//         )}

//         {images.length > 0 && images.length !== this.totalHits && (
//           <LoadMoreButton onClick={this.loadMore} />
//         )}

//         {selectedImage && (
//           <Modal
//             selectedImage={selectedImage}
//             tags={alt}
//             onClose={this.closeModal}
//           />
//         )}
//       </Container>
//     );
//   }
// }

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchImages() {
      setStatus('pending');
      try {
        const imageData = await fetchApi(searchQuery, page);
        setTotalHits(imageData.total);
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning('havent found anything, try smthg else.');
        }

        setImages(prevImg => [...prevImg, ...imagesHits]);
        setStatus('resolved');
      } catch (error) {
        setError(
          new Error(`Smthg went wrong, we re so sorry. ${error.message}`)
        );
        toast.error(`Sorry something went wrong.`);
        setStatus('rejected');
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    resetState();
    setSearchQuery(query);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
    setTotalHits(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <SearchingBar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === 'pending' && <Spiner />}
      {error && (
        <h1 style={{ color: 'orangered', textAlign: 'center' }}>
          {error.message}
        </h1>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
      )}

      {images.length > 0 && images.length !== totalHits && (
        <LoadMoreButton onClick={loadMore} />
      )}

      {selectedImage && (
        <Modal selectedImage={selectedImage} tags={alt} onClose={closeModal} />
      )}
    </Container>
  );
}
