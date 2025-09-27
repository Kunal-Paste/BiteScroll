import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../styles/profile.css'

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    console.log('Profile useParams id ->', id)
    // guard against missing or placeholder id (e.g. ":id")
    if (!id || id === ':id') return;

    axios.get(`https://bitescroll.onrender.com/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
      })
      .catch(err => {
        console.error('Failed to load profile', err)
        // optional: set some error state to show to user
      })
  }, [id])


  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">

          <img className="profile-avatar" src="https://i.pinimg.com/1200x/00/8c/4f/008c4fd32b1cdfccebbd8bff6115e683.jpg" alt="" />

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">
              {profile?.name}
            </h1>
            <p className="profile-pill profile-address" title="Address">
              {profile?.address}
            </p>
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">total meals</span>
            <span className="profile-stat-value">5</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">customer served</span>
            <span className="profile-stat-value">10K</span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid" aria-label="Videos">
        {videos.map((v) => (
          <div key={v.id} className="profile-grid-item">
            {/* Placeholder tile; replace with <video> or <img> as needed */}


            <video
              className="profile-grid-video"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              src={v.video} muted ></video>


          </div>
        ))}
      </section>
    </main>
  )
}

export default Profile