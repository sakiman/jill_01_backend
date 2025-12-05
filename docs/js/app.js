
function parseLimit(str) {
    if (!str) return {min: '', max: ''};
    const parts = str.replace(/,/g, '').split('-').map(s => s.trim());
    return {min: parts[0], max: parts[1]};
}

function openModal(row) {
    const modal = document.getElementById('editModal');
    modal.classList.remove('hidden');

    document.getElementById('mWebsite').value = row.dataset.website;
    document.getElementById('mCurrency').value = row.dataset.currency;
    document.getElementById('mMinChip').value = row.dataset.minchip;

    const limits = [
        ['B/P', 'bp'],
        ['Tie', 'tie'],
        ['B/P Pair', 'bppair'],
        ['B/P Bonus', 'bpbonus'],
        ['Big/Small', 'bigsmall'],
        ['Super Six', 'supersix'],
        ['Turtle', 'turtle'],
        ['Phoenix', 'phoenix']
    ];

    const container = document.getElementById('limitsContainer');
    container.innerHTML = '';

    limits.forEach(([label, key]) => {
        const parsed = parseLimit(row.dataset[key]);
        container.innerHTML += `
            <div class="p-3 border rounded">
                <label class="font-semibold text-sm">${label}</label>
                <div class="flex gap-2 mt-1">
                    <input class="input" data-limit="${key}-min" placeholder="Min" value="${parsed.min}">
                    <input class="input" data-limit="${key}-max" placeholder="Max" value="${parsed.max}">
                </div>
            </div>
        `;
    });
}

document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        openModal(row);
    });
});

document.getElementById('btnCancel').addEventListener('click', () => {
    document.getElementById('editModal').classList.add('hidden');
});

document.getElementById('btnSave').addEventListener('click', () => {
    console.log("Saving demo data... (Prototype)");
    alert("Demo only: Values logged in console.");
});

function toggleModal(action, id) {
    const body = document.querySelector('body');
    const modal = document.querySelector('.modal');
    const modalTitle = document.getElementById('modalTitle');
    const websiteSelect = document.getElementById('modalWebsite');
    const currencySelect = document.getElementById('modalCurrency');

    if (action === 'close') {
        modal.classList.add('opacity-0');
        modal.classList.add('pointer-events-none');
        body.classList.remove('modal-active');
    } else {
        modal.classList.remove('opacity-0');
        modal.classList.remove('pointer-events-none');
        body.classList.add('modal-active');

        if (action === 'create') {
            modalTitle.innerText = "Create New Bet Limit";
            // Enable selection for new creation
            websiteSelect.disabled = false;
            currencySelect.disabled = false;
            websiteSelect.value = "GlobalBet_Asia (1001)"; // Default
        } else if (action === 'edit') {
            modalTitle.innerText = `Edit Bet Limit - ID ${id}`;
            // Often in these systems, you can't change the currency/site once created, only the limits
            // websiteSelect.disabled = true;
            // currencySelect.disabled = true;
        }
    }
    }

    // Close modal when clicking escape key
    document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal('close');
    }
};