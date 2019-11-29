import React from 'react';
import posed from 'react-pose';
import '../styles/Spinner.css';
import weatherDataMapper from '../utils/weatherDataMapper';

interface SpinnerProps {
    animationDuration: number,
    /* rotationAmount: Radial number, factors of 360 aka, 1 full rotation. 720 being 2 full rotations over anim duration. */
    rotationAmount: number,
    shouldFall: boolean,
    tempKelvin: number
}

function featherNumber(val:number):number {
    /* Get random number between the val and itself minus one quarter. Each spinner can then have a slightly varied speed. */
    const max = val;
    const min = val - val/4;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTopPositionPx() {
    /* Get random y position for position on screen */
    const max = 90;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHeightPx() {
    /* Get random height for spinner */
    const max = 250;
    const min = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOpacityFloat() {
    /* Set random opacity at animation start */
    const max = 1;
    const min = 0.9;
    return Math.random() * (max - min) + min;
}

function getRandomDelayMillis(){
    /* Stagger the off-screen starting position of each spinner to prevent clumping */
    const max = 20000;
    const min = 0;
    return Math.floor(Math.random() * (max - min)) + min;
}

class Spinner extends React.PureComponent<SpinnerProps>{

    state = { isRightSide: false };
    
    animationDuration = featherNumber(this.props.animationDuration);
    rotationAmount = featherNumber(this.props.rotationAmount);
    
    SpinnerShape = posed.div({
        left: { 
            x: '-100px',
            delay: getRandomDelayMillis(),
            y: (this.props.shouldFall ? '100vh' : 0),
            rotate: this.rotationAmount, 
            opacity:0,
            transition: { 
                y: {duration: this.animationDuration, ease: [.49, .12, .67, .1]},
                /* Cubic bezier ease - Limits fade out opacity change till the very last 500 millis */
                opacity: { ease: [.49, .12, .67, .1], duration: this.animationDuration - 300 },
                default: { duration: this.animationDuration, ease:'linear' }
            }
        },
        right: { 
            x: '100vw', 
            y: 0,
            rotate:0, 
            opacity: getRandomOpacityFloat(),
            transition: { duration: 0 } 
        }
    });


    onAnimationFinish() {
        /* Flip animation, reseting position back to 0 instantly and calling again for right->left */
        this.setState({ isRightSide: !this.state.isRightSide });
    } 

    componentDidMount() {
        /* Start animation */
        this.setState({ isRightSide: !this.state.isRightSide });
    }

    render() {
        const { isRightSide } = this.state;
        var tempColor = weatherDataMapper.getLinearGradientForTemp(this.props.tempKelvin);
        return <this.SpinnerShape onPoseComplete={() => this.onAnimationFinish()} className="spinner" style={{background:tempColor, top: getRandomTopPositionPx() + '%', height: getRandomHeightPx()}} pose={isRightSide ? 'left' : 'right'} />;
    }
}

export default Spinner;