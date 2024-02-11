import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchProducts } from "./features/productSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;

// const useFetchProducts = () => {
//   const dispatch = useAppDispatch();
//   const productStatus = useAppSelector((state) => state.products.status);

//   useEffect(() => {
//     if (productStatus === "idle") {
//       dispatch(fetchProducts());
//     }
//   }, [productStatus, dispatch]);
// };

// export default useFetchProducts;
