const URL = 'https://economia.awesomeapi.com.br';

const fetchApi = async () => {
  const result = await fetch(`${URL}/json/all`);
  return result.json();
};

export default fetchApi;
