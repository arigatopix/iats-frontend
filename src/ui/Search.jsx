import { useSearchParams } from "react-router-dom";
import Input from "./Input";

function Search({ placeholder, searchField, type = "text" }) {
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
        type={type}
        id={searchField}
        placeholder={placeholder}
        onChange={handleChange}
        value={init}
      />
    </div>
  );
}

export default Search;
