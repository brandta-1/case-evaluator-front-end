import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { functionalStyles } from '../utils/styles';
interface SliderTextProps {
    top: boolean;
    current: number;
    max: number;
}

const SliderText = (props: SliderTextProps) => {
    const {top, current, max} = props;
    return (
<Box sx={{height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography sx={functionalStyles.SliderText(top)}>
            {top ? current+1 : max}
        </Typography>
    </Box>
    )
    
}

export default SliderText;