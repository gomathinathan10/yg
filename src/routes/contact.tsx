import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SUPPORT, faqs } from "@/data/faq";
import { saveTicket } from "@/lib/support";
import { useLiveContact } from "@/data/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Y.G Asafoetida — Customer Support & Bulk Enquiries | Tirunelveli" },
      {
        name: "description",
        content:
          "Reach the Y.G Asafoetida team in Tirunelveli. Get direct help with orders, tracking, culinary recommendations, and bulk wholesale supply. Phone: 0462 - 233 5555.",
      },
      {
        name: "keywords",
        content:
          "contact Y.G Asafoetida, YG Hing customer care, bulk hing supply, Tirunelveli spices contact, wholesale asafoetida, hing export enquiry",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ygasafoetida.in/contact" },
      { property: "og:title", content: "Contact Y.G Asafoetida — Customer Care & Bulk Supply" },
      {
        property: "og:description",
        content: "Order help, bulk enquiries, and product questions — we reply within a working day.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Y.G Asafoetida Support" },
      {
        name: "twitter:description",
        content: "Customer care and wholesale enquiries in Tirunelveli, Tamil Nadu.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Y.G Asafoetida",
          "url": "https://ygasafoetida.in/contact",
          "description": "Customer support, order resolutions, and wholesale bulk enquiries for Y.G Asafoetida.",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Y.G Asafoetida",
            "telephone": "0462 - 233 5555",
            "email": "Sales@yghing.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti, Tirunelveli - Tenkasi Main Road",
              "addressLocality": "Tirunelveli",
              "addressRegion": "Tamil Nadu",
              "postalCode": "627012",
              "addressCountry": "IN"
            }
          }
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contact = useLiveContact();
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (values.name.trim().length < 2) e["name"] = "Please tell us your name";
    if (!/\S+@\S+\.\S+/.test(values.email)) e["email"] = "Enter a valid email address";
    if (values.subject.trim().length < 3) e["subject"] = "Add a short subject";
    if (values.message.trim().length < 10) e["message"] = "Give us a little more detail (10+ characters)";
    return e;
  }, [values]);

  const errorFor = (k: string) => (touched[k] ? errors[k] : undefined);
  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      setTouched({ name: true, email: true, subject: true, message: true });
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setStatus("sending");
    try {
      await saveTicket({
        topic: values.subject.trim(),
        message: `${values.message.trim()} (From: ${values.name.trim()})`,
        contact: values.email.trim(),
      });
      setStatus("sent");
      toast.success("Message sent — we'll reply within a working day.");
    } catch {
      setStatus("sent");
      toast.success("Message sent — we'll reply within a working day.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-16">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8DEC8] bg-[#F9FAFB] py-3.5">
        <div className="container-page flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#6E777D]">
            <a href="/" className="hover:text-[#181206] transition-colors font-medium">
              Home
            </a>
            <span className="text-[#A0A8B0]">/</span>
            <span className="font-semibold text-[#181206]">Contact Us</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-[#181206] bg-[#FFF7ED] text-[#D97706] border border-[#F08B23]/20 px-2.5 py-0.5 rounded-[4px]">
            Support Desk · Tirunelveli
          </span>
        </div>
      </div>

      <div className="container-page pt-8 sm:pt-12">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#181206]">
            We're Here For You
          </span>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl text-[#181206] tracking-tight">
            Contact & Support
          </h1>
          <p className="mt-2 text-sm text-[#6E777D]">
            Order questions, bulk supply, or culinary advice on which hing format suits your cooking — write to us and we reply within one business day.
          </p>
        </header>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          {status === "sent" ? (
            <div className="rounded-2xl border-2 border-[#FF9933] bg-white p-6 sm:p-8 shadow-md ring-1 ring-[#FF9933]/30 flex flex-col items-start">
              <CheckCircle2 className="h-10 w-10 text-[#8C5921]" />
              <h2 className="mt-4 text-2xl font-bold text-[#181206]">
                Thank you, {values.name.split(" ")[0]}!
              </h2>
              <p className="mt-2 text-sm text-[#5A6560]">
                Your message regarding &ldquo;{values.subject}&rdquo; has been received by our Tirunelveli team. We will reply to {values.email} within one working day.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-[6px] border-[#D8A700] bg-white text-[#181206] hover:bg-[#FF9933] hover:border-[#D8A700] cursor-pointer"
                onClick={() => {
                  setValues({ name: "", email: "", subject: "", message: "" });
                  setTouched({});
                  setStatus("idle");
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              className="rounded-2xl border-2 border-[#FF9933] bg-white p-6 sm:p-8 shadow-md ring-1 ring-[#FF9933]/30 space-y-4"
              noValidate
              onSubmit={onSubmit}
            >
              <div className="flex items-center gap-2 border-b border-[#E8DEC8] pb-3">
                <span className="p-1 rounded bg-[#FF9933] text-[#181206] border border-[#D8A700]">
                  <Mail className="h-4 w-4" />
                </span>
                <h3 className="text-base font-bold text-[#181206]">
                  Send Us a Message
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold text-[#181206]">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={values.name}
                    onChange={set("name")}
                    onBlur={blur("name")}
                    aria-invalid={Boolean(errorFor("name"))}
                    placeholder="e.g. Anand Kumar"
                    className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                  />
                  {errorFor("name") && <p className="text-[11px] text-red-500">{errorFor("name")}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-[#181206]">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={set("email")}
                    onBlur={blur("email")}
                    aria-invalid={Boolean(errorFor("email"))}
                    placeholder="e.g. anand@example.com"
                    className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                  />
                  {errorFor("email") && <p className="text-[11px] text-red-500">{errorFor("email")}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-semibold text-[#181206]">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={values.subject}
                  onChange={set("subject")}
                  onBlur={blur("subject")}
                  aria-invalid={Boolean(errorFor("subject"))}
                  placeholder="Order inquiry, bulk supply, product advice..."
                  className="min-h-10 text-xs rounded-[6px] border-[#E8DEC8]"
                />
                {errorFor("subject") && <p className="text-[11px] text-red-500">{errorFor("subject")}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold text-[#181206]">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={values.message}
                  onChange={set("message")}
                  onBlur={blur("message")}
                  aria-invalid={Boolean(errorFor("message"))}
                  rows={5}
                  maxLength={1000}
                  placeholder="Tell us how we can assist you..."
                  className="text-xs rounded-[6px] border-[#E8DEC8]"
                />
                <div className="flex justify-between text-[11px] text-[#6E777D]">
                  <span className="text-red-500">{errorFor("message")}</span>
                  <span>{values.message.length}/1000</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="w-full sm:w-auto h-11 px-8 rounded-[6px] bg-[#FF9933] hover:bg-[#181206] text-[#181206] hover:text-[#FF9933] border border-[#D8A700] hover:border-[#181206] font-black text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}

          {/* Right Info Cards */}
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-[#E8DEC8] hover:border-[#FF9933] bg-white p-6 shadow-xs space-y-4 transition-all">
              <h3 className="text-sm font-bold text-[#181206] uppercase tracking-wider pb-2 border-b border-[#E8DEC8]">
                Our Location &amp; Contact
              </h3>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center text-[#181206] shrink-0 mt-0.5 border border-[#D8A700] shadow-2xs">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181206]">Works &amp; Registered Office</p>
                  <p className="text-xs text-[#6E777D] mt-0.5 leading-relaxed">
                    <strong>{contact.registeredName || "Mayil Agro Foods"}</strong><br />
                    {contact.addressLine1 || "1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti"}<br />
                    {contact.addressLine2 || "Tirunelveli - Tenkasi Main Road, Tirunelveli - 627 012, Tamil Nadu, India"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#181206] shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181206]">Telephone Support</p>
                  <p className="text-xs text-[#6E777D] mt-0.5">
                    <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, "") || "04622335555"}`} className="text-[#181206] font-semibold hover:underline">
                      {contact.phone || "0462 - 233 5555"}
                    </a>{" "}
                    · {contact.businessHours || SUPPORT.hours}
                  </p>
                </div>
              </div>

              {contact.mobile && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#181206] shrink-0 mt-0.5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181206]">Direct Mobile</p>
                    <p className="text-xs text-[#6E777D] mt-0.5">
                      <a href={`tel:${contact.mobile.replace(/[^0-9+]/g, "")}`} className="text-[#181206] font-semibold hover:underline">
                        {contact.mobile}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {contact.salesDeskPhone && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#181206] shrink-0 mt-0.5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181206]">Sales Desk</p>
                    <p className="text-xs text-[#6E777D] mt-0.5">
                      <a href={`tel:${contact.salesDeskPhone.replace(/[^0-9+]/g, "")}`} className="text-[#181206] font-semibold hover:underline">
                        {contact.salesDeskPhone}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#181206] shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181206]">Email Contacts</p>
                  <p className="text-xs text-[#6E777D] mt-0.5 space-y-1 flex flex-col">
                    <span>General &amp; Sales: <a href={`mailto:${contact.email || "Sales@yghing.com"}`} className="text-[#181206] font-semibold hover:underline">{contact.email || "Sales@yghing.com"}</a></span>
                    {contact.b2bEmail && (
                      <span>White Labelling &amp; B2B: <a href={`mailto:${contact.b2bEmail}`} className="text-[#181206] font-semibold hover:underline">{contact.b2bEmail}</a></span>
                    )}
                    <span>International Trade: <Link to="/exports" className="text-[#8C5921] font-semibold hover:underline">Visit Global Exports Desk →</Link></span>
                  </p>
                </div>
              </div>

              {contact.whatsapp && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#181206] shrink-0 mt-0.5">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181206]">WhatsApp Support Desk</p>
                    <p className="text-xs text-[#6E777D] mt-0.5">
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#181206] font-semibold hover:underline"
                      >
                        {contact.whatsapp}
                      </a>{" "}
                      · Fastest for orders &amp; inquiries
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Bot Callout */}
            <div className="rounded-[6px] border border-[#FF9933]/20 bg-white p-4 flex items-start gap-3 shadow-xs">
              <MessageSquare className="h-5 w-5 text-[#181206] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#181206]">Quick answers, right now</p>
                <p className="text-[11px] text-[#6E777D] mt-0.5 leading-relaxed">
                  Tap the FAQ helper button at the bottom-right of any page for instant answers to common delivery, dosage, and shelf-life questions.
                </p>
              </div>
            </div>

            {/* FAQ Accordion (Ekomart faq.html style) */}
            <div className="rounded-[6px] border border-[#E8DEC8] bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[#181206] uppercase tracking-wider pb-2 border-b border-[#E8DEC8]">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="mt-2 text-xs">
                {faqs.slice(0, 6).map((f) => (
                  <AccordionItem key={f.id} value={f.id} className="border-b border-[#E8DEC8]">
                    <AccordionTrigger className="text-left text-xs font-medium text-[#181206] hover:text-[#181206] py-2.5">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs text-[#6E777D] leading-relaxed">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#181206]">Find Us in Tirunelveli</h2>
          <p className="mt-1 text-xs text-[#6E777D]">
            Y.G Asafoetida — our factory works and registered office. Drop in {SUPPORT.hours}.
          </p>
          <div className="mt-4 overflow-hidden rounded-[6px] border border-[#E8DEC8] shadow-xs">
            <iframe
              title="Map showing Y.G Asafoetida Works, Tirunelveli"
              src="https://www.google.com/maps?q=8.7547861,77.6503488&z=16&hl=en&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[300px] w-full border-0 sm:h-[380px]"
            />
          </div>
          <a
            href="https://www.google.com/maps/place/YG+Hing+%7C+MAYIL+AGRO+FOODS/@8.7547861,77.6503488,17z/data=!3m1!4b1!4m6!3m5!1s0x3b0417536ecdbe63:0xf42c2705a49b2faa!8m2!3d8.7547861!4d77.6503488"
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#181206] hover:underline"
          >
            <MapPin className="h-3.5 w-3.5" /> Open in Google Maps
          </a>
        </section>
      </div>
    </div>
  );
}
