import type { attributi } from "./attributi"
export type varianti = {
    id: string;
    attributi: [string];
    prezzo: string;
}
export type typeProdotto = {
    id: string;
    nome: string;
    prezzo: string;
    description: string;
    quantita: string;
    immagini: [];
    attributi?: attributi;
    varianti?: [varianti]
}
export type TypeImageObject = {
    id: string;
    url: string;
};