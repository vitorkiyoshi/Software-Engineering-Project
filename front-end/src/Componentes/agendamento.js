import React from 'react';
import {Container,Button,Row,Form,Col,FloatingLabel} from 'react-bootstrap';

import { getHemocentros, getUser, getAgendamentos, deleteAgendamento, addAgendamento} from '../API/api_protected';

function Agendamento()
{   
    const [user, setUser] = React.useState(false);
    const [componentLoading,setComponentLoading] = React.useState(false);

    const [ag, setAG] = React.useState(false);

    React.useEffect(() => {
        async function loadUserdata()
        {
            setComponentLoading(true);

            const usuario = await getUser();
            setUser(usuario.data.data);

            const agd = await getAgendamentos();
            setAG(agd.data.data);

            setComponentLoading(false);
        }

        loadUserdata();
    },[]);



    const NovoAgendamento = (props) => {
        const setAG = props.setAG;

        const [data,changeData] = React.useState(false);
        const [time,changeTime] = React.useState(false);

        const [hemocentros, setHemocentros] = React.useState(false);
        const [hemocentroSelected,setHemocentroSelected] = React.useState(false);

        async function adddAgendamento()
        {
            if(data && time && hemocentroSelected)
            {
                await addAgendamento(data,time,hemocentroSelected);            
                const agd = await getAgendamentos();
                setAG(agd.data.data);
            }
        }

        React.useEffect(() => {
            async function loadHC()
            {
                const hemocentros = await getHemocentros();
                setHemocentros(hemocentros.data.data);
            }
    
            loadHC();
        },[]);

        return(
            <>
                {   hemocentros &&
                    <Form>  

                        <FloatingLabel controlId="floating3" label="hora" className="mb-3">
                            <Form.Control 
                                type="time" 
                                name="hora"
                                onChange={(e) => changeTime(e.target.value)}
                                autoComplete="off"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floating1" label="data" className="mb-3">
                            <Form.Control 
                                type="date" 
                                name="data"
                                onChange={(e) => changeData(e.target.value)}
                                autoComplete="off"
                            />
                        </FloatingLabel>


                        <FloatingLabel controlId="floating4" label="Hemocentros" className="mb-3">
                            <Form.Select name="Nome_Banco" size="sm" onChange={(e) => setHemocentroSelected(e.target.value)}>
                            {
                                hemocentros.map(item => (
                                    <option value={item}>{item}</option>
                                ))
                            }
                            </Form.Select>

                        </FloatingLabel>
                    
                        <Button style={{display: 'block', margin: 'auto'}} variant="primary" onClick={() => adddAgendamento()}> Agendar </Button>
                    </Form>
                }
            </>
        )
    }


    const AgendamentoExistente = (props) => {
        const ag = props.ag;
        const remove_ag = props.setAG;

        async function delAgendamento()
        {
            await deleteAgendamento();
            remove_ag(false);
        }

        return(
            <>
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

                        <Col>
                            <Form.Group className="mb-3"> 
                                <Form.Label>Tipo sanguíneo</Form.Label>
                                <Form.Control type="text" value={user.tipoSanguineo} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3"> 
                                <Form.Label>Nome do Hemocentro</Form.Label>
                                <Form.Control type="text" value={ag.NomeBanco} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3"> 
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="data" value={ag.Data} readOnly />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3"> 
                                <Form.Label>Hora</Form.Label>
                                <Form.Control type="text" value={ag.Hora} readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <Button style={{display: 'block', margin: 'auto'}} variant="primary" onClick={() => delAgendamento()}> Cancelar Agendamento </Button>
            </>
        )
    }


    return(
        <Container fluid style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
            { !componentLoading &&
                <>
                    <h3>{"Agendamentos"}</h3>

                    {   ag &&
                        <AgendamentoExistente ag={ag} setAG={setAG}/>
                    }

                    {   !ag &&
                        <NovoAgendamento user={user} setAG={setAG}/>
                    }
                </>

            }
        </Container>
    )
}

export default Agendamento;