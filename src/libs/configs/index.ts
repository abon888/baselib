'use strict';

import * as fs from 'fs';
import * as _ from 'lodash';

const CONFIG_BASE_PATH: string = "/etc/";
const CONFIG_FILENAME: string = "config.json";

export class AppConfigs{

  private static configs: any = undefined;

  static init( appName: string, overrideConfigs: any = {} ): void{
    let _configs = {};
    if( appName ){
      let cfgPath = `${CONFIG_BASE_PATH}${appName}/${CONFIG_FILENAME}`;
      if( fs.existsSync( cfgPath ) ){
        _configs = require( cfgPath );
      } else{
        throw new Error( "config file not found - file path: " + cfgPath );
      }
    }
    AppConfigs.configs = _.extend( {}, _configs, overrideConfigs );
  }

  static getConfig( ...keys: string[]): any{
    let configs = AppConfigs.configs;
    if( !configs ){
      console.log( "WARNING/ERROR: App Configs not initialized yet - must call init(appName) first; returning undefined." );
      return undefined;
    } else if( !keys || keys.length == 0 ){
      return configs;
    } else{
      keys.forEach( (key) => {
        configs = configs[ key ];
      } );
      return configs;
    }
  }
}

