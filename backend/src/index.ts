import{createApp,initialState}from'./app.js';import{PgStateStore}from'./store.js';
const databaseUrl=process.env.DATABASE_URL||'postgres://campus:campus_local@127.0.0.1:5432/campus_app';const store=new PgStateStore(databaseUrl);await store.bootstrap(initialState());const port=Number(process.env.PORT||8000);const server=createApp(store).listen(port,'0.0.0.0',()=>console.log(`UniSOC API listening on ${port}`));
const shutdown=async()=>{server.close();await store.close();process.exit(0)};process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
