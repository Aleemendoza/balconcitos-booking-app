import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarioDisponibilidad from "@/components/CalendarioDisponibilidad";
import FormularioReserva from "@/components/FormularioReserva";
import { TipoAlojamiento } from "@/types";

const Reservar = () => {
  const [searchParams] = useSearchParams();
  const [paso, setPaso] = useState<"fechas" | "formulario">("fechas");
  const [fechaEntrada, setFechaEntrada] = useState<Date | undefined>();
  const [fechaSalida, setFechaSalida] = useState<Date | undefined>();
  const [tipoAlojamiento, setTipoAlojamiento] = useState<TipoAlojamiento>(
    (searchParams.get("tipo") as TipoAlojamiento) || "cabana"
  );

  const handleFechasSeleccionadas = (entrada: Date, salida: Date, tipo: TipoAlojamiento) => {
    setFechaEntrada(entrada);
    setFechaSalida(salida);
    setTipoAlojamiento(tipo);
    setPaso("formulario");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {paso === "fechas" ? (
        <CalendarioDisponibilidad />
      ) : (
        <FormularioReserva
          fechaEntrada={fechaEntrada}
          fechaSalida={fechaSalida}
          tipoAlojamiento={tipoAlojamiento}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Reservar;