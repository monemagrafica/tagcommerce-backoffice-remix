import { type FC, useState } from "react";
import ReactPaginate from "react-paginate";
import type { prodotto } from "~/types/prodotti";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DeleteButton, GoToEditButton } from "../mainUi/buttons";

type PropsItem = {
  currentItems: [prodotto];
};
const Items: FC<PropsItem> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <li key={item.id}>
            <div className="productListName">{item.name}</div>
            <div className="productListVatiante">{item.varianti ?? "s"}</div>
            <div className="productListPrice">{item.price}€</div>
            <LazyLoadImage
              className="productListThumb"
              src={item.image}
              width={80}
              height={60}
              alt="Image Alt"
              effect="blur"
            />
            <div className="productListEdit">
              <div className="wrapperListButtons">
                <GoToEditButton id={item.id} />
                <DeleteButton />
              </div>
            </div>
          </li>
        ))}
    </>
  );
};

type PropsPagination = {
  prodotti: prodotto[];
  itemsPerPage: number;
};
const Pagination: FC<PropsPagination> = ({ itemsPerPage, prodotti }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = [...prodotti.slice(itemOffset, endOffset)];
  const pageCount = Math.ceil(prodotti.length / itemsPerPage);
  console.log("currentItems", currentItems);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % prodotti.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul className="header">
        <li>Nome</li>
        <li>variante</li>
        <li>prezzo</li>
        <li>thumb</li>
        <li></li>
      </ul>
      <ul>
        <Items currentItems={currentItems} />
      </ul>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Pagination;
