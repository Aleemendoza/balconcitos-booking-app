import { Button } from "@/components/ui/button";
import { Mountain, Home, Users, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/cerro-paleta-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] bg-gradient-serrano overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          {/* Badge de ubicación */}
          <div className="inline-flex items-center gap-2 bg-accent/80 text-accent-foreground px-4 py-2 rounded-full text-sm mb-6">
            <Mountain className="w-4 h-4" />
            <span>Quebrada de Humahuaca • Patrimonio de la Humanidad</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Despertá en el{" "}
            <span className="bg-gradient-paleta bg-clip-text text-transparent">
              Cerro Paleta del Pintor
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Alojate en nuestras cabañas y monoambientes con vista privilegiada al famoso cerro multicolor. 
            Una experiencia única en el corazón de Maimará, Jujuy.
          </p>

          {/* Características destacadas */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-secondary/60 text-secondary-foreground px-3 py-2 rounded-lg">
              <Home className="w-4 h-4" />
              <span className="text-sm">2 tipos de alojamiento</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/60 text-secondary-foreground px-3 py-2 rounded-lg">
              <Users className="w-4 h-4" />
              <span className="text-sm">Hasta 4 personas</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/60 text-secondary-foreground px-3 py-2 rounded-lg">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Wi-Fi y servicios completos</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="paleta" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => scrollToSection("disponibilidad")}
            >
              Ver Disponibilidad
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => scrollToSection("alojamientos")}
            >
              Conocer Alojamientos
            </Button>
          </div>
        </div>
      </div>

      {/* Decoración flotante */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
        <div className="w-px h-16 bg-border"></div>
        <span className="text-sm rotate-90 whitespace-nowrap">Scroll para descubrir</span>
      </div>
    </section>
  );
};

export default Hero;