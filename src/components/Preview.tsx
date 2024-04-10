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
    onClick?: () => void;
}

interface sortFunction {
    (sortParam: string): void;
}

const TitleBar = ({ containers, sortContainers }: { containers: Cases[], sortContainers: sortFunction }) => {
    const [sortParam, setSortParam] = useState<string>('Name');

    useEffect(()=> {
        sortContainers(sortParam)
    },[sortContainers, sortParam]);

    return (
        <>
            <TitleBarItem title={'Image'} unsortable/>
            <TitleBarItem title={'Name'} onClick={()=>setSortParam('Name')}/>
            <TitleBarItem title={'ROI (%)'} onClick={()=>setSortParam('ROI (%)')}/>
            <TitleBarItem title={'Price'} onClick={()=>setSortParam('Price')}/>
        </>
    )
}

const TitleBarItem = (props: TitleBarProps) => {
    const {title, unsortable, onClick} = props;
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
                    flip="vertical"
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

    const sortContainers: sortFunction = (sortParam) => {
        console.log("log from sortContainers: ", sortParam);
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