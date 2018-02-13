import faker from 'faker'
import { map, times } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from 'routes'

const applications = {}
times(10, () => {
  applications[faker.random.uuid()] = {
    displayName: faker.name.findName(),
    course: faker.random.arrayElement([
      'Анализ многомерных данных',
      'Интегрированные информационные системы (предприятий)',
      'Компьютерная графика',
      'Основы бизнеса и права в информационных технологиях',
      'Основы защиты информации'
    ]),
    status: faker.random.arrayElement(['Допуск', '', '', '']),
    date: '3 часа назад'
  }
})

const ApplicationsList = () => (
  <>
    <h1>Список обращений</h1>

    <form>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Поиск"
      />
    </form>

    <div className="list-group list-group-flush">
      {map(applications, (application, index) => (
        <Link
          to={routes.application.replace(':id', index)}
          key={index}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              {application.displayName}{' '}
              <span className="badge badge-success">{application.status}</span>
            </h5>
            <small>{application.date}</small>
          </div>
          <p className="mb-1">{application.course}</p>
          {/*<small>Donec id elit non mi porta.</small>*/}
        </Link>
      ))}

      {/*<button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        Dapibus ac facilisis in
        <span className="badge badge-primary badge-pill">14</span>
      </button>
      <button type="button" className="list-group-item list-group-item-action list-group-item-info">Morbi leo risus</button>
      <button type="button" className="list-group-item list-group-item-action">Porta ac consectetur ac</button>
      <button type="button" className="list-group-item list-group-item-action" disabled>Vestibulum at eros</button>
      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">List group item heading</h5>
          <small>3 days ago</small>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <small>Donec id elit non mi porta.</small>
      </a>
      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">List group item heading</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <small className="text-muted">Donec id elit non mi porta.</small>
      </a>
      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">List group item heading</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
        <small className="text-muted">Donec id elit non mi porta.</small>
      </a>*/}
    </div>

    <nav className="mt-4" aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">
            Назад
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Далее
          </a>
        </li>
      </ul>
    </nav>
  </>
)

ApplicationsList.propTypes = {}

export default ApplicationsList
