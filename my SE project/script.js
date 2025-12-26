const authModal = document.getElementById('authModal');
const authBtn = document.getElementById('authBtn');
const closeBtn = document.querySelector('.close');
const loginFormDiv = document.getElementById('loginForm');
const signupFormDiv = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

authBtn.onclick = () => authModal.style.display = 'block';
closeBtn.onclick = () => authModal.style.display = 'none';
window.onclick = (e) => { if(e.target == authModal) authModal.style.display = 'none'; }

showSignup.onclick = () => {
  loginFormDiv.style.display = 'none';
  signupFormDiv.style.display = 'block';
}

showLogin.onclick = () => {
  signupFormDiv.style.display = 'none';
  loginFormDiv.style.display = 'block';
}

const signupBtn = document.getElementById('signupBtn');
signupBtn.onclick = () => {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if(!name || !email || !password) return alert('Fill all fields!');
  
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if(users.find(u => u.email === email)) return alert('Email already registered!');
  
  users.push({name, email, password});
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Login now.');
  signupFormDiv.style.display = 'none';
  loginFormDiv.style.display = 'block';
}

const loginBtn = document.getElementById('loginBtn');
loginBtn.onclick = () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if(user){
    alert(`Welcome ${user.name}!`);
    authModal.style.display = 'none';
    authBtn.textContent = `Hello, ${user.name}`;
  } else {
    alert('Invalid credentials!');
  }
}

const form = document.getElementById("expenseForm");
const tableBody = document.querySelector("#expenseTable tbody");
const totalAmount = document.getElementById("totalAmount");
const searchInput = document.getElementById("search");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!title || !amount || !date) return alert("Please fill all fields!");

  const newExpense = { id: Date.now(), title, amount, category, date };
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  form.reset();
  renderTable();
});

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderTable();
}

function renderTable(filteredList = expenses) {
  tableBody.innerHTML = "";
  let total = 0;
  filteredList.forEach((exp) => {
    total += exp.amount;
    const row = `
      <tr>
        <td>${exp.title}</td>
        <td>₹${exp.amount}</td>
        <td>${exp.category}</td>
        <td>${exp.date}</td>
        <td>
          <button class="action-btn delete" onclick="deleteExpense(${exp.id})">🗑 Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
  totalAmount.textContent = total.toFixed(2);
}

searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = expenses.filter((exp) =>
    exp.title.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

renderTable();