import React from "react";
import '../styles/Loader.css';

export interface OwnProps {
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps;

/* Not strictly necessary to be it's own component but allows for flexibility later. */
class Loader extends React.Component<Props>{
    state = { isShowing: true };
    componentDidMount() {
       
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
