/** Admin panel + uygulama istemcileri için ortak görüş/öneri durumları */
export const FEEDBACK_STATUSES = {
  new: {
    adminLabel: 'Yeni',
    publicLabel: 'Alındı',
    publicMessage: 'Görüşünüz bize ulaştı. En kısa sürede incelenecek.',
  },
  read: {
    adminLabel: 'Okundu',
    publicLabel: 'İnceleniyor',
    publicMessage: 'Ekibimiz görüşünüzü inceliyor.',
  },
  in_progress: {
    adminLabel: 'Yapım aşamasında',
    publicLabel: 'Yapım aşamasında',
    publicMessage: 'Öneriniz geliştirme sürecine alındı. Üzerinde çalışıyoruz.',
  },
  replied: {
    adminLabel: 'Yanıtlandı',
    publicLabel: 'Yanıtlandı',
    publicMessage: 'Görüşünüze yanıt verildi.',
  },
  closed: {
    adminLabel: 'Kapandı',
    publicLabel: 'Tamamlandı',
    publicMessage: 'Bu görüş kapatıldı.',
  },
};

export const FEEDBACK_STATUS_LABELS = Object.fromEntries(
  Object.entries(FEEDBACK_STATUSES).map(([key, value]) => [key, value.adminLabel])
);

export function getFeedbackPublicStatus(status) {
  const key = status || 'new';
  return FEEDBACK_STATUSES[key] ?? FEEDBACK_STATUSES.new;
}
