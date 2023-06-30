type Geo = {
    "lat": string
    "lng": string
}
type Adress = {
    "street": string
    "suite": string
    "city": string
    "zipcode": string
    "geo": Geo
}
type Company = {
    "name": string
    "catchPhrase": string
    "bs": string
}

export interface IUser {
    "id": number,
    "name": string|undefined,
    "username": string,
    "email": string,
    "address": Adress
    "phone": string
    "website": string
    "company":Company
}


