import { Link } from "react-router-dom";
import BrandBar from "../components/BrandBar";

export default function Login() {
  return (
    <div>
      <BrandBar />
      <h1>Login</h1>
      <Link to="/plans">Plans</Link>
    </div>
  );
}
