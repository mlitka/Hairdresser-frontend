import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'ng2-table',
    templateUrl: './ng2-table.component.html',
    styleUrls: ['ng2-table.component.scss']
})
export class Ng2TableComponent implements OnInit {

    public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: '#', name: 'no'},
    {
      title: 'Service',
      name: 'service',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by service'}
    },
    {title: 'Hairdresser', name: 'hairdresser', sort: ''},
    {title: 'Date', name: 'date', sort: '', filtering: {filterString: '', placeholder: 'Filter by date'}},
    {title: 'Time', name: 'time' }
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: []
  };

  private data:Array<any> = [];
  public upcomingVisits = [
            {
                no: '1',
                hairdresser: 'Emma Smith',
                service: 'colouring',
                time: '',
                date: '2016-12-12'
            },
            {
                no: '2',
                hairdresser: 'Henry Fox',
                service: 'cutting',
                time: '17:00',
                date: '2016-12-21'
            }
        ];

  public constructor() {
    this.length = this.data.length;
  }

  public ngOnInit():void {
      this.data = this.upcomingVisits;
      this.length = this.data.length;
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}