import React, {useState, useEffect} from 'react';
import { getContainers, Cases } from '../utils/API';
import { List, ListItem, ListItemText, ListItemButton, Divider, ImageListItem, Box, Typography } from '@mui/material';
import {faArrowUpLong} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const loadContainers = async () => {
    return await getContainers();
};

interface TitleBarProps {
    title: string;
    unsortable?: boolean;
    sorted?: boolean;
    onClick?: () => void;
}

interface sortFunction {
    (sortParam?: keyof Cases): void;
}

const TitleBar = ({ containers, sortContainers }: { containers: Cases[], sortContainers: sortFunction }) => {
    const [sortParam, setSortParam] = useState<keyof Cases>();
    const [flip, setFlip] = useState<boolean>(false);
    const handleClick =(param: keyof Cases) => {
        setFlip((c)=> !c);
        if(param === sortParam){
            sortContainers();
        } else {
            setSortParam(param)
        }
    };

    useEffect(()=> {
        console.log("useeffect called")
        sortContainers(sortParam)
    },[sortParam]);

    return (
        <>
            <TitleBarItem title={'Image'} unsortable/>
            <TitleBarItem title={'Name'} onClick={()=>handleClick('name')} sorted={'name' === sortParam && flip}/>
            <TitleBarItem title={'ROI (%)'} onClick={()=>handleClick('roi')} sorted={'roi' === sortParam && flip}/>
            <TitleBarItem title={'Price'} onClick={()=>handleClick('price')} sorted={'price' === sortParam && flip}/>
        </>
    )
}

const TitleBarItem = (props: TitleBarProps) => {
    const {title, unsortable, onClick, sorted} = props;
    const [hidden, setHidden] = useState<boolean>(true);
    return (
        <Box
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
            onClick={onClick}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '25%',
                justifyContent: 'right',
                backgroundColor: '#fff'
            }}
        >   
            {!unsortable && (
                
                <FontAwesomeIcon 
                    icon={faArrowUpLong} 
                    flip={sorted ? "horizontal" : "vertical"}
                    inverse={hidden}
                />
                
            )}
            <Typography sx={{fontWeight: 'bold', textAlign: 'right'}}>{title}</Typography>
        </Box>
    )
}

const PreviewListItem = (props: Cases) => {
    const { name, image, price, roi } = props;
    return (
        <ListItem 
            disablePadding
            divider
            sx={{
                '&:hover': {
                  backgroundColor: 'secondary.main'
                },
                display: 'flex', justifyContent: 'space-between', textAlign: 'right'
              }}
        >
           { /* TODO image for the case goes here */ }
           <Box sx={{width: '25%'}}>           
           <img src={image} alt={name} height={'100px'}/>
           </Box>
            <ListItemText 
                primary={name}
                primaryTypographyProps={{fontWeight: 'bold'}}
                sx={{width: '25%'}} 
            />
            <ListItemText primary={roi} sx={{width: '25%'}}  />
            <ListItemText primary={price} sx={{width: '25%'}}/>
        </ListItem>
    )
}

const Preview = () => {

    const [containers,setContainers] = useState<Cases[] | null>(null);
    const [status, setStatus] = useState<String>('loading');

    useEffect(()=>{
        loadContainers().then(res => {
            try {
                if(typeof res === 'number'){
                    setStatus("Server error. Please try again later");
                } else {
                    setContainers(res);
                }
            } catch(e) {
                throw new Error(`${e}`);
            }
        });
    },[]);

    const sortContainers: sortFunction = (sortParam?: keyof Cases) => {
        console.log("sortContainers: ", sortParam)
        setContainers((current)=>{
            if(current){
                if(!sortParam){
                    //have to say slice(0) because setState doesnt work well with references
                    const sorted: Cases[] = current.slice(0).reverse();
                    return sorted;
                }
                const sorted: Cases[] = current.slice(0).sort((a: Cases, b: Cases)=> {
                    //TODO this seems wrong, is there a way to do this without casting?
                    return typeof a[sortParam] === 'string' ? 
                        (a[sortParam].toString().toUpperCase() > b[sortParam].toString().toUpperCase() ? 1 : -1) : 
                        (a[sortParam] as number) - (b[sortParam] as number) 
                });
                return sorted;
            }
            return current;
        })
    }

    return containers ? (
        <List>
            <ListItem 
                disablePadding 
                divider 
                sx={{
                    position: 'sticky',
                    left: '0',
                    right: '0',
                    top: '0',
                    zIndex: '100',
                }}
            >
            <TitleBar containers={containers} sortContainers={sortContainers}/>
            </ListItem>
            {containers.map((i) => {
                return (
                    <PreviewListItem key={i.name} {...i}/>
                )
            })}
        </List>
    ) : (
        <p>{status}</p>
    );
        
    
};

export default Preview;