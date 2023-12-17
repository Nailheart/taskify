const fetchApi = (url: string) => fetch(url).then((res) => res.json());

export { fetchApi };
