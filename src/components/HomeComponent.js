import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

function Home(props) {
	return(
		<React.Fragment>
			<div className="container">
				<div className="row d-flex justify-content-center" style={{padding: "100px 0px 290px 0px"}}>
					<Card>
						<CardBody>
							<CardTitle>Bienvenido a Acme</CardTitle>
							<CardSubtitle>Administrador de aplicaciones</CardSubtitle>
							<CardText>Desde esta plataforma podrás administrar el acceso de los usuario a las diferentes aplicaciones,
							 por medio de la asignación de roles específicos.</CardText>
						</CardBody>
					</Card>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Home;