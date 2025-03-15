// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchExpenses, addExpense, deleteExpense } from "../store/financeSlice";
// import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";
// import { Pie, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { expenses, loading, error } = useSelector((state) => state.finance);

//   const [formData, setFormData] = useState({
//     type: "Income",
//     category: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     description: "",
//   });

//   useEffect(() => {
//     dispatch(fetchExpenses());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (parseFloat(formData.amount) <= 0) {
//       alert("Amount must be greater than zero.");
//       return;
//     }
//     dispatch(addExpense(formData));
//     setFormData({ type: "Income", category: "", amount: "", date: new Date().toISOString().split("T")[0], description: "" });
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteExpense(id));
//   };

//   const totalIncome = expenses.filter((item) => item.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const totalExpenses = expenses.filter((item) => item.type === "Expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const balance = totalIncome - totalExpenses;

//   const pieData = {
//     labels: ["Income", "Expenses"],
//     datasets: [{ data: [totalIncome, totalExpenses], backgroundColor: ["#1abc9c", "#e74c3c"] }],
//   };

//   const barData = {
//     labels: expenses.map((item) => item.category),
//     datasets: [{ label: "Amount", data: expenses.map((item) => item.amount), backgroundColor: expenses.map((item) => (item.type === "Income" ? "#2ecc71" : "#e74c3c")) }],
//   };

//   return (
//     <Container className="dashboard-container">
//       <h2 className="text-center title">Personal Finance Dashboard</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error-text">{error}</p>}

//       <Card className="summary-card">
//         <Card.Body>
//           <h4>Total Balance: <span className={balance >= 0 ? "positive" : "negative"}>${balance.toFixed(2)}</span></h4>
//           <p>Income: <span className="income-text">${totalIncome.toFixed(2)}</span></p>
//           <p>Expenses: <span className="expense-text">${totalExpenses.toFixed(2)}</span></p>
//         </Card.Body>
//       </Card>

//       <Form onSubmit={handleSubmit} className="finance-form">
//         <Row className="g-3">
//           <Col><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Income">Income</option><option value="Expense">Expense</option></Form.Select></Col>
//           <Col><Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /></Col>
//           <Col><Button type="submit" className="btn btn-primary">Add</Button></Col>
//         </Row>
//       </Form>

//       <Table striped bordered hover className="finance-table">
//         <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th><th>Actions</th></tr></thead>
//         <tbody>
//           {expenses.map((finance) => (
//             <tr key={finance.id}>
//               <td>{finance.date}</td>
//               <td className={finance.type === "Income" ? "income-text" : "expense-text"}>{finance.type}</td>
//               <td>{finance.category}</td>
//               <td>${finance.amount}</td>
//               <td>{finance.description}</td>
//               <Button variant="warning" size="sm" onClick={() => handleEdit(finance)}>Edit</Button>
//               <td><Button variant="danger" onClick={() => handleDelete(finance.id)}>Delete</Button></td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Row className="charts-container">
//         <Col md={6}><h4>Income vs Expenses</h4><Pie data={pieData} /></Col>
//         <Col md={6}><h4>Category Breakdown</h4><Bar data={barData} /></Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchExpenses, addExpense, deleteExpense, updateExpense } from "../store/financeSlice"; // Import updateExpense
// import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";
// import { Pie, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { expenses, loading, error } = useSelector((state) => state.finance);

//   const [formData, setFormData] = useState({
//     id: null, // Store ID when editing
//     type: "Income",
//     category: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     description: "",
//   });

//   const [isEditing, setIsEditing] = useState(false); // Track editing state

//   useEffect(() => {
//     dispatch(fetchExpenses());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (parseFloat(formData.amount) <= 0) {
//       alert("Amount must be greater than zero.");
//       return;
//     }

//     if (isEditing) {
//       dispatch(updateExpense({ id: formData.id, updatedData: formData }));
//       setIsEditing(false);
//     } else {
//       dispatch(addExpense(formData));
//     }

//     setFormData({ id: null, type: "Income", category: "", amount: "", date: new Date().toISOString().split("T")[0], description: "" });
//   };

//   const handleEdit = (expense) => {
//     setFormData(expense);
//     setIsEditing(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteExpense(id));
//   };

//   const totalIncome = expenses.filter((item) => item.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const totalExpenses = expenses.filter((item) => item.type === "Expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const balance = totalIncome - totalExpenses;

//   const pieData = {
//     labels: ["Income", "Expenses"],
//     datasets: [{ data: [totalIncome, totalExpenses], backgroundColor: ["#1abc9c", "#e74c3c"] }],
//   };

//   const barData = {
//     labels: expenses.map((item) => item.category),
//     datasets: [{ label: "Amount", data: expenses.map((item) => item.amount), backgroundColor: expenses.map((item) => (item.type === "Income" ? "#2ecc71" : "#e74c3c")) }],
//   };

//   return (
//     <Container className="dashboard-container">
//       <h2 className="text-center title">Personal Finance Dashboard</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error-text">{error}</p>}

//       <Card className="summary-card">
//         <Card.Body>
//           <h4>Total Balance: <span className={balance >= 0 ? "positive" : "negative"}>${balance.toFixed(2)}</span></h4>
//           <p>Income: <span className="income-text">${totalIncome.toFixed(2)}</span></p>
//           <p>Expenses: <span className="expense-text">${totalExpenses.toFixed(2)}</span></p>
//         </Card.Body>
//       </Card>

//       <Form onSubmit={handleSubmit} className="finance-form">
//         <Row className="g-3">
//           <Col><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Income">Income</option><option value="Expense">Expense</option></Form.Select></Col>
//           <Col><Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /></Col>
//           <Col>
//             <Button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</Button>
//             {isEditing && <Button variant="secondary" className="ms-2" onClick={() => { setIsEditing(false); setFormData({ id: null, type: "Income", category: "", amount: "", date: new Date().toISOString().split("T")[0], description: "" }); }}>Cancel</Button>}
//           </Col>
//         </Row>
//       </Form>

//       <Table striped bordered hover className="finance-table">
//         <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th><th>Actions</th></tr></thead>
//         <tbody>
//           {expenses.map((finance) => (
//             <tr key={finance.id}>
//               <td>{finance.date}</td>
//               <td className={finance.type === "Income" ? "income-text" : "expense-text"}>{finance.type}</td>
//               <td>{finance.category}</td>
//               <td>${finance.amount}</td>
//               <td>{finance.description}</td>
//               <td>
//                 <Button variant="warning" size="sm" onClick={() => handleEdit(finance)}>Edit</Button>
//                 <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(finance.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Row className="charts-container">
//         <Col md={6}><h4>Income vs Expenses</h4><Pie data={pieData} /></Col>
//         <Col md={6}><h4>Category Breakdown</h4><Bar data={barData} /></Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchExpenses, addExpense, deleteExpense, updateExpense } from "../store/financeSlice"; 
// import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";
// import { Pie, Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import "../styles/Dashboard.css";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { expenses, loading, error } = useSelector((state) => state.finance);

//   const [formData, setFormData] = useState({
//     id: null, // Store ID when editing
//     type: "Income",
//     category: "",
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     description: "",
//   });

//   const [isEditing, setIsEditing] = useState(false); // Track editing state

//   useEffect(() => {
//     dispatch(fetchExpenses());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Updated handleSubmit function with logging
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (parseFloat(formData.amount) <= 0) {
//       alert("Amount must be greater than zero.");
//       return;
//     }

//     // Log the formData before sending to the backend
//     console.log("Form data being sent:", formData);

//     if (isEditing) {
//       dispatch(updateExpense({ id: formData.id, updatedData: formData }));
//       setIsEditing(false);
//     } else {
//       dispatch(addExpense(formData));
//     }

//     // Clear the form after submission
//     setFormData({
//       id: null,
//       type: "Income",
//       category: "",
//       amount: "",
//       date: new Date().toISOString().split("T")[0],
//       description: "",
//     });
//   };

//   const handleEdit = (expense) => {
//     setFormData(expense);
//     setIsEditing(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteExpense(id));
//   };

//   const totalIncome = expenses.filter((item) => item.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const totalExpenses = expenses.filter((item) => item.type === "Expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//   const balance = totalIncome - totalExpenses;

//   const pieData = {
//     labels: ["Income", "Expenses"],
//     datasets: [{ data: [totalIncome, totalExpenses], backgroundColor: ["#1abc9c", "#e74c3c"] }],
//   };

//   const barData = {
//     labels: expenses.map((item) => item.category),
//     datasets: [{ label: "Amount", data: expenses.map((item) => item.amount), backgroundColor: expenses.map((item) => (item.type === "Income" ? "#2ecc71" : "#e74c3c")) }],
//   };

//   return (
//     <Container className="dashboard-container">
//       <h2 className="text-center title">Personal Finance Dashboard</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p className="error-text">{error}</p>}

//       <Card className="summary-card">
//         <Card.Body>
//           <h4>Total Balance: <span className={balance >= 0 ? "positive" : "negative"}>${balance.toFixed(2)}</span></h4>
//           <p>Income: <span className="income-text">${totalIncome.toFixed(2)}</span></p>
//           <p>Expenses: <span className="expense-text">${totalExpenses.toFixed(2)}</span></p>
//         </Card.Body>
//       </Card>

//       <Form onSubmit={handleSubmit} className="finance-form">
//         <Row className="g-3">
//           <Col><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Income">Income</option><option value="Expense">Expense</option></Form.Select></Col>
//           <Col><Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required /></Col>
//           <Col><Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /></Col>
//           <Col>
//             <Button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</Button>
//             {isEditing && <Button variant="secondary" className="ms-2" onClick={() => { setIsEditing(false); setFormData({ id: null, type: "Income", category: "", amount: "", date: new Date().toISOString().split("T")[0], description: "" }); }}>Cancel</Button>}
//           </Col>
//         </Row>
//       </Form>

//       <Table striped bordered hover className="finance-table">
//         <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th><th>Actions</th></tr></thead>
//         <tbody>
//           {expenses.map((finance) => (
//             <tr key={finance.id}>
//               <td>{finance.date}</td>
//               <td className={finance.type === "Income" ? "income-text" : "expense-text"}>{finance.type}</td>
//               <td>{finance.category}</td>
//               <td>${finance.amount}</td>
//               <td>{finance.description}</td>
//               <td>
//                 <Button variant="warning" size="sm" onClick={() => handleEdit(finance)}>Edit</Button>
//                 <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(finance.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Row className="charts-container">
//         <Col md={6}><h4>Income vs Expenses</h4><Pie data={pieData} /></Col>
//         <Col md={6}><h4>Category Breakdown</h4><Bar data={barData} /></Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from "../store/financeSlice"; 
import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.finance);

  const [formData, setFormData] = useState({
    id: null, // Store ID when editing
    type: "Income",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseFloat(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    if (isEditing) {
      dispatch(updateExpense({ id: formData.id, updatedData: formData }));
      setIsEditing(false);
    } else {
      dispatch(addExpense(formData));
    }

    // Clear the form after submission
    setFormData({
      id: null,
      type: "Income",
      category: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const totalIncome = expenses.filter((item) => item.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalExpenses = expenses.filter((item) => item.type === "Expense").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const balance = totalIncome - totalExpenses;

  const pieData = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [totalIncome, totalExpenses], backgroundColor: ["#1abc9c", "#e74c3c"] }],
  };

  const barData = {
    labels: expenses.map((item) => item.category),
    datasets: [{ label: "Amount", data: expenses.map((item) => item.amount), backgroundColor: expenses.map((item) => (item.type === "Income" ? "#2ecc71" : "#e74c3c")) }],
  };

  return (
    <Container className="dashboard-container">
      <h2 className="text-center title">Personal Finance Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <Card className="summary-card">
        <Card.Body>
          <h4>Total Balance: <span className={balance >= 0 ? "positive" : "negative"}>${balance.toFixed(2)}</span></h4>
          <p>Income: <span className="income-text">${totalIncome.toFixed(2)}</span></p>
          <p>Expenses: <span className="expense-text">${totalExpenses.toFixed(2)}</span></p>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit} className="finance-form">
        <Row className="g-3">
          <Col><Form.Select name="type" value={formData.type} onChange={handleChange}><option value="Income">Income</option><option value="Expense">Expense</option></Form.Select></Col>
          <Col><Form.Control type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /></Col>
          <Col><Form.Control type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></Col>
          <Col><Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required /></Col>
          <Col><Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required /></Col>
          <Col>
            <Button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</Button>
            {isEditing && <Button variant="secondary" className="ms-2" onClick={() => { setIsEditing(false); setFormData({ id: null, type: "Income", category: "", amount: "", date: new Date().toISOString().split("T")[0], description: "" }); }}>Cancel</Button>}
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover className="finance-table">
        <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Description</th><th>Actions</th></tr></thead>
        <tbody>
          {expenses.map((finance) => (
            <tr key={finance.id}>
              {/* <td>{finance.date}</td> */}
              <td>{new Date(finance.date).toLocaleDateString()}</td>

              <td className={finance.type === "Income" ? "income-text" : "expense-text"}>{finance.type}</td>
              <td>{finance.category}</td>
              <td>${finance.amount}</td>
              <td>{finance.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(finance)}>Edit</Button>
                <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(finance.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="charts-container">
        <Col md={6}><h4>Income vs Expenses</h4><Pie data={pieData} /></Col>
        <Col md={6}><h4>Category Breakdown</h4><Bar data={barData} /></Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
