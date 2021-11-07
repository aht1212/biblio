import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreComponent } from '../components/livre/livre.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog'
import { AuteurComponent } from '../components/auteur/auteur.component';
import { EmpruntComponent } from '../components/emprunt/emprunt.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LivreComponent,
    AuteurComponent,
    EmpruntComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule

  ],
  exports:[
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule

  ]
})
export class PostsModule { }
