import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  Users, 
  Calendar,
  MessageSquare,
  CheckCircle,
  Send
} from "lucide-react";

interface FormularioReservaProps {
  fechaEntrada?: Date;
  fechaSalida?: Date;
  tipoAlojamiento?: "cabana" | "monoambiente";
}

interface DatosReserva {
  nombre: string;
  email: string;
  telefono: string;
  cantidadPersonas: number;
  comentarios: string;
}

const FormularioReserva = ({ 
  fechaEntrada, 
  fechaSalida, 
  tipoAlojamiento = "cabana" 
}: FormularioReservaProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  
  const [datos, setDatos] = useState<DatosReserva>({
    nombre: "",
    email: "",
    telefono: "",
    cantidadPersonas: 2,
    comentarios: ""
  });

  const handleInputChange = (field: keyof DatosReserva, value: string | number) => {
    setDatos(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulamos el envío de la reserva
      // En producción, aquí se haría la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const reserva = {
        ...datos,
        fecha_entrada: fechaEntrada?.toISOString(),
        fecha_salida: fechaSalida?.toISOString(),
        tipo_alojamiento: tipoAlojamiento,
        estado: "pendiente",
        fecha_solicitud: new Date().toISOString()
      };

      console.log("Reserva enviada:", reserva);
      
      setEnviado(true);
      toast({
        title: "¡Pre-reserva enviada!",
        description: "Te contactaremos pronto para confirmar tu reserva.",
      });

    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Por favor intentá nuevamente o contactanos por WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha?: Date) => {
    if (!fecha) return "No seleccionada";
    return fecha.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const calcularNoches = () => {
    if (fechaEntrada && fechaSalida) {
      const diff = fechaSalida.getTime() - fechaEntrada.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  if (enviado) {
    return (
      <section className="py-20 bg-gradient-serrano">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-gradient-paleta rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">
                ¡Gracias por tu pre-reserva!
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                Recibimos tu solicitud para <strong>{tipoAlojamiento === "cabana" ? "la Cabaña" : "el Monoambiente"}</strong>.
                Te contactaremos por WhatsApp o email dentro de las próximas 24 horas para confirmar disponibilidad y coordinar el pago.
              </p>

              <div className="bg-accent/50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-foreground mb-2">Resumen de tu solicitud:</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Check-in:</strong> {formatearFecha(fechaEntrada)}</p>
                  <p><strong>Check-out:</strong> {formatearFecha(fechaSalida)}</p>
                  <p><strong>Noches:</strong> {calcularNoches()}</p>
                  <p><strong>Personas:</strong> {datos.cantidadPersonas}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="paleta" size="lg">
                  Contactar por WhatsApp
                </Button>
                <br />
                <Button variant="outline" onClick={() => setEnviado(false)}>
                  Hacer otra consulta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-serrano">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Send className="w-4 h-4 mr-2" />
              Pre-reserva
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Completá tus datos
            </h2>
            <p className="text-lg text-muted-foreground">
              Te contactaremos para confirmar disponibilidad y coordinar el pago
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Resumen de la reserva */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de tu estadía</CardTitle>
                <CardDescription>
                  Verificá que todos los datos sean correctos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Fechas</p>
                      <p className="text-sm text-muted-foreground">
                        {formatearFecha(fechaEntrada)} - {formatearFecha(fechaSalida)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {calcularNoches()} {calcularNoches() === 1 ? "noche" : "noches"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {tipoAlojamiento === "cabana" ? "🏡" : "🏠"}
                    </div>
                    <div>
                      <p className="font-medium">
                        {tipoAlojamiento === "cabana" ? "Cabaña" : "Monoambiente"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tipoAlojamiento === "cabana" ? "75 m² con terraza" : "52 m² planta baja"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Esta es una <strong>pre-reserva sin costo</strong>. El pago se coordina después de confirmar disponibilidad.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Sin compromiso de pago
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Formulario */}
            <Card>
              <CardHeader>
                <CardTitle>Tus datos de contacto</CardTitle>
                <CardDescription>
                  Necesitamos esta información para contactarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nombre completo
                    </Label>
                    <Input
                      id="nombre"
                      type="text"
                      value={datos.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Tu nombre y apellido"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={datos.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Teléfono / WhatsApp
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={datos.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+54 9 388 123-4567"
                      required
                    />
                  </div>

                  {/* Cantidad de personas */}
                  <div className="space-y-2">
                    <Label htmlFor="personas" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Cantidad de personas
                    </Label>
                    <Input
                      id="personas"
                      type="number"
                      min="1"
                      max={tipoAlojamiento === "cabana" ? 4 : 3}
                      value={datos.cantidadPersonas}
                      onChange={(e) => handleInputChange("cantidadPersonas", parseInt(e.target.value))}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo {tipoAlojamiento === "cabana" ? "4" : "3"} personas
                    </p>
                  </div>

                  {/* Comentarios */}
                  <div className="space-y-2">
                    <Label htmlFor="comentarios" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Comentarios (opcional)
                    </Label>
                    <Textarea
                      id="comentarios"
                      value={datos.comentarios}
                      onChange={(e) => handleInputChange("comentarios", e.target.value)}
                      placeholder="Contanos si tenés alguna consulta especial o requerimiento..."
                      rows={3}
                    />
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    variant={tipoAlojamiento === "cabana" ? "paleta" : "atardecer"}
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar Pre-reserva"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormularioReserva;