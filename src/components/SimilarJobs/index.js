import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {MdBusinessCenter} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similejobList} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similejobList
  return (
    <li className="each-similar-job">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <div className="description-container">
        <p className="description-heading">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
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
    </li>
  )
}
export default SimilarJobs
