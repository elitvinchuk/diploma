import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { actions as modalActions } from 'common/redux/modal'
import CourseEditModal from './components/CourseEditModal'
import CoursesListComponent from './component'
import { actions as coursesActions } from '../../redux/courses'
// import { SubmissionError } from 'redux-form'

// const mapStateToProps = (state, ownProps) => ({})

@connect(state => ({
  courses: state.courses
}))
class CoursesList extends React.Component {
  static propTypes = {
    courses: PropTypes.object,
    dispatch: PropTypes.func
  }

  componentDidMount() {
    this.props.dispatch(coursesActions.getCourses())
  }

  handleSubmitCourse = course =>
    this.props.dispatch(coursesActions.createCourse(course))

  handleOpenModal = () => {
    this.props.dispatch(modalActions.open(CourseEditModal.id))
  }

  render() {
    const { courses } = this.props

    return (
      <CoursesListComponent
        courses={courses}
        handleSubmitCourse={this.handleSubmitCourse}
        openModal={this.handleOpenModal}
      />
    )
  }
}

export default CoursesList
