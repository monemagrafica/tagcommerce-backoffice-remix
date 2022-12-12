import { Outlet, useLocation } from "@remix-run/react";
import SidebarLeft from "~/components/mainUi/sidebarLeft";
import UserMenu from "~/components/mainUi/userMenu";
import style from "../assets/css/mainLayout.css";

type Props = {};

function MainLayout({}: Props) {
  console.log(useLocation());
  return (
    <div className="main-container">
      <SidebarLeft />
      <section className="content">
        <UserMenu />

        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default MainLayout;

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
