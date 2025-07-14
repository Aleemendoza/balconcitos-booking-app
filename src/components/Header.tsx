import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-background border-b shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo y título */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-paleta flex items-center justify-center">
              <span className="text-2xl">🏔️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Balconcitos de Colores</h1>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Maimará, Jujuy</span>
              </div>
            </div>
          </div>

          {/* Navegación y contacto */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Navegación */}
            {location.pathname === "/" && (
              <nav className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => scrollToSection("alojamientos")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Alojamientos
                </button>
                <button
                  onClick={() => scrollToSection("disponibilidad")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disponibilidad
                </button>
              </nav>
            )}

            {/* Contacto */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="tel:+543884123456" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(388) 412-3456</span>
              </a>
              <a href="mailto:reservas@balconcitosdecolores.com" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Reservas</span>
              </a>
            </div>
            
            <Button 
              variant="paleta" 
              size="sm"
              onClick={() => navigate("/reservar")}
            >
              Reservar Ahora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;