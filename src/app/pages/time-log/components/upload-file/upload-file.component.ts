import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter<boolean>();
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;

  public uploadedFile!: File | null;
  public closeDialog() {
    this.onClose.emit(this.visible);
    this.uploadedFile = null;
  }

  @Output() onUpload = new EventEmitter();

  public onFileLoadedFromInput(files: any) {
    if (files) this.uploadedFile = files.files[0];
  }

  public onFileUpload() {
    this.uploadedFile && this.onUpload.emit(this.uploadedFile);
  }
}
