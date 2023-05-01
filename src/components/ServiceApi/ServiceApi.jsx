import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '34527642-ac518720cead8e0413be90d5a';

async function fetchApi(searchQuery, page) {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
export default fetchApi;
