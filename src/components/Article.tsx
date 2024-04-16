import {Articles} from '../utils/API';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ArticleProps } from './Feed';


const Article = (props: ArticleProps) => {
  
    const { description, image, link, title, index, current } = props;
    console.log("heres article current: ", current);
    const leftPos = (920 * index)-(920*current);
 return (
    <Card sx={{ width: 920, display: 'flex', flexDirection: 'column', position: 'absolute', left: `${leftPos}px`, transition: 'left 1s' }}>
        <Typography component="div" variant="h4" sx={{fontWeight: 'bold', textAlign: 'left', marginLeft: '20px'}}>
            {title}
        </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
            component="img"
            sx={{ width: "40%", height: "100%", objectFit: 'contain', marginLeft: '20px', marginBottom: '20px'}}
            image={image}
            alt={title}
        />
        <CardContent>
            <Typography>
                {description}
            </Typography>
        </CardContent>
    <Box sx={{width: '10%' }}/>
    </Box>
  </Card>
 )   
}

export default Article;