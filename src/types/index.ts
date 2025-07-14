export interface Reserva {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha_entrada: string;
  fecha_salida: string;
  tipo_alojamiento: "cabana" | "monoambiente";
  cantidad_personas: number;
  estado: "pendiente" | "confirmada" | "cancelada";
  comentarios?: string;
  fecha_solicitud: string;
  precio_total?: number;
}

export interface AlojamientoInfo {
  id: "cabana" | "monoambiente";
  nombre: string;
  metros: string;
  descripcion: string;
  capacidad_maxima: number;
  precio_base: number;
  servicios: string[];
  caracteristicas: {
    dormitorios?: number;
    banos: number;
    cocina: boolean;
    terraza: boolean;
    estacionamiento: boolean;
  };
}

export interface DisponibilidadFecha {
  fecha: string;
  disponible_cabana: boolean;
  disponible_monoambiente: boolean;
}

export type TipoAlojamiento = "cabana" | "monoambiente";
export type EstadoReserva = "pendiente" | "confirmada" | "cancelada";