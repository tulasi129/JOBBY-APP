import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apijobconstantStatus = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  FAILURE: 'failure',
  LOADING: 'loading',
}
const apiProfileconstantStatus = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  FAILURE: 'failure',
  LOADING: 'loading',
}
class Jobs extends Component {
  state = {
    searchInput: '',
    jobList: [],
    checkboxInput: [],
    activeRadiobutton: '',
    profileList: {},
    apiJobStatus: apijobconstantStatus.INITIAL,
    apiProfileStatus: apiProfileconstantStatus.INITIAL,
  }

  componentDidMount() {
    this.getjobDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus: apiProfileconstantStatus.LOADING})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const newProfiledata = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileList: newProfiledata,
        apiProfileStatus: apiProfileconstantStatus.SUCCESS,
      })
    } else {
      this.setState({apiProfileStatus: apiProfileconstantStatus.FAILURE})
    }
  }

  selectCheckboxInput = event => {
    const {checkboxInput} = this.state
    const inputinCheckboxinput = checkboxInput.filter(
      each => each === event.target.id,
    )
    if (inputinCheckboxinput.length === 0) {
      this.setState(
        prevState => ({
          checkboxInput: [...prevState.checkboxInput, event.target.id],
        }),
        this.getjobDetails,
      )
    } else {
      const filteredList = checkboxInput.filter(
        each => each !== event.target.id,
      )
      this.setState({checkboxInput: filteredList}, this.getjobDetails)
    }
  }

  slectSalaryRange = event => {
    this.setState({activeRadiobutton: event.target.id}, this.getjobDetails)
  }

  getjobDetails = async () => {
    this.setState({apiJobStatus: apijobconstantStatus.LOADING})
    const {checkboxInput, activeRadiobutton, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/?employment_type=${checkboxInput}&minimum_package=${activeRadiobutton}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const newData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobList: newData,
        apiJobStatus: apijobconstantStatus.SUCCESS,
      })
    } else {
      this.setState({apiJobStatus: apijobconstantStatus.FAILURE})
    }
  }

  onrenderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onretry = () => {
    this.getProfileDetails()
  }

  onrenderFailureView = () => (
    <div className="profile-failure-view">
      <button className="retry-button" type="button" onClick={this.onretry}>
        Retry
      </button>
    </div>
  )

  onrenderProfileView = () => {
    const {profileList} = this.state
    const {profileImageUrl, name, shortBio} = profileList
    return (
      <div className="prfile-container">
        <img src={profileImageUrl} className="prifileimage" alt="profile" />
        <h1 className="name-heading">{name}</h1>
        <p className="prifile-descripton">{shortBio}</p>
      </div>
    )
  }

  onRenderProfilestatus = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiProfileconstantStatus.SUCCESS:
        return this.onrenderProfileView()
      case apiProfileconstantStatus.FAILURE:
        return this.onrenderFailureView()
      case apiProfileconstantStatus.LOADING:
        return this.onrenderLoadingView()
      default:
        return null
    }
  }

  rednderJobLoadindView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onJobRetry = () => {
    this.getjobDetails()
  }

  rednderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failiure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops? Something Went Wrong </h1>
      <p className="failue-pargarph">
        We cannot seems to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.onJobRetry}>
        Retry
      </button>
    </div>
  )

  rednderJobDetailsView = () => {
    const {jobList} = this.state
    const noJobs = jobList.length !== 0

    return noJobs ? (
      <ul className="list-container">
        {jobList.map(each => (
          <JobCard joblist={each} key={each.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-job-image"
          alt="no jobs"
        />
        <h1 className="no-jobs-found-heading">No Jobs Found</h1>
        <p className="no-jobs-found-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onrenderjobDetails = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apijobconstantStatus.SUCCESS:
        return this.rednderJobDetailsView()
      case apijobconstantStatus.FAILURE:
        return this.rednderJobFailureView()
      case apijobconstantStatus.LOADING:
        return this.rednderJobLoadindView()
      default:
        return null
    }
  }

  changeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getjobDetails()
  }

  onEnterSearchInput = event => {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.getjobDetails()
    }
  }

  render() {
    const {searchInput, checkboxInput, activeRadiobutton} = this.state

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="profile-employement-container">
            <div className="profile-employemnt-container">
              {this.onRenderProfilestatus()}
              <hr className="break-line" />
              <div className="employement-container">
                <h1 className="employement-heading">Type of Employment</h1>
                <ul className="employement-list">
                  {employmentTypesList.map(each => (
                    <li
                      className="checkbox-container"
                      key={each.employmentTypeId}
                    >
                      <input
                        type="checkbox"
                        id={each.employmentTypeId}
                        className="checkbox-input"
                        onChange={this.selectCheckboxInput}
                        value={checkboxInput}
                      />
                      <label htmlFor={each.employmentTypeId} className="label">
                        {each.label}
                      </label>
                    </li>
                  ))}
                  <hr className="break-line" />
                </ul>
              </div>

              <div className="salary-range-container">
                <h1 className="salary-range-heading">Salary Range</h1>
                <ul className="salary-range-list">
                  {salaryRangesList.map(each => (
                    <li className="checkbox-container" key={each.salaryRangeId}>
                      <input
                        type="radio"
                        id={each.salaryRangeId}
                        className="checkbox-input"
                        name="salary"
                        onChange={this.slectSalaryRange}
                        value={activeRadiobutton}
                      />
                      <label htmlFor={each.salaryRangeId} className="label">
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="jobs-bg-container">
            <div className="input-container">
              <input
                type="search"
                className="search"
                onChange={this.changeSearch}
                onKeyDown={this.onEnterSearchInput}
                value={searchInput}
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  onClick={this.onSearch}
                  className="search-button"
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.onrenderjobDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
