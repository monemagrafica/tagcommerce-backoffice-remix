import type { attributi } from "./attributi"

export type prodotto = {
    id: string,
    nome: string,
    prezzo: string,
    description: string,
    image: string
    attributi?: attributi

}
