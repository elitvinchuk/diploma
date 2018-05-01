import { actions as modalAction } from 'common/components/Modal/redux'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ApplyForCourseModal from './ApplyForCourseModal'
import ApplicationsListComponent from './component'
import { actions as applicationActions } from 'common/redux/applications'
import { actions as studentActions } from 'student/redux/applications'
import pick from 'lodash/pick'

const applyForCourseModalId = 'apply-for-course-modal'

const mapStateToProps = state => {
  const { applications, auth, courses, users } = state
  const currentUser = users[auth.uid]
  const assignedCoursesIds = currentUser?.courses || []

  return {
    applications,
    assignedCoursesIds,
    courses,
    users
  }
}

@connect(mapStateToProps)
class CoursesList extends React.Component {
  static propTypes = {
    applications: PropTypes.object,
    assignedCoursesIds: PropTypes.array,
    courses: PropTypes.object,
    dispatch: PropTypes.func,
    users: PropTypes.object
  }

  constructor(props) {
    super(props)

    const { assignedCoursesIds, courses } = props
    const appliedCourses = assignedCoursesIds.map(assignedCoursesId => ({
      ...pick(courses[assignedCoursesId], ['id', 'name'])
    }))

    this.state = {
      appliedCourses,
      activeCourseId: null,
      listDisabled: true,
      tutorsForCourse: []
    }
  }

  componentDidMount() {
    this.props.dispatch(studentActions.getApplications())
  }

  componentDidUpdate(prevProps) {
    const { applications: apps } = this.props
    const { appliedCourses } = this.state
    if (prevProps.applications !== apps) {
      const nextAppliedCourses = [...appliedCourses]

      Object.keys(apps).forEach(appId => {
        const app = apps[appId]
        const index = nextAppliedCourses.findIndex(course => course.id === app.courseId)
        const foundApp = nextAppliedCourses[index]

        if (foundApp) {
          nextAppliedCourses[index] = {
            ...app,
            ...foundApp,
            applicationId: appId
          }
        }
      })

      this.setState({
        appliedCourses: nextAppliedCourses,
        listDisabled: false
      })
    }
  }

  handleApplicationClick = activeCourse => {
    if (!this.state.listDisabled) {
      if (activeCourse.applicationId) {
        // todo: navigate to applications
        console.log('navigating to', activeCourse.applicationId)
      } else {
        this.openModal(activeCourse.id)
      }
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
    const { courses, dispatch } = this.props
    dispatch(applicationActions.applyForCourse(courses[this.state.activeCourseId], tutorId))
  }

  render() {
    const { appliedCourses, activeCourseId, listDisabled, tutorsForCourse } = this.state
    const { courses, users } = this.props

    return (
      <>
        <ApplicationsListComponent
          applications={appliedCourses}
          disabled={listDisabled}
          onCourseClick={this.handleApplicationClick}
          users={users}
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
