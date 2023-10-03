import React,{useEffect} from 'react';
import {Button,Nav,Tab} from 'react-bootstrap';
import { getToken, destroyToken } from '../API/auth';

import Mapa from '../Componentes/mapa'
import Estoque from '../Componentes/estoque'
import Agendamento from '../Componentes/agendamento'
import Perfil from '../Componentes/perfil'

// <Button variant="primary" onClick={() => destroyToken()}>Loggoff</Button>

function Painel()
{
    useEffect(() => {
        if(!Boolean(getToken))
            window.location.href = "/";
    });

    return(
        <Tab.Container id="abas" defaultActiveKey="mapa" fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%"}}>
                    
                    <Nav variant="pills" style={{marginTop: '5px', display: 'flex', justifyContent: 'center', height: "fit-content"}}>
                        <Nav.Item>
                            <Nav.Link eventKey="mapa">Mapa</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="estoque">Estoque</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="agendamento">Agendamento</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="perfil">Perfil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link  as={Button} variant="primary" onClick={() => destroyToken()}>Sair</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content style={{marginTop: '5px', display: 'flex', justifyContent: 'center', height: "calc(100vh -  50px)"}}>
                        <Tab.Pane eventKey="mapa">
                            <Mapa/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="estoque">
                            <Estoque/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="agendamento">
                            <Agendamento/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="perfil">
                            <Perfil/>
                        </Tab.Pane>
                    </Tab.Content>

        </Tab.Container>
    )
}

export default Painel