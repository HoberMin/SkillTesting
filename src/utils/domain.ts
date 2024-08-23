export const getDomain = () => localStorage.getItem('domain');

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
