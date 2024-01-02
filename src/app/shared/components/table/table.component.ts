import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataList, TableDataModel } from '../../models/table-data.model';
import { log } from 'console';
import moment from 'moment';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() tableData!: TableDataModel;

  private dateList!: any[];
  public uniqueDates: string[] = [];
  // public dateList
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      console.log(changes['tableData']);

      this.getDateList();
    }
  }

  public getDateList() {
    this.uniqueDates = [];

    this.tableData?.data?.forEach((employee) => {
      employee.dateList.forEach((dateEntry) => {
        const date = new Date(dateEntry?.date);
        const formattedDate = moment(date).format('L');

        if (!this.uniqueDates.includes(formattedDate)) {
          this.uniqueDates.push(formattedDate);
        }
      });
    });

    return this.uniqueDates;
  }
}
