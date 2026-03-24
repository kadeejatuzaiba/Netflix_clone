import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


function TitleCards({title,category}) {
const [apiData,setApiData]=useState([])
const cardsRef=useRef()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNhZGMxOGU0NjJjMmMwNDNlYzA1Yzc2MTRjZTNiMSIsIm5iZiI6MTc3MzQ1NzEzOC40NzksInN1YiI6IjY5YjRjZWYyNTY1NGI0NzM0MzVhNjM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMHOS9WTDpIDlC3KG7NNSMyMLdz7to1-WDAb4Yqz3Jw'
  }
};



const handleWheel=(event)=>{
  event.preventDefault()
  cardsRef.current.scrollLeft+=event.deltaY
}

useEffect(()=>{

  
fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel',handleWheel)
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
