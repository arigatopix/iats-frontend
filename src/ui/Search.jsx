import { useSearchParams } from "react-router-dom";
import Input from "./Input";

function Search({ placeholder, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    e.preventDefault();

    const { value } = e.target;

    if (!value) {
      console.log(value);
      searchParams.delete(filterField);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(filterField, value);

    setSearchParams(searchParams);
  }
  // TODO
  // คนพิมพ์
  // ใส่ url name = ?
  // ใน table เอา name ไปใช้
  return (
    <div>
      <Input placeholder={placeholder} onChange={handleChange} />
    </div>
  );
}

export default Search;
