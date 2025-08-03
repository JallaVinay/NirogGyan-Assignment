import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../Header"
import "./index.css"

const formatDate = (date) => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

const DoctorDetails = () => {
  const { id: doctorId } = useParams()
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [slots, setSlots] = useState([])
  const [loadingDoctor, setLoadingDoctor] = useState(true)
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [errorDoctor, setErrorDoctor] = useState(null)
  const [errorSlots, setErrorSlots] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const today = new Date()
  const nextDay = new Date(today)
  nextDay.setDate(today.getDate() + 1)
  const nextDayStr = formatDate(nextDay)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoadingDoctor(true)
      setErrorDoctor(null)
      try {
        const response = await fetch(`https://niroggyan-assignment-backend.onrender.com/doctorDetails/${doctorId}`)
        if (!response.ok) throw new Error("Failed to fetch doctor details")
        const data = await response.json()
        setDoctor(data)
      } catch (error) {
        setErrorDoctor(error.message)
      } finally {
        setLoadingDoctor(false)
      }
    }
    fetchDoctorDetails()
  }, [doctorId])

  useEffect(() => {
    const fetchAvailabilitySlots = async () => {
      setLoadingSlots(true)
      setErrorSlots(null)
      try {
        const response = await fetch(`https://niroggyan-assignment-backend.onrender.com/doctorAvailability/${doctorId}`)
        if (!response.ok) throw new Error("Failed to fetch availability slots")
        const data = await response.json()
        setSlots(data)
      } catch (error) {
        setErrorSlots(error.message)
      } finally {
        setLoadingSlots(false)
      }
    }
    fetchAvailabilitySlots()
  }, [doctorId])

  const openModal = (slot) => {
    setSelectedSlot(slot)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSlot(null)
  }

  const handleOkClick = () => {
    closeModal()
    navigate("/")
  }

  const renderModal = () => {
    if (!showModal || !selectedSlot) return null
    return (
      <div className="modal-bg" onClick={closeModal}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <h2>Appointment Confirmed</h2>
          <p>Date: {nextDayStr}</p>
          <p>Time: {selectedSlot.slot_start_time} - {selectedSlot.slot_end_time}</p>
          <div className="modal-buttons">
            <button onClick={handleOkClick} className="btn btn-ok">OK</button>
          </div>
        </div>
      </div>
    )
  }

  const renderDetails = () => {
    if (loadingDoctor) return <div>Loading doctor details...</div>
    if (errorDoctor) return <div>Error loading doctor details: {errorDoctor}</div>
    if (!doctor) return <div>No doctor details found</div>

    return (
      <div className="details-doctor-details-container">
        <div className="details-doctor-details">
          <div>
            <h1 className="details-doctor-name">{doctor.name}</h1>
            <p className="doctor-field"><b>Bio</b>: {doctor.bio}</p>
            <p className="doctor-field"><b>Qualifications</b>: {doctor.qualifications}</p>
            <p className="doctor-field"><b>Experience</b>: {doctor.years_of_experience} years</p>
            <p className="doctor-field"><b>Email</b>: {doctor.email}</p>
          </div>
          <h2 className="section-title">Available Slots</h2>

          <div className="availability-info">
            <p><b>Available for</b>: {nextDayStr}</p>
          </div>

          {loadingSlots ? (
            <p>Loading availability slots...</p>
          ) : errorSlots ? (
            <p>Error loading slots: {errorSlots}</p>
          ) : slots.length === 0 ? (
            <p>No availability slots found.</p>
          ) : (
            <ul className="slots-list">
              {slots.map(slot => (
                <li key={slot.availability_id} className="slot">
                  <span>{slot.slot_start_time} - {slot.slot_end_time}</span>
                  <button className="btn confirm-slot" onClick={() => openModal(slot)}>Confirm Slot</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      {renderDetails()}
      {renderModal()}
    </>
  )
}

export default DoctorDetails
