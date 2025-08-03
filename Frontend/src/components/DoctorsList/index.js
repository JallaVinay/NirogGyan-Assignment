import { useState, useEffect } from "react"
import DoctorCard from '../DoctorCard'
import './index.css'

const DoctorsList = ({ searchQuery, specialization }) => {
  const [doctorsList, setDoctorsList] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getDoctorsList = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const url = `https://niroggyan-assignment-backend.onrender.com/doctors_list?search_q=${searchQuery}&specialization=${specialization}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setDoctorsList(data.doctors_list)
      } catch (err) {
        setError('Failed to fetch doctors. Please try again later.')
        setDoctorsList([])
      } finally {
        setIsLoading(false)
      }
    }

    getDoctorsList()
  }, [searchQuery, specialization])

  if (isLoading) {
    return <p>Loading doctors...</p>
  }

  if (error) {
    return <p className="error-message">{error}</p>
  }

  if (doctorsList.length === 0) {
    return <p>No doctors found.</p>
  }

  return (
    <ul className="doctors-list">
      {doctorsList.map((doctor) => (
        <li key={doctor.doctor_id}>
          <DoctorCard doctor={doctor} />
        </li>
      ))}
    </ul>
  )
}

export default DoctorsList
