import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { functionalStyles } from '../utils/styles';

interface SliderButtonProps {
    onEdge: boolean;
    forward: boolean;
    onClick: (arg0: boolean) => void;
}

const SliderButton = (props: SliderButtonProps) => {
    const { onEdge, forward, onClick } = props;
    return (
        <ButtonBase onClick={()=>onClick(forward)} disableRipple={true} disabled={onEdge} sx={functionalStyles.SliderButton(onEdge)}>
            {/*TODO ugly*/}
            <Typography variant='h5'>
                {forward ? '>' : '<'}
            </Typography>            
         </ButtonBase>
    )
}

export default SliderButton;