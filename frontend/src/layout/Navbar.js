import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to={'/'} className="navbar-brand d-flex align-items-center">
              <img src="logo.webp" alt="Dragon City API" width="60" height="54" className="d-inline-block align-text-top rounded mx-3"/>
              <span className='mx-2'>Dragon City API</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={'/'} className="nav-link mx-3 active" aria-current="page">Home</Link>
              <Link to={'/dragons'} className="nav-link mx-3">Dragons</Link>
              <Link to={'/docs'} className="nav-link mx-3">Docs</Link>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar