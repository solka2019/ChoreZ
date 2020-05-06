import React, {
    Component
} from 'react';

class Home extends Component {
    constructor() {
        super();
    }
    render() {
        const imageStyle = {
            width: 400
        };
        return ( 
            <div>
                <p> This is the main screen for our Child Chores app</p>
                <img style={imageStyle} src="../resources/ClipartKey_643659.png" />
            </div>
        );
    }
}

export default Home;