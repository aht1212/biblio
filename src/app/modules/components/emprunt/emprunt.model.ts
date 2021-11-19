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
  date_echeance : string
  remarque_livre : string
  rendu : boolean
  date_retour: string


  }

// export class Auteur {


//   }
