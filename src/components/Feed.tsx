import { getRSS } from '../utils/API';

getRSS();

const Feed = () =>{
    console.log('feed loaded');
    return (
        <p>Feed</p>
    )
}

export default Feed;