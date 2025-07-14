import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface Reserva {
  id: string;
  fecha_entrada: string;
  fecha_salida: string;
  tipo_alojamiento: "cabana" | "monoambiente";
  estado: "confirmada" | "pendiente";
}

const CalendarioDisponibilidad = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [reservasExistentes, setReservasExistentes] = useState<Reserva[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<"cabana" | "monoambiente">("cabana");

  // Simulamos reservas existentes (en producción vendría de la API)
  useEffect(() => {
    const reservasDemo: Reserva[] = [
      {
        id: "1",
        fecha_entrada: "2024-07-20",
        fecha_salida: "2024-07-23",
        tipo_alojamiento: "cabana",
        estado: "confirmada"
      },
      {
        id: "2",
        fecha_entrada: "2024-07-25",
        fecha_salida: "2024-07-28",
        tipo_alojamiento: "monoambiente",
        estado: "confirmada"
      },
      {
        id: "3",
        fecha_entrada: "2024-08-01",
        fecha_salida: "2024-08-05",
        tipo_alojamiento: "cabana",
        estado: "pendiente"
      }
    ];
    setReservasExistentes(reservasDemo);
  }, []);

  // Calcular días ocupados según el tipo de alojamiento seleccionado
  const diasOcupados = reservasExistentes
    .filter(reserva => reserva.tipo_alojamiento === tipoSeleccionado)
    .flatMap(reserva => {
      const fechas: Date[] = [];
      let actual = new Date(reserva.fecha_entrada);
      const salida = new Date(reserva.fecha_salida);
      
      while (actual <= salida) {
        fechas.push(new Date(actual));
        actual.setDate(actual.getDate() + 1);
      }
      return fechas;
    });

  const handleRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
  };

  const formatearFecha = (fecha: Date) => {
    return format(fecha, "d 'de' MMMM", { locale: es });
  };

  const calcularNoches = () => {
    if (selectedRange?.from && selectedRange?.to) {
      const diff = selectedRange.to.getTime() - selectedRange.from.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  return (
    <section id="disponibilidad" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Disponibilidad
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Consultá fechas disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seleccioná las fechas de tu estadía y el tipo de alojamiento
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Selector de tipo de alojamiento y calendario */}
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar fechas</CardTitle>
                <CardDescription>
                  Elegí primero el tipo de alojamiento y luego las fechas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selector de tipo */}
                <div className="flex gap-2">
                  <Button
                    variant={tipoSeleccionado === "cabana" ? "paleta" : "outline"}
                    onClick={() => setTipoSeleccionado("cabana")}
                    className="flex-1"
                  >
                    🏡 Cabaña
                  </Button>
                  <Button
                    variant={tipoSeleccionado === "monoambiente" ? "atardecer" : "outline"}
                    onClick={() => setTipoSeleccionado("monoambiente")}
                    className="flex-1"
                  >
                    🏠 Monoambiente
                  </Button>
                </div>

                {/* Calendario */}
                <div className="flex justify-center">
                  <DayPicker
                    mode="range"
                    selected={selectedRange}
                    onSelect={handleRangeSelect}
                    disabled={[
                      { before: new Date() }, // Deshabilitar fechas pasadas
                      ...diasOcupados // Deshabilitar días ocupados
                    ]}
                    locale={es}
                    numberOfMonths={1}
                    className="pointer-events-auto"
                    modifiersStyles={{
                      disabled: { color: '#ef4444', textDecoration: 'line-through' }
                    }}
                  />
                </div>

                {/* Leyenda */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-muted-foreground">No disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen de selección */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de reserva</CardTitle>
                <CardDescription>
                  Verificá los detalles antes de continuar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedRange?.from && selectedRange?.to ? (
                  <>
                    {/* Fechas seleccionadas */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Fechas confirmadas</span>
                      </div>
                      
                      <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-in:</span>
                          <span className="font-medium">{formatearFecha(selectedRange.from)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-out:</span>
                          <span className="font-medium">{formatearFecha(selectedRange.to)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-muted-foreground">Noches:</span>
                          <span className="font-medium">{calcularNoches()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tipo de alojamiento */}
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Alojamiento seleccionado:</span>
                      <Badge variant={tipoSeleccionado === "cabana" ? "default" : "secondary"} className="text-base">
                        {tipoSeleccionado === "cabana" ? "🏡 Cabaña (75 m²)" : "🏠 Monoambiente (52 m²)"}
                      </Badge>
                    </div>

                    {/* Botón de reserva */}
                    <Button 
                      variant={tipoSeleccionado === "cabana" ? "paleta" : "atardecer"}
                      size="lg" 
                      className="w-full"
                    >
                      Continuar con la Reserva
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">
                      Seleccioná tus fechas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Elegí las fechas de entrada y salida en el calendario para ver el resumen
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarioDisponibilidad;