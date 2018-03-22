// import { Modal } from 'common/components'
import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import Wrapper from './Wrapper'
import 'styles'

moment.locale('ru')

const root = document.getElementById('root')
// Modal.setAppElement(root)

render(<Wrapper />, root)
