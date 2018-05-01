import React from 'react'
import Message from './partials/Message'
import { Field } from 'redux-form'
import { Input } from 'common/form-controls'
import PropTypes from 'prop-types'

/*class Chat extends React.Component {
  static propTypes = {}

  handleSubmit = (values) => {
    console.log(values)
  }

  render() {
    const { handleSubmit } = this.props*/

const MessagesComponent = ({ handleSubmit, messages }) => (
  <>
    <h2>Комментарии</h2>

    {messages?.map((message, index) => <Message key={index} {...message} />)}

  
    {/*<div className="form-group">
          <label htmlFor="messageBox">Комментарий:</label>
          <textarea className="form-control" id="messageBox" rows="3" />
        </div>*/}

    <form onSubmit={handleSubmit}>
      <Field name="text" component={Input} label="Комментарий:" />
      {/* todo: create Button component */}
      <button type="submit" className="btn btn-primary" disabled={!messages}>
        <span className="oi oi-location" /> Ответить
      </button>
    </form>
  </>
)

MessagesComponent.propTypes = {
  taskId: PropTypes.string.isRequired
}

export default MessagesComponent
