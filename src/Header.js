import React,{ useState } from 'react';
import { animateScroll as scroll, Link } from 'react-scroll';

function Header() {

    const [navbar, setNavbar] = useState(false);

    const changebackground = () => {

        if( window.scrollY >= 80 ){
            setNavbar(true);
        } else {
            setNavbar(false);
        }

    };

    window.addEventListener('scroll', changebackground);



    return(

    	<div className="nav-row" id="nav-row">

    	<nav className={navbar ? 'navbar active navbar-expand-lg navbar-light' : 'navbar navbar-expand-lg navbar-light'}>
		  <div class="container-fluid">

		  	<a class="navbar-brand" onClick={() => scroll.scrollToTop()} style={{cursor:"pointer"}}><img src="/img/logo6.png" style={{width:"100%",height:"auto",maxHeight:"100px", maxWidth:"150px"}} alt="logo" /></a>
		    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
		      <span class=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg></span>
		    </button>
		    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
		      
		      <ul class="navbar-nav ml-auto mb-2 mb-lg-0 navbarnav">
		        {/*<li class="nav-item">
		          <Link class="nav-link active" aria-current="page" to="home" smooth={true} duration={1000}>Home</Link>
		        </li>*/}
		        <li class="nav-item">
		          <Link class="nav-link" to="about" smooth={true} duration={1000}>About</Link>
		        </li>
		        <li class="nav-item">
		          <Link class="nav-link" to="skill" smooth={true} duration={1000}>Skills</Link>
		        </li>
		        <li class="nav-item">
		          <Link class="nav-link" to="exprience" smooth={true} duration={1000}>Exprience</Link>
		        </li>
		        <li class="nav-item">
		          <Link class="nav-link" to="project" smooth={true} duration={1000}>Projects</Link>
		        </li>
		        <li class="nav-item">
		          <Link class="nav-link" to="contact" smooth={true} duration={1000}>Contact</Link>
		        </li>
		      </ul>
		    </div>
		  </div>
		</nav>

		</div>

    );
}

export default Header;