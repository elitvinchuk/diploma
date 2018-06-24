import React from 'react'
import PropTypes from 'prop-types'

class MarkExamPass extends React.Component {
  static propTypes = {
    onExamPass: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  }

  state = {
    mark: ''
  }

  handleMarkChange = e => {
    this.setState({
      mark: e.target.value
    })
  }

  render() {
    const { onExamPass, type } = this.props
    const { mark } = this.state

    return type === 'test' ? (
      <button onClick={() => onExamPass(mark)} className="btn btn-success" type="button">
        Зачесть <span className="oi oi-check" />
      </button>
    ) : (
      <div className="input-group">
        <input
          type="number"
          onChange={this.handleMarkChange}
          value={mark}
          className="form-control"
          placeholder="Оценка"
          min="4"
          max="10"
        />
        <div className="input-group-append">
          <button onClick={() => onExamPass(mark)} className="btn btn-success" type="button">
            Зачесть <span className="oi oi-check" />
          </button>
        </div>
      </div>
    )
  }
}

export default MarkExamPass
