import React from 'react'
import PropTypes from 'prop-types'

class Attachments extends React.Component {
  static propTypes = {}

  render() {
    return (
      <>
        <h2>Выполненные задания</h2>

        <div className="card-columns">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <span className="oi oi-document" /> Отчёт
              </h5>
              <a href="#" className="card-link">
                Скачать
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <span className="oi oi-code" /> Исходники
              </h5>
              <p className="card-text">Выполнено в среде версии 5.10.15.</p>
              <a href="#" className="card-link">
                Скачать
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <span className="oi oi-bar-chart" /> Расчёты
              </h5>
              <p className="card-text">Расчёты выполены с погрешностью, но всё в порядке 😃</p>
              <a href="#" className="card-link">
                Скачать
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Attachments
