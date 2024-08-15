import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const P = styled.p`
  text-align: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <P>พัฒนาโดย การไฟฟ้าส่วนภูมิภาค เขต 2 ภาคเหนือ จ.พิษณุโลก</P>
    </StyledFooter>
  );
}

export default Footer;
