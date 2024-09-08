import React, { useState } from "react";
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Input from "../../ui/Input";
import { parseEmployee, stopEventBubble } from "../../utils/helpers";
import { getEmployee } from "../../services/apiEmployee";
import Form from "../../ui/Form";

const WrapFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function SearchEmployeeForm({ onCloseModal, setSearchEmployee }) {
  const [searchEmployeeError, setSearchEmployeeError] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  function handleKeydown(event) {
    if (event && event.key === "Enter") {
      stopEventBubble(event);
      handleSearchEmployee();
    }
  }

  async function handleSearchEmployee() {
    try {
      setSearchEmployeeError("");

      if (searchEmployeeId === "") return;

      setLoading(true);
      const employeeResponse = await getEmployee(searchEmployeeId);

      if (employeeResponse) {
        const {
          employee_id,
          title,
          name,
          title_eng,
          name_eng,
          department,
          email,
          position,
          phone_number,
        } = parseEmployee(employeeResponse);

        setSearchEmployee({
          employee_id,
          title,
          name,
          title_eng,
          name_eng,
          department,
          email,
          position,
          phone_number,
        });

        setSearchEmployeeId("");
        setLoading(false);
      }
    } catch (error) {
      setSearchEmployeeError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <WrapFormRow>
        <FormRow label="ค้นหาด้วยรหัสพนักงาน" error={searchEmployeeError}>
          <Input
            disabled={loading}
            type="text"
            id="search-employee"
            onChange={e => setSearchEmployeeId(e.target.value)}
            value={searchEmployeeId}
            onKeyDown={handleKeydown}
          />
        </FormRow>
        <ButtonIcon type="button" onClick={handleSearchEmployee}>
          <HiOutlineMagnifyingGlass />
        </ButtonIcon>
      </WrapFormRow>
    </Form>
  );
}

export default SearchEmployeeForm;
