import { Link } from "@remix-run/react";
import { FC } from "react";
import backBtn from "../../assets/img/backBtn.svg";
type Props = {};

const FooterFormsProdotti: FC<Props> = (props: Props) => {
  return (
    <section className="footer">
      <Link to=".." className="backBtn">
        <img src={backBtn} alt="back button" width={49} height={47} />
      </Link>
      <div className="form-control">
        <button type="submit">Salva</button>
      </div>
    </section>
  );
};

export default FooterFormsProdotti;
