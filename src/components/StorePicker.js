import React, { Fragment } from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

//class StorePicker extends Component {
class StorePicker extends React.Component {

    static PpropTypes = {
        history: PropTypes.object
    }

    myInput = React.createRef();

    goToStore = (event) => {
        // 1. stop the form from submitting, use preventDefault to stop
        event.preventDefault();
        // 2. get text from input for store name
        const storeName = this.myInput.current.value;
        // 3. change the page to /store/{storename}
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return(
            // <Fragment>
                
                <form action="" className="store-selector" onSubmit={this.goToStore}>
                    {/* comment */}
                    <h2>Please Enter A Store</h2>
                    <input 
                        type="text" 
                        ref={this.myInput}
                        required 
                        placeholder="Store Name" 
                        defaultValue={getFunName()}
                    />
                    <button type="submit">Visit Store</button>
                    
                </form>

            // </Fragment>
        ) 
        
    }
    
}

export default StorePicker;