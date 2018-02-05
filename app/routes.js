const tutorsPrefix = '/tutor'

export default {
  tutors: {
    index: `${tutorsPrefix}`,
    login: `${tutorsPrefix}/login`,
    application: `${tutorsPrefix}/application/:id`
  }
}