export interface TableDataModel {
  data: DataList[];
  isSuccess: boolean;
  message: string;
}

export interface DataList {
  dateList: List[];
  department: string;
  employeeCode: string;
  employeeName: string;
}

export interface List {
  date: string;
  inTime: string;
  outTime: string;
  status: string;
}
