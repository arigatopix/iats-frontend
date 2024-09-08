import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function AdminRoute({ children }) {
  const {
    user: { role },
  } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      return navigate("/tickets");
    }
  }, [role, navigate]);

  return children;
}

export default AdminRoute;
