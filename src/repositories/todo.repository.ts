import {DefaultCrudRepository} from '@loopback/repository';
import {Todo, TodoRelations} from '../models';
import {ProjectManagementDataSourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {
  constructor(
    @inject('datasources.projectManagementDataSource') dataSource: ProjectManagementDataSourceDataSource,
  ) {
    super(Todo, dataSource);
  }
}
