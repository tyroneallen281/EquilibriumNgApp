export class DashItemModel {
  id?: string;
  title?: string;
  
  formData?: Array<DashFormDataModel>;
  actions?: Array<DasActionItemModel>;
}
export class DashFormDataModel {
  title?: string;
  value?: number;
  total?: number;
  get activeProgress(): number {
    var tempPerc = Math.round((this.value / this.total) * 100);
    if (tempPerc > 100) {
      return 100;
    }
    return tempPerc;
  }
  
  get description() : string {
    return "Percentage Completed " + this.activeProgress + "%";
  }
  lastCompletedDate?: Date;
}
export class DasActionItemModel {
  title?: string;
  link?: string;
  id?: string;
}
