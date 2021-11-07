export interface LivreModel{

  id : number
  titre : string
  isbn : number
  langue : string
  annee : string
  date_parution : string
  img_couverture : string
  auteur : [{
    id :  number
    nom: string
    discipline: string
    nationalite: string,
  }]

  }

// export class Auteur {


//   }
