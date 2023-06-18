import { Button } from './Button/Loader';
import { fetchImages } from './helpers/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      return;
      // alert('Введи щось');
    }

    setLoading(true);

    fetchImages(query, page).then(images => {
      setLoading(false);
      setLoadMore(true);
      console.log(images);

      if (images.length >= 12) {
        addImages(images);
        return;
      }
      if (images.length <= 12 && images.length !== 0) {
        addImages(images);
        setLoadMore(false);
        return;
      }
      if (images.length === 0) {
        alert(`There are no images of ${query}`);
        setLoadMore(false);
      }
    });
  }, [query, page]);

  const addImages = images => {
    console.log('set');
    setImages(prevImages => {
      return [...prevImages, ...images];
    });
  };

  const resetData = () => {
    setPage(1);
    setImages([]);
    setLoadMore(false);
  };
  const handleSubmit = query => {
    if (query.trim() === '') alert('Enter your search query');
    setQuery(query);
    resetData();
  };
  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
    console.log(page);
  };
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {loadMore && <Button onClick={handleLoadMoreClick} />}
      {loading && (
        <Loader
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </>
  );
};
