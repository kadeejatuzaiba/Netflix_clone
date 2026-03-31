import React, { useEffect, useState } from 'react'
import { db, auth } from '../../Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './MyList.css'

function MyList() {

  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = auth.currentUser

      if (!user) {
        alert("Please login")
        return
      }

      const userRef = doc(db, "User", user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const data = userSnap.data()
        setWatchlist(data.watchlist || [])
      }
    }

    fetchWatchlist()
  }, [])

  return (
    <div className='mylist-container'>
      <h2>My List ❤️</h2>

      <div className='mylist-cards'>
        {watchlist.length === 0 ? (
          <p className='empty-text'>No movies added </p>
        ) : (
          watchlist.map((movie, index) => (
            <Link to={`/player/${movie.id}`} className='mylist-card' key={index}>
              <img
                src={`https://img.youtube.com/vi/${movie.key}/0.jpg`}
                alt=""
              />
              <p>{movie.name}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default MyList