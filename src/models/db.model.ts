/**
 * Интерфейс объекта для работы с базами данных приложения
 * @property set - Асинхронная функция для добавления/изменения параметров в хранилище
 * @property getAll - Асинхронная функция для получения всех данных из хранилища
 * @interface
 */
export interface DBModel<T> {
  set: (fields: Record<string, any>) => void;
  getAll: () => Promise<T>;
}
