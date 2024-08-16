import styled from "styled-components";
import { createPortal } from "react-dom";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useOutsiedClick } from "../hooks/useClickOutside";
import { HiBars3 } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: 900px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledButton = styled(ButtonIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

function SidebarMobile({ close }) {
  const sidebarEl = useOutsiedClick(close);

  return createPortal(
    <Overlay>
      <StyledSidebar ref={sidebarEl}>
        <Container>
          <StyledButton onClick={close}>
            <HiBars3 />
          </StyledButton>
          <Logo />

          <MainNav />
        </Container>
      </StyledSidebar>
    </Overlay>,
    document.body
  );
}

export default SidebarMobile;
