import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Controller, useForm } from "react-hook-form";
import Select from "../../ui/Select";
import SearchEmployeeForm from "./SearchEmployeeForm";
import { useCreateUser } from "./useCreateUser";
import { useUpdateUser } from "./useUpdateUser";

// import { useUser } from "../authentication/useUser";
// import { useUpdateUser } from "../authentication/useUpdateUser";

function CreateUserForm({ userToEdit = {}, onCloseModal, onConfirm }) {
  const { id: editId, ...editValues } = userToEdit;

  const isEditSession = Boolean(editId);

  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const isProcessing = isCreating || isUpdating;

  const defaultValues = isEditSession
    ? editValues
    : {
        employee_id: "",
        name: "",
        email: "",
        role: "user",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    setValue,
    reset,
  } = useForm({ defaultValues });

  function onSubmit({ employee_id, name, email, role }) {
    if (isEditSession) {
      updateUser({ employee_id, user: { employee_id, name, email, role } });
    } else {
      createUser({ employee_id, name, email, role });
    }

    onCloseModal?.();
  }

  function setSearchEmployee({ employee_id, name, email, position }) {
    setValue("employee_id", employee_id);
    setValue("name", name);
    setValue("email", email);
    setValue("position", position);
  }

  return (
    <>
      {!isEditSession && (
        <SearchEmployeeForm
          onCloseModal={onCloseModal}
          setSearchEmployee={setSearchEmployee}
        />
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <pre>{JSON.stringify(getValues)}</pre>
        <FormRow label="รหัสพนักงาน" error={errors.employee_id?.message}>
          <Input
            {...register("employee_id", {
              required: "ต้องระบุรหัสพนักงาน",
            })}
            disabled
          />
        </FormRow>

        <FormRow label="ชื่อ - นามสกุล" error={errors.name?.message}>
          <Input
            disabled
            type="text"
            id="name"
            {...register("name", {
              required: "ต้องกรอกชื่อ - นามสกุล",
            })}
          />
        </FormRow>
        {/* 
        <FormRow label="Email">
          <Input
            {...register("email", {
              required: "ต้องกรอก email",
            })}
            disabled
          />
        </FormRow> */}

        <FormRow label="สิทธิ์">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "user", label: "User" },
                  { value: "manager", label: "Manager" },
                  { value: "admin", label: "Admin" },
                ]}
              />
            )}
          />
        </FormRow>

        <FormRow>
          <Button
            onClick={reset}
            type="button"
            variation="secondary"
            disabled={isProcessing}
          >
            ล้างข้อมูล
          </Button>
          <Button disabled={isProcessing}>
            {isEditSession ? "แก้ไขสิทธิ์" : "สร้างผู้ใช้งาน"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateUserForm;
