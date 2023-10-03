import React, { useEffect } from 'react';
import {Container} from 'react-bootstrap';
import { getMap } from '../API/api_protected';

function Mapa()
{
    const [map,setMap] = React.useState(false);

    useEffect(() => {
      async function loadMap()
      {
        let my_map = await getMap();
        let aux = document.getElementById('mapa').contentWindow.document;

        aux.open();
        aux.write(my_map.data.data);
        aux.close();
        setMap(my_map.data.data);
      }

      loadMap(map);
    },[]);

    return(
      <>
        <h3>{"Mapa"}</h3>
        <Container className="iframe-container">
                <iframe id="mapa" title="mapa" src="about:blank">
                </iframe>
        </Container>
      </>
    )
}

export default Mapa;