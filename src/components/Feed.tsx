import { useEffect, useState } from 'react';
import { getRss, Articles } from '../utils/API';
import Article from './Article';
import Slider from './Slider';
import Box from '@mui/material/Box';
import {functionalStyles} from '../utils/styles';
export interface ArticleProps extends Articles {
    current: number;
}

const Feed = () =>{

    const [articles, setArticles] = useState<Articles[] | null>();
    const [status, setStatus] = useState<String>('loading');
    const [current, setCurrent] = useState<number>(0);

    useEffect(()=>{
        getRss().then(res => {
            if(res.err){
                setStatus("Server error. Please try again later");
            } else {
                setArticles(res.articles);
            }
        }).catch((e) => console.log(e))
    },[]);

    const updateSlider = (move: boolean, current: number, max: number) => {
        if(move && (current < (max-1))){
            setCurrent((c) => (c+1));
        } else if(!move && (current > 0)){
            setCurrent((c) => (c-1));
        }
    }

    return articles ? (
        <>
            <Box sx={functionalStyles.ArticleContainer(articles.length)}>
                {articles.map((i) => {
                    return (
                        <Article key={i.title} {...i} {...{current: current}}/>
                    )
                })}
                <Slider current={current} onClick={(n) => updateSlider(n, current, articles.length)} max={articles.length} />
            </Box>
            
        </>
    ) : (
        <p>{status}</p>
    )
}

export default Feed;