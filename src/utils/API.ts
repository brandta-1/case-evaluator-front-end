export const getContainers = async () => {
    const res = await fetch('/api/containers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    return res.json();
  }