import { actions as modalAction } from 'common/components/Modal/redux'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ApplyForCourseModal from './ApplyForCourseModal'
import CoursesListComponent from './component'
import { actions as applicationActions } from 'common/redux/applications'
import { actions as studentActions, selectors } from 'student/redux/applications'
import { applicationsByCourse } from 'student/utils'

const applyForCourseModalId = 'apply-for-course-modal'

const mapStateToProps = state => {
  const { applications, auth, courses, users } = state
  const currentUser = users[auth.uid]
  const assignedCoursesIds = currentUser?.courses || []

  return {
    courses,
    users,
    apps: applications,
    appliedCourses: selectors.getApplicationsMeta(state, assignedCoursesIds, applicationsByCourse),
    uid: auth.uid
  }
}

@connect(mapStateToProps)
class CoursesList extends React.Component {
  static propTypes = {
    apps: PropTypes.object,
    auth: PropTypes.object,
    appliedCourses: PropTypes.array,
    courses: PropTypes.object,
    dispatch: PropTypes.func,
    uid: PropTypes.string,
    users: PropTypes.object
  }

  state = {
    activeCourseId: null,
    appsByCourse: {},
    tutorsForCourse: []
  }

  componentDidMount() {
    this.props.dispatch(studentActions.getApplications())
  }

  componentDidUpdate(prevProps) {
    const { apps } = this.props
    if (prevProps.apps !== apps) {
      this.setState({
        appsByCourse: applicationsByCourse(apps)
      })
    }
  }

  handleApplicationClick = activeCourseId => {
    if (this.state.appsByCourse[activeCourseId]) {
      // todo: navigate to applications
      console.log('navigating')
    } else {
      this.openModal(activeCourseId)
    }
  }

  openModal = activeCourseId => {
    const { courses, dispatch, users } = this.props

    const tutorsForCourse = courses[activeCourseId].tutors.map(tutorId => ({
      label: users[tutorId].displayName,
      value: tutorId
    }))

    this.setState({ activeCourseId, tutorsForCourse }, () => {
      dispatch(modalAction.open(applyForCourseModalId))
    })
  }

  handleCloseModal = () => {
    this.setState({
      activeCourseId: null,
      tutorsForCourse: []
    })
  }

  applyForCourse = ({ tutorId }) => {
    const { courses, dispatch, uid } = this.props
    dispatch(applicationActions.applyForCourse(courses[this.state.activeCourseId], uid, tutorId))
  }

  render() {
    const { activeCourseId, tutorsForCourse } = this.state
    const { appliedCourses, courses } = this.props

    return (
      <>
        <CoursesListComponent
          courses={appliedCourses}
          onCourseClick={this.handleApplicationClick}
        />

        <ApplyForCourseModal
          form={applyForCourseModalId}
          activeCourse={courses[activeCourseId]}
          onRequestClose={this.handleCloseModal}
          onSubmit={this.applyForCourse}
          tutorsForCourse={tutorsForCourse}
        />
      </>
    )
  }
}

export default CoursesList
