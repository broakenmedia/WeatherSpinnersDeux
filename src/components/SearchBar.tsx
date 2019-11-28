import React from "react";
import { connect } from 'react-redux';
import '../styles/SearchBar.css';
import { setSearchQueryAction } from '../redux/actions/searchActions';
import { bindActionCreators } from "redux";

export interface OwnProps {
    
}

interface DispatchProps {
    setSearchQuery: (val:string) => void
}

type Props = DispatchProps & OwnProps;

class SearchBar extends React.Component<Props>{
           
    state = { 
        isShowing: true, 
        searchQuery: '', 
        isTyping: false,
        typingTimeout: 0 
    };

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
                    self.props.setSearchQuery(self.state.searchQuery);
                    self.setState({searchQuery :''});
                }
            }, 3000)
        });
        //this.setState({isShowing: false});
    }

    render() {
        const { isShowing } = this.state;
        
        return (
            <>
            { isShowing ? 
                <div className="searchBoxContainer">
                    <input type="text" id="searchInput" value={this.state.searchQuery} onChange={this.onTextChanged.bind(this)} placeholder="Enter city and country e.g. (London,uk)"></input>
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
    setSearchQuery: setSearchQueryAction
}, dispatch)
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
