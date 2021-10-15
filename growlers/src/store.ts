import { proxy } from "valtio";
import Cart from "./components/Cart";
import { Beverage } from "./types";

export interface CartItem extends Beverage {
  quantity: number;
}
export interface TapStore {
  taps: Beverage[];
  filteredTaps: Beverage[];
  cart: CartItem[];
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

const getItemIndexFromCart = (beverage: Beverage): number => {
  return store.cart.findIndex(
    (item) =>
      item.abv === beverage.abv &&
      item.beverageName === beverage.beverageName &&
      item.producerName === item.producerName
  );
};

export const addToCart = (beverage: Beverage): void => {
  const index = getItemIndexFromCart(beverage);

  if (index < 0) {
    const newV: CartItem = { ...beverage, quantity: 1 };
    store.cart.push(newV);
    return;
  }
  store.cart[index].quantity += 1;
};

export default store;
