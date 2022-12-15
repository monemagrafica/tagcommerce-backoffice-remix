import type { prodotto } from "~/types/prodotti"
import type { validazioniFormProdotto } from "~/types/validazioni"
import type { attributi } from "~/types/attributi"
import { useNavigate } from "@remix-run/react"
import { useEffect, useState, type FC } from "react"
import { motion, useAnimationControls } from "framer-motion"
import TagsInput from "react-tagsinput"

type Props = {
  prodotto: prodotto
  validazioni: validazioniFormProdotto
  attributi?: [attributi]
}

const ModaleAttributi: FC<Props> = ({ prodotto, validazioni, attributi }) => {
  const backgroundAnimation = useAnimationControls()
  const schedaAnimation = useAnimationControls()
  const navigateTo = useNavigate()
  const [tag, setTag] = useState([])
  async function animateAndExit() {
    async function animationsBundle() {
      await Promise.all([
        backgroundAnimation.start({
          opacity: 0,
          transition: { duration: 0.3 },
        }),
        schedaAnimation.start({
          opacity: 0,
          y: 50,
          transition: { duration: 0.3 },
        }),
      ])
    }

    await animationsBundle()
    navigateTo(`/prodotti/edit/${prodotto.id}`)
  }
  console.log("navigateTo", navigateTo)

  useEffect(() => {
    backgroundAnimation.set({ opacity: 0 })
    backgroundAnimation.start({ opacity: 1 })
    schedaAnimation.set({ opacity: 0, y: 0, x: "-50%" })
    schedaAnimation.start({ opacity: 1, y: "-50%", x: "-50%" })
  }, [])

  return (
    <>
      <motion.div
        className="backgroundModale"
        animate={backgroundAnimation}
        onClick={() => animateAndExit()}
      ></motion.div>

      <motion.div className="wrapperModaleProdotto" animate={schedaAnimation}>
        <header>
          <h2 className="nomeProdotto"> Dati Prodotto</h2>
        </header>
        <TagsInput value={tag} onChange={() => setTag(tag)} />
      </motion.div>
    </>
  )
}

export default ModaleAttributi
