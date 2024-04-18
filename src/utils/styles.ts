import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

const testing = '250px';

const styles: Record<string, SxProps<Theme>> = {

    ArticleTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: '20px',
        color: 'text.primary',
        ":hover": {
            color: 'text.secondary'
        }
    },

    ArticleImage: {
        maxWidth: "40%",
        objectFit: 'fit',
        paddingLeft: '20px',
        paddingBottom: '20px'
    },

    TitleBarItem: {
        display: 'flex',
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'right',
        backgroundColor: '#fff'
    },

    TitleBarTitle: {fontWeight: 'bold', textAlign: 'right'},

    List: {
        top: testing,
        borderRight: '1px solid',
        borderRightColor: 'secondary.main',
        borderTop: '1px solid',
        borderTopColor: 'secondary.main',
    },

    ListItem: {
        display: 'flex', 
        justifyContent: 'space-between', 
        textAlign: 'right',
        '&:hover': {
            backgroundColor: 'secondary.main'
        }
    },
    
    FlexChild: {flex: '1 1 0'},

    StickyBar: {
        position: 'sticky',
        left: '0',
        right: '0',
        top: '0',
        zIndex: '100',
    },

    Slider: {
        position: 'absolute',
        left: '880px',
        width: '40px',
        height: testing,
        backgroundColor: 'secondary.main'
    }
}

const functionalStyles: Record<string, (...args: any[]) => SxProps<Theme>> = {
    TitleBarItemSortIcon: (hidden: boolean) => ({
        display: hidden ? 'none' : 'block'
    }),

    SliderButton: (disabled: boolean) => ({
        width: '40px',
        height: '40px',
        border: 'none',
        padding: '0',
        backgroundColor: 'text.secondary',
        opacity: disabled ? '0.25' : '1.0'
    }),

    SliderText: (top: boolean) => ({
            color: top ? 'text.secondary' : 'text.primary',
            fontWeight: 700
    }),

    Article: (left: number, currentSlide: boolean) => ({
        border: 'none',
        boxShadow: 'none', 
        width: '920px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: `${left}px`,
        transition: 'left 1s, opacity 1s',
        opacity: currentSlide ? '1.0' : '0.5' 
    }),

    ArticleContainer: (numArticles: number) => ({
        height: testing,
        display: "block",
        position: "absolute",
        width: `${numArticles * 920}px`
    })
};

export default styles;
export { functionalStyles };