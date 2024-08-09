import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const { createCabin, isCreating } = useCreateCabin();

  const isWorking = isDeleting || isCreating;

  function handleDuplicate(cabin) {
    const { image, name, maxCapacity, regularPrice, discount } = cabin;

    createCabin({
      image,
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  if (cabin) {
    const {
      id: cabinId,
      image,
      name,
      maxCapacity,
      regularPrice,
      discount,
    } = cabin;

    return (
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => handleDuplicate(cabin)} disabled={isWorking}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Cabins"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    );
  }
}

export default CabinRow;
