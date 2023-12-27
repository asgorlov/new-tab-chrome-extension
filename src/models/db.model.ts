import { NewTabStateBase } from "./new-tab-state.model";

/**
 * Интерфейс объекта для работы с хранилищем приложения
 * @property set - Асинхронная функция для добавления/изменения параметров в хранилище
 * @property getAll - Асинхронная функция для получения всех данных из хранилища
 * @interface
 */
export interface DBModel {
  set: (fields: Record<string, any>) => void;
  getAll: () => Promise<NewTabStateBase>;
}

/**
 * Интерфейс элемента хранилища
 * @interface
 */
export interface DBItem {
  key: string;
  value: any;
}
