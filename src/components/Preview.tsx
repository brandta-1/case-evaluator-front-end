import React, {useState, useEffect} from 'react';
import { getContainers } from '../utils/API';

interface Cases {
    name: string;
    url: string;
    image: string;
    price: number;
    roi: number;
}

const loadContainers = async () => {
    return await getContainers();
};

const Preview = () => {

    const [containers,setContainers] = useState<Cases[] | null>(null);

    useEffect(()=>{
        loadContainers().then(res => {
            try {
            const test: Cases[] = res._embedded.containers.map((i: any) => ({
                name: i.name,
                url: i.url,
                image: i.image,
                price: i.price,
                roi: i.roi
            }));
            setContainers(test);
        } catch(e) {
            console.log("error with api: ", e);
        }
        });
    },[]);

    return containers ? (
        <>
        {containers.map((i) => {
            return (
                <p>{i.name} ROI: {i.roi}</p>
            )
        })}
        </>
    ) : (
        <p>loading</p>
    );
        
    
};

export default Preview;