import Main from './Main';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions';
import {withRouter} from 'react-router';
import '../styles/main.scss';

function mapStateToProps(state){
  return {
    room: state.room,
    dares: state.dares,
    gallery: state.gallery
  }
}

function mapDispatchtoProps(dispatch){
    return bindActionCreators(actions, dispatch)
}

const App = withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main))

export default App