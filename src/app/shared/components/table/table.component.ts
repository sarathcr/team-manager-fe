import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { TableModule } from 'primeng/table';
import { TableDataModel } from '../../models/table-data.model';
import { log } from 'console';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() tableData!: TableDataModel;

  public uniqueDateObjects: any[] = [];
  public index: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.tableData) {
      this.getDateList();
    }
  }

  public getDateList() {
    if (!this.tableData || !this.tableData.data) {
      return [];
    }

    this.uniqueDateObjects = [];

    this.tableData.data.forEach((employee) => {
      if (employee.dateList) {
        employee.dateList.forEach((dateEntry) => {
          const date = new Date(dateEntry?.date);
          const formattedDate = moment(date).format('L');

          const dateObject = {
            date: formattedDate,
            inTime: dateEntry.inTime,
            outTime: dateEntry.outTime,
            status: dateEntry.status,
          };

          const existingDateObject = this.uniqueDateObjects.find(
            (obj) => obj.date === formattedDate
          );

          if (!existingDateObject) {
            this.uniqueDateObjects.push(dateObject);
          } else {
            Object.assign(existingDateObject, dateObject);
          }
        });
      }
    });

    return this.uniqueDateObjects;
  }

  public getDayAndDuration(
    dateList: any[]
  ): { day: string; duration: string }[] {
    if (!dateList || dateList.length === 0) {
      return [];
    }

    const result: { day: string; duration: string }[] = [];

    dateList.forEach((dateEntry) => {
      let dayOfWeek = '';
      let duration = '';

      if (
        dateEntry.status === 'Present' &&
        dateEntry.inTime &&
        dateEntry.outTime
      ) {
        const inTime = moment.utc(dateEntry.inTime, 'YYYY-MM-DDTHH:mm:ss');
        const outTime = moment.utc(dateEntry.outTime, 'YYYY-MM-DDTHH:mm:ss');

        // // Check if outTime is before inTime (e.g., for the next day)
        // if (outTime.isBefore(inTime)) {
        //   outTime.add(1, 'day'); // Add one day to outTime
        // }

        const durationObject = moment.duration(outTime.diff(inTime));
        const hours = durationObject.hours();
        const minutes = durationObject.minutes();

        dayOfWeek = moment(dateEntry.date).format('ddd');
        duration = `${hours}h ${minutes}m`;
      } else if (dateEntry.status === 'WeeklyOff') {
        dayOfWeek = 'WeeklyOff';
      } else if (dateEntry.status === 'Absent') {
        dayOfWeek = 'Absent';
      }

      result.push({ day: dayOfWeek, duration: duration });
    });
    console.log('Result', result);
    return result;
  }

  public incrementIndex() {
    return ++this.index;
  }
}
