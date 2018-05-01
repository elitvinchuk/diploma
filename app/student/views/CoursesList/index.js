import { actions as modalAction } from 'common/components/Modal/redux'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ApplyForCourseModal from './ApplyForCourseModal'
import ApplicationsListComponent from './component'
import { actions as studentActions } from 'student/redux/applications'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import routes from 'routes'

const applyForCourseModalId = 'apply-for-course-modal'

const mapStateToProps = state => {
  const { applications, auth, courses, users } = state
  const currentUser = users[auth.uid]
  const assignedCoursesIds = currentUser?.courses

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

  static defaultProps = {
    assignedCoursesIds: []
  }

  constructor(props) {
    super(props)

    const { assignedCoursesIds, applications, courses } = props
    const appliedCourses = assignedCoursesIds.map(assignedCoursesId => {
      const courseMeta = courses[assignedCoursesId]
      const applicationId = Object.keys(applications || {}).find(
        appId => applications[appId].courseId === assignedCoursesId
      )

      const nextAppliedCourse = pick(courseMeta, ['id', 'name'])

      const appMeta = applications?.[applicationId]

      if (appMeta) {
        Object.assign(nextAppliedCourse, { applicationId, ...appMeta })
      }

      return nextAppliedCourse
    })

    this.state = {
      appliedCourses,
      activeCourseId: null,
      listDisabled: !applications,
      tutorsForCourse: []
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.applications, this.props.applications)) {
      const nextAppliedCourses = this.getSaturatedCourses()

      this.setState({
        appliedCourses: nextAppliedCourses,
        listDisabled: false
      })
    }
  }

  getSaturatedCourses = () => {
    const { applications: apps } = this.props
    const { appliedCourses } = this.state
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

    return nextAppliedCourses
  }

  handleApplicationClick = activeCourse => {
    if (!this.state.listDisabled) {
      if (activeCourse.applicationId) {
        this.props.history.push(
          routes.student.application.replace(':id', activeCourse.applicationId)
        )
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
    const { courses, dispatch, history } = this.props
    dispatch(studentActions.applyForCourse(courses[this.state.activeCourseId], tutorId)).then(
      appId => {
        history.push(routes.student.application.replace(':id', appId))
      }
    )
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
