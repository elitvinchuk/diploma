import { actions as modalAction } from 'common/components/Modal/redux'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ApplyForCourseModal from './ApplyForCourseModal'
import CoursesListComponent from './component'

const applyForCourseModalId = 'apply-for-course-modal'

const mapStateToProps = state => {
  const { auth, courses, users } = state
  const currentUser = users[auth.uid]
  const assignedCoursesIds = currentUser?.courses || []

  return {
    appliedCourses: assignedCoursesIds.map(courseId => courses[courseId]),
    courses,
    users
  }
}

@connect(mapStateToProps)
class CoursesList extends React.Component {
  static propTypes = {
    appliedCourses: PropTypes.array,
    courses: PropTypes.object,
    dispatch: PropTypes.func,
    users: PropTypes.object
  }

  initialState = {
    activeCourseId: null,
    tutorsForCourse: []
  }

  state = this.initialState

  applyForCourse = () => {}

  handleCloseModal = () => {
    this.setState(this.initialState)
  }

  openModal = activeCourseId => () => {
    const { courses, dispatch, users } = this.props

    const tutorsForCourse = courses[activeCourseId].tutors.map(tutorId => ({
      label: users[tutorId].displayName,
      value: tutorId
    }))

    this.setState({ activeCourseId, tutorsForCourse }, () => {
      dispatch(modalAction.open(applyForCourseModalId))
    })
  }

  render() {
    const { activeCourseId, tutorsForCourse } = this.state
    const { appliedCourses, courses } = this.props

    return (
      <>
        <CoursesListComponent courses={appliedCourses} onCourseClick={this.openModal} />

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
