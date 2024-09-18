import styled from "styled-components";
import Stacked from "./Stacked";

const StyledFooter = styled.footer`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const P = styled.p`
  text-align: center;
`;

const SPAN = styled.span`
  text-align: center;
`;
function Footer({ className }) {
  return (
    <StyledFooter className={className}>
      <P>
        แผนกวิเทศสัมพันธ์ กองกิจการผู้บริหารระดับสูง เบอร์โทรศัพท์ 5164, 5166
      </P>
      <Stacked>
        <SPAN>
          พัฒนาโดย การไฟฟ้าส่วนภูมิภาค เขต 2 ภาคเหนือ จ.พิษณุโลก <br />1
          <sup>st</sup>🥇 PLACE WINNER &mdash; PEA WORK SKILL CONTEST 2024
        </SPAN>
      </Stacked>
    </StyledFooter>
  );
}

export default Footer;
