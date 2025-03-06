import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to Task Manager</h2>
      <p>Manage your tasks efficiently with our app.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Home;
