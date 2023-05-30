import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdBusinessCenter} from 'react-icons/md'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {joblist} = props
  const {
    companyLogoUrl,
    location,
    employementType,
    packagePerAnnum,
    jobDescription,
    rating,
    title,
    id,
  } = joblist
  return (
    <Link to={`/jobs/${id}`}>
      <div className="each-list-container">
        <li className="each-list">
          <div className="logo-title-container">
            <img src={companyLogoUrl} alt="company logo" className="logo" />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
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
                <p className="employemnt">{employementType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="break-line" />
          <div className="description-container">
            <p className="description-heading">Description</p>
            <p className="description">{jobDescription}</p>
          </div>
        </li>
      </div>
    </Link>
  )
}
export default JobCard
