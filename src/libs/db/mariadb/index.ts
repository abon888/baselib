'use strict';

import {Sequelize} from 'sequelize-typescript';
import {PathsMapping} from '@BASELIB/js_paths_mapping';

class MariaDB{
  private sequelize: Sequelize;

  constructor(private config: any){}

  async init(): Promise<any>{
    this.sequelize = new Sequelize({
      dialect: this.config.dialect,
      database: this.config.database,
      username: this.config.username,
      password: this.config.password,
      host: this.config.host,
      port: this.config.port,
      modelPaths: [PathsMapping.path('@APP_MODELS')]
    });
    return await this.sequelize.sync();
  }
}

export = MariaDB;
