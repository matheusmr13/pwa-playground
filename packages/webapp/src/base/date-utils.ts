export default class DateUtils {
  static completeZero(number: number) {
    return number >= 10 ? number : `0${number}`;
  }
  static formatTime(date: Date) {
    return `${this.completeZero(date.getHours())}:${this.completeZero(date.getMinutes())}:${this.completeZero(
      date.getSeconds()
    )}`;
  }
  static formatDate(date: Date) {
    return `${date.getFullYear()}/${this.completeZero(date.getMonth() + 1)}/${this.completeZero(date.getDate())}`;
  }
  static formatDatetime(date: Date) {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }
  static formatDatetimeStr(date: string) {
    return this.formatDatetime(new Date(date));
  }
}
