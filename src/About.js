import React from 'react';
import { Link } from 'react-scroll';


const About = () => {
	
	return(
		
		<div className="container-fluid my-5">

			<div className="row">
				<h1 className="about-me text-center"><strong>About Me</strong></h1>

				<div className="about-img d-flex justify-content-center my-4">
					<img className="about-circle-img" src="./img/IMG-20201218-WA0018.jpg" alt="my-image" />
				</div>

				<h2 className="text-center" style={{fontWeight:"600"}}>I'm Het Shah</h2>
		
				<div class="about-me-content mt-3">
					<ul>
						<li><p className="content-about">I love designing websites and Android mobile apps for clients all over the globe.</p></li>
						<li><p className="content-about">My key strength are visual & interaction design, and also possess coding skills. I guess my title(If you believe in them)<br/>would be "generalist designer".</p></li>
						<li><p className="content-about">I have been <span style={{borderBottom:"2px solid #870BE8"}}>designing for the web for quite a while</span>, but that doesn't matter much now everything is changing!<br/> I rather say I'll never stop learning and having curiousity.</p></li>	
						<li><p className="content-about">I have completed my B.E Computer Engineering Degree in LDRP Institute of Technology and Research.</p></li>
						<li><p className="content-about">I have completed by internship in Frontend Web Developer in ReactJS at <a href="https://pruthatek.com" style={{color:"#870BE8"}}>Pruthatechno market Pvt. Ltd. </a></p></li>	
					</ul>
				</div>
			</div>

			<div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
			  <button class="btn btn-outline-primary me-md-2" type="button"><Link to="contact" smooth={true} duration={1000}>Contact me</Link></button>
			  {/*<button class="btn btn-outline-success" type="button"><a href="/resume" className="text-decoration-none">My Resume</a></button>*/}
			</div>

		</div>


	)
}

export default About