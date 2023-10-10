export interface INavigationData {
  title: string;
  path: string;
  isPrivate?: boolean;
  nestedLinks?: INavigationData[];
}
