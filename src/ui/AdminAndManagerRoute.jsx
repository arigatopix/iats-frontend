import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

const roles = ["admin", "manager"];

function AdminAndManagerRoute({ children }) {
  const {
    user: { role },
  } = useUser();

  const navigate = useNavigate();

  console.log(role !== "manager");

  useEffect(() => {
    if (!roles.includes(role)) {
      return navigate("/tickets");
    }
  }, [role, navigate]);

  return children;
}

export default AdminAndManagerRoute;
