import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ProjectManagementDataSourceDataSource} from "../datasources";
import {User, Project, ProjectRelations, Customer} from '../models';
import {UserRepository} from '../repositories';
import {CustomerRepository} from "./customer.repository";

export class ProjectRepository extends DefaultCrudRepository<Project,
    typeof Project.prototype.id,
    ProjectRelations> {
    public readonly projectManager: BelongsToAccessor<User,
        typeof Project.prototype.id>;
    public readonly customer: BelongsToAccessor<Customer,
        typeof Project.prototype.id>;

    constructor(
        @inject('datasources.projectManagementDataSource') dataSource: ProjectManagementDataSourceDataSource,
        @repository.getter('UserRepository')
        protected userRepositoryGetter: Getter<
            UserRepository
            >,
        @repository.getter('CustomerRepository')
        protected customerRepositoryGetter: Getter<
            CustomerRepository
            >,
    ) {
        super(Project, dataSource);
        this.projectManager = this.createBelongsToAccessorFor(
            'manager',
            userRepositoryGetter,
        );
        this.customer = this.createBelongsToAccessorFor(
            'customer',
            customerRepositoryGetter,
        );

        this.registerInclusionResolver('manager', this.projectManager.inclusionResolver);
        this.registerInclusionResolver('customer', this.customer.inclusionResolver);

    }
}


