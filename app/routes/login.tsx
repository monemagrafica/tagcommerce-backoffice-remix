import { Outlet } from "@remix-run/react";
type Props = {};

function loginLayout({}: Props) {
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
}

export default loginLayout;
