export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface IAraclar {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export interface AracData {
  plaka: string;
  aracTipi: object | null;
  guncelKm: string;
  marka: object | null;
  model: object | null;
  modelYili: string;
  aracGrubu: object | null;
  aracCinsi: object | null;
  renk: object | null;
  lokasyon: object | null;
  mulkiyet: string;
  departman: object | null;
  surucu: object | null;
  yakitTipi: object | null;
}

export interface IBakim {
  id: string;
}

