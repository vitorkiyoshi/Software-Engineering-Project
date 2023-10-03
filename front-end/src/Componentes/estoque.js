import React from 'react';
import {Container,Row,Col,Card,ProgressBar,Form} from 'react-bootstrap';
import { getHemocentros,getEstoque } from '../API/api_protected';

import oplus from '../Assets/oplus.png';
import ominus from '../Assets/ominus.png';
import aplus from '../Assets/aplus.png';
import aminus from '../Assets/aminus.png';
import bplus from '../Assets/bplus.png';
import bminus from '../Assets/bminus.png';
import abplus from '../Assets/abplus.png';
import abminus from '../Assets/abminus.png';

function MyCard(props)
{
    const cardIMG = props.image;
    const qtd = props.quantidade;

    return(
    <Card>
        <Card.Img variant="top" src={cardIMG}/>

        <Card.Body>
            <Card.Title>Estoque: </Card.Title>

            <Card.Text>
                Quantidade: {qtd}
            </Card.Text>
            
            <ProgressBar striped variant="danger" now={qtd} />
        </Card.Body>

        <Card.Footer>
            {/*<small className="text-muted">Atualizado 08/11/2021 18:00</small>*/}
        </Card.Footer>
    </Card>
    )
}

function Estoque()
{
    const [hemocentros,setEmocentros] = React.useState(false);
    const [hemocentroSelected,setHemocentroSelected] = React.useState(false);
    const [componentLoading,setComponentLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadUserdata()
        {
            setComponentLoading(true);

            const infos = await getHemocentros();
            setEmocentros(infos.data.data);
            
            setComponentLoading(false);
        }

        loadUserdata();
    },[]);

    async function doSetHemocentroSelected(value)
    {
        const infos = await getEstoque(value);
        setHemocentroSelected(infos.data.data);
    }

    return(
        <>
            {   hemocentros && !componentLoading &&
                <Container style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>

                    <h3>{"Estoque"}</h3>

                    
                    <Form.Select size="sm" onChange={(e) => doSetHemocentroSelected(e.target.value)}>
                        {
                            hemocentros.map(item => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </Form.Select>
                    
                    <div>
                        <Row xs={1} md={4} className="g-4" style={{marginTop: '10px'}}>
                            {   hemocentroSelected &&
                    
                                hemocentroSelected.map(item => (
                                    <Col key={item.id}>
                                            <MyCard image={
                                                (item.tipo === "oplus" ? oplus : 
                                                    (   
                                                        item.tipo === "bplus" ? bplus :
                                                        (
                                                            item.tipo === "abplus" ? abplus :
                                                            (
                                                                item.tipo === "aminus" ? aminus :
                                                                (
                                                                    item.tipo === "bminus" ? bminus :
                                                                    (
                                                                        item.tipo === "abminus" ? abminus :
                                                                        (
                                                                            item.tipo === "ominus" ? ominus : 
                                                                            (
                                                                                item.tipo === "aplus" ? aplus : ""
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                ) 

                                                
                                            }
                                            quantidade={item.estoque}
                                        />

                                    </Col>
                                ))
                            }
                        </Row>
                    </div>

                </Container>
            }
        </>
    )
}

export default Estoque;