export const applicationsByCourse = apps =>
  Object.keys(apps).reduce((map, appId) => {
    const app = apps[appId]

    map[app.courseId] = {
      id: appId
    }

    return map
  }, {})
