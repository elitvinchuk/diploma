import React from 'react'
import PropTypes from 'prop-types'
import ApplicationsListComponent from './component'
import { actions } from 'tutor/redux/applications'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

@connect(state => pick(state, ['applications', 'courses', 'users']))
class ApplicationsList extends React.Component {
  static propTypes = {
    apps: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(actions.getApplications())
  }

  render() {
    const { dispatch, ...restProps } = this.props

    // todo: loader here

    return <ApplicationsListComponent {...restProps} />
  }
}

export default ApplicationsList
