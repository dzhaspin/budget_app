let startBtn = document.getElementById("start"),

  resultBudget = document.getElementsByClassName('budget-value')[0],
  DayBudgetValue = document.getElementsByClassName('daybudget-value')[0],

  resultLevelValue = document.getElementsByClassName('level-value')[0],
  resultMonthSavings = document.getElementsByClassName('monthsavings-value')[0],
  resultYearSavings = document.getElementsByClassName('yearsavings-value')[0],

  ExpensesBtn = document.getElementsByTagName('button')[0],
  ExpensesItem = document.getElementsByClassName('expenses-item'),
  ExpensesValue = document.getElementsByClassName('expenses-value')[0],

  OptExpBtn = document.getElementsByTagName('button')[1],
  OptExpItem = document.querySelectorAll('.optionalexpenses-item'),
  OptExpValue = document.getElementsByClassName('optionalexpenses-value')[0],

  Income = document.getElementsByClassName('income-value')[0],
  IncomeItem = document.querySelector('.choose-income'),

  CountBtn = document.getElementsByTagName('button')[2],
  dataCheckSavings = document.querySelector('#savings'),
  dataSum = document.querySelector('.choose-sum'),
  dataPercent = document.querySelector('.choose-percent'),

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
  resultBudget.textContent = money.toFixed();
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

  appData.moneyPerDay = (appData.budget / 30).toFixed();
  DayBudgetValue.textContent = appData.moneyPerDay;

  if (appData.moneyPerDay < 1000) {
    resultLevelValue.textContent = 'Минимальный уровень достатка';
  } else if (appData.moneyPerDay >= 1000 && appData.moneyPerDay < 3000) {
    resultLevelValue.textContent = 'Средний уровень достатка';
  } else if (appData.moneyPerDay >= 3000) {
    resultLevelValue.textContent = 'Высокий уровень достатка';
  } else {
    resultLevelValue.textContent = 'Произошла ошибка';
  }

});


let appData = {

  budget: money, //        Бюджет
  expenses: {}, //         Расходы
  OptExp: {}, //           Дополнительные расходы
  income: [], //           Доход
  timeData: time, //       Дата
  savings: true, //        Накопления



  checkSavings: function () {
    if (appData.savings == true) {
      let save = +prompt('Какова сумма накопления?'),
        percent = +prompt('Под какой   процент?');

      appData.monthIncome = (save / 100 / 12 * percent).toFixed();
      alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
  },

  chooseOptExpenses: function () {

  },

  chooseIncome: function () {
    let items = prompt('Что принесет дополнительный доход? (перечиcлите через запятую)', '');
    appData.income = items.split(', ');
    appData.income.push(prompt('Может что-то еще?', ''));
    appData.income.sort();
    console.log(appData.income);

  }
};