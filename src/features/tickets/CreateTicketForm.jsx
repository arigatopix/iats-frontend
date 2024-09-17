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
// import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import { HiArrowPath } from "react-icons/hi2";
import { useEditTicket } from "./useEditTicket";
import { stopEventBubble } from "../../utils/helpers";
import { useCreateTicket } from "./useCreateTicket";
import { useUser } from "../authentication/useUser";
import { useNavigate } from "react-router-dom";
import { roles } from "../../utils/roles";
import FileUpload from "../files/FileUpload";
import SearchEmployeeForm from "../users/SearchEmployeeForm";

const StyledFormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};

  gap: 2rem;

  & .input__title {
    width: 16rem;
  }
`;

function CreateTicketForm({
  ticketToEdit = {},
  onCloseModal,
  onConfirm,
  projectId = null,
}) {
  const [confirmed, setConfirmed] = useState(false);

  const { createTicket, isCreatingTicket } = useCreateTicket();

  const navigate = useNavigate();

  const {
    user: { role },
  } = useUser();

  const { id: editId, ...editValues } = ticketToEdit;

  const isEditSession = Boolean(editId);

  let is_require_passport = false;
  let is_require_visa = false;
  const { project = null } = ticketToEdit;
  if (isEditSession && project) {
    is_require_passport = project.is_require_passport;
    is_require_visa = project.is_require_visa;
  }

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
        visa_number: "",
        visa_url: "",
        visa_path: "",
        passport_number: "",
        passport_url: "",
        passport_path: "",
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
        if (projectId) {
          createTicket(
            { projectId, ticket: data },
            {
              onSuccess: data => {
                onConfirm(data);
                onCloseModal?.();
              },
            }
          );
          return;
        } else {
          onConfirm(data);
          onCloseModal?.();
        }
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

  function setSearchEmployee({
    employee_id,
    title,
    name,
    title_eng,
    name_eng,
    department,
    email,
    position,
    phone_number,
  }) {
    setValue("employee_id", employee_id);
    setValue("title", title);
    setValue("name", name);
    setValue("name_eng", name_eng);
    setValue("title_eng", title_eng);
    setValue("department", department);
    setValue("email", email);
    setValue("position", position);
    setValue("phone_number", phone_number);
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
        <SearchEmployeeForm
          onCloseModal={onCloseModal}
          setSearchEmployee={setSearchEmployee}
        />
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

        {!onCloseModal && (
          <>
            <StyledFormGrid $columns="1fr 1fr">
              <FormRowVertical
                label="รหัสพนักงาน"
                error={errors?.employee_id?.message}
              >
                <Input
                  type="text"
                  {...register("employee_id")}
                  disabled
                  id="employee_id"
                />
              </FormRowVertical>
              <FormRowVertical
                label="ตำแหน่ง"
                error={errors?.position?.message}
              >
                <Input
                  type="text"
                  {...register(
                    "position",
                    !onCloseModal && {
                      required: "ต้องระบุตำแหน่ง",
                    }
                  )}
                  disabled={isDisabled}
                  id="position"
                />
              </FormRowVertical>
              <FormRowVertical
                label="สังกัด"
                error={errors?.department?.message}
              >
                <Input
                  type="text"
                  {...register(
                    "department",
                    !onCloseModal && {
                      required: "ต้องระบุสังกัด",
                    }
                  )}
                  disabled={isDisabled}
                  id="department"
                />
              </FormRowVertical>
              <FormRowVertical
                label="เบอร์ติดต่อ"
                error={errors?.phone_number?.message}
              >
                <Input
                  type="text"
                  {...register(
                    "phone_number",
                    !onCloseModal && {
                      required: "ต้องระบุเบอร์ติดต่อ",
                    }
                  )}
                  disabled={isDisabled}
                  id="phone_number"
                />
              </FormRowVertical>
              <FormRowVertical label="E-mail" error={errors?.email?.message}>
                <Input
                  type="email"
                  {...register(
                    "email",
                    !onCloseModal && {
                      required: "ต้องระบุ email",
                    }
                  )}
                  disabled={isDisabled}
                  id="email"
                />
              </FormRowVertical>

              <FormRowVertical
                label="ผู้ประสานงาน/ผู้ให้ข้อมูล"
                error={errors?.contact_name?.message}
              >
                <Input
                  type="text"
                  {...register(
                    "contact_name",
                    !onCloseModal && {
                      required: "ต้องระบุเบอร์ติดต่อ",
                    }
                  )}
                  disabled={isDisabled}
                  id="contact_name"
                />
              </FormRowVertical>

              {/* TODO ADD */}
              {/* PASSPORT */}
              {is_require_passport && (
                <>
                  <FormRowVertical
                    label="หมายเลขเดินทางราชการ"
                    error={errors?.is_require_passport?.message}
                  >
                    <Input
                      type="text"
                      {...register(
                        "is_require_passport",
                        !onCloseModal &&
                          is_require_passport && {
                            required: "กรุณาระบุหมายเลขเดินทางราชการ",
                          }
                      )}
                      disabled={isDisabled}
                      id="is_require_passport"
                    />
                  </FormRowVertical>

                  {/* <FormRowVertical
                    label="รูปประกอบเดินทางราชการ"
                    error={errors?.is_require_passport?.message}
                  >
                    <FileInput />

                  </FormRowVertical> */}
                </>
              )}

              {/* VISA */}

              {is_require_visa && (
                <>
                  <FormRowVertical
                    label="หมายเลข VISA"
                    error={errors?.is_require_passport?.message}
                  >
                    <Input
                      type="text"
                      {...register(
                        "is_require_visa",
                        !onCloseModal &&
                          is_require_visa && {
                            required: "กรุณาระบุหมายเลขหมายเลข VISA",
                          }
                      )}
                      disabled={isDisabled}
                      id="is_require_visa"
                    />
                  </FormRowVertical>

                  {/* <FormRowVertical
                    label="รูปประกอบหนังสือ VISA"
                    error={errors?.is_require_visa?.message}
                  >
                    <FileInput />
                  </FormRowVertical> */}
                </>
              )}
            </StyledFormGrid>

            {(is_require_passport || is_require_visa) && (
              <FileUpload
                disabled={isDisabled}
                id="ticket_attachments"
                control={control}
                label={`กรุณาอัพโหลด ${
                  is_require_passport ? "รูปประกอบเดินทางราชการ" : ""
                }
                ${is_require_visa ? "รูป VISA" : ""}`}
              >
                <FileUpload.Label />
                <FileUpload.Upload />
                <FileUpload.Table />
              </FileUpload>
            )}

            {/* 
            <AdditionalRemark
              control={control}
              disabled={isDisabled}
              name="ticket_additional_remarks"
              label="ข้อมูลที่ส่งให้ กกบ."
              resourceName=""
            /> */}

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
