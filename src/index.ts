'use strict';

import {PathsMapping} from './js_paths_mapping';

let AppConfigs;
const DEFAULT_PORT = 3000;

export async function init(app_lib_path: string, ms_path: string, appName: string, serviceName: string): Promise<any>{

  let result;

  // init paths mapping.
  PathsMapping.init(__dirname, app_lib_path, ms_path );

  // init configs
  let configs = _initConfig(appName);

  // init database
  result = await _handleInitPromise( _initDB() );

  // init http server
  result = await _handleInitPromise( _initHttpServer(serviceName) );


  console.log( "baselib init complete1: " + JSON.stringify( configs ) );
  return result;
}

function _initConfig(appName: string): any{
  AppConfigs = PathsMapping.pmRequire('@LIBS/configs').AppConfigs
  AppConfigs.init(appName);

  return AppConfigs.getConfig();
}

async function _handleInitPromise(promise: Promise<any>): Promise<any>{
  return promise.then(value => {
    console.log( value );
  }).catch( err => {
    console.log( err );
    process.exit(1);
  })
}

async function _initDB(): Promise<any>{
  let dB = PathsMapping.pmRequire('@LIBS/db');
  return await dB.init();
}

async function _initHttpServer(serviceName: string): Promise<any>{
  let port = AppConfigs.getConfig("services", serviceName, "port") || DEFAULT_PORT;
  let httpServer = PathsMapping.pmRequire('@LIBS/http');
  return await httpServer.init(port);
}


// (() => {
//   init("abon", "zzz","xxx").then(value => {console.log(value);} ).catch( err => { console.log("errorz: " + err); });
// })();
