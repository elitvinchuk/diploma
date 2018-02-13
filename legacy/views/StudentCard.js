import FileInput from 'legacy/components/FileInput'
import PropTypes from 'prop-types'
import React from 'react'
import { storage } from '../../app/firebase'

class StudentCard extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    userRef: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    const file = event.target.files[0]
    const uploadTask = this.storageRef.child(file.name).put(file, {
      contentType: file.type,
    })
    
    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100 + '%')
    })

    uploadTask.then(snapshot => {
      this.props.userRef.child('photoURL').set(snapshot.downloadURL)
    })
  }

  constructor (props) {
    super(props)

    this.storageRef = storage.ref('/students-images').child(props.uid)
  }

  render () {
    const {uid, user: {displayName, photoURL}} = this.props

    return (
      <div>
        <img src={photoURL} style={{height: '100px'}} alt=""
             className='img-thumbnail'/>
        <span className='h2'>{displayName}</span>
        <FileInput accept='.png,.gif,.jpg'
                   placeholder='Select image'
                   onChange={this.handleSubmit}/>
      </div>
    )
  }
}

export default StudentCard
