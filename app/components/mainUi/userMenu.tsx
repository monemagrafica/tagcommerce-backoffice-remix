import type { FC } from "react";
import userIcon from "../../assets/img/user.svg";
import options from "../../assets/img/option.svg";

type Props = {};

const UserMenu: FC<Props> = (props: Props) => {
  return (
    <nav className="userMenu">
      <ul>
        <li>
          <img src={userIcon} alt="user icon" width={23} height={30} />
        </li>
        <li>
          <img src={options} alt="option icon" width={23} height={27} />
        </li>
      </ul>
    </nav>
  );
};

export default UserMenu;
