import { actions as usersActions } from 'admin/redux/users'
import { Select } from 'common/form-controls'
import { flattenArray } from 'common/utils/converters'
import { Field } from 'redux-form'
import { Loader, Modal } from 'common/components'
import { actions as modalActions } from 'common/components/Modal/redux'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import UsersListComponent from './component'

// todo: consider moving connect for courses and users to parent and pass directly
@connect(state => ({
  auth: state.auth,
  courses: state.courses,
  users: state.users
}))
class UsersList extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    courses: PropTypes.object,
    dispatch: PropTypes.func,
    users: PropTypes.object
  }

  userEditModalId = 'user-edit'

  state = {
    activeUserId: null,
    textFilter: '',
    roleFilter: []
  }

  handleTextChange = ({ target }) => {
    this.setState({
      textFilter: target.value
    })
  }

  handleRoleFilterChange = roleFilter => {
    this.setState({
      roleFilter
    })
  }

  handleRoleChangeRequest = userId => (roles, changedRole) => {
    if (
      userId === this.props.auth.uid &&
      changedRole === 'admin' &&
      !confirm('Вы сейчас убираете роль администратора с себя. Вы уверены?')
    )
      return

    const rolesAsMap = roles.reduce((rolesMap, role) => {
      rolesMap[role] = true

      return rolesMap
    }, {})

    this.props.dispatch(usersActions.updateUser(userId, { roles: rolesAsMap }))
  }

  // todo: move to mapDispatchToProps and seek for other places
  updateUser = data =>
    this.props.dispatch(usersActions.updateUser(this.state.activeUserId, { courses: data.courses }))

  handleOpenModal = activeUserId => () => {
    this.setState(
      {
        activeUserId
      },
      () => {
        this.props.dispatch(modalActions.open(this.userEditModalId))
      }
    )
  }

  handleCloseModal = () => {
    this.setState({
      activeUserId: null
    })
  }

  render() {
    const { courses, users } = this.props

    if (isEmpty(users)) {
      return <Loader fullscreen />
    }

    const { activeUserId, textFilter, roleFilter } = this.state

    //region todo: move to cdm or so, out of render
    const userIds = Object.keys(users)
    const filteredIds = userIds.filter(id => {
      const { displayName, email, roles } = users[id]
      const stringValue = (displayName + email).toUpperCase()

      const roleMatch = roleFilter.length ? roleFilter.some(role => roles[role]) : true

      return stringValue.includes(textFilter.toUpperCase()) && roleMatch
    })

    const coursesAsOptions = Object.keys(courses).reduce((coursesArray, courseId) => {
      const { name } = courses[courseId]
      coursesArray.push({
        value: courseId,
        label: name
      })

      return coursesArray
    }, [])
    //endregion

    return (
      <>
        <UsersListComponent
          filteredIds={filteredIds}
          handleTextChange={this.handleTextChange}
          handleRoleFilterChange={this.handleRoleFilterChange}
          handleRoleChangeRequest={this.handleRoleChangeRequest}
          textFilter={textFilter}
          roleFilter={roleFilter}
          users={users}
          openModal={this.handleOpenModal}
        />

        <Modal
          form={this.userEditModalId}
          contentLabel="Назначить предмет"
          initialValues={users[activeUserId] || {}}
          onRequestClose={this.handleCloseModal}
          onSubmit={this.updateUser}
        >
          <Field
            name="courses"
            component={Select}
            label="Предметы"
            multi
            normalize={flattenArray}
            options={coursesAsOptions}
          />
        </Modal>
      </>
    )
  }
}

export default UsersList
