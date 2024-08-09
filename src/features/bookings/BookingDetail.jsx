import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading: isBookingLoading, error } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const { checkout, isCheckout } = useCheckout();

  const { deleteBooking, isDeleteBooking } = useDeleteBooking();

  const isLoading = isBookingLoading || isCheckout;

  if (isLoading || error) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(bookingId);
            }}
          >
            Check Out
          </Button>
        )}

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check In
          </Button>
        )}

        <Modal>
          <Modal.Open>
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window>
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleteBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="$secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
