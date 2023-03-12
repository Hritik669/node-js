import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const FormSchema = yup.object().shape({
    name: yup.string().required(),
    dob: yup.date().max(new Date(new Date().getFullYear() - 18, 0, 1)).required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(/^\d{10}$/).required()
});

const FormField = ({ label, name, type, ...rest }) => (
    <div className="form-group">
        <label>{label}</label>
        <Field className="form-control" name={name} type={type} {...rest} />
    </div>
);

const DatePickerField = ({ label, name, value, onChange, onBlur }) => (
    <div className="form-group">
        <label>{label}</label>
        <DatePicker
            className="form-control"
            name={name}
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date(new Date().getFullYear() - 18, 0, 1)}
        />
    </div>
);

const UserForm = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('/user-form', values);
            console.log(response.data.message);
            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>User Form</h1>
                    <Formik initialValues={{ name: '', dob: null, email: '', phone: '' }}
                            validationSchema={FormSchema}
                            onSubmit={handleSubmit}>
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                            <Form>
                                <FormField label="Name" name="name" type="text"
                                           error={errors.name} touched={touched.name} />
                                <DatePickerField label="Date of Birth" name="dob"
                                                  value={values.dob} onChange={(val) => setFieldValue('dob', val)}
                                                  onBlur={() => setFieldTouched('dob', true)}
                                                  error={errors.dob} touched={touched.dob} />
                                <FormField label="Email" name="email" type="email"
                                           error={errors.email} touched={touched.email} />
                                <FormField label="Phone" name="phone" type="text"
                                           error={errors.phone} touched={touched.phone} />
                                <Button type="submit" disabled={isSubmitting}>Submit</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};

export default UserForm;
