import PropTypes from 'prop-types'
import React from 'react'

const NewMessage = ({newMessage, auth, handleChange, handleSubmit}) =>
  <form className="form-inline"
        onSubmit={event => handleSubmit(event, newMessage, auth.uid)}>
      <input type="text"
             className='form-control'
             placeholder="What's on your mind?" value={newMessage}
             onChange={handleChange}/>
      <button type="submit" className='btn btn-primary ml-2'
              disabled={!newMessage.length}>Post
      </button>
  </form>

NewMessage.propTypes = {
  newMessage: PropTypes.string,
  auth: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default NewMessage
