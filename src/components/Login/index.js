import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showerrormsg: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  loginsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showerrormsg: true, errorMsg})
  }

  loginsubmit = async event => {
    const {username, password} = this.state
    const userdeatils = {username, password}
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdeatils),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      this.loginsuccess(jwtToken)
      console.log(jwtToken)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showerrormsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log(showerrormsg)
    console.log(errorMsg)
    return (
      <div className="bg-container">
        <div className="login-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>

          <form className="form-container" onSubmit={this.loginsubmit}>
            <div className="usename-container">
              <label className="username-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="username-input"
                onChange={this.changeUsername}
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="password-container">
              <label className="password-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="password-input"
                onChange={this.changePassword}
                placeholder="Password"
                value={password}
              />
            </div>
            {showerrormsg ? <p className="erromsg">{errorMsg}</p> : null}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
