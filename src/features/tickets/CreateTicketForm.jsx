import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import styled from "styled-components";
import Checkbox from "../../ui/Checkbox";
import FileUpload from "../../ui/FileUpload";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

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

function CreateTicketForm({ ticketToEdit = {}, onCloseModal, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);

  const { id: editId, ...editValues } = ticketToEdit;
  const isEditSession = Boolean(editId);
  const defaultValues = isEditSession
    ? editValues
    : {
        employeeId: "",
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
        ticketAdditionalRemarks: [],
        ticketAttachments: [],
      };

  const { handleSubmit, register, control, reset, getValues } = useForm({
    defaultValues,
  });

  const {
    handleSubmit: handleSubmitSearchEmployee,
    register: registerSearchEmployee,
  } = useForm({
    defaultValues: {
      employeeId: "",
    },
  });

  useEffect(() => {
    setConfirmed(getValues("status") === "confirmed");
  }, [getValues]);

  const isDisabled = confirmed;

  const onSubmit = async event => {
    if (event) {
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }
    }

    return handleSubmit(async data => {
      const dataForm = {
        ...data,
        status: confirmed ? "confirmed" : "unconfirmed",
      };

      if (!isEditSession) {
        onConfirm(data);
        onCloseModal?.();
      } else {
        console.log(dataForm);
        // call patch api
      }
    })(event);
  };

  function onSubmitSearchEmployee(data) {
    console.log(data);
  }

  return (
    <>
      {!isEditSession && (
        <Form
          onSubmit={handleSubmitSearchEmployee(onSubmitSearchEmployee)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <WrapFormRow>
            <FormRow label="ค้นหาด้วยรหัสพนักงาน" error="">
              <Input
                type="text"
                id="search-employee"
                {...registerSearchEmployee("employeeId")}
              />
            </FormRow>
            <ButtonIcon type="button">
              <HiOutlineMagnifyingGlass />
            </ButtonIcon>
          </WrapFormRow>
        </Form>
      )}

      <Form onSubmit={onSubmit} type={onCloseModal ? "modal" : "regular"}>
        <FormHeader>ข้อมูลผู้เดินทาง</FormHeader>

        <StyledFormGrid $columns="0.1fr 1fr">
          <FormRowVertical label="คำนำหน้าชื่อ" error="">
            <Input
              disabled={isDisabled}
              className="input__title"
              type="text"
              {...register("title")}
              id="title"
            />
          </FormRowVertical>
          <FormRowVertical label="ชื่อ - นามสกุล" error="">
            <Input
              type="text"
              {...register("name")}
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
          <FormRowVertical label="รหัสพนักงาน" error="">
            <Input
              type="text"
              {...register("employeeId")}
              disabled
              id="employeeId"
            />
          </FormRowVertical>
          <FormRowVertical label="ตำแหน่ง" error="">
            <Input
              type="text"
              {...register("position")}
              disabled={isDisabled}
              id="position"
            />
          </FormRowVertical>
          <FormRowVertical label="สังกัด" error="">
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
          <FormRowVertical label="E-mail" error="">
            <Input
              type="email"
              {...register("email")}
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
        <FormRowVertical label="หมายเหตุ">
          <Textarea {...register("remark")} disabled={isDisabled} id="remark" />
        </FormRowVertical>

        {!onCloseModal && (
          <>
            <FileUpload
              disabled={isDisabled}
              id="ticketAttachments"
              control={control}
            />

            <AdditionalRemark
              control={control}
              disabled={isDisabled}
              name="additionalRemarkTicket"
              label="สิ่งที่ให้ กกบ. ดำเนินการเพิ่มเติม"
              resourceName="หมายเหตุ"
            />

            <Checkbox
              checked={confirmed}
              onChange={() => {
                if (isDisabled) return;
                setConfirmed(confirmed => !confirmed);
              }}
              id="status"
            >
              ยืนยันข้อมูลครบถ้วน ถูกต้อง
            </Checkbox>
          </>
        )}

        <FormRow>
          <Button
            type="button"
            variation="secondary"
            onClick={() => {
              reset(defaultValues);
              setConfirmed(getValues("status") === "confirmed");
            }}
          >
            ยกเลิก
          </Button>
          <Button>บันทึก</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateTicketForm;
