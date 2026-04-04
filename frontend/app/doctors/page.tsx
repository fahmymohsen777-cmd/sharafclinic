import type { Metadata } from "next";
import DoctorsPageClient from "./DoctorsPageClient";

export const metadata: Metadata = {
  title: "أطباؤنا | عيادة د. خالد شرف",
  description: "تعرف على فريقنا الطبي المتخصص في عيادة د. خالد شرف لطب الأسنان في القاهرة.",
};

export default function DoctorsPage() {
  return <DoctorsPageClient />;
}
