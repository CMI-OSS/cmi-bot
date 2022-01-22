const { parseDate } = require("./dateParser");

const answer1 = {
  year: 2022,
  month: 1,
  date: 9,
  hour: 19,
  minute: 30,
  seconds: 0,
};

const answer2 = {
  repeat: "매주",
  week: "수",
  hour: 19,
  minute: 30,
  seconds: 0,
};

const answer3 = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  hour: 17,
  minute: 0,
  seconds: 0,
};

const answer4 = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  hour: 18,
  minute: 30,
  seconds: 0,
};

const answer5 = {
  repeat: "매달",
  date: 15,
  hour: 10,
  minute: 30,
  seconds: 0,
};

const answer6 = {
  repeat: "매일",
  hour: 9,
  minute: 30,
  seconds: 0,
};

const testCases = [
  {
    case: "2022년 1월 9일 오후 7시 30분",
    answer: answer1,
  },
  {
    case: "1월 9일 오후 7시 30분",
    answer: answer1,
  },
  {
    case: "매주 수요일 오후 7시 30분",
    answer: answer2,
  },
  {
    case: "5시에",
    answer: answer3,
  },
  {
    case: "6시 30분에",
    answer: answer4,
  },
  {
    case: "매달 15일 오전 10시 30분",
    answer: answer5,
  },
  {
    case: "매일 오전 9시 30분",
    answer: answer6,
  },
];
for (const testCase of testCases) {
  it(testCase.case, () => {
    expect(parseDate(testCase.case)).toStrictEqual(testCase.answer);
  });
}
