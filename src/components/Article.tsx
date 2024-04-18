import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ArticleProps } from './Feed';
import styles, { functionalStyles } from '../utils/styles';
import he from 'he';

const Article = (props: ArticleProps) => {
  
    const { description, image, link, title, index, current } = props;
    console.log("heres article current: ", current);
    const left = (920 * index)-(920*current);
 return (
    
    <Card sx={functionalStyles.Article(left, index==current)}>
        <Link href={link} color="inherit" underline="none" variant="h4" sx={styles.ArticleTitle}>
            {he.decode(title)}
        </Link> 
        <Box sx={{ display: 'flex', flexDirection: 'row', height: "160px"}}>
            <CardMedia
                component="img"
                sx={styles.ArticleImage}
                image={image}
                alt={he.decode(title)}
            />
            <CardContent>
                <Typography sx={{textAlign: 'left',}}>
                    {he.decode(description)}
                </Typography>
            </CardContent>
        <Box sx={{width: '10%' }}/>
        </Box>
  </Card>
 )   
}

export default Article;