export const getEmployees = async () => {
    const res = await fetch('/api/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    return res.json();
  }