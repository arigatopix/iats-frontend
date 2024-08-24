import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiMiniPlusCircle, HiOutlineTrash } from "react-icons/hi2";
import Empty from "./Empty";
import { Controller, useFieldArray } from "react-hook-form";
import Input from "./Input";
import FormHeader from "./FormHeader";
import Button from "./Button";

const StyledAdditionalRemark = styled.section`
  margin-top: 3rem;
  margin-bottom: 4rem;
`;

const WarpRemarkHeader = styled.div`
  display: flex;
  gap: 2rem;
  align-items: start;
`;

const WramButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const FormAdditional = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;

  & input {
    width: 100%;
  }
`;

function AdditionalRemark({ control, disabled, name, label, resourceName }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function handleAddRemark(e) {
    e.preventDefault();
    append({ remark: "" });
  }

  return (
    <StyledAdditionalRemark>
      <WarpRemarkHeader>
        <FormHeader>{label}</FormHeader>
      </WarpRemarkHeader>
      {!fields.length ? (
        <Empty resourceName={resourceName} />
      ) : (
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <FormAdditional>
                <Controller
                  render={({ field }) => (
                    <Input {...field} disabled={disabled} />
                  )}
                  name={`${name}.${index}.remark`}
                  control={control}
                />

                {!disabled && (
                  <ButtonIcon onClick={() => remove(index)}>
                    <HiOutlineTrash />
                  </ButtonIcon>
                )}
              </FormAdditional>
            </li>
          ))}
        </ul>
      )}
      {!disabled && (
        <WramButton variation="secondary" onClick={handleAddRemark}>
          <HiMiniPlusCircle />
        </WramButton>
      )}
    </StyledAdditionalRemark>
  );
}

export default AdditionalRemark;
