import React, { useState, useEffect } from "react";
import filterSearch from "../utils/filterSearch";
import { getData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Filter = ({ state }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const { categories } = state;

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <div className="input-group">
      <div className="col-md-12 col-sm-12 px-0 mt-2">
        <select
          className="form-select text-capitalize"
          value={category}
          onChange={handleCategory}
        >
          <option value="all">Todos los productos</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <form autoComplete="off" className="mt-2 col-md-12 col-sm-12 px-0">
        <input
          type="text"
          className="form-control"
          list="title_product"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar un producto...'
        />
      </form>

      <div className="col-md-12 col-sm-12 px-0 mt-2">
        <select
          className="form-select text-capitalize"
          value={sort}
          onChange={handleSort}
        >
          <option value="-createdAt">Lo más nuevo</option>
          <option value="oldest">Lo más antiguo</option>
          <option value="-sold">Lo más vendido</option>
          <option value="-price">Precio: Mayor a Menor</option>
          <option value="price">Precio: Menor a Mayor</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
