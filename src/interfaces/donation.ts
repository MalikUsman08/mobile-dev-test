export interface Reference {
  type: {
    id: string;
    prefix: string;
  };
  number: number;
  text: string;
}

export interface Currency {
  id: string;
  symbol: string;
}

export interface Price {
  currency: Currency;
  amount: number;
  text: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface Theme {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  name: string;
}

export interface DonationItem {
  id: string;
  reference: Reference | null;
  name: string;
  location: Location | null;
  theme: Theme | null;
  price: Price | null;
  status: Status;
}

export interface NewPrice {
  currencyCode: string | null;
  amount: number | null;
}

export interface NewDonationItem {
  name: string;
  location: string | null;
  theme: string | null;
  price: NewPrice;
}
