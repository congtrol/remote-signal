import { Remocon } from 'remocon'

const remocon = new Remocon('ws://localhost:3002')

remocon.sub("#screen",(e,data)=>{
  console.log( e, data )
})