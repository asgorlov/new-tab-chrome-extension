import sqliteWasm from "@vlcn.io/crsqlite-wasm";
import tblrx from "@vlcn.io/rx-tbl";
import { wdbRtc } from "@vlcn.io/sync-p2p";
import { stringify as uuidStringify } from "uuid";
import { VlcnContextModel } from "../models/vlcn.model";
import { INIT_QUERY, TABLE_NAME } from "../constants/vlcn.constants";

const initVlcn = async (): Promise<VlcnContextModel> => {
  const sqlite = await sqliteWasm();
  const db = await sqlite.open("new-tab-wdb-p2p");

  await db.exec(INIT_QUERY);
  await db.exec(`SELECT crsql_as_crr('${TABLE_NAME}')`);

  const r = await db.execA("SELECT crsql_site_id()");
  const siteid = uuidStringify(r[0][0]);
  const rx = tblrx(db);
  const rtc = await wdbRtc(db);

  (window as any).db = db;
  window.onbeforeunload = () => db.close();

  return { db, siteid, rtc, rx };
};

const vlcn = await initVlcn();

export default vlcn;
