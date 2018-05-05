'use strict';

/** 
 * This util will simplify imports/requires paths for baselib/app-baselib
 * libraries. This should be a superset of paths defined in tsconfig.json.
 * 
 * Please note that init() MUST be called prior to using jpmRequire()!
 */

export class PathsMapping{
  private static readonly CUSTOM_PATHS_PREFIX = '@';
  private static readonly CUSTOM_PATHS_REGEX = new RegExp(`(${PathsMapping.CUSTOM_PATHS_PREFIX}.*?)\/`);
  private static CUSTOM_MAPPINGS;
  
  static init(baselib_path: string, app_lib_path: string, ms_path: string): void{
    PathsMapping.CUSTOM_MAPPINGS = [ 20 ]; // random size that's greater than number of mappings defined below.
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}BASELIB`] = baselib_path;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}LIBS`] = `${baselib_path}/libs`;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}APP_BASELIB`] = app_lib_path;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}APP_LIBS`] = `${app_lib_path}/libs`;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}APP_MODELS`] = `${app_lib_path}/libs/models/mariadb`;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}MS`] = ms_path;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}MS_ROUTES`] = `${ms_path}/routes`;
    PathsMapping.CUSTOM_MAPPINGS[`${PathsMapping.CUSTOM_PATHS_PREFIX}MS_HANDLERS`] = `${ms_path}/handlers`;

    const moduleProt = Object.getPrototypeOf(module);
    const _require = moduleProt.require;
    moduleProt.require = function(_req: string){
      return _require.call( this, PathsMapping._path( _req ) );
    };

  }

  private static _path( _req: string ): string{
    if( !PathsMapping.CUSTOM_MAPPINGS ){
      throw new Error( "ERROR: Please note that init() MUST be called prior to using jpmRequire()!" );
    }
    let req = _req;
    if( PathsMapping.CUSTOM_PATHS_PREFIX === req[0] ){
      let arr: string[] = `${req}`.match(PathsMapping.CUSTOM_PATHS_REGEX);
      const cPath = arr[1];
      // const cPath = `${req}`.match(PathsMapping.CUSTOM_PATHS_REGEX)[1];
      if( cPath && typeof PathsMapping.CUSTOM_MAPPINGS[cPath] !== 'undefined' ){
        req = req.replace( cPath, PathsMapping.CUSTOM_MAPPINGS[cPath] );
      }
    }
    return req;
  }

  static path( key ): string{
    return PathsMapping.CUSTOM_MAPPINGS ? PathsMapping.CUSTOM_MAPPINGS[ key ] : './';
  }

  static pmRequire( _req: string ): any{
    return require( PathsMapping._path( _req ) );
  }
}

