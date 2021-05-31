import moment from 'moment';

class dateUtil {
    adjust2digits = (data) => {
        let str = data.toString();
        if (str.length == 1) {
            str = '0' + str;
        }
        return str;
    }
    getStringFromDateTime = (full_date) => {
        let data = new moment(full_date);
        let day = this.adjust2digits(data.date());
        let month = this.adjust2digits(data.month() + 1);
        let year = data.year().toString();

        let hour = this.adjust2digits(data.hour());
        let minute = this.adjust2digits(data.minute());

        return `${month}.${day}.${year} ${hour}:${minute}`
    }

    getStringFromDate = (full_date) => {
        let data = new moment(full_date);
        let day = this.adjust2digits(data.date());
        let month = this.adjust2digits(data.month() + 1);
        let year = data.year().toString();

        return `${day}.${month}.${year}`
    }
}
export default new dateUtil();