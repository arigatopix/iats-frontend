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
import Box from "../../ui/Box";
import Textarea from "../../ui/Textarea";
import AdditionalRemark from "../../ui/AdditionalRemark";
import FormHeader from "../../ui/FormHeader";

const StyledFormGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns};

  gap: 2rem;

  & .input__title {
    width: 16rem;
  }
`;

function CreateTicketForm({ ticketToEdit = {} }) {
  const [confirmed, setConfirmed] = useState(false);

  const { id: editId, ...editValues } = ticketToEdit;
  const isEditSession = Boolean(editId);
  const defaultValues = isEditSession
    ? editValues
    : {
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
        status: "",
        ticketAdditionalRemarks: [],
        ticketAttachments: [],
      };

  const { handleSubmit, register, control, reset, getValues } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setConfirmed(getValues("status") === "confirmed");
  }, [getValues]);

  const isDisabled = confirmed;

  function onSubmit(data) {
    const dataForm = {
      ...data,
      status: confirmed ? "confirmed" : "unconfirmed",
    };

    console.log(dataForm);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      </StyledFormGrid>
      <StyledFormGrid $columns="0.1fr 1fr">
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
      </StyledFormGrid>
      <FormRowVertical label="ผู้ประสานงาน/ผู้ให้ข้อมูล" error="">
        <Input
          type="text"
          {...register("contact_name")}
          disabled={isDisabled}
          id="contact_name"
        />
      </FormRowVertical>
      <FormRowVertical label="หมายเหตุ">
        <Textarea {...register("remark")} disabled={isDisabled} id="remark" />
      </FormRowVertical>

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

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => reset(defaultValues)}
        >
          ยกเลิก
        </Button>
        <Button>บันทึก</Button>
      </FormRow>
    </Form>
  );
}

export default CreateTicketForm;
