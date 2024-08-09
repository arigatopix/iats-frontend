import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading || error) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const filterValue = searchParams.get("discount") || "all";
  // Filter
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter(cabin => cabin.discount !== 0);
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);

  // Sort
  const [field, direction] = sortBy.split("-");
  // เพื่อเลือกว่า น้อยก่อน หรือมากก่อน ใน sort()
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
