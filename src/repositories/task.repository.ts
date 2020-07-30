import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ProjectManagementDataSourceDataSource} from '../datasources';
import {User, Project, Task, TaskRelations} from '../models';
import {UserRepository, ProjectRepository} from '../repositories';


export class TaskRepository extends DefaultCrudRepository<Task,
    typeof Task.prototype.id,
    TaskRelations> {
    public readonly employee: BelongsToAccessor<User,
        typeof Task.prototype.id>;
    public readonly project: BelongsToAccessor<Project,
        typeof Task.prototype.id>;

    constructor(
        @inject('datasources.projectManagementDataSource') dataSource: ProjectManagementDataSourceDataSource,
        @repository.getter('UserRepository')
        protected employeeRepositoryGetter: Getter<UserRepository>,
        @repository.getter('ProjectRepository')
        protected projectRepositoryGetter: Getter<ProjectRepository>,
    ) {
        super(Task, dataSource);
        this.employee = this.createBelongsToAccessorFor(
            'employee',
            employeeRepositoryGetter,
        );

        this.registerInclusionResolver('employee', this.employee.inclusionResolver);

        this.project = this.createBelongsToAccessorFor(
            'project',
            projectRepositoryGetter,
        );

        this.registerInclusionResolver('project', this.project.inclusionResolver);

    }
}