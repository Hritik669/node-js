import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import UserForm from './Form';

const App = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        axios.get('/user-form')
            .then((response) => {
                setForms(response.data.forms);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <UserForm />
                    <h1>Submitted Forms</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((form) => (
                                <tr key={form._id}>
                                    <td>{form.name}</td>
                                    <td>{form.dob}</td>
                                    <td>{form.email}</td>
                                    <td>{form.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
