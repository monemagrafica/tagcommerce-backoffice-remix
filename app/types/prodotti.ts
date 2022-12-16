import type { attributi } from "./attributi"
export type varianti = {
    id: string,
    attributi: [string]
    prezzo: string
}
export type prodotto = {
    id: string,
    nome: string,
    prezzo: string,
    description: string,
    image: string
    attributi?: attributi
    varianti?: [varianti]
}
