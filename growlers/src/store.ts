import { proxy } from "valtio";
import { Beverage } from "./types";

export interface TapStore {
  taps: Beverage[];
  filteredTaps: Beverage[];
  cart: Beverage[];
  searchText: string;
  alcoholLimit: number;
}

const store = proxy<TapStore>({
  taps: [],
  filteredTaps: [],
  cart: [],
  searchText: "",
  alcoholLimit: 10,
});

const filter = () => {
  const searchRE = new RegExp(store.searchText, "i");
  return store.taps
    .filter(
      (tap) => tap.beverageName.match(searchRE) && tap.abv < store.alcoholLimit
    )
    .slice(0, 15);
};

export const load = (client: string): void => {
  fetch(`http://localhost:8080/${client}.json`)
    .then((res) => res.json())
    .then((taps: Beverage[]) => {
      store.taps = taps;
      store.filteredTaps = filter();
    });
};

export const setSearchText = (text: string): void => {
  store.searchText = text;
  store.filteredTaps = filter();
};

export const setAlcoholLimit = (limit: number): void => {
  store.alcoholLimit = limit;
  store.filteredTaps = filter();
};

export const addToCart = (beverage: Beverage): void => {
  store.cart.push(beverage);
};

export default store;
