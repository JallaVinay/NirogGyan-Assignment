import './index.css'
import { Link } from 'react-router-dom'
import { Availability } from './styledComponents'
import { DisabledButton } from './styledComponents' 

const DoctorCard = ({ doctor }) => {
  const { doctor_id, name, profile_image_url, specialization, availability_status } = doctor
  const isAvailable = availability_status === 'Available Today'

  return (
    <div className="doctor-card">
      <img src={profile_image_url} alt={name} className="doctor-image" />
      <div className="doctor-details">
        <h3 className="doctor-name">{name}</h3>
        <p className="doctor-specialization">{specialization}</p>
        <Availability status={availability_status}>{availability_status}</Availability>
        {isAvailable ? (
          <Link to={`/book-appointment/${doctor_id}`} className="appointment-button">
            Book Appointment
          </Link>
        ) : (
          <DisabledButton disabled>
            Book Appointment
          </DisabledButton>
        )}
      </div>
    </div>
  )
}

export default DoctorCard
