import { Header } from "../components/landing/Header";
import { Features } from "../components/landing/Features";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#080a0c]">
      <Header />
      <section id="features" className="scroll-mt-20">
        <Features />
      </section>
    </div>
  );
};
