import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <ul className="header-components-container">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
        </li>
        <li className="home-job-container">
          <Link to="/">
            <h1 className="home-element">Home</h1>
          </Link>
          <Link to="/jobs">
            <h1 className="job-element">Jobs</h1>
          </Link>
        </li>
        <li>
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
