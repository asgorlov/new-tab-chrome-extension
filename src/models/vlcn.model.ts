import { DB } from "@vlcn.io/crsqlite-wasm";
import { wdbRtc } from "@vlcn.io/sync-p2p";
import tblrx from "@vlcn.io/rx-tbl";

/**
 * Интерфейс контекста базы данных
 * @property db - База данных
 * @property siteid - id для синхронизации
 * @property rtc - Объект для работы с синхронизацией
 * @property rx - Объект реактивности данных после обновления таблицы
 * @interface
 */
export interface VlcnContextModel {
  db: DB;
  siteid: string;
  rtc: Awaited<ReturnType<typeof wdbRtc>>;
  rx: Awaited<ReturnType<typeof tblrx>>;
}

/**
 * Интерфейс хранилища базы данных
 * @interface
 */
export interface VlcnStorage {
  [key: string]: any;
}
