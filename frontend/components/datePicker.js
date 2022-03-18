const DatePicker = () => {
  //한달구하기
  const getMonthDays = (data, month) => {
    const monthStart = startOfMonth(data); //달 시작일 구하기 --> 1일

    const monthList = [];
    const weekLength = getWeeksInMonth(monthStart);
    this.setState({
      weekLength,
      calendarDay: monthStart,
    });
    for (let i = 0; i < weekLength; i++) {
      const count = i * 7;
      const weekStartDate = addDays(monthStart, count);
      monthList.push(this.getWeekDays(weekStartDate, month));
    }
    return monthList;
  };

  //한주 구하기
  const getWeekDays = (data, month) => {
    const weekStart = startOfWeek(data, { weekStartOn: 1 }); //기준날짜를 통해 주 시작일 구하기
    const weekLength = 7;
    const weekList = [];

    for (let i = 0; i < weekLength; i++) {
      const tempDate = addDays(weekStart, i);
      const formatted = this.getDay(format(tempDate, "EEE"));

      if (getMonth(tempDate) === month) {
        weekList.push({
          key: getDate(tempDate),
          formatted,
          date: tempDate,
          day: getDate(tempDate),
          month: "cur",
        });
      } else if (getMonth(tempDate) < month) {
        weekList.push({
          key: getDate(tempDate),
          formatted,
          date: tempDate,
          day: getDate(tempDate),
          month: "pre",
        });
      } else if (getMonth(tempDate) > month) {
        weekList.push({
          key: getDate(tempDate),
          formatted,
          date: tempDate,
          day: getDate(tempDate),
          month: "next",
        });
      }
    }
    return weekList;
  };

  //요일 표시법바꾸기
  const getDay = (day) => {
    var dayWord = day;

    if (dayWord === "Sun") {
      dayWord = "일";
    } else if (dayWord === "Mon") {
      dayWord = "월";
    } else if (dayWord === "Tue") {
      dayWord = "화";
    } else if (dayWord === "Wed") {
      dayWord = "수";
    } else if (dayWord === "Thu") {
      dayWord = "목";
    } else if (dayWord === "Fri") {
      dayWord = "금";
    } else if (dayWord === "Sat") {
      dayWord = "토";
    }

    return dayWord;
  };

  //다음달구하기
  const getNextMonth = () => {
    const nextDate = addMonths(this.state.monthStart, this.state.nextCount + 1);
    const month = getMonth(nextDate);
    const nextMonth = this.getMonthDays(nextDate, month);

    this.setState({
      nextCount: this.state.nextCount + 1,
      monthDays: nextMonth,
      curMonth: month,
    });
  };
  //이전달 구하기
  const getPreMonth = () => {
    const preDate = addMonths(this.state.monthStart, this.state.nextCount - 1);
    const month = getMonth(preDate);
    console.log(preDate);
    const preMonth = this.getMonthDays(preDate, month);

    this.setState({
      nextCount: this.state.nextCount - 1,
      monthDays: preMonth,
      curMonth: month,
    });
  };

  const date = new Date(); //오늘날짜를 생성
  const today = getDate(date); //날짜를 가져온다
  const curMonth = getMonth(date); //오늘날짜를 기준으로 현재달을 구한다
  const monthDays = this.getMonthDays(date, curMonth); //오늘날짜와 현재달을 갖고 한달의 날짜를 구한다
  return (
    <>
      <View style={style.calendar}>
        {this.state.monthDays
          ? this.state.monthDays.map((el, index) => {
              return el.map((sub, index) => {
                return (
                  <View
                    style={[
                      style.dayView,
                      this.state.weekLength === 4
                        ? style.week4
                        : this.state.weekLength === 5
                        ? style.week5
                        : this.state.weekLength === 6
                        ? style.week6
                        : null,
                    ]}
                    key={index.toString()}
                  >
                    <Text
                      style={[
                        style.dayText,
                        sub.month !== "cur" ? style.dayText2 : null,
                      ]}
                    >
                      {sub.day} {sub.formatted}
                    </Text>
                  </View>
                );
              });
            })
          : null}
      </View>
      <style jsx>{``}</style>
    </>
  );
};

export default DatePicker;
