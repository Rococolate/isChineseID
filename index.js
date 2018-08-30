function checkID(input){
  if (typeof input !== 'string') return false;
  if (/^\d{17}(\d|x)$/i.test(input)) return checkID18(input);
  if (/^\d{15}$/i.test(input)) return checkID15(input);
  return false;
}

function checkID15(input){
  const {area,birthday} = decompose(input,15);
  if (!isRealArea(area)) return false;
  if (!isRealBirthday('19' + birthday)) return false;
  return true;
}

function checkID18(input){
  const {other,last,area,birthday} = decompose(input,18);
  if (!isRealArea(area)) return false;
  if (!isRealBirthday(birthday)) return false;
  if (!isRealID(other,last)) return false;
  return true;
}

function decompose(input,type){
  const String_num = String(input);
  let last,other,area,birthday;
  if (type === 18) {
    last = String_num.slice(-1);
    other = String_num.slice(0,-1);
    area = String_num.slice(0,2);
    birthday = String_num.slice(6,14);
  }
  if (type === 15) {
    area = String_num.slice(0,2);
    birthday = String_num.slice(6,12);
  }
  return {last,other,area,birthday};
}

function isRealArea(input){
  // areaNum={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
  //     31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
  //     43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
  //     61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
  const areaNum = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91";
  return areaNum.indexOf(input) >= 0;
}

function isRealBirthday(input){
  const inputYear = input.slice(0,4);
  const inputMon = input.slice(4,6);
  const inputDay = input.slice(6,8);
  const date = new Date([inputYear,inputMon,inputDay].join('/'));
  return Number(inputYear) === date.getFullYear() && Number(inputMon) === date.getMonth()+1 && Number(inputDay) === date.getDate();
}

function isRealID(other,last){
  const calibrateList = ['1','0','X','9','8','7','6','5','4','3','2'];
  return last === calibrateList[calculateRemainder(other)];
}

function pow2(n){
  return Math.pow(2,n);
}

function remainder11(num){
  return num%11;
}

function numToList(num){
  return String(num).split('').map((item) => Number(item));
}

function calculateRemainder(num){
  return remainder11(numToList(num).reduce((pre,cur,index)=>{
    return pre + remainder11(pow2(17-index))*cur;
  },0));
}

module.exports = checkID;
