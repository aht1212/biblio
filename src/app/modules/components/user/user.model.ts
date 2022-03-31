export interface UserModel{
  id : number
  nom : string
  prenom : string
  login: [{
    email : string
    pass : string
  }]
  poste : string
  role : string
  statut : string
}
