import { Outlet } from "@remix-run/react";
import style from "../assets/css/loginLayout.css";
type Props = {};

function loginLayout({}: Props) {
  return (
    <div className="wrapperLayout">
      <Outlet />
    </div>
  );
}

export default loginLayout;

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
