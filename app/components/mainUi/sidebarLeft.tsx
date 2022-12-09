import type { FC } from "react";
import Logo from "../../assets/img/logo.svg";
import IconHome from "../../assets/img/home.svg";
import IconProdotti from "../../assets/img/prodotti.svg";
import IconPagamenti from "../../assets/img/pagamento.svg";
import IconSpedizioni from "../../assets/img/spedizioni.svg";
import IconMail from "../../assets/img/mail.svg";
import IconStorico from "../../assets/img/storico.svg";
import { NavLink } from "@remix-run/react";
type Props = {};

const SidebarLeft: FC<Props> = (props: Props) => {
  return (
    <div className="sidebar-left">
      <div className="main-logo">
        <img src={Logo} alt="logo" width="150" height="110" />
      </div>
      <nav className="main-menu">
        <ul>
          <li>
            <img src={IconHome} alt="icon home" width="35" height="27" />
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <img
              src={IconProdotti}
              alt="icon prodotti"
              width="35"
              height="27"
            />
            <NavLink to="/prodotti">Prodotti</NavLink>
          </li>
          <li>
            <img
              src={IconPagamenti}
              alt="icon pagamenti"
              width="35"
              height="27"
            />
            <NavLink to="/pagamenti">Pagamenti</NavLink>
          </li>
          <li>
            <img
              src={IconSpedizioni}
              alt="icon spedizioni"
              width="35"
              height="27"
            />
            <NavLink to="/spedizioni">Spedizioni</NavLink>
          </li>
          <li>
            <img src={IconMail} alt="icon mail" width="35" height="27" />
            <NavLink to="/mail">Mail</NavLink>
          </li>
          <li>
            <img src={IconStorico} alt="icon storico" width="35" height="27" />
            <NavLink to="/storico">Storico</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarLeft;
