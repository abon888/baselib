'use strict';

import {PathsMapping} from '@BASELIB/js_paths_mapping';
import {AppConfigs} from '@LIBS/configs';

const DB_CONFIG_KEY: string = "db";

export async function init(): Promise<any>{

  let config = AppConfigs.getConfig(DB_CONFIG_KEY);
  if( config && config["name"] ){
    let dbname = config["name"];
    let dbConfig: any = config[dbname];
    if( !dbConfig ){
      throw new Error( `ERROR: No configs for ${dbname} database.`)
    }
    let DbClass = PathsMapping.pmRequire(`@LIBS/db/${dbname}`);
    let db = new DbClass( dbConfig );
    return db.init();
  } else{
    throw new Error( "ERROR: No Database configs found." );
  }
}
