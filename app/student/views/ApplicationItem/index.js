import { connect } from 'react-redux'
import React from 'react'
import { Loader } from 'common/components'
import ApplicationItemComponent from './component'
import { actions } from 'common/redux/applications'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
  const application = state.applications?.[ownProps.match.params.id]

  return {
    application,
    course: state.courses[application?.courseId],
    tutor: state.users[application?.tutorId]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getApplicationDetails() {
    dispatch(actions.getApplicationDetails(ownProps.match.params.id))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class ApplicationItem extends React.Component {
  static propTypes = {
    application: PropTypes.object,
    getApplicationDetails: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { application: app, getApplicationDetails } = this.props
    if (!app?.tasks) getApplicationDetails()
  }

  render() {
    if (!this.props.application?.tasks) {
      return <Loader fullscreen />
    }

    return <ApplicationItemComponent {...this.props} />
  }
}

export default ApplicationItem
