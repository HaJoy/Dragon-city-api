import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link to={'/'} className="navbar-brand">
                <img src="logo.webp" alt="Dragon City API" width="30" height="24" className="d-inline-block align-text-top"/>
                Dragon City API
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                <Link to={'/dragons'} className="nav-link">Dragons</Link>
                <Link to={'/docs'} className="nav-link">Docs</Link>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar