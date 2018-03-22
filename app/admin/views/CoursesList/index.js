import { actions } from 'admin/redux/courses'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { actions as modalActions } from 'common/redux/modal'
import CourseEditModal from './components/CourseEditModal'
import CoursesListComponent from './component'
import { actions as coursesActions } from '../../redux/courses'

@connect(state => ({
  courses: state.courses
}))
class CoursesList extends React.Component {
  static propTypes = {
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

  handleSubmitCourse = course =>
    this.props.dispatch(coursesActions.createCourse(course))

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

  handleDeleteCourse = courseId => {
    if (
      confirm(`Вы уверены, что хотите удалить дисциплину? Действие необратимо.`)
    ) {
      this.props.dispatch(actions.deleteCourse(courseId))
    }
  }

  render() {
    return (
      <CoursesListComponent
        activeCourseId={this.state.activeCourseId}
        courses={this.props.courses}
        onDeleteCourse={this.handleDeleteCourse}
        onSubmitCourse={this.handleSubmitCourse}
        openModal={this.handleOpenModal}
      />
    )
  }
}

export default CoursesList
