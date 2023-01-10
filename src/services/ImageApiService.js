import axios from 'axios';

const postsApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export const PER_PAGE = 12;

export const getImages = async (params = {}) => {
  const { data } = await postsApi.get('/', {
    params: {
      key: '31833677-37f850fc83a2da04e94b97183',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
      ...params,
    },
  });

  return data;
};
