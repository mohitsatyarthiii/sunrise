import { Suspense } from "react";
import EnquiryClient from "./EnquiryClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <EnquiryClient />
    </Suspense>
  );
}
