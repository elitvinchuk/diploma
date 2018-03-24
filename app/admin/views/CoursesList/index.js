import { actions } from 'admin/redux/courses'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { actions as modalActions } from 'common/redux/modal'
import CourseEditModal from './components/CourseEditModal'
import CoursesListComponent from './component'
import { actions as coursesActions } from '../../redux/courses'

@connect(state => ({
  auth: state.auth,
  courses: state.courses
}))
class CoursesList extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    courses: PropTypes.object,
    dispatch: PropTypes.func
  }

  state = {
    activeCourseId: null,
    searchFilter: ''
  }

  componentDidMount() {
    this.props.dispatch(coursesActions.getCourses())
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

  handleDeleteCourse = courseId => () => {
    if (
      confirm(`Вы уверены, что хотите удалить дисциплину? Действие необратимо.`)
    ) {
      this.props
        .dispatch(actions.deleteCourse(courseId))
        .then(this.handleSuccessfulAction)
    }
  }

  handleSuccessfulAction = () => {
    this.props.dispatch(modalActions.close(CourseEditModal.id))
    this.setState({
      activeCourseId: null
    })
  }

  handleOpenModal = activeCourseId => () => {
    this.setState(
      {
        activeCourseId
      },
      () => {
        this.props.dispatch(modalActions.open(CourseEditModal.id))
      }
    )
  }

  handleCloseModal = () =>
    this.props.dispatch(modalActions.close(CourseEditModal.id))

  render() {
    const { activeCourseId, searchFilter } = this.state

    return (
      <CoursesListComponent
        activeCourseId={activeCourseId}
        searchFilter={searchFilter}
        handleFilterChange={this.handleFilterChange}
        courses={this.props.courses}
        onDeleteCourse={this.handleDeleteCourse}
        onSubmitCourse={this.handleSubmitCourse}
        openModal={this.handleOpenModal}
        closeModal={this.handleCloseModal}
      />
    )
  }
}

export default CoursesList
