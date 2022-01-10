import { CollectionReference, DocumentData } from "firebase/firestore"

export type TImage = {
    name: string
    owner: string
    path: string
    size: number
    type: string
    url: string
    uid?: string
}

export type TAlbum = CollectionReference<DocumentData>