export default {
  index: '/',
  login: '/login',

  admin: {
    courses: '/admin/courses',
    users: '/admin/users'
  },

  student: {
    applications: '/student/applications',
    application: '/student/applications/:id'
  },

  tutors: {
    applications: '/tutor/applications',
    application: '/tutor/applications/:id',
    calendar: '/tutor/calendar'
  }
}
