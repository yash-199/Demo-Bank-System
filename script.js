"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// DIFFERENT DATA! Contains movement dates, currency and locale
const account1 = {
  owner: "Yash Kumar",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-12-01T17:01:17.194Z",
    "2022-12-06T23:36:17.929Z",
    "2022-12-08T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "en-US", // de-DE
};

const account2 = {
  owner: "Alamin Mt",
  movements: [2500, 400, -260, 830, -4210, 2200, 4600, -70],
  interestRate: 1.8,
  pin: 2222,

  movementsDates: [
    "2019-11-03T13:15:33.035Z",
    "2019-11-25T09:48:16.867Z",
    "2019-12-16T06:04:23.907Z",
    "2020-01-12T14:18:46.235Z",
    "2020-02-25T16:33:06.386Z",
    "2020-04-11T14:43:26.374Z",
    "2020-06-15T18:49:59.371Z",
    "2020-07-30T12:01:20.894Z",
  ],
  currency: "BDT",
  locale: "en-US",
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// 
const formatMovementDate = function(date,locale){
  const calcDaysPassed = (date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24));
  const daysPassed = calcDaysPassed(new Date(),date);
  console.log(daysPassed);

  if(daysPassed === 0) return 'Todays';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;
  // else{
  //   const day = `${date.getDate()}`.padStart(2,0);
  //   const month = `${date.getMonth()+1}`.padStart(2,0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurr = function(value,locale,currency){
  return new Intl.NumberFormat(locale,{
    style:'currency',
    currency:currency,
  }).format(value)

}

// for each loop for showing data from objct
const displayMovements = function(movements,sort=false){
  containerMovements.innerHTML='';
  const movs = sort ? movements.slice().sort((a,b)=>a-b):movements;
 movs.forEach(function(mov,i){
  // console.log(`movement ${i+1}: You deposited ${mov}`);
  const type = mov > 0 ? 'deposit' : 'withdrawal';
  const date = new Date(currentAccount.movementsDates[i]);
  const displayDate = formatMovementDate(date,currentAccount.locale);
  const formatedMov = formatCurr(mov,currentAccount.locale,currentAccount.currency);
  const html =`
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatedMov}</div>
        </div>
  `;

  containerMovements.insertAdjacentHTML("afterbegin",html)
 })
}
// displayMovements(account1.movements)

// computing username

const createUsername = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase() //covert username into lower case
    .split(' ') // It allows you to split a string into an array 
    .map(name=>name[0]) //map make it new array
    .join(''); // and join the first late of username ex:- Jonas geo => jg
  });
}
createUsername(accounts)

const updateUI = function(acc){
  displayMovements(acc.movements)
  calPrintBalance(acc);
  calDisplaySummary(acc)
}
// console.log(accounts);

// logout Timer
const startLogOutTimer = function(){
 const tick = function(){
  const min = String(Math.trunc(time/60)).padStart(2,0);
  const sec= String(time%60).padStart(2,0);
  labelTimer.textContent=`${min}:${sec}`;
  time--;
  if(time===0){
    clearInterval(timer);
    labelWelcome.textContent='Log in to get Started';
    containerApp.style.opacity=0;
  }
 }
//  set time to 5 min
 let time=120;
//  call the timer every second
 tick();
 const timer = setInterval(tick,1000);
 return timer;
}

// login event handler
let currentAccount,timer;

btnLogin.addEventListener('click',function(e){
  e.preventDefault();

  currentAccount = accounts.find(
    acc=>acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display UI and Message
    labelWelcome.textContent=`Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // show current date and time
    const date = new Date();
    const option={
      hour:'numeric',
      minutes:'numeric',
      day:'numeric',
      month:'long',
      year:'numeric',
      weekday:'long',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,option).format(date);
    // clear input field
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
    if(timer) clearInterval(timer);
    timer=startLogOutTimer();
    updateUI(currentAccount);

// console.log('LOGIN');
  }else{
    alert('Wrong Password')
  }
})

// calPrintBalance
const calPrintBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov,0);
  labelBalance.textContent=formatCurr(acc.balance,acc.locale,acc.currency);

}
// calPrintBalance(account1.movements);

// calDisplaySummary
const calDisplaySummary = function(acc){
  acc.income = acc.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent = formatCurr(acc.income,acc.locale,acc.currency);;

  acc.out = acc.movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0)
  labelSumOut.textContent = formatCurr(acc.out,acc.locale,acc.currency);

  acc.interest = acc.movements.filter(mov=>mov>0).map(deposit=>(deposit*acc.interestRate)/100).reduce((acc,int)=>acc+int,0);
  labelSumInterest.textContent=formatCurr(acc.interest,acc.locale,acc.currency);
}
// calDisplaySummary(account1.movements);

// FOR Transfer money
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc=>acc.username===inputTransferTo.value
  );
  // log(amount,receiverAcc);
  if(amount>0 && receiverAcc && currentAccount.balance>=amount && receiverAcc?.username!==currentAccount.username){
    // doing the transfer
    // clear input field
    inputTransferAmount.value=inputTransferTo.value='';
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    alert(`Transfer to  Amount is: ${amount}`)
    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }else{
    alert('Username is not correct :(');
    inputTransferAmount.value=inputTransferTo.value='';
  }
})

// Loan (some and every)
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){
    setTimeout(function(){
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
      // Reset Timer
      clearInterval(timer);
      timer=startLogOutTimer();
    },2500);
    
  }
  inputLoanAmount.value='';
})


// Deleting the account
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value)===currentAccount.pin){
    const index = accounts.findIndex(
      acc=>acc.username === currentAccount.username
    );
    accounts.splice(index,1); //for delete the account
    labelWelcome.textContent='Log in to get Started';
    containerApp.style.opacity=0; // for hidding the ui
  }
  inputCloseUsername.value = inputClosePin.value='';
})

// sort 
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();

  displayMovements(currentAccount.movements,!sorted);
  sorted =!sorted;
})

// ---------------------------------------------------------------------------------------------- For pratices
// filter method
const movement = [200,440,-200,500,700,789];
const deposits = movement.filter(function(mov){
  return mov > 0;
});
console.log(movement);
console.log(deposits);

// for withdrawals
const withdrawal = movement.filter(function(drew){
  return drew<0;
})
const withdraw=[];
for(const mov of movement){
  if(mov<0){
    withdraw.push(mov);
  }
}
console.log(withdraw);

// Reduce method

const balance = movement.reduce(function(acc,cur,i,arr){
  console.log(`Iteration ${i} : ${acc}`);
  return acc+cur;
},0)
console.log(movement);
console.log(balance);

let balance2=0;
for(const mov of movement){
  balance2+=mov;
  console.log(balance2);
}

// map method
const movements = [200,440,-200,500,700,789];
const eurTousd = 1.1;
const movementsUSD = movements.map(mov=>mov*eurTousd);
// console.log(movements);
// console.log(movementsUSD);

const movementsUSDfor =[];
for(const mov of movements) movementsUSDfor.push(mov*eurTousd);


const movementsDesc = movements.map
(
  (mov,i)=>`Movements ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);

// console.log(movementsDesc);

// onclick balance value show array in console

labelBalance.addEventListener('click',function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el=>Number(el.textContent.replace('INR',''))
  );
  console.log(movementsUI);
})