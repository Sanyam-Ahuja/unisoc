import { Pool, type PoolClient } from 'pg';
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
export interface StateStore { get<T>(key:string):Promise<T>; mutate<T,R>(key:string,change:(state:T)=>R):Promise<R>; }
export class MemoryStateStore implements StateStore {
 private state=new Map<string,Json>();
 constructor(initial:Record<string,unknown>){Object.entries(initial).forEach(([k,v])=>this.state.set(k,structuredClone(v) as Json));}
 async get<T>(key:string):Promise<T>{return structuredClone(this.state.get(key) as T);}
 async mutate<T,R>(key:string,change:(state:T)=>R):Promise<R>{const current=structuredClone(this.state.get(key) as T);const result=change(current);this.state.set(key,current as Json);return result;}
}
export class PgStateStore implements StateStore {
 private pool:Pool;
 constructor(connectionString:string){this.pool=new Pool({connectionString,max:8,idleTimeoutMillis:30000,connectionTimeoutMillis:8000,ssl:process.env.PGSSL==='true'?{rejectUnauthorized:false}:undefined});}
 async bootstrap(initial:Record<string,unknown>){await this.pool.query('CREATE TABLE IF NOT EXISTS app_state (key text PRIMARY KEY,payload jsonb NOT NULL,updated_at timestamptz NOT NULL DEFAULT now())');for(const [key,payload] of Object.entries(initial))await this.pool.query('INSERT INTO app_state(key,payload) VALUES($1,$2::jsonb) ON CONFLICT(key) DO NOTHING',[key,JSON.stringify(payload)]);}
 async get<T>(key:string):Promise<T>{const{rows}=await this.pool.query('SELECT payload FROM app_state WHERE key=$1',[key]);if(!rows[0])throw new Error(`State key ${key} is missing`);return rows[0].payload as T;}
 async mutate<T,R>(key:string,change:(state:T)=>R):Promise<R>{const client:PoolClient=await this.pool.connect();try{await client.query('BEGIN');const{rows}=await client.query('SELECT payload FROM app_state WHERE key=$1 FOR UPDATE',[key]);if(!rows[0])throw new Error(`State key ${key} is missing`);const current=rows[0].payload as T;const result=change(current);await client.query('UPDATE app_state SET payload=$2::jsonb,updated_at=now() WHERE key=$1',[key,JSON.stringify(current)]);await client.query('COMMIT');return result;}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}}
 async close(){await this.pool.end();}
}
