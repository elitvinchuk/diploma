import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

class ArrangeExam extends React.Component {
  static propTypes = {
    onExamDateSelect: PropTypes.func.isRequired
  }

  state = {}

  handleDateChange = examDate => {
    this.setState({
      examDate
    })
  }

  handleDateConfirm = () => {
    this.props.onExamDateSelect(+this.state.examDate)
  }

  render() {
    const { examDate } = this.state

    return (
      <div className="arrange-exam">
        <DatePicker
          showTimeSelect
          selected={examDate}
          onChange={this.handleDateChange}
          className="form-control"
          placeholderText="Выберите дату"
          dateFormat="LLL"
          timeFormat="H:mm"
          timeCaption="Время"
          timeIntervals={30}
        />
        <button
          type="button"
          onClick={this.handleDateConfirm}
          disabled={!examDate}
          className="btn btn-success"
        >
          Определить дату аттестации
        </button>
      </div>
    )
  }
}

export default ArrangeExam
