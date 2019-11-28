import React from "react";
import '../styles/Loader.css';

export interface OwnProps {
    
}

interface DispatchProps {
    
}

type Props = DispatchProps & OwnProps;

class Loader extends React.Component<Props>{
           
    state = { isShowing: true };

    componentDidMount() {
       
    }

    handleClick(){
        this.setState({isShowing: false});
    }

    render() {
        return (
            <>
            { 
                <div className="loadingMessage">Loading...</div>
            }
            </>
        );
    }
}
  
export default Loader;
