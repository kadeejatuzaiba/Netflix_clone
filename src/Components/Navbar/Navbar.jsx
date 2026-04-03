



import React, { useEffect, useRef, useState, useContext } from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../Firebase'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function NavBar() {

  const navRef = useRef()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzNhZGMxOGU0NjJjMmMwNDNlYzA1Yzc2MTRjZTNiMSIsIm5iZiI6MTc3MzQ1NzEzOC40NzksInN1YiI6IjY5YjRjZWYyNTY1NGI0NzM0MzVhNjM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WMHOS9WTDpIDlC3KG7NNSMyMLdz7to1-WDAb4Yqz3Jw'

    }
  }

  // 🔍 Close search when click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.search-wrapper')) {
        setShowSearch(false)
        setQuery('')
        setResults([])
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  
  useEffect(() => {
    const delay = setTimeout(async () => {

      if (!query.trim()) {
        setResults([])
        return
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          options
        )

        const data = await res.json()

        if (data.results) {
          setResults(data.results)
        } else {
          setResults([])
        }

      } catch (err) {
        console.error(err)
      }

    }, 400)

    return () => clearTimeout(delay)

  }, [query])

  
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={navRef} className='navbar'>

      {/* LEFT */}
      <div className='navbar-left'>
        <img src={logo} alt="" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tv">Tv Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/new">New & Popular</Link></li>
          <li><Link to="/my-list">My List</Link></li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      
      <div className='navbar-right'>

        {/* 🔍 SEARCH */}
        <div className="search-wrapper">
          <img 
            src={search_icon} 
            alt="" 
            className='icons'
            onClick={() => setShowSearch(!showSearch)}
          />

          {showSearch && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="search-results">

                {results.length === 0 && query && (
                  <p style={{color: 'white', padding: '5px'}}>No results found</p>
                )}

                {results.map(movie => (
                  <div 
                    key={movie.id} 
                    className="search-item"
                    onClick={() => {
                      navigate(`/player/${movie.id}`)
                      setShowSearch(false)
                      setQuery('')
                      setResults([])
                    }}
                  >
                    {movie.title || movie.original_title}
                  </div>
                ))}

              </div>
            </div>
          )}
        </div>

        
        {user && <p style={{color:'white'}}>{user.email}</p>}

      
        <img src={bell_icon} alt="" className='icons'/>

        {/* PROFILE */}
        <div className='navbar-profile'>
          <img src={profile_img} alt="" className='profile'/>
          <img src={caret_icon} alt="" />

          <div className='dropdown'>
            <p onClick={async () => {
              await logout();
              navigate("/login");
            }}>
              Sign Out of Netflix
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default NavBar