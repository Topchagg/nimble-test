import { useState } from 'react';

const usePostRequest = (url:string, token:string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);

  const postRequest = async (requestData:any) => {
    setLoading(true);
    setError(null);

    console.log(requestData)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Request failed: ' + response.statusText);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, postRequest };
};

export default usePostRequest;