import { actions, constants } from 'common/redux/auth'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm, SubmissionError } from 'redux-form'
import LoginComponent from './component'

const mapStateToProps = state => ({
  auth: state.auth,
  attemptingLogin: state.auth.status === constants.ATTEMPTING_LOGIN
})

const formName = 'tutorLogin'

const reduxFormConfig = {
  form: formName,
  onSubmit: ({ email, password }, dispatch) =>
    dispatch(actions.signInWithCredentials(email, password)).catch(error => {
      const errorMap = {
        'auth/invalid-email': {
          email: 'Неверный адрес электронной почты'
        },
        'auth/user-not-found': {
          _error: 'Пользователь не найден'
        },
        'auth/wrong-password': {
          _error: 'Неверный пароль'
        }
      }

      throw new SubmissionError(errorMap[error.code])
    })
}

export default withRouter(
  connect(mapStateToProps)(reduxForm(reduxFormConfig)(LoginComponent))
)
