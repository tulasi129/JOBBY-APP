import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BiLinkExternal} from 'react-icons/bi'
import {MdBusinessCenter} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiConstantStatus = {
  INITIAL: 'initial',
  SUCCESS: 'success',
  FAILURE: 'failure',
  LOADING: 'loading',
}

class JobDetails extends Component {
  state = {
    jobsData: {},
    similarJobsData: [],
    apiStatus: apiConstantStatus.INITIAL,
  }

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({apiStatus: apiConstantStatus.LOADING})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = `https://apis.ccbp.in/jobs/${id}`
    console.log(url)
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
      const newJobsData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }
      const newSimilarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsData: newJobsData,
        similarJobsData: newSimilarJobsData,
        apiStatus: apiConstantStatus.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.FAILURE})
    }
  }

  onrenderLoaidngView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getjobDetails()
  }

  onrenderFailureView = () => (
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
      <button className="retry-button" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onrenderJobView = () => {
    const {jobsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobsData

    return (
      <>
        <div className="job-details-container">
          <div className="details-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="logo"
              />
              <div className="title-rating-container">
                <p className="title">{title}</p>
                <div className="rating-contianer">
                  <AiFillStar className="rating-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="detail-package-container">
              <div className="loction-jobtype-container">
                <div className="location-container">
                  <GoLocation className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="employemnt-container">
                  <MdBusinessCenter className="employemnt-icon" />
                  <p className="employemnt">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="job-detail-break-line" />
            <div className="description-container">
              <div className="description-vist-container">
                <h1 className="description-heading">Description</h1>
                <a href={companyWebsiteUrl} className="visit">
                  Visit <BiLinkExternal className="visit-icon" />
                </a>
              </div>

              <p className="description">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <p className="skills-heading">Skills</p>
              <ul className="skills-list-container">
                {skills.map(each => (
                  <li className="skill-each-list" key={each.name}>
                    <img
                      src={each.imageUrl}
                      className="skill-image"
                      alt={each.name}
                    />
                    <h1 className="skill-heading">{each.name}</h1>
                  </li>
                ))}
              </ul>
            </div>
            <div className="company-life-container">
              <h1 className="Life-at-Company-heading">Life at Company</h1>
              <div className="description-image-container">
                <p className="company-description">
                  {lifeAtCompany.description}
                </p>
                <img
                  src={lifeAtCompany.imageUrl}
                  className="company-image"
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobsData.map(each => (
              <SimilarJobs key={each.id} similejobList={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onrenderJobDetailedView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.SUCCESS:
        return this.onrenderJobView()
      case apiConstantStatus.FAILURE:
        return this.onrenderFailureView()
      case apiConstantStatus.LOADING:
        return this.onrenderLoaidngView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-bg-details-container">
          {this.onrenderJobDetailedView()}
        </div>
      </>
    )
  }
}
export default JobDetails
