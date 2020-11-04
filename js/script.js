let startBtn = document.getElementById("start"),

  resultBudget = document.getElementsByClassName('budget-value')[0],
  DayBudgetValue = document.getElementsByClassName('daybudget-value')[0],

  ExpensesBtn = document.getElementsByTagName('button')[0],
  ExpensesItem = document.getElementsByClassName('expenses-item'),
  ExpensesValue = document.getElementsByClassName('expenses-value')[0],

  OptExpBtn = document.getElementsByTagName('button')[1],
  OptExpItem = document.querySelectorAll('.optionalexpenses-item'),
  OptExpValue = document.getElementsByClassName('optionalexpenses-value')[0],

  incomeValue = document.getElementsByClassName('income-value')[0],
  incomeItem = document.querySelector('.choose-income'),

  CountBtn = document.getElementsByTagName('button')[2],
  resultLevelValue = document.getElementsByClassName('level-value')[0],
  CheckSavings = document.querySelector('#savings'),

  sumValue = document.querySelector('.choose-sum'),
  percentValue = document.querySelector('.choose-percent'),
  resultMonthSavings = document.getElementsByClassName('monthsavings-value')[0],
  resultYearSavings = document.getElementsByClassName('yearsavings-value')[0],

  dateYear = document.querySelector('.year-value'),
  dateMonth = document.querySelector('.month-value'),
  dateDay = document.querySelector('.day-value'),

  money, time;

// Начать расчет
startBtn.addEventListener('click', function () {

  time = console.log('Введите дату в формате YYYY-MM-DD', '');
  money = +prompt("Ваш бюджет на месяц?", '');

  while (isNaN(money) || money == '' || money == null) {
    money = +prompt("Ваш бюджет на месяц?", '');
  }
  appData.budget = money;
  appData.timeData = time;
  resultBudget.textContent = money.toFixed() + ' руб';
  dateYear.value = new Date(Date.parse(time)).getFullYear();
  // Получает данные от пользователя и возврщает полный год getFullYear();
  dateMonth.value = new Date(Date.parse(time)).getMonth() + 1;
  dateDay.value = new Date(Date.parse(time)).getDate();

});

// Обязательные расходы
ExpensesBtn.addEventListener('click', function () {

  let sum = 0;

  for (let i = 0; i < ExpensesItem.length; i++) {
    let a = ExpensesItem[i].value,
      b = ExpensesItem[++i].value;

    if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
      a != '' && b != '' && a.length < 50) {
      appData.expenses[a] = b;
      sum += +b;
    } else {
      i = i - 1;
    }
  }
  ExpensesValue.textContent = sum;

});

// Возможные траты
OptExpBtn.addEventListener('click', function () {

  for (let i = 0; i < OptExpItem.length; i++) {
    let opt = OptExpItem[i].value;
    appData.OptExp[i] = opt;
    OptExpValue.textContent += appData.OptExp[i] + ' ';
  }

});

// Расчет дневного бюджета
CountBtn.addEventListener('click', function () {

  if (appData.budget != undefined) {

    appData.moneyPerDay = (appData.budget / 30).toFixed();
    DayBudgetValue.textContent = appData.moneyPerDay + ' руб';
    DayBudgetValue.style.color = '#61a654';

    if (appData.moneyPerDay < 1000) {
      resultLevelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay >= 1000 && appData.moneyPerDay < 3000) {
      resultLevelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay >= 3000) {
      resultLevelValue.textContent = 'Высокий уровень достатка';
    } else {
      resultLevelValue.textContent = 'Произошла ошибка!';
    }
  } else {
    DayBudgetValue.style.color = 'red';
    DayBudgetValue.textContent = 'Произошла ошибка';
  }


});

// Дополнительный доход
incomeItem.addEventListener('input', function () {
  let items = incomeItem.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
});

// Накопления за 1 месяц
CheckSavings.addEventListener('input', function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }

});

sumValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = sumValue.value,
      percent = percentValue.value;

    appData.monthIncome = (sum / 100 / 12 * percent);
    appData.yearIncome = (sum / 100 * percent);

    resultMonthSavings.textContent = appData.monthIncome.toFixed(1);
    resultYearSavings.textContent = appData.yearIncome.toFixed(1);
    console.log(appData.monthIncome);
  }
});

percentValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = sumValue.value,
      percent = percentValue.value;

    appData.monthIncome = (sum / 100 / 12 * percent);
    appData.yearIncome = (sum / 100 * percent);

    resultMonthSavings.textContent = appData.monthIncome.toFixed(1);
    resultYearSavings.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {

  budget: money, //        Бюджет
  expenses: {}, //         Расходы
  OptExp: {}, //           Дополнительные расходы
  income: [], //           Доход
  timeData: time, //       Дата
  savings: false //        Накопления

};