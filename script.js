async function fetchUserData() {
    const startId = Number(document.getElementById('startId').value);
    const endId = Number(document.getElementById('endId').value);
    const userData = document.getElementById('userData');
    const error = document.getElementById('error');
    const loading = document.getElementById('loading');
    const table = document.getElementById('userTable');

    userData.innerHTML = '';
    error.classList.add('hidden');
    table.classList.add('hidden');
    loading.classList.remove('hidden');

    if (!startId || !endId || startId < 1 || endId > 10 || startId > endId) {
        loading.classList.add('hidden');
        error.textContent = 'Enter valid IDs (1-10, start ≤ end)';
        error.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch data');
        const users = await response.json();
        
        const filteredUsers = users.filter(user => user.id >= startId && user.id <= endId);
        if (filteredUsers.length === 0) throw new Error('No users found in range');

        userData.innerHTML = filteredUsers.map(user => `
            <tr>
                <td class="border p-2">${user.id}</td>
                <td class="border p-2">${user.name}</td>
                <td class="border p-2">${user.email}</td>
                <td class="border p-2">${user.phone}</td>
            </tr>
        `).join('');
        table.classList.remove('hidden');
    } catch (e) {
        error.textContent = `Error: ${e.message}`;
        error.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}