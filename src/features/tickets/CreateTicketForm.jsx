import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import styled from "styled-components";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowPath, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useEditTicket } from "./useEditTicket";
import { parseEmployee, stopEventBubble } from "../../utils/helpers";
import { getEmployee } from "../../services/apiEmployee";
import { useCreateTicket } from "./useCreateTicket";
import { useUser } from "../authentication/useUser";
import { useNavigate } from "react-router-dom";
import { roles } from "../../utils/roles";
import FileUpload from "../files/FileUpload";

const StyledFormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};

  gap: 2rem;

  & .input__title {
    width: 16rem;
  }
`;

const WrapFormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

function CreateTicketForm({
  ticketToEdit = {},
  onCloseModal,
  onConfirm,
  projectId = null,
}) {
  const [confirmed, setConfirmed] = useState(false);

  const [searchEmployeeId, setSearchEmployeeId] = useState("");

  const [searchEmployeeError, setSearchEmployeeError] = useState("");

  const { createTicket, isCreatingTicket } = useCreateTicket();

  const navigate = useNavigate();

  const {
    user: { role },
  } = useUser();

  const { id: editId, ...editValues } = ticketToEdit;

  const isEditSession = Boolean(editId);

  const defaultValues = isEditSession
    ? editValues
    : {
        employee_id: "",
        title: "",
        name: "",
        title_eng: "",
        name_eng: "",
        position: "",
        department: "",
        phone_number: "",
        email: "",
        contact_name: "",
        remark: "",
        status: "unconfirmed",
        ticket_additional_remarks: [],
        ticket_attachments: [],
      };

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    formState,
    setValue,
  } = useForm({
    defaultValues,
  });

  const { errors } = formState;

  const { editTicket, isEditing } = useEditTicket();

  useEffect(() => {
    setConfirmed(getValues("status") === "confirmed");
  }, [getValues]);

  const isDisabled = confirmed || isEditing || isCreatingTicket;

  const isLoading = isEditing || isCreatingTicket;

  const disableButton =
    (defaultValues.status === "confirmed" && role === "user") || isLoading;

  const onSubmit = async event => {
    if (event) {
      stopEventBubble(event);
    }

    return handleSubmit(async data => {
      const dataForm = {
        ...data,
        status: confirmed ? "confirmed" : "unconfirmed",
      };

      if (!isEditSession) {
        onConfirm(data);

        if (projectId) {
          createTicket({ projectId, ticket: data });
        }

        onCloseModal?.();
      } else {
        editTicket(
          { ticket: dataForm, editId },
          {
            onSuccess: () => {
              if (onCloseModal) {
                onCloseModal?.();
              } else {
                navigate("/tickets");
              }
            },
          }
        );
      }
    })(event);
  };

  async function handleSearchEmployee() {
    try {
      setSearchEmployeeError("");

      if (searchEmployeeId === "") return;

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

        setValue("employee_id", employee_id);
        setValue("title", title);
        setValue("name", name);
        setValue("name_eng", name_eng);
        setValue("title_eng", title_eng);
        setValue("department", department);
        setValue("email", email);
        setValue("position", position);
        setValue("phone_number", phone_number);

        setSearchEmployeeId("");
      }
    } catch (error) {
      setSearchEmployeeError(error.message);
    }
  }

  function handleKeydown(event) {
    if (event && event.key === "Enter") {
      stopEventBubble(event);
      handleSearchEmployee();
    }
  }

  function handleConfirm() {
    if (roles.includes(role)) {
      setConfirmed(confirmed => !confirmed);
    } else if (role === "user") {
      defaultValues.status === "unconfirmed" &&
        setConfirmed(confirmed => !confirmed);
    }
  }

  return (
    <>
      {!isEditSession && (
        <Form type={onCloseModal ? "modal" : "regular"}>
          <WrapFormRow>
            <FormRow label="ค้นหาด้วยรหัสพนักงาน" error={searchEmployeeError}>
              <Input
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
      )}

      <Form onSubmit={onSubmit} type={onCloseModal ? "modal" : "regular"}>
        <FormHeader>ข้อมูลผู้เดินทาง</FormHeader>

        <StyledFormGrid $columns="0.1fr 1fr">
          <FormRowVertical label="คำนำหน้าชื่อ" error={errors?.title?.message}>
            <Input
              disabled={isDisabled}
              className="input__title"
              type="text"
              {...register("title", {
                required: "กรุณาระบุคำนำหน้าชื่อ",
              })}
              id="title"
            />
          </FormRowVertical>
          <FormRowVertical label="ชื่อ - นามสกุล" error={errors?.name?.message}>
            <Input
              type="text"
              {...register("name", {
                required: "กรุณาระบุชื่อ - นามสกุล",
              })}
              disabled={isDisabled}
              id="name"
            />
          </FormRowVertical>
          <FormRowVertical label="คำนำหน้าชื่อ (ภาษาอังกฤษ)" error="">
            <Input
              className="input__title"
              type="text"
              {...register("title_eng")}
              disabled={isDisabled}
              id="title_eng"
            />
          </FormRowVertical>
          <FormRowVertical label="ชื่อ - นามสกุล (ภาษาอังกฤษ)" error="">
            <Input
              type="text"
              {...register("name_eng")}
              disabled={isDisabled}
              id="name_eng"
            />
          </FormRowVertical>
        </StyledFormGrid>

        <StyledFormGrid $columns="1fr 1fr">
          <FormRowVertical
            label="รหัสพนักงาน"
            error={errors?.employee_id?.message}
          >
            <Input
              type="text"
              {...register("employee_id")}
              disabled={isEditSession}
              id="employee_id"
            />
          </FormRowVertical>
          <FormRowVertical label="ตำแหน่ง">
            <Input
              type="text"
              {...register("position")}
              disabled={isDisabled}
              id="position"
            />
          </FormRowVertical>
          <FormRowVertical label="สังกัด">
            <Input
              type="text"
              {...register("department")}
              disabled={isDisabled}
              id="department"
            />
          </FormRowVertical>
          <FormRowVertical label="เบอร์ติดต่อ" error="">
            <Input
              type="text"
              {...register("phone_number")}
              disabled={isDisabled}
              id="phone_number"
            />
          </FormRowVertical>
          <FormRowVertical label="E-mail" error={errors?.email?.message}>
            <Input
              type="email"
              {...register("email", {
                required: "กรุณาระบุ E-Mail",
              })}
              disabled={isDisabled}
              id="email"
            />
          </FormRowVertical>
          <FormRowVertical label="ผู้ประสานงาน/ผู้ให้ข้อมูล" error="">
            <Input
              type="text"
              {...register("contact_name")}
              disabled={isDisabled}
              id="contact_name"
            />
          </FormRowVertical>
        </StyledFormGrid>

        {!onCloseModal && (
          <>
            <FileUpload
              disabled={isDisabled}
              id="ticket_attachments"
              control={control}
              label="กรุณาอัพโหลดเอกสารเพื่อให้ กบบ. พิจารณา"
            >
              <FileUpload.Label />
              <FileUpload.Upload />
              <FileUpload.Table />
            </FileUpload>

            <AdditionalRemark
              control={control}
              disabled={isDisabled}
              name="ticket_additional_remarks"
              label="ข้อมูลที่ส่งให้ กกบ."
              resourceName=""
            />

            <FormRowVertical label="สิ่งที่ให้ กกบ. ดำเนินการเพิ่มเติม">
              <Textarea
                {...register("remark")}
                disabled={isDisabled}
                id="remark"
              />
            </FormRowVertical>

            <Checkbox checked={confirmed} onChange={handleConfirm} id="status">
              ยืนยันข้อมูลครบถ้วน ถูกต้อง
            </Checkbox>
          </>
        )}

        <FormRow>
          <Button
            type="button"
            variation="secondary"
            disabled={disableButton}
            onClick={() => {
              reset(defaultValues);
              setConfirmed(getValues("status") === "confirmed");
            }}
          >
            <HiArrowPath /> <span>ล้างข้อมูล</span>
          </Button>
          <Button disabled={disableButton}>บันทึก</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateTicketForm;
