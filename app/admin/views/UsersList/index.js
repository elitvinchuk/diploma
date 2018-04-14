import { actions as usersActions } from 'admin/redux/users'
import UserEditModal from './UserEditModal'
import { Loader } from 'common/components'
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
    if (userId === this.props.auth.uid && changedRole === 'admin') {
      // if (!confirm('Вы сейчас убираете роль администратора с себя. Вы уверены?')) return
      if (confirm('Вы сейчас убираете роль администратора с себя. Вы уверены?')) {
        this.toggleRole(userId, roles)
      }
    } else {
      this.toggleRole(userId, roles)
    }
  }

  toggleRole = (userId, roles) => {
    const mapifiedRoles = roles.reduce((rolesMap, role) => {
      rolesMap[role] = true

      return rolesMap
    }, {})

    return this.props.dispatch(usersActions.toggleUserRole(userId, mapifiedRoles))
  }

  handleOpenModal = activeUserId => () => {
    this.setState(
      {
        activeUserId
      },
      () => {
        this.props.dispatch(modalActions.open(UserEditModal.id))
      }
    )
  }

  render() {
    const { courses, users } = this.props

    if (isEmpty(users)) {
      return <Loader fullscreen />
    }

    const { textFilter, roleFilter } = this.state

    const userIds = Object.keys(users)
    const filteredIds = userIds.filter(id => {
      const { displayName, email, roles } = users[id]
      const stringValue = (displayName + email).toUpperCase()

      const roleMatch = roleFilter.length ? roleFilter.some(role => roles[role]) : true

      return stringValue.includes(textFilter.toUpperCase()) && roleMatch
    })

    return (
      <UsersListComponent
        courses={courses}
        filteredIds={filteredIds}
        handleTextChange={this.handleTextChange}
        handleRoleChangeRequest={this.handleRoleChangeRequest}
        handleRoleFilterChange={this.handleRoleFilterChange}
        textFilter={textFilter}
        roleFilter={roleFilter}
        users={users}
        openModal={this.handleOpenModal}
      />
    )
  }
}

export default UsersList
