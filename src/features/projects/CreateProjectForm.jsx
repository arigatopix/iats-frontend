import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import styled from "styled-components";
import { HiArrowPath, HiOutlineMegaphone } from "react-icons/hi2";
import { useForm } from "react-hook-form";
// import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import CreateProjcetTicketsForm from "./CreateProjcetTicketsForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProject } from "./useDeleteProject";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "./useCreateProject";
import { useEditProject } from "./useEditProject";
import FileUpload from "../files/FileUpload";
import Checkbox from "../../ui/Checkbox";
import Box from "../../ui/Box";
// import CheckboxNormal from "../../ui/CheckboxNormal";
import { useEffect, useState } from "react";

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

  const [isRequirePassport, setIsRequirePassport] = useState(false);
  const [isRequireVisa, setIsRequireVisa] = useState(false);

  const { id: editId, ...editValues } = projectToEdit;
  console.log("editValues", editValues);
  const isEditSession = Boolean(editId);
  const defaultValues = isEditSession
    ? editValues
    : {
        name: "",
        description: "",
        country: "",
        is_require_passport: false,
        is_require_visa: false,
        date_start: new Date().toISOString().slice(0, 10),
        date_end: new Date().toISOString().slice(0, 10),
        project_attachments: [],
        project_additional_remarks: [],
        tickets: [],
      };

  const { handleSubmit, register, control, reset, getValues, formState } =
    useForm({
      defaultValues,
    });

  useEffect(() => {
    setIsRequirePassport(getValues("is_require_passport"));
    setIsRequireVisa(getValues("is_require_visa"));
  }, [getValues]);

  const { errors } = formState;

  const { createProject, isCreating } = useCreateProject();

  const { editProject, isEditing } = useEditProject();

  const { deleteProject, isDeleting } = useDeleteProject();

  const isDisabled = isDeleting || isCreating || isEditing;

  function handleRequirePassport() {
    setIsRequirePassport(isRequirePassport => !isRequirePassport);
  }

  function handleRequireVisa() {
    setIsRequireVisa(isRequireVisa => !isRequireVisa);
  }

  function onSubmit(data) {
    const project = {
      ...data,
      is_require_passport: isRequirePassport,
      is_require_visa: isRequireVisa,
    };

    if (isEditSession) {
      editProject({ project: project, editId });
    } else {
      createProject(project);
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
              maxLength: {
                value: 60,
                message: "กำหนดชื่อโครงการไม่เกิน 60 ตัวอักษร",
              },
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
              maxLength: {
                value: 60,
                message: "ระบุรายละเอียดได้ไม่เกิน 60 ตัวอักษร",
              },
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
                maxLength: {
                  value: 19,
                  message: "ระยุประเทศได้ไม่เกิน 19 ตัวอักษร",
                },
              })}
              id="country"
            />
          </FormRowVertical>
          <FormRowVertical
            label="วันที่เดินทางไป"
            error={errors?.date_start?.message}
          >
            <Input
              type="date"
              {...register("date_start", {
                required: "กรุณาระบุวันเดินทางไป",
              })}
              id="date_start"
              name="date_start"
            />
          </FormRowVertical>

          <FormRowVertical
            label="วันที่เดินทางกลับ"
            error={errors?.date_end?.message}
          >
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
          disabled={isDisabled}
          id="project_attachments"
          control={control}
          label="กรุณาอัพโหลดเอกสารประกอบโครงการ"
        >
          <FileUpload.Label />
          <FileUpload.Upload />
          <FileUpload.Table />
        </FileUpload>

        <Box>
          <Checkbox
            checked={isRequirePassport}
            onChange={handleRequirePassport}
            id="is_require_passport"
          >
            ต้องการหมายเลขเดินทางราชการ และรูปประกอบ
          </Checkbox>
        </Box>

        <Box>
          <Checkbox
            checked={isRequireVisa}
            onChange={handleRequireVisa}
            id="is_require_visa"
          >
            ต้องการหมายเลข VISA และรูปประกอบ
          </Checkbox>
        </Box>
        {/* 
        <Controller
          name="is_require_passport"
          control={control}
          render={({ field }) => (
            <Box>
              <CheckboxNormal id="is_require_passport" {...field}>
                ต้องการหมายเลขเดินทางราชการ และรูปประกอบ
              </CheckboxNormal>
            </Box>
          )}
        />

        <Controller
          name="is_require_visa"
          control={control}
          render={({ field }) => (
            <Box>
              <CheckboxNormal id="is_require_visa" {...field}>
                ต้องการหมายเลข VISA และรูปประกอบ
              </CheckboxNormal>
            </Box>
          )}
        />
         */}
        {/* 
        <Checkbox id="is_require_passport">
          ต้องการหมายเลขเดินทางราชการ และรูปประกอบ
        </Checkbox>

        <Box>
          <Checkbox id="is_require_visa">
            ต้องการหมายเลข VISA และรูปประกอบ
          </Checkbox>
        </Box> */}

        {/* 
        <AdditionalRemark
          control={control}
          disabled={isDisabled}
          name="project_additional_remarks"
          label="ข้อมูลที่ต้องการจากผู้เดินทาง"
          resourceName="ข้อมูลที่ต้องการจากผู้เดินทาง"
        /> */}

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
            <HiArrowPath /> <span>ล้างข้อมูล</span>
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

          <Button disabled={isDisabled}>
            {isEditSession ? "แก้ไข" : "บันทึก"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateProjectForm;
