import EXCEL from 'js-export-xlsx';

class Utils {
  getAttrFromArray = (list, id, attribute, default_value) => {
    const index = (element) => element.id == id;

		let order = list.findIndex(index);
    let item = list[order];
    if (item) {
      return item[attribute];
    } else {
      return default_value;
    }
  }

  convertStrToNum = (str) => {
    if (!str) {
      return 0;
    }
    let num = Number(str.replace(',', '.'));
    return num;
  }

  convertNumToStr = (num) => {
    if (num === null)
      return '';
    let str = num.toString().replace('.', ',');
    return str;
  }

  round = (num, decimal) => {
    const factorOfTen = Math.pow(10, decimal);
    return Math.round(num * factorOfTen) / factorOfTen;
  }

  export = (headers, data) => {
    let export_data = [];
    data.map((item, index) => {
      let exported_item = [];
      headers.map((header_item, h_index) => {
        let val = item[header_item.attr];
        if (header_item.type === 'number')
          val = this.convertStrToNum(val);
        else if (header_item.type === 'bool')
          val = item[header_item.attr] === 1 ? 'TAK' : 'NIE';
        else if (header_item.type === 'calculate')
          val = this.convertStrToNum(item[header_item.first]) * this.convertStrToNum(item[header_item.second]);
        exported_item.push(val);
      })
      export_data.push(exported_item);
    })
    EXCEL.outPut({
      header: headers.map((item, index) => item.header),
      data: export_data,
      name: 'download'
    })
  }
}
export default new Utils();