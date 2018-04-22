import { connect } from 'react-redux'
import CoursesListComponent from './component'

const mapStateToProps = state => {
  const courses = state.courses
  const currentUser = state.users[state.auth.uid]
  const assignedCoursesIds = currentUser?.courses || []

  return {
    courses: assignedCoursesIds.map(courseId => courses[courseId])
  }
}

export default connect(mapStateToProps)(CoursesListComponent)
