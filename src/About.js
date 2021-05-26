import React from 'react';
import { Link } from 'react-scroll';

import Tada from 'react-reveal/Tada'
import Fade from 'react-reveal/Fade';


const About = () => {
	
	return(
		
		<div className="container-fluid my-5">

			<div className="row">
				<h1 className="about-me text-center"><strong>About Me</strong></h1>

				<div className="about-img d-flex justify-content-center my-4">
					<img className="about-circle-img" src="./img/IMG-20201218-WA0018.jpg" alt="my-image" />
				</div>

				<h2 className="text-center" style={{fontWeight:"600"}}><Tada>I'm Het Shah</Tada></h2>
		
				<div class="about-me-content mt-3">
					<Fade big>
						<ul>
							<li><p className="content-about">I love designing websites and Android mobile apps for clients all over the globe.</p></li>
							<li><p className="content-about">My key strength are visual & interaction design, and also possess coding skills. I guess my title(If you believe in them)<br/>would be "generalist designer".</p></li>
							<li><p className="content-about">I have been designing for the web for quite a while, but that doesn't matter much now everything is changing!</p></li>
							<li><p className="content-about">I rather say I'll never stop learning and much curious in learning something new.</p></li>	
							<li><p className="content-about">I have completed my B.E Computer Engineering Degree from LDRP Institute of Technology and Research.</p></li>
							<li><p className="content-about">I have completed my internship in Frontend Web Developer in ReactJS at <a href="https://pruthatek.com" style={{color:"#870BE8"}}>Pruthatechno market Pvt. Ltd. </a></p></li>	
						</ul>
					</Fade>
				</div>
			</div>

			<div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
			  <Link className="btn btn-outline-primary me-md-2" to="contact" smooth={true} duration={1000}>Contact me</Link>
			  {/*<button class="btn btn-outline-success" type="button"><a href="/resume" className="text-decoration-none">My Resume</a></button>*/}
			</div>

		</div>


	)
}

export default About