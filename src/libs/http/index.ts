'use strict';

import {PathsMapping} from '@BASELIB/js_paths_mapping';
import {AppConfigs} from '@LIBS/configs';

const HTTP_KEY: string = "http";

export async function init(port: number): Promise<any>{
  let config = AppConfigs.getConfig(HTTP_KEY);

  if( config && config["name"] ){
    let httpName = config["name"];
    let httpConfig: any = config[httpName];
    if( !httpConfig ){
      throw new Error( `ERROR: No configs for ${httpName} http server.` );
    }
    let HttpClass = PathsMapping.pmRequire(`@LIBS/http/${httpName}`);
    let httpServer = new HttpClass( httpConfig, port );
    return httpServer.init();
  } else{
    throw new Error("ERROR: No Http Server Configs found." );
  }
}
