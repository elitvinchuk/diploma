import { actions } from 'admin/redux/users'
import UserpicPlaceholder from 'common/assets/userpic-placeholder.jpg'
import { Loader } from 'common/components'
import dict from 'common/dictionary'
import { ButtonGroup } from 'common/form-controls'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

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
      <>
        <h1 className="mb-3 mt-3 display-4">Пользователи</h1>

        <form className="form-inline d-flex mb-4">
          <input
            type="text"
            className="search-field form-control"
            onChange={this.handleTextChange}
            placeholder="Поиcк..."
            value={textFilter}
          />
          {/* todo: Replace with Dropdown*/}
          <ButtonGroup
            options={dict.roles}
            value={roleFilter}
            onChange={this.handleRoleFilterChange}
            className="type-filter"
          />
          {/* todo: Implement creation logic */}
        </form>
        <table className="users-table table">
          <thead>
            <tr>
              <th />
              <th>Имя</th>
              <th>Эл. почта</th>
              <th>Роли</th>
            </tr>
          </thead>
          <tbody>
            {/* todo: split into UserLine */}
            {filteredIds.map(id => {
              const { displayName, email, photoURL, roles } = users[id]

              return (
                <tr key={id}>
                  <td>
                    <img
                      src={photoURL || UserpicPlaceholder}
                      className="rounded-circle"
                      height="38"
                      alt=""
                    />
                  </td>
                  <td className="align-middle">{displayName}</td>
                  <td className="align-middle">{email}</td>
                  <td className="text-right">
                    <ButtonGroup
                      options={dict.roles}
                      value={Object.keys(roles)}
                      onChange={this.handleRoleChangeRequest(id)}
                      activeClass="btn-info btn-info"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

export default UsersList
