import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  Bed, 
  Car, 
  Wifi, 
  Coffee, 
  Flame,
  PawPrint,
  Mountain,
  Utensils
} from "lucide-react";

const TiposAlojamiento = () => {
  const navigate = useNavigate();

  const alojamientos = [
    {
      id: "cabana",
      nombre: "Cabaña",
      metros: "75 m²",
      descripcion: "Cabaña completa con terraza y vista panorámica al Cerro Paleta del Pintor",
      capacidad: "2-4 personas",
      precio: "Desde $25.000/noche",
      imagen: "🏡",
      caracteristicas: [
        { icon: Bed, texto: "2 dormitorios" },
        { icon: Home, texto: "Terraza privada" },
        { icon: Car, texto: "Estacionamiento" },
        { icon: Utensils, texto: "Cocina completa" },
      ],
      servicios: ["Wi-Fi", "Parrilla", "Pet Friendly", "Vista al cerro"],
      gradient: "bg-gradient-paleta"
    },
    {
      id: "monoambiente",
      nombre: "Monoambiente", 
      metros: "52 m²",
      descripcion: "Monoambiente moderno en planta baja con todas las comodidades",
      capacidad: "2-3 personas",
      precio: "Desde $18.000/noche",
      imagen: "🏠",
      caracteristicas: [
        { icon: Bed, texto: "1 ambiente" },
        { icon: Home, texto: "Planta baja" },
        { icon: Car, texto: "Estacionamiento" },
        { icon: Coffee, texto: "Kitchenette" },
      ],
      servicios: ["Wi-Fi", "Parrilla", "Pet Friendly", "Jardín"],
      gradient: "bg-gradient-atardecer"
    }
  ];

  const iconosServicios = {
    "Wi-Fi": Wifi,
    "Parrilla": Flame,
    "Pet Friendly": PawPrint,
    "Vista al cerro": Mountain,
    "Jardín": Mountain
  };

  const handleReservar = (tipoAlojamiento: string) => {
    navigate(`/reservar?tipo=${tipoAlojamiento}`);
  };

  return (
    <section id="alojamientos" className="py-20 bg-gradient-serrano">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nuestros Alojamientos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Elegí tu refugio perfecto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dos opciones pensadas para tu comodidad, ambas con la mejor vista de Maimará
          </p>
        </div>

        {/* Cards de alojamientos */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {alojamientos.map((alojamiento) => (
            <Card key={alojamiento.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 group">
              <CardHeader className="relative">
                <div className={`absolute top-4 right-4 w-16 h-16 ${alojamiento.gradient} rounded-full flex items-center justify-center text-3xl shadow-warm`}>
                  {alojamiento.imagen}
                </div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  {alojamiento.nombre}
                  <Badge variant="outline">{alojamiento.metros}</Badge>
                </CardTitle>
                <CardDescription className="text-base">
                  {alojamiento.descripcion}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Características principales */}
                <div className="grid grid-cols-2 gap-3">
                  {alojamiento.caracteristicas.map((carac, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <carac.icon className="w-4 h-4 text-primary" />
                      <span>{carac.texto}</span>
                    </div>
                  ))}
                </div>

                {/* Servicios incluidos */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Servicios incluidos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {alojamiento.servicios.map((servicio) => {
                      const IconoServicio = iconosServicios[servicio as keyof typeof iconosServicios];
                      return (
                        <Badge key={servicio} variant="secondary" className="flex items-center gap-1">
                          {IconoServicio && <IconoServicio className="w-3 h-3" />}
                          {servicio}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Capacidad y precio */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{alojamiento.capacidad}</span>
                    </div>
                    <div className="text-lg font-semibold text-primary mt-1">
                      {alojamiento.precio}
                    </div>
                  </div>
                  <Button 
                    variant={alojamiento.id === 'cabana' ? 'paleta' : 'atardecer'}
                    onClick={() => handleReservar(alojamiento.id)}
                  >
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA adicional */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitás ayuda para elegir? Contactanos por WhatsApp
          </p>
          <Button variant="outline" size="lg">
            Consultar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TiposAlojamiento;