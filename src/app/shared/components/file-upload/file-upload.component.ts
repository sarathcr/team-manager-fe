import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { log } from 'console';
import { MessageService } from 'primeng/api';
import {
  FileSendEvent,
  FileUploadEvent,
  FileUploadHandlerEvent,
  FileUploadModule,
} from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FileUploadModule, ToastModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [MessageService],
})
export class FileUploadComponent {
  @ViewChild('fileDropRef') fileDropRef!: ElementRef;

  @Output() onUpload = new EventEmitter();

  public uploadedFile!: File;

  public onFileLoadedFromInput(files: any) {
    if (files) this.uploadedFile = files.files[0];
  }

  public onFileUpload() {
    this.uploadedFile && this.onUpload.emit(this.uploadedFile);
  }
}
