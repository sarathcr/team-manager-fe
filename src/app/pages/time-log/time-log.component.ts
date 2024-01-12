import { Component } from '@angular/core';
import { EXPORT_EXCEL } from '../../core/constants/api';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { TimeLogService } from './services/time-log.service';
import { log } from 'console';
import { TableDataModel } from '../../shared/models/table-data.model';
import { ButtonModule } from 'primeng/button';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-time-log',
  standalone: true,
  imports: [
    PageTitleComponent,
    FileUploadComponent,
    TableComponent,
    ButtonModule,
    UploadFileComponent,
  ],
  templateUrl: './time-log.component.html',
  styleUrl: './time-log.component.scss',
  providers: [TimeLogService],
})
export class TimeLogComponent<T extends { id: number }> {
  public fileData!: File;
  public tableData!: TableDataModel;
  public visible: boolean = false;

  constructor(
    protected service: TimeLogService<T>,
    protected store: StoreService
  ) {}

  // PUBLIC
  public onUpload(data: File) {
    this.store.setIsLoading(true);
    const URL = `${EXPORT_EXCEL}`;
    this.fileData = data;

    this.service.uploadFile(this.fileData, URL).subscribe({
      next: (res: any) => {
        this.tableData = res;
        this.store.setIsLoading(false);
      },
    });
  }

  public showDialog() {
    this.visible = true;
  }
  public hideDialog() {
    this.visible = false;
  }
}
