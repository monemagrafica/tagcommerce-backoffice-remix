import { Outlet } from "@remix-run/react";

type Props = {};

function mainLayout({}: Props) {
  return (
    <div>
      MainLayout
      <Outlet />
    </div>
  );
}

export default mainLayout;
