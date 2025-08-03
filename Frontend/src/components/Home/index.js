import { useState, useEffect } from 'react'
import Header from '../Header'
import DoctorsList from '../DoctorsList'
import './index.css'

const Home = () => {
  const [specializations, setSpecializations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('ALL')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getSpecializations = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('https://niroggyan-assignment-backend.onrender.com/specialization_list/')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSpecializations(data.specialization_list)
      } catch (err) {
        setError('Failed to fetch specializations. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    getSpecializations()
  }, [])

  const onChangeSearch = event => setSearchQuery(event.target.value)

  const onChangeSpecialization = event => setSelectedSpecialization(event.target.value)

  const renderSearchInput = () => (
    <input
      className="search-input"
      type="search"
      placeholder="Search..."
      value={searchQuery}
      onChange={onChangeSearch}
    />
  )

  const renderFilterSelect = () => (
    <div className="filter-group">
      <label htmlFor="filter" className="filter-label">
        Filter By:
      </label>
      <select
        id="filter"
        className="search-select"
        value={selectedSpecialization}
        onChange={onChangeSpecialization}
      >
        <option value="ALL">All</option>
        {specializations.map(item => (
          <option key={item.specialization_id} value={item.specialization_name}>
            {item.specialization_name}
          </option>
        ))}
      </select>
    </div>
  )

  const renderSearchContainer = () => (
    <div className="search-container">
      {renderSearchInput()}
      {renderFilterSelect()}
    </div>
  )

  return (
    <>
      <Header />
      <div className="Home-container">
        {isLoading && <p>Loading specializations...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && renderSearchContainer()}
        <DoctorsList searchQuery={searchQuery} specialization={selectedSpecialization} />
      </div>
    </>
  )
}

export default Home
