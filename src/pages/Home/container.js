import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Component from './component'

const mapStateToProps = (ownProps) => {
  return {
    ...ownProps,
  }
}

export default withRouter(connect(mapStateToProps)(Component))
