import { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import SearchingBar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import Modal from './Modal/Modal';
import Spiner from './Loader/Loader';
import LoadMoreButton from './Button/Button';

import ImageGallery from './ImageGallery/ImageGallery';
import fetchApi from './ServiceApi/ServiceApi';

axios.defaults.baseURL = 'https://pixabay.com/api/';

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
