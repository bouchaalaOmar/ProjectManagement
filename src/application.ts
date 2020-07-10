import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey, createBindingFromClass,} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent,} from '@loopback/rest-explorer';
import {RepositoryMixin, model, property} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

// ---------- Authentication imports-------------
import {
    PasswordHasherBindings,
    TokenServiceBindings,
    TokenServiceConstants,
    UserServiceBindings,
} from './keys';
import {AuthenticationComponent} from '@loopback/authentication';
import {AuthorizationComponent} from '@loopback/authorization';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTService} from './services/jwt-service';
// ---------- end Authentication imports-------------

import {User} from './models';
import {MyUserService} from './services/user-service';


export {ApplicationConfig};

/**
 * Information from package.json
 */
export interface PackageInfo {
    name: string;
    version: string;
    description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

@model()
export class NewUser extends User {
    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

export class ProjectManagementApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication)),
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        this.setUpBindings();

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static('/', path.join(__dirname, '../public'));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(RestExplorerComponent);

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };

        // Mount authentication system
        this.component(AuthenticationComponent);
        this.component(AuthorizationComponent);

        // authentication
        this.add(createBindingFromClass(JWTAuthenticationStrategy));

        this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    }

    setUpBindings(): void {
        // Bind package.json to the application context
        this.bind(PackageKey).to(pkg);

        this.bind(TokenServiceBindings.TOKEN_SECRET).to(
            TokenServiceConstants.TOKEN_SECRET_VALUE,
        );

        this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
            TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
        );

        this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

        // // Bind bcrypt hash services
        this.bind(PasswordHasherBindings.ROUNDS).to(10);
        this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

        this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    }
}
