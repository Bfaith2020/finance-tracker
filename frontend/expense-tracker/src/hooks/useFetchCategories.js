import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { setCategories } from "../store/categorySlice";

const useFetchCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(API_PATHS.CATEGORIES.GET);
      dispatch(setCategories(res.data));
    })();
  }, [dispatch]);
};

export default useFetchCategories;
