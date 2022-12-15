import { Link } from "@remix-run/react"
import { FC } from "react"
import backBtn from "../../assets/img/backBtn.svg"

type Props = { animateAndExit: () => void }

const FooterFormsProdotti: FC<Props> = ({ animateAndExit }) => {
  return (
    <section className="footer">
      <img
        onClick={() => animateAndExit()}
        src={backBtn}
        alt="back button"
        width={49}
        height={47}
        className="backBtn"
      />

      <div className="form-control">
        <button className="buttonSalva">Salva</button>
      </div>
    </section>
  )
}

export default FooterFormsProdotti
