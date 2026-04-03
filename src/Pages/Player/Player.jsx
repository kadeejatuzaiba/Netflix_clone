

import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

import { auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

function Player() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [apiData, setApiData] = useState(null)
  const [isInList, setIsInList] = useState(false) // ⭐ important

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNhZGMxOGU0NjJjMmMwNDNlYzA1Yzc2MTRjZTNiMSIsIm5iZiI6MTc3MzQ1NzEzOC40NzksInN1YiI6IjY5YjRjZWYyNTY1NGI0NzM0MzVhNjM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMHOS9WTDpIDlC3KG7NNSMyMLdz7to1-WDAb4Yqz3Jw'

    }
  };

  // 🎬 Fetch video
  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.results.length > 0) {
  //         setApiData(res.results[0])
  //       }
  //     })
  //     .catch(err => console.error(err));
  // }, [id])


  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
    .then(res => res.json())
    .then(res => {

      if (!res.results || res.results.length === 0) {
        setApiData(null)
        return
      }

      // ✅ get only YouTube trailer
      const trailer = res.results.find(
        vid => vid.site === "YouTube" && vid.type === "Trailer"
      )

      if (trailer) {
        setApiData(trailer)
      } else {
        setApiData(res.results[0]) // fallback
      }

    })
    .catch(err => console.error(err));
}, [id])

  // ❤️ Check already in watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      const user = auth.currentUser
      if (!user) return

      const userRef = doc(db, "User", user.uid)
      const snap = await getDoc(userRef)

      if (snap.exists()) {
        const data = snap.data()
        const exists = data.watchlist?.some(item => item.id === id)
        setIsInList(exists)
      }
    }

    checkWatchlist()
  }, [id])

  // 🔁 Toggle function
  const handleWatchlist = async () => {
    const user = auth.currentUser

    if (!user) {
      toast.error("Please login first ❌");
      return;
    }

    const userRef = doc(db, "User", user.uid)
    const snap = await getDoc(userRef)
    const data = snap.data()

    const movieData = {
      id: id,
      name: apiData?.name,
      key: apiData?.key,
      type: apiData?.type
    }

    let updatedList = data.watchlist || []

    if (isInList) {
      // ❌ REMOVE
      updatedList = updatedList.filter(item => item.id !== id)
      await updateDoc(userRef, { watchlist: updatedList })

      setIsInList(false)
      toast.info("Removed from My List 💔")
    } else {
      // ✅ ADD
      await updateDoc(userRef, {
        watchlist: arrayUnion(movieData)
      })

      setIsInList(true)
      toast.success("Added to My List ❤️")
    }
  }

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-1)} />

      <button
  className='my-list'
  onClick={handleWatchlist}
  style={{
    backgroundColor: isInList ? "white" : "transparent",
    color: isInList ? "black" : "white"
  }}
>
  {isInList ? "✔ In My List" : "+ My List"}
</button>
    
      {apiData?.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        />
      ) : (
        <p style={{ color: "white" }}>Loading...</p>
      )}


 
      {/* 📄 INFO */}
      <div className="player-info">
        <p>{apiData?.published_at?.slice(0,10)}</p>
        <p>{apiData?.name}</p>
        <p>{apiData?.type}</p>
      </div>
    </div>
  )
}

export default Player