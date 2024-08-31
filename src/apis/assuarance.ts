import { useMutation } from '@tanstack/react-query';

import { QASchema } from '@/pages/QualityAssurance';

const postAssuarance = async (data: QASchema) => {
  return await fetch(`http://52.79.151.220:8080/qa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const postAssuranceAPI = () => {
  const { mutate } = useMutation({
    mutationFn: (data: QASchema) => postAssuarance(data),
  });

  return mutate;
};
