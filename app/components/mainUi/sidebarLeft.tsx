import type { FC } from "react";
import Logo from "../../assets/img/logo.svg";
import IconHome from "../../assets/img/home.svg";
import IconProdotti from "../../assets/img/prodotti.svg";
import IconPagamenti from "../../assets/img/pagamento.svg";
import IconSpedizioni from "../../assets/img/spedizioni.svg";
import IconMail from "../../assets/img/mail.svg";
import IconStorico from "../../assets/img/storico.svg";
import { Link } from "@remix-run/react";
type Props = {};

const SidebarLeft: FC<Props> = (props: Props) => {
  return (
    <div className="sidebar-left">
      <div className="main-logo">
        <img src={Logo} alt="logo" />
      </div>
      <nav className="main-menu">
        <ul>
          <li>
            <img src={IconHome} alt="icon home" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <img src={IconProdotti} alt="icon prodotti" />
            <Link to="/prodotti">Prodotti</Link>
          </li>
          <li>
            <img src={IconPagamenti} alt="icon pagamenti" />
            <Link to="/pagamenti">Pagamenti</Link>
          </li>
          <li>
            <img src={IconSpedizioni} alt="icon spedizioni" />
            <Link to="/spedizioni">Spedizioni</Link>
          </li>
          <li>
            <img src={IconMail} alt="icon mail" />
            <Link to="/mail">Mail</Link>
          </li>
          <li>
            <img src={IconStorico} alt="icon storico" />
            <Link to="/storico">Storico</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLeft;
