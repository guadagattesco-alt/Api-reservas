import { Request, Response, NextFunction } from "express";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Se ejecuta si ninguna ruta respondió
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.url}` });
}

// Tiene 4 parámetros: así Express sabe que es de errores
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Errores que lanzamos nosotros a propósito
  if (err instanceof HttpError) {
    return res.status(err.status).json({ mensaje: err.message });
  }
  // JSON mal formado en el body (lo detecta express.json)
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ mensaje: "El JSON enviado no es válido" });
  }
  // Cualquier otro error es inesperado
  console.error(err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
}