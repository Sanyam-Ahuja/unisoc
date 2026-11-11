import test from 'node:test';
import assert from 'node:assert/strict';
import { createIncident, demoScenario, ingest, seed, updateIncident } from '../src/domain.ts';

test('event ingestion rejects duplicates and supports event-to-incident workflow',()=>{
  const state=structuredClone(seed);
  const event=ingest(state,{source:'test-agent',type:'authentication_failure',severity:'high',ip:'192.0.2.55',user:'demo',asset:'Test host',description:'Repeated sign-in failures',raw:{count:8}});
  assert.equal(state.events[0].id,event.id);
  assert.throws(()=>ingest(state,{source:'test-agent',type:'authentication_failure',severity:'high',ip:'192.0.2.55',user:'demo',asset:'Test host',description:'Repeated sign-in failures',raw:{count:8}}),{status:409});
  const incident=createIncident(state,event.id);
  assert.deepEqual(incident.event_ids,[event.id]);
  assert.equal(updateIncident(state,incident.id,{status:'investigating',note:'Reviewed source payload'}).notes.length,1);
});

test('demo scenario correlates synthetic events into an incident',()=>{
  const result=demoScenario(structuredClone(seed));
  assert.equal(result.synthetic,true);
  assert.equal(result.events.length,3);
  assert.equal(result.incident.event_ids.length,3);
});
