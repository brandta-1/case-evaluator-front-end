export interface Cases {
  image: string;
  name: string;
  roi: number;
  price: number;
}

/*
export const getContainers = async () => {
  try {
    return await fetch('/containers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if(res.status !== 200){
        return res.status;
      }

      res.json().then(res => {
        const caseArray: Cases[] = res.json().map((i: Cases) => ({
          name: i.name,
          image: i.image,
          price: i.price,
          roi: i.roi
        }));
        return caseArray;
      });
    });
  } catch(e){
   console.log("heres e: ", e)
  }
}
*/

export const getContainers = (): Promise<Cases[] | number> => {
  return fetch('/containers', {
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
  })
    .then(response => {
      if (!response.ok) {
        return response.status;
      }
      return response.json() as Promise<Cases[] | number>
    })
}