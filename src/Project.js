import React from "react";


const mystyle = {
	height:"auto",
	width:"100%",
	objectFit:"cover",
	maxHeight:"300px",
};


const mystyle2 = {
	fontSize:"larger",
	color:"darkblue"
}


const Project = () => {

  return (

  			<div className="container-fluid skill">

  				<br/><br/>
  				<h1 className="pt-3 text-center pb-5 text-white"><strong>Projects</strong></h1>

  				<div className="row skill d-flex justify-content-center mx-auto">

  					<div className="col-md-6 d-flex justify-content-center align-items-center">
  						<div class="card">
						  <img src="/img/reactjsimg2.png" class="card-img-top" alt="image" style={mystyle} />
						  <div class="card-body">
						    <h5 class="card-title text-center my-3"><h3><b>Pruthatek.app</b></h3></h5>
						    <p class="card-text" style={mystyle2}><strong>Description :</strong>&nbsp;Convert ypur website to an app with just your URL in less than 24 hours.</p>
						    <p class="card-text" style={mystyle2}><strong>Technology Used :</strong>&nbsp;Reactjs, Nodejs, Expressjs, MySQL.</p>
						    <a href="https://pruthatek.app" target="_blank" class="btn btn-outline-primary d-block mx-auto" style={{width:"fit-content"}}>View Project Live&nbsp;
						    	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
					  			<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
					  			<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
								</svg>
							</a>
						  </div>
						</div>
  					</div>

  					<div className="col-md-6 d-flex justify-content-center">
  						<div class="card">
						  <img src="/img/tiger.jfif" class="card-img-top" alt="image" style={mystyle} />
						  <div class="card-body mt-5">
						    <h5 class="card-title text-center my-3"><h3><b>The tiger.live</b></h3></h5>
						    <p class="card-text" style={mystyle2}><strong>Description :</strong>&nbsp;It is a price recommendation tool for amaxon products, that can track prices of products.</p>
						    <p class="card-text" style={mystyle2}><strong>Technology Used :</strong>&nbsp;Reactjs, Python, Django, MongoDB.</p>
						    <a href="https://thetiger.live" target="_blank" class="btn btn-outline-primary d-block mx-auto" style={{width:"fit-content"}}>View Project Live&nbsp;
						    	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
					  			<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
					  			<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
								</svg>
							</a>
						  </div>
						</div>
  					</div>

  					<div className="col-md-6 mt-4 d-flex justify-content-center">
  						<div class="card">
						  <img src="/img/reactjsimg.png" class="card-img-top" alt="image" style={mystyle} />
						  <div class="card-body">
						    <h5 class="card-title text-center my-3"><h3><b>Pruthatek.com</b></h3></h5>
						    <p class="card-text" style={mystyle2}><strong>Description :</strong>&nbsp;I have rebuild company's website on reactjs.</p>
						    <p class="card-text" style={mystyle2}><strong>Technology Used :</strong>&nbsp;Reactjs, Nodejs, Expressjs, MySQL.</p>
						    <a href="https://pruthatek.com" target="_blank" class="btn btn-outline-primary d-block mx-auto" style={{width:"fit-content"}}>View Project Live&nbsp;
						    	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
					  			<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
					  			<path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
								</svg>
							</a>
						  </div>
						</div>
  					</div>	

  				</div>

  			</div>

	)
}

export default Project