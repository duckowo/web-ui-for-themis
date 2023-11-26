const table = document.getElementById('table');

async function updateRank() {
	const res = await fetch('/submit/all');
	const data = await res.json();
	let str = '';

	const rows = [];
	rows[0] = '';
	for (let i = 0; i < data[0].length; i++) rows[0] += `<th>${data[0][i]}</th>`;
	for (let i = 1; i < data.length; i++) {
		rows[i] = '';
		for (let j = 0; j < data[i].length; j++) rows[i] += `<td>${data[i][j]}</td>`;
	}

	for (let i = 0; i < rows.length; i++) str += `<tr>${rows[i]}</tr>`;

	table.innerHTML = str;
}

updateRank();
setInterval(updateRank, 10000);
