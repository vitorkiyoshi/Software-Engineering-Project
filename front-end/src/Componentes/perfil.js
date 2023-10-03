import React,{useEffect} from 'react';
import {Container,Form,Row,Col} from 'react-bootstrap';
import { getUser } from '../API/api_protected';

function Perfil()
{

    const [user,setUser] = React.useState(false);
    const [componentLoading,setComponentLoading] = React.useState(true);

    useEffect(() => {
        async function loadUserdata()
        {
            setComponentLoading(true);
            const retornoAPI = await getUser();
            setUser(retornoAPI.data.data);
            setComponentLoading(false);
        }

        loadUserdata();
    },[]);


    return(
        <Container fluid style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            { !componentLoading && user &&
                <>
                    <h3>{"Perfil"}</h3>

                    <Form style={{marginTop: '20px'}}>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3"> 
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" value={user.Nome} readOnly />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3"> 
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control type="text" value={user.CPF} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3"> 
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" value="******" readOnly />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3"> 
                                    <Form.Label>Tipo sanguíneo</Form.Label>
                                    <Form.Control type="text" value={user.tipoSanguineo} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
            
                        <Form.Group className="mb-3"> 
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" value={user.Endereco} readOnly />
                        </Form.Group>     
                    
                    </Form>
                </>
            }
        </Container>
    )
}

export default Perfil