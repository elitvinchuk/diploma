import { ButtonGroup } from 'common/form-controls'
import React from 'react'
import PropTypes from 'prop-types'
import dict from 'common/dictionary'
import UserpicPlaceholder from 'common/assets/userpic-placeholder.jpg'
import UserEditModal from './UserEditModal'

const UsersListComponent = ({
  courses,
  filteredIds,
  handleTextChange,
  handleRoleChangeRequest,
  handleRoleFilterChange,
  openModal,
  textFilter,
  roleFilter,
  users
}) => (
  <>
    <h1 className="mb-3 mt-3 display-4">Пользователи</h1>

    <form className="form-inline d-flex mb-4">
      <input
        type="text"
        className="search-field form-control"
        onChange={handleTextChange}
        placeholder="Поиcк..."
        value={textFilter}
      />
      {/* todo: Replace with Dropdown*/}
      <ButtonGroup
        options={dict.roles}
        value={roleFilter}
        onChange={handleRoleFilterChange}
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
            <tr key={id} onClick={openModal(id)}>
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
                  onChange={handleRoleChangeRequest(id)}
                  activeClass="btn-info btn-info"
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <UserEditModal courses={courses} />
  </>
)

UsersListComponent.propTypes = {
  courses: PropTypes.object,
  filteredIds: PropTypes.array,
  handleTextChange: PropTypes.func.isRequired,
  handleRoleChangeRequest: PropTypes.func.isRequired,
  handleRoleFilterChange: PropTypes.func.isRequired,
  textFilter: PropTypes.string,
  roleFilter: PropTypes.array,
  users: PropTypes.object.isRequired
}

export default UsersListComponent
