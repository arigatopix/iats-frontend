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
      <Input
        type="text"
        id={searchField}
        placeholder={placeholder}
        onChange={handleChange}
        value={init}
        onFocus={e => (e.target.type = "date")}
      />
    </div>
  );
}

export default DateFilter;
