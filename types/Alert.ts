export default interface Alert {
  display: boolean;
  status: string;
  msg: string;
  timeout?: number;
}
