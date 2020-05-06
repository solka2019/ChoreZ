import React, { Component } from 'react';
import {Grid, Cell} from 'react-mdl';

class Landing extends Component {
    render() {
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                    <div className="header-banner">  
                    
                    </div>            
<img 
src="./images/marissol-picture.jpg"
alt= "avatar"
className="avatar-img"
/>

<div className="banner-text">
    <h1>Full Stack Developer</h1>
    <hr></hr>
    <p>
        HTML/CSS| Bootstrap | Materialize |Javascript | React | Express | MySQL | MongoDB | MERN |
    </p>

    <div className="social-links">

        {/* Linkedin */}
        <a href="https://www.linkedin.com/in/marissol-k-603962113/" rel="noopener noreferrer"  target="_blank">
            <i className="fa fa-linkedin-square" aria-hidden="true"/>
        </a>

        {/* Github */}
        <a href="https://github.com/solka2019/Updated-Portfolio-Page-2" rel="noopener noreferrer"  target="_blank">
            <i className="fa fa-github-square" aria-hidden="true"/>
        </a>

</div>
</div>
                    </Cell>
                </Grid>
            </div>
        )
    }
}

export default Landing;