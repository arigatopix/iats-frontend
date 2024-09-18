import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import AdminLogin from "../features/admin/AdminLogin";
import Footer from "../ui/Footer";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 52rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const WrapStyledFooter = styled(Footer)`
  & {
    background-color: var(--color-grey-50);
    border-bottom: none;
  }
`;

function Login() {
  return (
    <>
      <LoginLayout>
        <Logo />

        <Heading as="h4">ระบบติดตามงานด้านวิเทศสัมพันธ์</Heading>
        <LoginForm />

        {import.meta.env.VITE_APP_ENV !== "production" && <AdminLogin />}

        <WrapStyledFooter />
      </LoginLayout>
    </>
  );
}

export default Login;
