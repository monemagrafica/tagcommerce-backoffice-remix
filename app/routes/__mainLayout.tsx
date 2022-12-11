import { Outlet, useLocation } from "@remix-run/react";

import SidebarLeft from "~/components/mainUi/sidebarLeft";
import UserMenu from "~/components/mainUi/userMenu";

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
