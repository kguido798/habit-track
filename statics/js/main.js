// Fetch and display habits
async function loadHabits() {
    const res = await fetch("/api/habits");
    const habits = await res.json();
    const tbody = document.querySelector("#habitTable tbody");
    tbody.innerHTML = "";
    habits.forEach(h => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${h.name}</td>
            <td>${h.frequency}</td>
            <td>${h.streak}</td>
            <td>
                <button onclick='updateStreak(${h.id}, ${h.streak})'>+1 Streak</button>
                <button onclick='deleteHabit(${h.id})'>Delete</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

// Add new habit
async function addHabit() {
    const name = document.getElementById("habitName").value.trim();
    const freq = document.getElementById("frequency").value;
    if(!name) { alert("Enter a habit name"); return; }
    await fetch("/api/habits", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({name: name, frequency: freq})
    });
    document.getElementById("habitName").value = "";
    loadHabits();
}

// Update streak
async function updateStreak(id, streak) {
    await fetch("/api/habits", {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id:id, name:document.querySelector(`#habitTable tbody tr:nth-child(${id}) td:first-child`).textContent, frequency:"Daily", streak:streak+1})
    });
    loadHabits();
}

// Delete habit
async function deleteHabit(id) {
    await fetch("/api/habits", {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id:id})
    });
    loadHabits();
}

// Load motivational quote
async function loadQuote() {
    const res = await fetch("/api/quote");
    const data = await res.json();
    document.getElementById("quote").textContent = `"${data.quote}" — ${data.author}`;
}

// Initial load
loadHabits();
loadQuote();

