import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

/** Identificador fijo para poder cancelar/reprogramar el recordatorio diario. */
const DAILY_REMINDER_NOTIFICATION_ID = 42001;

const isValidTime = (time: string) => /^\d{2}:\d{2}$/.test(time);

/**
 * Solicita permiso de notificaciones al navegador o al dispositivo nativo.
 * Devuelve `true` únicamente si el permiso quedó concedido.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  try {
    if (Capacitor.isNativePlatform()) {
      const permission = await LocalNotifications.requestPermissions();
      return permission.display === "granted";
    }

    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") return true;
      if (Notification.permission === "denied") return false;
      return (await Notification.requestPermission()) === "granted";
    }
  } catch (error) {
    console.error("Error al solicitar permisos de notificación:", error);
  }

  return false;
}

/**
 * Sincroniza el recordatorio diario en Android/iOS.
 * En web no programa notificaciones locales (el plugin las dispara al instante),
 * pero mantiene el permiso y las preferencias guardadas.
 */
export async function syncDailyReminder(
  enabled: boolean,
  time: string,
): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await LocalNotifications.cancel({
      notifications: [{ id: DAILY_REMINDER_NOTIFICATION_ID }],
    });
  } catch (error) {
    // No hay nada programado todavía: es un caso normal.
    console.debug("No se pudo cancelar el recordatorio previo:", error);
  }

  if (!enabled || !isValidTime(time)) return;

  const [hour, minute] = time.split(":").map(Number);

  await LocalNotifications.schedule({
    notifications: [
      {
        id: DAILY_REMINDER_NOTIFICATION_ID,
        title: "DriveQuest",
        body: "¡Es hora de estudiar! Practica hoy para acercarte a tu licencia.",
        schedule: {
          on: { hour, minute },
          repeats: true,
          allowWhileIdle: true,
        },
      },
    ],
  });
}
