import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, AppState } from "types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
