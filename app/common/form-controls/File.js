// todo: make cool UI for that component
// todo: implement upload progress
// todo: add validation message
import React from 'react'
import PropTypes from 'prop-types'
import { storageRef } from 'firebaseConfig'

class FileInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    input: PropTypes.object // todo: replace with redux-forms' prop type for input
  }

  state = {
    downloadUrl: null
  }

  componentDidMount() {
    const { value } = this.props.input

    if (value) {
      storageRef
        .child(`manuals/${value}`)
        .getDownloadURL()
        .then(downloadUrl => {
          this.setState({
            downloadUrl
          })
        })
    }
  }

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

  render() {
    const { input: { name, onChange, onBlur, value, ...inputProps }, label } = this.props
    const { downloadUrl } = this.state

    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type="file"
          accept=".doc,.docx,.txt"
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          {...inputProps}
        />
        {downloadUrl && <a href={downloadUrl}>{value}</a>}
        {/* <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '75%' }}
          />
        </div> */}
      </>
    )
  }
}

export default FileInput
