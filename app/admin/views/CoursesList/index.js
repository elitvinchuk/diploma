import { actions as coursesActions } from 'admin/redux/courses'
import { actions as modalActions } from 'common/components/Modal/redux'
import { objectToArray } from 'common/utils/converters'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import CourseEditModal from './CourseEditModal'
import CoursesListComponent from './component'

// todo: !fix saving of course
@connect(state => ({
  auth: state.auth,
  courses: state.courses,
  users: state.users
}))
class CoursesList extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    courses: PropTypes.object,
    dispatch: PropTypes.func,
    users: PropTypes.object
  }

  courseEditModalId = 'course-edit'

  state = {
    activeCourseId: null,
    searchFilter: ''
  }

  handleFilterChange = ({ target }) => {
    this.setState({ searchFilter: target.value })
  }

  handleSubmitCourse = course => {
    const { auth, dispatch } = this.props
    let actionCreator

    if (course.id) {
      // Course exists - editing
      actionCreator = coursesActions.editCourse(course, auth.uid)
    } else {
      // Creating new one
      actionCreator = coursesActions.createCourse(course, auth.uid)
    }

    const requestPromise = dispatch(actionCreator)
    requestPromise.then(this.handleSuccessfulAction)

    return requestPromise
  }

  // todo: add remove button
  /*handleDeleteCourse = courseId => () => {
    if (confirm(`Вы уверены, что хотите удалить дисциплину? Действие необратимо.`)) {
      this.props.dispatch(actions.deleteCourse(courseId)).then(this.handleSuccessfulAction)
    }
  }*/

  handleOpenModal = activeCourseId => () => {
    this.setState(
      {
        activeCourseId
      },
      () => {
        this.props.dispatch(modalActions.open(this.courseEditModalId))
      }
    )
  }

  handleCloseModal = () => {
    this.setState({
      activeUserId: null
    })
  }

  render() {
    const { activeCourseId, searchFilter } = this.state
    const { courses, users } = this.props

    // todo: move out of render
    const tutorsArray = Object.keys(users).reduce((usersArray, userId) => {
      const { displayName, roles } = users[userId]
      if (roles.tutor) {
        usersArray.push({
          value: userId,
          label: displayName
        })
      }

      return usersArray
    }, [])

    return (
      <>
        <CoursesListComponent
          // activeCourseId={activeCourseId}
          searchFilter={searchFilter}
          handleFilterChange={this.handleFilterChange}
          courses={this.props.courses}
          // onDeleteCourse={this.handleDeleteCourse}
          // onSubmitCourse={this.handleSubmitCourse}
          openModal={this.handleOpenModal}
          // closeModal={this.handleCloseModal}
        />

        <CourseEditModal
          course={courses[activeCourseId]}
          form={this.courseEditModalId}
          onRequestClose={this.handleCloseModal}
          onSubmit={this.handleSubmitCourse}
          tutorsArray={tutorsArray}
        />
      </>
    )
  }
}

export default CoursesList
