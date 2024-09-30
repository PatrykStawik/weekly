import { ITask } from "./task";

export interface IWeek {
  weekDateString: string;
  tasks: ITask[];
}