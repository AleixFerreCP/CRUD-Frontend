import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ContactCreateComponent } from "./contacts/contact-create/contact-create.component";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { HeaderComponent } from "./header/header.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRouting } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ContactCreateComponent,
    HeaderComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
