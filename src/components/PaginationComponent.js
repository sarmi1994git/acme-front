import React from 'react';
import { Button } from 'reactstrap';

function Pagination({increment, decrement, page, totalPages, data}) {
	if (data == null || data.length <= 0) {
		return(
            <div className="container">
                <div className="row">
                    
                </div>
            </div>
        );
	} else if (data != null){
		return(
			<React.Fragment>
				<Button color="dark" onClick={decrement}>Anterior</Button>
				<Button outline color="secondary">{'Página ' + page + 'de ' + (totalPages ? totalPages: '')}</Button>
				<Button color="dark" onClick={increment}>Siguiente</Button>
			</React.Fragment>
		);
	}
}

export default Pagination;