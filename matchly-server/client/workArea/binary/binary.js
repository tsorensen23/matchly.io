import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import DisplayBody from './display-body';
import BinarySelector from './binary-selector';
import * as actions from './actions';
import { pushPath } from 'redux-simple-router';
import { uploadData } from '../upload-redux/actions';

class Binary extends React.Component {
  render(){
    const {finished, dispatch } = this.props;
    var missingGender = !finished.data.every(visitor =>
        visitor.hasOwnProperty('Gender')
    );
    var missingMilitary = !finished.data.every(visitor =>
        visitor.hasOwnProperty('Military')
    );
    var missingProp = missingGender ? 'Gender' : 'Military';
    if(missingGender) {
      return (
          <div>
            <Header display="Gender" />
            <div className="row">
              <DisplayBody
                data={finished.data.filter( visitor =>
                    !visitor.hasOwnProperty('Gender')
                  )}
              />
              <BinarySelector
                selector={(gender) => {
                  dispatch(actions.setGender(gender));
                  if(!missingMilitary && !missingGender) {
                    dispatch(uploadData('/visitors'));
                    dispatch(pushPath('/calendar'));
                  }

                }}
                options={['Male', 'Female']}
                name='Gender'
              />
            </div>
          </div>
          );
    }
    if(missingMilitary) {
      return (
          <div>
            <Header display="Military" />
            <DisplayBody
              data={finished.data.filter( visitor =>
                  !visitor.hasOwnProperty('Military')
                )}
            />
            <BinarySelector
              selector={(military) => {
                dispatch(actions.setMilitary(military));
                if(!missingMilitary && !missingGender) {
                  dispatch(uploadData('/visitors'));
                  dispatch(pushPath('/calendar'));
                }

              }}
              options={['Veteran/Active', 'Non Veteran']}
              name='Military'
            />
          </div>
          );
    }
    return (
        <div>
          Looks like everything is fixed, upload now to finalize your data set
          <button
            className="btn btn-success"
            onClick={() => {
              dispatch(uploadData('/visitors'));
              dispatch(pushPath('/calendar'));
            }}
          >
            Upload
          </button>
        </div>
        );
  }

}


export default connect((state) => {
    return {
      finished: state.finished
    };
})(Binary);
