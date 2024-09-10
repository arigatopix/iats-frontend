import { useSearchParams } from "react-router-dom";
import Input from "./Input";

function DateFilter({ placeholder, searchField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const init = searchParams.get(searchField) || "";

  function handleChange(e) {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      searchParams.delete(searchField);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(searchField, value);

    setSearchParams(searchParams);
  }

  return (
    <div>
      <label>ค้นหาจากวันเดินทาง </label>
      <Input
        type="date"
        id={searchField}
        placeholder={placeholder}
        onChange={handleChange}
        value={init}
      />
    </div>
  );
}

export default DateFilter;
