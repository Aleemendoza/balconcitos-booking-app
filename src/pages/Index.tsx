import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TiposAlojamiento from "@/components/TiposAlojamiento";
import CalendarioDisponibilidad from "@/components/CalendarioDisponibilidad";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TiposAlojamiento />
      <CalendarioDisponibilidad />
      <Footer />
    </div>
  );
};

export default Index;
