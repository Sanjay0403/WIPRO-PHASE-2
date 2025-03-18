// import axios from 'axios';
// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
// import * as Yup from 'yup';

// const EmployeeForm = () => {
//     const [employees, setEmployees] = useState([]);
//     const [message, setMessage] = useState("");
//     const [isError, setIsError] = useState(false);

//     // Fetch all employees from the backend
//     useEffect(() => {
//         axios.get('/api/employees')
//             .then(response => setEmployees(response.data))
//             .catch(error => {
//                 setIsError(true);
//                 setMessage("Error fetching employees");
//             });
//     }, []);

//     // Validation schema using Yup
//     const validationSchema = Yup.object({
//         name: Yup.string().required("Name is required"),
//         address: Yup.string().required("Address is required"),
//         dept: Yup.string().required("Department is required"),
//         manager: Yup.string().required("Manager is required")
//     });

//     // Formik setup
//     const formik = useFormik({
//         initialValues: {
//             id: '',
//             name: '',
//             address: '',
//             dept: '',
//             manager: ''
//         },
//         validationSchema,
//         onSubmit: values => {
//             axios.post('/employees', values)
//                 .then(response => {
//                     setEmployees([...employees, response.data]);
//                     setMessage("Employee added successfully");
//                     setIsError(false);
//                 })
//                 .catch(error => {
//                     setIsError(true);
//                     setMessage("Error adding employee");
//                 });
//         }
//     });

//     return (
//         <div className="container mt-5">
//             {isError && <Alert variant="danger">{message}</Alert>}
//             {!isError && message && <Alert variant="success">{message}</Alert>}
//             <h2>Add Employee</h2>
//             <Form onSubmit={formik.handleSubmit}>
//                 <Form.Group controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.name}
//                         isInvalid={formik.touched.name && formik.errors.name}
//                     />
//                     <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="address">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="address"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.address}
//                         isInvalid={formik.touched.address && formik.errors.address}
//                     />
//                     <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="dept">
//                     <Form.Label>Department</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="dept"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.dept}
//                         isInvalid={formik.touched.dept && formik.errors.dept}
//                     />
//                     <Form.Control.Feedback type="invalid">{formik.errors.dept}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="manager">
//                     <Form.Label>Manager</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="manager"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.manager}
//                         isInvalid={formik.touched.manager && formik.errors.manager}
//                     />
//                     <Form.Control.Feedback type="invalid">{formik.errors.manager}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Button type="submit">Submit</Button>
//             </Form>

//             <Row className="mt-4">
//                 <Col>
//                     <h3>Employee List</h3>
//                     <ul>
//                         {employees.map(emp => (
//                             <li key={emp.id}>{emp.name} - {emp.dept}</li>
//                         ))}
//                     </ul>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default EmployeeForm;
