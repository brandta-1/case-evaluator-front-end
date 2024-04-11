import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

const styles: Record<string, SxProps<Theme>> = {
    TitleBarItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'right',
        backgroundColor: '#fff'
    },

    TitleBarTitle: {fontWeight: 'bold', textAlign: 'right'},

    ListItem: {
        display: 'flex', 
        justifyContent: 'space-between', 
        textAlign: 'right',
        '&:hover': {
            backgroundColor: 'secondary.main'
        }
    },
    
    FlexChild: {flex: '1 1 0'}
}

const functionalStyles: Record<string, (...args: any[]) => SxProps<Theme>> = {

    TitleBarItemSortIcon: (hidden: boolean) => ({
        display: hidden ? 'none' : 'block'
    })
}

export default styles;
export { functionalStyles };