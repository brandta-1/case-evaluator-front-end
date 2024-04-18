import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SliderButton from './SliderButton';
import SliderText from './SliderText';
import styles from '../utils/styles';
interface SliderProps {
    current: number;
    max: number;
    onClick: (arg0: boolean) => void;
}

//todo finish slider
const Slider = (props: SliderProps) => {
    const {current, onClick, max} = props;
    return (
        <Box sx={styles.Slider}>
            {/* true = go forwards */}
           <SliderButton onEdge={current+1 == max} forward={true} onClick={()=>onClick(true)}/>
           <SliderText top={true} current={current} max={max} />
                <Divider />
            <SliderText top={false} current={current} max={max} />
            {/* false = go backwards */}
            <SliderButton onEdge={current == 0} forward={false} onClick={()=>onClick(false)}/>

        </Box>
    )
}

export default Slider;