import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { roles } from "../utils/roles";

function AdminAndManagerRoute({ children }) {
  const {
    user: { role },
  } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!roles.includes(role)) {
      return navigate("/tickets");
    }
  }, [role, navigate]);

  return children;
}

export default AdminAndManagerRoute;
