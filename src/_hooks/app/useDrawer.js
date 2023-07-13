import { setDrawer } from "src/@core/redux/reducers/app/appSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const useDrawer = () => {
  const drawerRef = useRef();
  const dispatch = useDispatch();

  // init modal
  useEffect(() => {
    dispatch(setDrawer(drawerRef.current));
  }, [dispatch]);

  return drawerRef;
};

export default useDrawer;
