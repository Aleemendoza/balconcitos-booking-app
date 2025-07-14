import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Info del alojamiento */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-2xl">🏔️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Balconcitos de Colores</h3>
                <p className="text-primary-foreground/80 text-sm">Maimará, Jujuy</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Alojamiento turístico con vista privilegiada al Cerro Paleta del Pintor. 
              Una experiencia única en el corazón de la Quebrada de Humahuaca.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=Maimará,Jujuy" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Maimará, Jujuy, Argentina</span>
              </a>
              
              <a 
                href="tel:+543884123456" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">(388) 412-3456</span>
              </a>
              
              <a 
                href="mailto:reservas@balconcitosdecolores.com" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">reservas@balconcitosdecolores.com</span>
              </a>
            </div>
          </div>

          {/* Redes y reservas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Seguinos</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </Button>
                <Button variant="secondary" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </Button>
              </div>
              
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="text-primary-foreground/80 text-sm mb-3">
                  ¿Listo para tu escapada a Jujuy?
                </p>
                <Button variant="atardecer" size="sm" className="w-full">
                  Hacer Reserva
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Balconcitos de Colores. Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/60 text-xs mt-1">
            Quebrada de Humahuaca • Patrimonio de la Humanidad UNESCO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;