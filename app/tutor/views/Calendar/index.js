import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import routes from 'routes'

BigCalendar.momentLocalizer(moment)

const mapStateToProps = state => {
  const { applications, courses, users } = state

  return {
    events: Object.keys(applications).map(id => {
      const app = applications[id]
      const user = users[app.studentId].displayName
      const course = courses[app.courseId].name

      return {
        id,
        title: (
          <React.Fragment>
            <b>{user}</b>
            <br />
            {course}
          </React.Fragment>
        ),
        start: moment(app.examDate).toDate(),
        end: moment(app.examDate)
          .add(1, 'hour')
          .toDate(),
        // start: new Date(2015, 3, 12, 10, 30, 0, 0),
        // end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Big conference for important people'
      }
    })
  }
}

@withRouter
@connect(mapStateToProps)
class Calendar extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    history: PropTypes.object
  }

  handleEventSelect = app => {
    this.props.history.push(routes.tutors.application.replace(':id', app.id))
  }

  render() {
    return (
      <>
        <h1 className="mb-3 mt-3 display-4">Календарь</h1>
        <BigCalendar
          selectable
          events={this.props.events}
          step={60}
          views={['month', 'week', 'day']}
          onSelectEvent={this.handleEventSelect}
          defaultDate={new Date()}
          messages={{
            today: 'Сегодня',
            previous: '<',
            next: '>',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День'
          }}
        />
      </>
    )
  }
}

export default Calendar
