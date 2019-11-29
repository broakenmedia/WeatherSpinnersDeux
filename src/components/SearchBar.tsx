import React from "react";
import { connect } from 'react-redux';
import '../styles/SearchBar.css';
import 'rc-slider/assets/index.css';
import { setSearchQueryAction, setForecastSliderValAction } from '../redux/actions/SearchControlsActions';
import { bindActionCreators } from "redux";
import Slider from 'rc-slider';

export interface OwnProps {
    onCloseControlsClicked: any,
    controlsHidden:boolean
}

interface DispatchProps {
    setSearchQuery: (val:string) => void,
    setForecaseSliderVal: (val:number) => void
}

type Props = DispatchProps & OwnProps;

const forecastSliderMarks = {
    0:'Today',
    25:'+1 day',
    50:'+2 days',
    75:'+3 days',
    100:'+4 days'
  };

class SearchBar extends React.Component<Props>{
           
    state = {
        sliderValue: 0,
        searchQuery: '', 
        isTyping: false,
        typingTimeout: 0 
    };

    onCloseClicked(){
        this.setState({isShowing: false});
        this.props.onCloseControlsClicked();
    }

    componentDidMount() {
        
    }

    onTextChanged(event: any){
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }
        self.setState({
        searchQuery: event.target.value,
        isTyping: false,
        typingTimeout: setTimeout(function () {
                if(self.state.searchQuery !== ''){
                    self.setState({sliderValue: 0});
                    self.props.setSearchQuery(self.state.searchQuery);
                    self.setState({searchQuery :''});
                }
            }, 3000)
        });
    }

    onSliderMoved(value:number){
        this.setState({sliderValue: value});
        this.props.setForecaseSliderVal(value);
    }

    render() {
        
        return (
            <>
            { !this.props.controlsHidden ? 
                <div className="searchBoxContainer">
                    <img alt="Hide Search Controls Button" onClick={this.onCloseClicked.bind(this)} id="btnHideSearch" src="/btn_hide.png"/>
                    <input type="text" id="searchInput" value={this.state.searchQuery} onChange={this.onTextChanged.bind(this)} placeholder="City and country e.g. (London,uk)"></input>
                    <Slider min={0} marks={forecastSliderMarks} step={null} onChange={this.onSliderMoved.bind(this)} value={this.state.sliderValue} defaultValue={0} />
                </div>
                : 
                <></>
            }
            </>
        );
    }
}

const mapStateToProps = function(state: any) {
    return {
        
    }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    setSearchQuery: setSearchQueryAction,
    setForecaseSliderVal: setForecastSliderValAction
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
