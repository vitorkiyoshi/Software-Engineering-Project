import React from 'react';
import { useHistory } from 'react-router';
import {Button,Card,Container,Collapse,Row,Col} from 'react-bootstrap';
import home from '../Assets/home.png';

function Home()
{
    const history = useHistory()
    const [open, setOpen] = React.useState(false);

    const reqs = [
        {
            id: 1,
            r: "» Estar em boas condições de saúde."
        },
        {
            id: 2,
            r: "» Ter entre 16 e 69 anos, desde que a primeira doação tenha sido feita até 60 anos (menores de 18 anos, clique para ver documentos necessários e formulário de autorização)."
        },
        {
            id: 3,
            r: "» Pesar no mínimo 50kg."
        },
        {
            id: 4,
            r: "» Estar descansado (ter dormido pelo menos 6 horas nas últimas 24 horas)."
        },
        {
            id: 5,
            r: "» Estar alimentado (evitar alimentação gordurosa nas 4 horas que antecedem a doação)."
        }
    ]

    return(
        <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh"}}>
            <Card border="dark" style={{ width: '50rem' }}>
                <Card.Header>Plataforma de doação de sangue</Card.Header>
                <Card.Img variant="top" src={home} />

                <Card.Body>
                    <Card.Title>Seja um doador</Card.Title>
                    <Card.Text>
                        Seja um doador de sangue, faça login e agende seu horário! 
                    </Card.Text>

                    <Card.Text>

                    </Card.Text>
                    
                    <Collapse in={open}>
                        <div id="saibaMais">
                         {"Requsitos Básicos para doação: "}
                         
                         {
                            reqs.map(item => (
                                <p key={item.id}>
                                    {item.r}
                                </p>
                            ))
                         }
                        </div>
                    </Collapse>

                    <Row>
                        <Col>
                            <Button style={{width:"100%"}} onClick={() => setOpen(!open)} aria-controls="saibaMais" aria-expanded={open}> Saiba Mais...</Button>
                        </Col>

                        <Col>
                            <Button style={{width:"100%"}} variant="primary" onClick={() => history.push('/cadlog')}>Login</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Home