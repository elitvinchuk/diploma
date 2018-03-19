import { getUsers } from 'admin/redux/users'
import UserpicPlaceholder from 'common/assets/userpic-placeholder.jpg'
import { Loader } from 'common/components'
import dict from 'common/dictionary'
import { ButtonGroup } from 'common/form-controls'
import { func, object } from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import '../styles.scss'

@connect(state => ({
  users: state.users
}))
class UsersList extends React.Component {
  static propTypes = {
    dispatch: func,
    users: object
  }

  state = {
    textFilter: '',
    roleFilter: []
  }

  componentDidMount() {
    this.props.dispatch(getUsers())
  }

  handleTextChange = ({ target }) => {
    this.setState({
      textFilter: target.value
    })
  }

  handleRoleChange = roleFilter => {
    this.setState({
      roleFilter
    })
  }

  render() {
    const { users } = this.props

    if (!users) {
      return <Loader fullscreen />
    }

    const { textFilter, roleFilter } = this.state

    const userIds = Object.keys(users)
    const filteredIds = userIds.filter(id => {
      const { displayName, email, roles } = users[id]
      const stringValue = (displayName + email).toUpperCase()

      const roleMatch = roleFilter.length
        ? roleFilter.some(role => ~roles.indexOf(role))
        : true

      return stringValue.includes(textFilter.toUpperCase()) && roleMatch
    })

    return (
      <>
        <h1 className="mb-3">Пользователи</h1>

        <form className="form-inline d-flex mb-4">
          <input
            type="text"
            className="search-field form-control"
            onChange={this.handleTextChange}
            placeholder="Поиcк..."
            value={textFilter}
          />

          <ButtonGroup
            options={dict.roles}
            value={roleFilter}
            onChange={this.handleRoleChange}
            className="type-filter"
          />
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
                    <ButtonGroup options={dict.roles} value={roles} />
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
