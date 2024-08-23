export const getDomain = () => {
  return localStorage.getItem('domain') || 'http://localhost:8080';
};

export const setDomainHTTP = (input: string) => {
  let url = input;
  if (!input.startsWith('http://')) url = 'http://' + input;

  localStorage.setItem('domain', url);
};

export const setDomainHTTPS = (input: string) => {
  let url = input;
  if (!input.startsWith('https://')) url = 'https://' + input;

  localStorage.setItem('domain', url);
};
