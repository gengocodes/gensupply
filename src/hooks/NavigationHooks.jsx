import { useNavigate } from "react-router-dom";

export const NavigationHooks = () => {
  const navigate = useNavigate();
  const navLogin = () => {
    navigate("/login");
  };
  const navRegister = () => {
    navigate("/register");
  };
  return { navLogin, navRegister };
};
