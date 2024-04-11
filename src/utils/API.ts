export interface Cases {
  image: string;
  name: string;
  roi: number;
  price: number;
}

export const getContainers = async (): Promise<{ err: boolean, cases: Cases[] }> => {
  try {
    const res = await fetch('/containers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (res.status !== 200) throw new Error()

    const cases: Cases[] = await res.json()
    return {
      err: false,
      cases
    }
  }
  catch {
    return { err: true, cases: []}
  }
}