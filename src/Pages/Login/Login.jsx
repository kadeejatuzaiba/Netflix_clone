// import React, { useState } from 'react'
// import './Login.css'
// import logo from '../../assets/logo.png'
// import {login,signup} from '../../Firebase'
// import netflix_spinner from '../../assets/netflix_spinner.gif'

// function Login() {
//   const [signState,setSignState]=useState('Sign In')
//   const [name,setName]=useState('')
//   const [email,setEmail]=useState('')
//   const [password,setPassword]=useState('')
//   const [loading,setLoading]=useState(false)

//   const user_auth=async (event)=>{
//      event.preventDefault(); 
//      setLoading(true)
//     if(signState==='Sign In'){
//       await login(email,password)
//     }else{
//       await signup(name,email,password)
//     }
//     setLoading(false)
//   }


//   return (
//     loading?<div className="login-spinner">
//       <img src={netflix_spinner} alt="" />
//     </div>:
//     <div className='login'>
//       <img src={logo} className='login-logo' alt="" />
//       <div className="login-form">
//         <h1>{signState}</h1>
//         <form  onSubmit={user_auth}>
//           {signState==='Sign Up'?
//           <input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" placeholder='Your name' />:<></>}
          
//           <input value={email} onChange={(event)=>{setEmail(event.target.value)}} type="email" placeholder='Email' />
//           <input value={password } onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder='Password' />
//           <button type="submit">{signState}</button>
//           <div className="form-help">
//             <div className="remember">
//               <input type='checkbox'/>
//               <label htmlFor="">Remember Me</label>
//             </div>
//             <p>Need Help?</p>
//           </div>
//         </form>
//         <div className="form-switch">
//           {signState==='Sign In'?<p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>:<p>Already have account <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login





import React, { useState, useContext, useEffect } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../Firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

function Login() {

  const [signState, setSignState] = useState('Sign In')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // ✅ If already logged in → redirect
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const user_auth = async (event) => {
    event.preventDefault()
    setLoading(true)

    if (signState === 'Sign In') {
      await login(email, password)
    } else {
      await signup(name, email, password)
    }

    setLoading(false)
    navigate('/') // ✅ redirect after login/signup
  }

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="" />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} className='login-logo' alt="" />

        <div className="login-form">
          <h1>{signState}</h1>

          <form onSubmit={user_auth}>

            {signState === 'Sign Up' && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Your name'
                required
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
              required
            />

            <button type="submit">{signState}</button>

            <div className="form-help">
              <div className="remember">
                <input type='checkbox' />
                <label>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>

          </form>

          <div className="form-switch">
            {signState === 'Sign In' ? (
              <p>
                New to Netflix?{" "}
                <span onClick={() => setSignState('Sign Up')}>
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have account?{" "}
                <span onClick={() => setSignState('Sign In')}>
                  Sign In Now
                </span>
              </p>
            )}
          </div>

        </div>
      </div>
    )
  )
}

export default Login