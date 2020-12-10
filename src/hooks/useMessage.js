import { useCallback } from "react";

export const useMessage = () => useCallback((text) => console.log(text), []);
