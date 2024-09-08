import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useAdminLogin } from "./useAdminLogin";

function AdmiLogin() {
  const { adminLogin, isLogginIn } = useAdminLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit({ employee_id }) {
    adminLogin({ employee_id });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="bypass" error={errors.employee_id?.message}>
        <Input
          {...register("employee_id", { required: "Required!!" })}
          disabled={isLogginIn}
        />
      </FormRowVertical>
      <Button>Login</Button>
    </Form>
  );
}

export default AdmiLogin;
