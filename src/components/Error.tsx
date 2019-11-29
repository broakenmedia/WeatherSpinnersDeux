import React from "react";
import '../styles/Error.css';

export interface OwnProps {
    errorMsg: string
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps;

/* Not strictly necessary to be it's own component but allows for flexibility later. */
class Error extends React.Component<Props>{
    state = { isShowing: true };
    componentDidMount() {
       
    }
    render() {
        return (
            <>
            { 
                <div className="errorMessage">{this.props.errorMsg}</div>
            }
            </>
        );
    }
}
export default Error;
