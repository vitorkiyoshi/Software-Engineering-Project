import React,{useEffect, useState} from 'react';
import {Form,FloatingLabel,Button,Card,Container,Nav,Alert} from 'react-bootstrap';
import MaskedInput from "react-maskedinput";
import { Formik } from 'formik';
import * as Yup from "yup";
import { Cadastrar, Logar } from '../API/api';
import { getToken, storeToken } from '../API/auth';

function FormLogin(props)
{
    const loginValues = {CPF: '', senha: ''}

    const validationLogin = Yup.object().shape({
        CPF: Yup.string()
        .required("digite seu CPF."),
        senha: Yup.string()
        .required("digite sua senha.")
    });

    const setShowAlert = props.setShowAlert;

    async function fazerLogin(values)
    {        
        try 
        {
            var fdata = new FormData();
            for (var key in values) 
                fdata.append(key, values[key]);

            const logado = await Logar(fdata);
            storeToken(logado.data.access_token);
        } 
        catch (err) 
        {   
            setShowAlert(true);
        }
    }

    return(
            <Card.Body>
                <Formik initialValues={loginValues} validationSchema={validationLogin} onSubmit={values => {fazerLogin(values)}}>
                    { 
                        props => (
                            <Form onSubmit={props.handleSubmit}>
                                <FloatingLabel controlId="floating1" label="CPF" className="mb-3"> 
                                    <Form.Control
                                        type="text" 
                                        name="CPF"
                                        as={MaskedInput}
                                        mask="111.111.111-11"
                                        placeholder="CPF"
                                        value={props.values.CPF} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.CPF}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid"> {props.errors.CPF} </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating2" label="Senha" className="mb-3">
                                    <Form.Control 
                                        type="password" 
                                        name="senha"
                                        placeholder="digite sua senha" 
                                        value={props.values.senha} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.senha}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid"> {props.errors.senha} </Form.Control.Feedback>
                                </FloatingLabel>
    
                                <Button style={{display: 'block', margin: 'auto'}} variant="primary" type="submit"> Logar </Button>
                            </Form>
                        )
                    }
                </Formik>

            </Card.Body>
    )
}

function FormCadastro()
{
    const cadValues = {Nome: '', CPF: '', Endereco: '', senha: '', tipoSanguineo: '', senha_conf: ''}

    const validationCad = Yup.object().shape({
        Nome: Yup.string()
            .required("digite seu nome.")
            .min(2, 'nome muito curto.'),
            //.matches(/^.*(?=.*[^a-zA-Z ]).*$/,"nome com caracteres inválidos."),
        CPF: Yup.string()
            .required("digite seu CPF."),
        Endereco: Yup.string()
            .required("digite seu endereço."),
        senha: Yup.string()
            .required("digite sua senha.")
            .min(8, 'senha deve ter ao menos 8 caracteres.')
            .matches(/^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&]).*$/,"senha deve conter ao menos 1 letra, 1 número e 1 caracter especial."),
        senha_conf: Yup.string()
            .required("confirme sua senha.")
            .oneOf([Yup.ref('senha'), null], 'senhas diferentes.'),
        tipoSanguineo: Yup.string()
            .required("escolha seu tipo sanguíneo.")
    });

    async function fazerCadastro(values)
    {
        try 
        {
            var fdata = new FormData();
            for (var key in values) 
                fdata.append(key, values[key]);

            const cad = await Cadastrar(fdata);
            console.log(cad);
        } 
        catch (err) 
        {   
            console.log(err);
        }
    }

    return(
            <Card.Body>
                <Formik initialValues={cadValues} validationSchema={validationCad} onSubmit={values => {fazerCadastro(values)}}>
                    { 
                        props => (
                            <Form onSubmit={props.handleSubmit}>
                                <FloatingLabel controlId="floating1" label="nome completo" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        name="Nome"
                                        placeholder="nome completo"
                                        value={props.values.Nome} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.Nome}
                                        autoComplete="off"
                                    />
                                        <Form.Control.Feedback type="invalid">
                                        {props.errors.Nome}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating2" label="CPF" className="mb-3">
                                    <Form.Control
                                        type="text" 
                                        name="CPF"
                                        as={MaskedInput}
                                        mask="111.111.111-11"
                                        placeholder="CPF"
                                        value={props.values.CPF} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.CPF}
                                        autoComplete="off"
                                    />
                                        <Form.Control.Feedback type="invalid"> {props.errors.CPF} </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating3" label="Endereço" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        name="Endereco"
                                        placeholder="Endereço"
                                        value={props.values.Endereco} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.Endereco}
                                        autoComplete="off"
                                    />
                                        <Form.Control.Feedback type="invalid"> {props.errors.Endereco} </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating4" label="Tipo sanguíneo" className="mb-3">
                                    <Form.Select name="tipoSanguineo" value={props.values.tipoSanguineo} onChange={props.handleChange} isInvalid={!!props.errors.tipoSanguineo}>
                                        <option value="">selecione</option>
                                        <option value="O-">O-</option>
                                        <option value="O+">O+</option>
                                        <option value="A-">A-</option>
                                        <option value="A+">A+</option>
                                        <option value="B-">B-</option>
                                        <option value="B+">B+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="AB+">AB+</option>
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid"> {props.errors.tipoSanguineo} </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating5" label="senha" className="mb-3">
                                    <Form.Control 
                                        type="password" 
                                        name="senha"
                                        placeholder="senha" 
                                        value={props.values.senha} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.senha}
                                        autoComplete="off"
                                    />
                                        <Form.Control.Feedback type="invalid"> {props.errors.senha} </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floating6" label="confirmação de senha" className="mb-2">
                                    <Form.Control 
                                        type="password" 
                                        name="senha_conf"
                                        placeholder="confirmação de senha" 
                                        value={props.values.senha_conf} 
                                        onChange={props.handleChange}
                                        isInvalid={!!props.errors.senha_conf}
                                        autoComplete="off"
                                    />
                                        <Form.Control.Feedback type="invalid"> {props.errors.senha_conf} </Form.Control.Feedback>
                                </FloatingLabel>
    
                                <Button style={{display: 'block', margin: 'auto'}} variant="primary" type="submit"> Cadastrar </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Card.Body>
    )
}

function CadLog()
{
    const [abaCad, setAbaCad] = useState(false);
    const [ShowAlert,setShowAlert] = useState(false);

    useEffect(() => {
        if(Boolean(getToken))
            window.location.href = "/painel";
    });
    
    return(
        <Container fluid style={{display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: "100vh"}}>

            {   ShowAlert &&
                <Alert variant='danger' show={ShowAlert} onClose={() => setShowAlert(false)} dismissible>
                    {"Usuário ou senha inválidos."}
                </Alert>
            }

            <Card style={{ width: '30rem' }}>
                
                <Nav fill variant="tabs" activeKey={abaCad}>
                    <Nav.Item>
                        <Nav.Link active={!abaCad} eventKey="false" onClick={() => {setAbaCad(!abaCad); setShowAlert(false);}}>Login</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link active={abaCad} eventKey="true" onClick={() => {setAbaCad(!abaCad); setShowAlert(false);}}>Cadastro</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                {   (!abaCad && <FormLogin setShowAlert={setShowAlert}/>) ||  <FormCadastro/>}
            </Card>
        </Container>
    )
}

export default CadLog