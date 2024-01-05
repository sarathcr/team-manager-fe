import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import * as xlsx from 'xlsx';
import { TableDataModel } from '../../models/table-data.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, TooltipModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() tableData!: TableDataModel;

  public uniqueDateObjects: any[] = [];
  public index: number = 0;
  public currentIndex: number = 0;
  public startDate: Date = new Date();
  public disableNextButton: Boolean = false;
  public hasMoreDates: boolean = true;

  private fileName = 'Timelog.xlsx';

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

    // Filter dates excluding weekly offs
    const filteredDates = this.uniqueDateObjects.filter(
      (dateObject) => dateObject.status !== 'WeeklyOff'
    );

    // Return the next or previous 5 dates based on the current index and start date
    const slicedDates = filteredDates.slice(
      this.currentIndex,
      this.currentIndex + 5
    );

    const remainingDates = filteredDates.slice(this.currentIndex + 5);
    this.hasMoreDates = remainingDates.length > 0;
    return slicedDates;
  }

  public getDayAndDuration(dateList: any[]): {
    status: string;
    duration: string;
    remarks: string;
  }[] {
    if (!dateList || dateList.length === 0) {
      return [];
    }

    const result: {
      status: string;
      duration: string;
      remarks: string;
    }[] = [];

    dateList.forEach((dateEntry) => {
      let dayOfWeek = '';
      let duration = '';
      let remarks = '';

      const referenceTime = '10';

      const IN_TIME = moment.utc(dateEntry.inTime).format('HH:mm');
      const REFE_TIME = moment.utc(referenceTime, 'HH').format('HH:mm');

      const isGreaterThan10AM = IN_TIME > REFE_TIME;

      if (isGreaterThan10AM) {
        remarks = 'LC';
      }

      if (
        dateEntry.status === 'Present' &&
        dateEntry.inTime &&
        dateEntry.outTime
      ) {
        const inTime = moment.utc(dateEntry.inTime, 'YYYY-MM-DDTHH:mm:ss');
        const outTime = moment.utc(dateEntry.outTime, 'YYYY-MM-DDTHH:mm:ss');

        const durationObject = moment.duration(outTime.diff(inTime));
        const hours = durationObject.hours();
        const minutes = durationObject.minutes();

        dayOfWeek = moment(dateEntry.date).format('ddd');
        duration = `${hours}.${minutes}`;
      } else if (dateEntry.status === 'WeeklyOff') {
        dayOfWeek = 'WeeklyOff';
      } else if (dateEntry.status === 'Absent') {
        dayOfWeek = 'Absent';
      }

      result.push({
        status: dateEntry.status,
        duration: duration,
        remarks: remarks,
      });
    });
    const filteredDates = result.filter(
      (dateObject) => dateObject.status !== 'WeeklyOff'
    );
    const slicedResult = filteredDates.slice(
      this.currentIndex,
      this.currentIndex + 5
    );
    return slicedResult;
  }

  public getTotalLateCount(data: any) {
    const totalLateCount = data.filter(
      (item: any) => item.remarks === 'LC'
    ).length;
    return totalLateCount;
  }

  public exportPdf() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Weekly-timelog.pdf');
    });
  }

  public getNextDates() {
    if (this.hasMoreDates) {
      this.currentIndex += 5;
    }
  }

  public getPreviousDates() {
    if (this.currentIndex - 5 >= 0) {
      this.currentIndex -= 5;
      this.startDate = this.uniqueDateObjects[this.currentIndex].date;
    }
  }
}
