function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}

export default class DateController{
    constructor(date) {
        this.date = Date.parse(date);

    }

    getTimeLeft() {
        const d = new Date(new Date() - this.date).getSeconds();
        const dateDiff = {
            dateHours: new Date(new Date() - this.date).getHours(),
            dateMinutes: new Date(new Date() - this.date).getMinutes(),
            dateSeconds: d,
        };
        console.log(dateDiff);
        if(dateDiff.dateHours > 24){
            return this.dateInformat();
        }
        if(dateDiff.dateHours > 0){
            return `${dateDiff.dateHours} ${declOfNum(dateDiff.dateHours, ['час', 'часа', 'часов'])} назад`
        }
        if(dateDiff.dateMinutes > 0){
            return `${dateDiff.dateMinutes} ${declOfNum(dateDiff.dateMinutes, ['минута', 'минуты', 'минут'])} назад`
        }
        if(dateDiff.dateSeconds > 0){
            return `${dateDiff.dateSeconds} ${declOfNum(dateDiff.dateSeconds, ['секунда', 'секунды', 'секунд'])} назад`
        }
    }

    dateInformat(date = this.date) {
        const dateData = {
            dateDays: new Date(this.date).getDay(),
            dateMonth: new Date(this.date).getMonth(),
            dateYear: new Date(this.date).getFullYear(),
            dateHours: new Date(this.date).getHours(),
            dateMinutes: new Date(this.date).getMinutes()
        };
        return `${dateData.dateDays}.${dateData.dateMonth}.${dateData.dateYear} ${dateData.dateHours}:${dateData.dateMinutes}`;
    }
}
