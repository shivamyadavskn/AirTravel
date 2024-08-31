import Searched from "@/components/searched/search";
import { Suspense } from "react";

export default function Search() {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <Searched />
    </Suspense>
  );
}
