import { actions } from 'admin/redux/users'

import { Loader } from 'common/components'

import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import UsersListComponent from './component'

// todo: Consider splitting component
@connect(state => ({
  auth: state.auth,
  users: state.users
}))
class UsersList extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    users: PropTypes.object
  }

  state = {
    textFilter: '',
    roleFilter: []
  }

  componentDidMount() {
    this.props.dispatch(actions.getUsers())
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

    return this.props.dispatch(actions.toggleUserRole(userId, mapifiedRoles))
  }

  render() {
    const { users } = this.props

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
        filteredIds={filteredIds}
        handleTextChange={this.handleTextChange}
        handleRoleChangeRequest={this.handleRoleChangeRequest}
        handleRoleFilterChange={this.handleRoleFilterChange}
        textFilter={textFilter}
        roleFilter={roleFilter}
        users={users}
      />
    )
  }
}

export default UsersList
