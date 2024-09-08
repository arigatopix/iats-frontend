import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { roles } from "../utils/roles";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  & span {
    display: ${props => (props.$size === "small" ? "none" : "block")};
  }

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ $size }) {
  const {
    user: { role },
  } = useUser();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink $size={$size} to="tickets">
            <HiOutlineHome />
            <span>ข้อมูลผู้เดินทาง</span>
          </StyledNavLink>
        </li>

        {roles.includes(role) && (
          <li>
            <StyledNavLink $size={$size} to="projects">
              <HiOutlineCalendarDays />
              <span>จัดการโครงการ</span>
            </StyledNavLink>
          </li>
        )}

        {role === "admin" && (
          <li>
            <StyledNavLink $size={$size} to="users">
              <HiOutlineUser />
              <span>จัดการผู้ใช้งาน</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
