import React from 'react'
import PropTypes from 'prop-types'
import ApplicationItemComponent from './component'
import { connect } from 'react-redux'
import { actions } from 'common/redux/applications'
import { Loader } from 'common/components'

// todo: make common selector for application
const mapStateToProps = (state, ownProps) => {
  const application = state.applications?.[ownProps.match.params.id]

  return {
    application,
    course: state.courses[application?.courseId],
    student: state.users[application?.studentId]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getApplicationDetails() {
    dispatch(actions.getApplicationDetails(ownProps.match.params.id))
  },
  onExamDateSelect(date) {
    dispatch(actions.setExamDate(ownProps.match.params.id, date))
  },
  onExamPass(mark) {
    dispatch(actions.setExamPass(ownProps.match.params.id, mark || true))
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
