import styled from "styled-components";

import {
  HiOutlineExclamationCircle,
  HiOutlineFolder,
  HiOutlineGlobeAmericas,
  HiOutlineMegaphone,
  HiOutlinePaperClip,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { formatDateTH } from "../../utils/helpers";
import DataItem from "../../ui/DataItem";
import Row from "../../ui/Row";
import Empty from "../../ui/Empty";
import ButtonIcon from "../../ui/ButtonIcon";

const StyledProjectDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${props =>
    props.$status === "confirmed"
      ? "var(--color-green-100)"
      : "var(--color-yellow-100)"};
  color: ${props =>
    props.$status === "confirmed"
      ? "var(--color-green-700)"
      : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Remarks = styled.ul`
  margin-left: 4rem;

  & li {
    margin-bottom: 2rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;
function ProjectDataBox({ project, status }) {
  const {
    country,
    date_end,
    date_start,
    description,
    name,
    project_attachments,
    project_additional_remarks,
  } = project;

  return (
    <>
      <StyledProjectDataBox>
        <Header>
          <div>
            <HiOutlineGlobeAmericas />

            <p>
              <span>{name}</span>
            </p>
          </div>

          <p>
            {`ระหว่างวันที่ ${formatDateTH(new Date(date_start))}`} &mdash;{" "}
            {formatDateTH(new Date(date_end))}
          </p>
        </Header>

        <Section>
          <DataItem icon={<HiOutlineRocketLaunch />} label="ประเทศ">
            {country}
          </DataItem>

          <DataItem
            icon={<HiOutlineExclamationCircle />}
            label="รายละเอียดโครงการ"
          >
            {description}
          </DataItem>

          <Row>
            <Info $status="confirmed">
              <DataItem
                icon={<HiOutlineFolder />}
                label={`เอกสารโครงการ`}
              ></DataItem>
            </Info>

            {project_attachments.length > 0 ? (
              <Remarks>
                {project_attachments.map(file => (
                  <li key={file.id}>
                    {file.title}{" "}
                    <ButtonIcon
                      as="a"
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <HiOutlinePaperClip />
                    </ButtonIcon>
                  </li>
                ))}
              </Remarks>
            ) : (
              <Empty />
            )}
          </Row>

          <Row>
            <Info $status={status}>
              <DataItem
                icon={<HiOutlineMegaphone />}
                label={`ข้อมูลที่ต้องอัพโหลดเพื่อประกอบการเดินทาง`}
              ></DataItem>
            </Info>

            {project_additional_remarks.length > 0 ? (
              <Remarks>
                {project_additional_remarks.map(remark => (
                  <li key={remark.id}>{remark.remark}</li>
                ))}
              </Remarks>
            ) : (
              <Empty />
            )}
          </Row>
        </Section>

        <Footer></Footer>
      </StyledProjectDataBox>
    </>
  );
}

export default ProjectDataBox;
