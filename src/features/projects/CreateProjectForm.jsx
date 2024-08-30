import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import styled from "styled-components";
import FileUpload from "../../ui/FileUpload";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import CreateProjcetTicketsForm from "./CreateProjcetTicketsForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProject } from "./useDeleteProject";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "./useCreateProject";
import { useEditProject } from "./useEditProject";

const StyledFormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};

  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function CreateProjectForm({ projectToEdit = {} }) {
  const navigate = useNavigate();

  const { id: editId, ...editValues } = projectToEdit;
  const isEditSession = Boolean(editId);
  const defaultValues = isEditSession
    ? editValues
    : {
        name: "",
        description: "",
        country: "",
        date_start: new Date().toISOString().slice(0, 10),
        date_end: new Date().toISOString().slice(0, 10),
        projectAttachments: [],
        projectAdditionalRemarks: [],
        tickets: [],
      };

  const { handleSubmit, register, control, reset, getValues, formState } =
    useForm({
      defaultValues,
    });

  const { errors } = formState;

  const { createProject, isCreating } = useCreateProject();

  const { editProject, isEditing } = useEditProject();

  const { deleteProject, isDeleting } = useDeleteProject();

  const isDisabled = isDeleting || isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editProject({ project: data, editId });
    } else {
      createProject(data);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>
          <HiOutlineMegaphone /> <span>ข้อมูลโครงการ</span>
        </FormHeader>
        <FormRowVertical label="ชื่อโครงการ" error={errors?.name?.message}>
          <Input
            type="text"
            {...register("name", {
              required: "กรุณาระบุชื่อโครงการ",
            })}
            id="name"
          />
        </FormRowVertical>

        <FormRowVertical
          label="รายละเอียด"
          error={errors?.description?.message}
        >
          <Input
            type="text"
            {...register("description", {
              required: "กรุณาระบุรายละเอียด",
            })}
            id="description"
          />
        </FormRowVertical>

        <StyledFormGrid $columns="1fr 1fr 1fr">
          <FormRowVertical label="ประเทศ" error={errors?.country?.message}>
            <Input
              type="text"
              {...register("country", {
                required: "กรุณาระบุประเทศที่จะเดินทางไป",
              })}
              id="country"
            />
          </FormRowVertical>
          <FormRowVertical label="วันที่ไป" error={errors?.date_start?.message}>
            <Input
              type="date"
              {...register("date_start", {
                required: "กรุณาระบุวันเดินทางไป",
              })}
              id="date_start"
              name="date_start"
            />
          </FormRowVertical>

          <FormRowVertical label="วันที่กลับ" error={errors?.date_end?.message}>
            <Input
              type="date"
              {...register("date_end", {
                required: "กรุณาระบุวันเดินทางกลับ",
                validate: value =>
                  value >= getValues().date_start ||
                  "วันเดินทางกลับต้องมากกว่าวันที่ไป",
              })}
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
          <Button
            type="button"
            variation="secondary"
            onClick={() => reset(defaultValues)}
          >
            ยกเลิก
          </Button>
          {isEditSession && (
            <Modal>
              <Modal.Open opens={`delete-${editId}`}>
                <Button variation="danger" type="button">
                  ลบ
                </Button>
              </Modal.Open>

              <Modal.Window name={`delete-${editId}`}>
                <ConfirmDelete
                  resourceName="โครงการ"
                  onConfirm={() => {
                    deleteProject(editId, {
                      onSuccess: navigate(-1),
                    });
                  }}
                  disabled={isDisabled}
                />
              </Modal.Window>
            </Modal>
          )}

          <Button>{isEditSession ? "แก้ไข" : "บันทึก"}</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateProjectForm;
