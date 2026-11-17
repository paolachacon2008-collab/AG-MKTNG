/* =====================================================================
   HORARIO
   ---------------------------------------------------------------------
   Una línea por día. Cada día puede tener uno o varios turnos.
   Formato de hora: "HH:MM" (24 horas). Medianoche = "24:00".
   Día cerrado:  turnos: []
   El horario se usa en la web Y en los datos que lee Google,
   así que solo hay que cambiarlo aquí.
   ===================================================================== */

window.HORARIO = {
  pendienteConfirmar: true,   // pon false cuando el local confirme el horario
  dias: [
    { dia: "Lunes",     turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Martes",    turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Miércoles", turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Jueves",    turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Viernes",   turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Sábado",    turnos: [["12:00", "16:00"], ["20:00", "24:00"]] },
    { dia: "Domingo",   turnos: [["12:00", "16:00"], ["20:00", "24:00"]] }
  ]
};
