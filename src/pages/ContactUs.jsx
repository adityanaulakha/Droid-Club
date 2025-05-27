import ContactForm from "../components/Home/ContactForm";

export default function ContactUs() {
  return (
    <div className="py-20" >
      <h1 className="text-6xl text-center font-extrabold pt-5">
          <span className="text-[#9d4edd] underline">Let's Talk</span>
      </h1>
      <ContactForm />
    </div>
  );
}
