import type { Metadata } from "next";
import { site } from "@/data/site";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How the ${site.name} website handles your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 pb-32 pt-28 md:pt-36">
      <h1 className="display text-[3.25rem] md:text-[5rem]">Privacy policy</h1>
      <p className="mt-6 text-roast">
        <Placeholder>[DRAFT: to be reviewed and approved by the café before launch]</Placeholder>
      </p>
      <div className="mt-8 space-y-6 text-lg">
        <section>
          <h2 className="text-2xl md:text-3xl">Your list stays on your device</h2>
          <p className="mt-2 text-roast">
            “My picks” is saved in your browser’s local storage so it survives a refresh. It is not sent to us, and you can remove it at any time with “Clear list”.
          </p>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl">No accounts or payments</h2>
          <p className="mt-2 text-roast">This website has no login and takes no payments, and it does not ask you for personal details.</p>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl">Google Maps</h2>
          <p className="mt-2 text-roast">
            The home page embeds a Google Maps view. When it loads, Google may receive information such as your IP address under its own privacy policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl">Contact</h2>
          <p className="mt-2 text-roast">
            Questions? Call <a href={`tel:${site.phoneInternational}`} className="underline underline-offset-4">{site.phone}</a> or visit us at {site.address.street}, {site.address.area}.
          </p>
        </section>
      </div>
    </main>
  );
}
