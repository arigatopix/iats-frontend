import Box from "./Box";

function Empty({ resourceName }) {
  return (
    <Box>
      <p>ยังไม่มีรายการ {resourceName}</p>
    </Box>
  );
}

export default Empty;
