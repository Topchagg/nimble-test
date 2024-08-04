import { useState } from 'react';

const usePutRequest = (url:string, token:string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [putError, setPutError] = useState<any>(null);

  const putRequest = async (requestData:any) => {
    setLoading(true);
    setPutError(null);

    try {
      const response = await fetch(url, {
        method: 'PUT',
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
      setPutError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, putError, putRequest };
};

export default usePutRequest;