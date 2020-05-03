import { useEffect } from "react";

export default function (callback: any) {
  useEffect(callback, []);  
}
