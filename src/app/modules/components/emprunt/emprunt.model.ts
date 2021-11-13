export interface EmpruntModel{

  id : number
  nomlivre : string
  emprunteur : [{
    id :  number
    nom: string
    telephone : number
    date_naissance: string
    genre : string
    adresse: string
  }]
  date_emprunt : string
  date_retour : string
  remarque_livre : string

  }

// export class Auteur {


//   }
