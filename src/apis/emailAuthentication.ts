import { useMutation } from '@tanstack/react-query';

import { Authentication, EmailForm } from '@/pages/Email';

interface EmailResponse {
  isOk: boolean;
}

interface AuthenticationResponse {
  isSuccess: boolean;
}

const postEmail = async (data: EmailForm, domain: string) => {
  return await fetch(`${domain}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as EmailResponse);
};

const postAuthentication = async (data: Authentication, domain: string) => {
  return await fetch(`${domain}/authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as AuthenticationResponse);
};

export const postEmailAPI = (domain: string) => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: EmailForm) => postEmail(data, domain),
  });

  return mutateAsync;
};

export const postAuthenticationAPI = (domain: string) => {
  const { mutateAsync } = useMutation({
    mutationFn: (data: Authentication) => postAuthentication(data, domain),
  });

  return mutateAsync;
};
