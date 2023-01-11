import { useEffect, useState } from 'react';

import { STATUS } from '../../constants';
import { getImages, PER_PAGE as paginationLimit } from '../../services';
import { Wrapper } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Loader } from '../Loader';
import { NotFound } from '../ImageGallery/NotFound';
import { Button } from '../Button';
import Notification from '../Notification';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(STATUS.idle);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  
  useEffect(() => {
    if (search === '') {
      return;
    }
    const fetchPosts = async () => {
      setStatus(STATUS.loading);

      try {
        const data = await getImages({ page, q: search });

        if (!data.totalHits) {
          throw new Error('We have nothing for this search');
        }

        if (page !== 1) {
          setPosts(prevState => [
            ...prevState,
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            }),
          ]);
          setStatus(STATUS.success);
          setTotalImages(data.totalHits);
        } else {
          setPosts([
            ...data.hits.map(({ id, webformatURL, largeImageURL }) => {
              return { id, webformatURL, largeImageURL };
            }),
          ]);

          setStatus(STATUS.success);
          setTotalImages(data.totalHits);
        }

        if (data.totalHits === posts.length || data.hits.length < paginationLimit) {
          throw new Error('You loaded all posts');
        }
      } catch (error) {
        console.log(error);
        this.setState({ status: STATUS.error });
      }
    };
        fetchPosts();
  }, [page, search]);

    const handleSubmit = searchValue => {
    setSearch(searchValue);
    setPage(1);
    setPosts([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

    return (
      <Wrapper>
        <Searchbar onSubmit={handleSubmit} />

        {posts.length === 0 && status === STATUS.idle && 
          <Notification>Please Enter search query</Notification>
        }
        {posts.length > 0 && (
          <>
            <ImageGallery
              posts={posts}
            />
            {posts.length<totalImages ? (
              <Button onClick={handleLoadMore} />
            ) : (
              <Notification>The images are end!</Notification>
            )}
          </>
        )}
        
        {posts.length === 0 && status === STATUS.error && <NotFound />}

        {status === STATUS.loading && <Loader />}

        
      </Wrapper>
    );
  }

