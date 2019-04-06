import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService , RecordService} from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TablePaginationComponentComponent } from './table-pagination-component/table-pagination-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatTableDataSource, MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';
import { DemoMaterialModule} from './material-module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RecordUpdateComponent } from './record-update';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';;
import { UserComponent } from './user';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component'
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        TooltipModule.forRoot() ,
        BsDatepickerModule.forRoot()   ,
        BrowserAnimationsModule,
        DemoMaterialModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        NgbModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        FlexLayoutModule,
        ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent ,
        TablePaginationComponentComponent,
        RecordUpdateComponent,
        UserComponent,
        HeaderComponent,
        UserComponent,
        UserCreateComponent ,
        UserUpdateComponent       ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        RecordService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }