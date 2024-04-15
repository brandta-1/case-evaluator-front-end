import React, {useState, useEffect} from 'react';
import { getContainers, Cases } from '../utils/API';
import { List, ListItem, ListItemText, ListItemButton, Divider, ImageListItem, Box, Typography } from '@mui/material';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles, {functionalStyles} from '../utils/styles';

interface TitleBarItemProps {
    title: string;
    unsortable?: boolean;
    sorted?: boolean;
    onClick?: () => void;
}

type sortFunction = (sortParam?: keyof Cases) => void;

interface TitleBarProps {
    sortContainers: sortFunction
}

const TitleBar = ({ sortContainers }: TitleBarProps) => {
    const [sortParam, setSortParam] = useState<keyof Cases>();
    const handleClick =(param: keyof Cases) => {
        if(param === sortParam){
            sortContainers();
        } else {
            setSortParam(param)
        }
    };

    useEffect(()=> {
        sortContainers(sortParam)
    },[sortParam]);

    return (
        <>
            <TitleBarItem title={'Image'} unsortable/>
            <TitleBarItem title={'Name'} onClick={()=>handleClick('name')} />
            <TitleBarItem title={'ROI (%)'} onClick={()=>handleClick('roi')} />
            <TitleBarItem title={'Price'} onClick={()=>handleClick('price')} />
        </>
    )
}

const TitleBarItem = (props: TitleBarItemProps) => {
    const {title, unsortable, onClick} = props;
    const [hidden, setHidden] = useState<boolean>(true);
    return (
        <Box
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}
            onClick={onClick}
            sx={styles.TitleBarItem}
        >   
            {!unsortable && (
                <Box sx={functionalStyles.TitleBarItemSortIcon(hidden)}>
                    <FontAwesomeIcon icon={faSort} />
                </Box>
            )}
            <Typography sx={styles.TitleBarTitle}>{title}</Typography>
        </Box>
    )
}

const PreviewListItem = (props: Cases) => {
    const { name, image, price, roi } = props;
    return (
        <ListItem 
            disablePadding
            divider
            sx={styles.ListItem}
        >
           { /* TODO image for the case goes here */ }
           <Box sx={styles.FlexChild}>           
           <img src={image} alt={name} height={'60rem'}/>
           </Box>
            <ListItemText 
                primary={name}
                primaryTypographyProps={{fontWeight: 'bold'}}
                sx={styles.FlexChild} 
            />
            <ListItemText primary={roi} sx={styles.FlexChild}  />
            <ListItemText primary={price} sx={styles.FlexChild}/>
        </ListItem>
    )
}

const Preview = () => {

    const [containers,setContainers] = useState<Cases[] | null>(null);
    const [status, setStatus] = useState<String>('loading');

    useEffect(()=>{
        getContainers().then(res => {
            if(res.err){
                setStatus("Server error. Please try again later");
            } else {
                setContainers(res.cases);
            }
        }).catch((e) => console.log(e))
    },[]);

    const sortContainers: sortFunction = (sortParam?: keyof Cases) => {
        setContainers((current)=>{
            if(current){
                if(!sortParam){
                    //have to say slice(0) because setState doesnt work well with references
                    const sorted: Cases[] = current.slice(0).reverse();
                    return sorted;
                }
                const sorted: Cases[] = current.slice(0).sort((a: Cases, b: Cases)=> {
                    return typeof a[sortParam] === 'string' ?
                        (a[sortParam] as string).localeCompare(b[sortParam] as string)  : 
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
                sx={styles.StickyBar}
            >
            <TitleBar sortContainers={sortContainers}/>
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