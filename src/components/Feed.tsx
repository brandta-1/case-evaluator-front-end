import { useEffect, useState } from 'react';
import { getRss, Articles } from '../utils/API';
import Article from './Article';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

export interface ArticleProps extends Articles {
    current: number;
}

interface SliderProps {
    current: number;
    max: number;
    onClick: (move: boolean) => void;
    sx?: SxProps<Theme>;
}

//todo finish slider
const Slider = (props: SliderProps) => {
    const {current, onClick, max} = props;
    return (
        <Box sx={{position: 'absolute', left: '880px', height: "300px"}}>
            {/* true = go forwards */}
            <button onClick={()=>onClick(true)}>&gt;</button>
            <p>{current+1}</p>
            <p>{max}</p>
            {/* false = go backwards */}
            <button onClick={()=>onClick(false)}>&lt;</button>
        </Box>
    )
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

    console.log('feed loaded');

    

    const updateSlider = (move: boolean, current: number, max: number) => {
        console.log("this is max: ", max)
        if(move && (current < (max-1))){
            setCurrent((c) => (c+1));
        } else if(!move && (current > 0)){
            setCurrent((c) => (c-1));
        }
    }

    return articles ? (
        <>
            <Box sx={{height: "420px", display: "block", position: "absolute", width: 3680, }}>
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