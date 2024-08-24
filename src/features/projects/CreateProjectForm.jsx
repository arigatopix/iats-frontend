import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import styled from "styled-components";
import FileUpload from "../../ui/FileUpload";
import { HiOutlineMegaphone, HiOutlineUser } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import CreateProjcetTicketsForm from "./CreateProjcetTicketsForm";
import { fromToday, getToday } from "../../utils/helpers";

const StyledFormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};

  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function CreateProjectForm({ projectToEdit = {} }) {
  const { id: editId, ...editValues } = projectToEdit;
  const isEditSession = Boolean(editId);
  const defaultValues = isEditSession
    ? editValues
    : {
        name: "",
        description: "",
        country: "",
        date_start: getToday(),
        date_end: fromToday(2),
        projectAttachments: [],
        projectAdditionalRemarks: [],
        tickets: [],
      };

  const { handleSubmit, register, control, reset, getValues } = useForm({
    defaultValues,
  });

  const isDisabled = false;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>
          <HiOutlineMegaphone /> <span>ข้อมูลโครงการ</span>
        </FormHeader>
        <FormRowVertical label="ชื่อโครงการ" error="">
          <Input type="text" {...register("name")} id="name" />
        </FormRowVertical>

        <FormRowVertical label="รายละเอียด" error="">
          <Input type="text" {...register("description")} id="description" />
        </FormRowVertical>

        <StyledFormGrid $columns="1fr 1fr 1fr">
          <FormRowVertical label="ประเทศ" error="">
            <Input type="text" {...register("country")} id="country" />
          </FormRowVertical>
          <FormRowVertical label="วันที่ไป" error="">
            <Input
              type="date"
              {...register("date_start")}
              id="date_start"
              name="date_start"
            />
          </FormRowVertical>
          <FormRowVertical label="วันที่กลับ" error="">
            <Input
              type="date"
              {...register("date_end")}
              id="date_end"
              name="date_end"
            />
          </FormRowVertical>
        </StyledFormGrid>

        <FileUpload
          id="projectAttachments"
          control={control}
          disabled={isDisabled}
        />

        <AdditionalRemark
          control={control}
          disabled={isDisabled}
          name="projectAdditionalRemarks"
          label="ข้อมูลประกอบการเดินทาง"
          resourceName="ข้อมูลประกอบการเดินทาง"
        />

        <CreateProjcetTicketsForm
          name="tickets"
          control={control}
          disabled={isDisabled}
        />

        <FormRow>
          <Button variation="secondary" onClick={() => reset(defaultValues)}>
            ยกเลิก
          </Button>
          {isEditSession && (
            <Button type="button" variation="danger">
              ลบ
            </Button>
          )}
          <Button>{isEditSession ? "แก้ไข" : "บันทึก"}</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateProjectForm;
