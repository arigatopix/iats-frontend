import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext();

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  const [size, setSize] = useState("medium");

  useEffect(() => {
    function handleResize(width) {
      if (width > 900) {
        setSize("medium");
      } else if (width <= 900) {
        setSize("small");
      }
    }

    window.addEventListener("resize", () => {
      handleResize(window.innerWidth);
    });

    handleResize(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <StyledSidebar>
        <Container>
          <Logo />

          <MainNav $size={size} />
        </Container>
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
