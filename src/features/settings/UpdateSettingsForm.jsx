import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLenght,
      maxBookingLenght,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
    error,
  } = useSettings();

  const { editSettings, isEditing } = useEditSettings();

  if (isLoading || error) return <Spinner />;

  function handlerUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    editSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLenght}
          onBlur={e => handlerUpdate(e, "minBookingLenght")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLenght}
          onBlur={e => handlerUpdate(e, "maxBookingLenght")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handlerUpdate(e, "maxGuestsPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={e => handlerUpdate(e, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
