import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "اتصل بنا | عيادة د. خالد شرف",
  description: "تواصل معنا أو زورنا في 41 شارع الفلكي، القاهرة. هاتف: 01008080358",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
