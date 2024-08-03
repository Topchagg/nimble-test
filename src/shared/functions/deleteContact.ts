async function deleteContact(contactId:string,token:string) {
    const baseUrl = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact';
    const url = `${baseUrl}/${contactId}`; 
  
    try {
      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json(); 
      console.log('Contact deleted successfully:', data);
      alert(`Contact deleted successfully: ${JSON.stringify(data)}`)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Something went wrong')
    }
  }
  

export default deleteContact