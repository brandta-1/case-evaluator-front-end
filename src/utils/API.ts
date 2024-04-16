export interface Cases {
  image: string;
  name: string;
  roi: number;
  price: number;
}

export interface Articles {
  title: string;
  description: string;
  link: string;
  image: string;
  index: number;
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

export const getRss = async (): Promise<{ err: boolean, articles: Articles[] }> => {
  try {
    const res = await fetch('/rss', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (res.status !== 200) throw new Error()

    const articles: Articles[] = await res.json()
    return {
      err: false,
      articles
    }
  }
  catch {
    return { err: true, articles: []}
  }
}