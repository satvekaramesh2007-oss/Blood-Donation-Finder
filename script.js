// Sample data (replace with a real API / database later)
const donors = [
  { name: "Arun Kumar",   group: "O+",  city: "Chennai",    phone: "9000000001", available: true },
  { name: "Priya S",      group: "A+",  city: "Chennai",    phone: "9000000002", available: true },
  { name: "Karthik R",    group: "B+",  city: "Coimbatore", phone: "9000000003", available: false },
  { name: "Divya M",      group: "AB+", city: "Madurai",    phone: "9000000004", available: true },
  { name: "Suresh P",     group: "O-",  city: "Trichy",     phone: "9000000005", available: true },
  { name: "Meena K",      group: "A-",  city: "Salem",      phone: "9000000006", available: true },
  { name: "Vignesh T",    group: "B-",  city: "Chennai",    phone: "9000000007", available: false },
  { name: "Lakshmi N",    group: "O+",  city: "Madurai",    phone: "9000000008", available: true }
];

const $ = (id) => document.getElementById(id);
const list = $("results");

function fillCities() {
  const current = $("city").value;
  const cities = [...new Set(donors.map(d => d.city))].sort();
  $("city").innerHTML = '<option value="">All cities</option>' +
    cities.map(c => `<option>${c}</option>`).join("");
  $("city").value = current;
}

function render() {
  const g = $("group").value, c = $("city").value, onlyAvail = $("availableOnly").checked;
  const found = donors.filter(d =>
    (!g || d.group === g) && (!c || d.city === c) && (!onlyAvail || d.available));

  $("count").textContent = `${found.length} donor${found.length === 1 ? "" : "s"} found`;
  $("empty").hidden = found.length > 0;
  list.innerHTML = "";

  found.forEach(d => {
    const li = document.createElement("li");
    li.className = "donor";
    li.innerHTML = `
      <div class="badge">${d.group}</div>
      <div>
        <strong></strong>
        <span class="meta">${d.city}</span>
        <span class="status ${d.available ? "on" : "off"}">${d.available ? " · Available" : " · Not available"}</span>
      </div>
      <a class="call ${d.available ? "" : "disabled"}" href="tel:${d.phone}">Call</a>`;
    li.querySelector("strong").textContent = d.name; // textContent avoids HTML injection
    list.appendChild(li);
  });
}

$("searchForm").addEventListener("input", render);
$("searchForm").addEventListener("submit", e => e.preventDefault());

$("donorForm").addEventListener("submit", e => {
  e.preventDefault();
  donors.unshift({
    name: $("name").value.trim(),
    group: $("rGroup").value,
    city: $("rCity").value.trim(),
    phone: $("phone").value,
    available: true
  });
  e.target.reset();
  fillCities();
  render();
  $("msg").textContent = "Thanks! You are now listed as a donor.";
});

fillCities();
render();