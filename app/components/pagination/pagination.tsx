import { type FC, useState } from "react";
import ReactPaginate from "react-paginate";
import type { prodotto } from "~/types/prodotti";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DeleteButton, GoToEditButton } from "../mainUi/buttons";
import { motion } from "framer-motion";

type PropsItem = {
  currentItems: [prodotto];
  offset: number;
};

const container = {
  hidden: { opacity: 0, y: 30, transition: { duration: 0.5 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Items: FC<PropsItem> = ({ currentItems, offset }) => {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      key={offset}
    >
      {currentItems &&
        currentItems.map((item) => (
          <li key={item.id}>
            <div className="productListName">{item.nome}</div>
            <div className="productListVatiante">{item.varianti ?? "s"}</div>
            <div className="productListPrice">{item.prezzo}€</div>
            <LazyLoadImage
              className="productListThumb"
              src={item.image}
              width={50}
              height={42}
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
    </motion.ul>
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
  const currentItems = [...prodotti.slice(itemOffset, endOffset)];
  const pageCount = Math.ceil(prodotti.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % prodotti.length;
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

      <Items currentItems={currentItems} offset={itemOffset} />

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
