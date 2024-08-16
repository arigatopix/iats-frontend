import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiBars3 } from "react-icons/hi2";
import SidebarMobile from "./SidebarMobile";
import { useState } from "react";

const MobileButtonIcon = styled(ButtonIcon)`
  @media (min-width: 900px) {
    display: none;
  }
`;

function HamburgerMenu() {
  const [show, setShow] = useState(true);

  function close() {
    setShow(show => !show);
  }

  return (
    <>
      <MobileButtonIcon onClick={close}>
        <HiBars3 />
      </MobileButtonIcon>

      {show && <SidebarMobile close={close} />}
    </>
  );
}

export default HamburgerMenu;
