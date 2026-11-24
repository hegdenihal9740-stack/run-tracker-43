// JavaScript for Manager Software Dashboard

// Function to handle sidebar navigation
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const subMenuItems = document.querySelectorAll('.sub-menu-item');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');
    const addButton = document.querySelector('.add-button');

    // Handle main menu items (only those without sub-menus)
    menuItems.forEach(item => {
        if (!item.classList.contains('has-sub-menu')) {
            item.addEventListener('click', () => {
                // Remove active class from all menu items
                menuItems.forEach(mi => mi.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                // Hide all pages
                pages.forEach(page => page.classList.remove('active'));

                // Show selected page
                const pageId = item.getAttribute('data-page');
                const selectedPage = document.getElementById(pageId);
                if (selectedPage) {
                    selectedPage.classList.add('active');
                    if (addButton) {
                        addButton.style.display = 'none';
                    }
                }

                // Update page title
                const pageName = item.querySelector('span').textContent;
                pageTitle.textContent = pageName;
            });
        }
    });

    // Handle sub-menu items
    subMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));

            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));

            // Show selected page
            const pageId = item.getAttribute('data-page');
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.add('active');
                if (addButton) {
                    addButton.style.display = 'none';
                }
                // Update page title
                const pageName = item.textContent.trim();
                pageTitle.textContent = pageName + ' Page';
            }
        });
    });
}

// Function to calculate stock totals
function calculateStockTotals() {
    const table = document.querySelector('#stock .table-container table');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    let totalPurchase = 0;
    let totalPurchaseReturn = 0;
    let totalSales = 0;
    let totalSalesReturn = 0;
    let totalClosing = 0;
    let totalTotalStock = 0;
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const purchaseText = cells[2].textContent.trim();
        const purchase = parseInt(purchaseText) || 0;
        totalPurchase += purchase;
        const returnText = cells[3].textContent.trim();
        const returnVal = parseInt(returnText) || 0;
        totalPurchaseReturn += returnVal;
        const salesText = cells[5].textContent.trim();
        const sales = parseInt(salesText) || 0;
        totalSales += sales;
        const salesReturnText = cells[6].textContent.trim();
        const salesReturn = parseInt(salesReturnText) || 0;
        totalSalesReturn += salesReturn;
        const closingText = cells[7].textContent.trim();
        const closing = parseInt(closingText) || 0;
        totalClosing += closing;
        totalTotalStock += purchase - returnVal;
    });
    const totalsRow = table.querySelector('thead .totals-row');
    const ths = totalsRow.querySelectorAll('th');
    ths[0].textContent = 'Total Items: ' + rows.length;
    ths[1].textContent = 'Total Opening Stock: 0 KG';
    ths[2].textContent = 'Total Purchase: ' + totalPurchase + ' KG';
    ths[3].textContent = 'Total Purchase Return: ' + totalPurchaseReturn + ' KG';
    ths[4].textContent = 'Total Stock: ' + totalTotalStock + ' KG';
    ths[5].textContent = 'Total Sales: ' + totalSales + ' KG';
    ths[6].textContent = 'Total Sales Return: 0 KG';
    ths[7].textContent = 'Total Closing Stock: ' + totalClosing + ' KG';
    ths[8].textContent = 'N/A';
}

// Function to handle tab switching in hiring page
function initHiringTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show selected tab content
            const tabId = button.getAttribute('data-tab');
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        });
    });
}

// Function to handle Create Job Requirement form
function initCreateJobForm() {
    const greenBtn = document.getElementById('green-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const jobForm = document.getElementById('job-requirement-form');
    const createJobForm = document.getElementById('create-job-form');
    const hiringContainer = document.querySelector('.hiring-container');
    const existingTab = document.getElementById('existing-tab');
    const existingTabBtn = document.querySelector('[data-tab="existing-tab"]');

    // Show form on green button click
    greenBtn.addEventListener('click', () => {
        hiringContainer.style.display = 'none';
        createJobForm.style.display = 'block';
    });

    // Hide form and show existing employees on cancel
    cancelBtn.addEventListener('click', () => {
        createJobForm.style.display = 'none';
        hiringContainer.style.display = 'block';
        // Ensure existing tab is active
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        existingTabBtn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        existingTab.classList.add('active');
    });

    // Form submission with validation
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const requiredFields = jobForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                field.style.borderColor = '#ced4da';
            }
        });

        if (isValid) {
            // Simulate submission (since no backend)
            alert('Job requirement submitted to Head Office successfully!');
            // Reset form and go back
            jobForm.reset();
            createJobForm.style.display = 'none';
            hiringContainer.style.display = 'block';
            // Ensure existing tab is active
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            existingTabBtn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            existingTab.classList.add('active');
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

function initPaymentTables() {
    ['purchase-payment', 'sales-payment'].forEach(pageId => {
        const page = document.getElementById(pageId);
        const table = page?.querySelector('#paymentTable');
        const tableBody = table?.querySelector('tbody');
        const totalsRow = page?.querySelector('#grandTotalRow');
        if (!page || !table || !tableBody || !totalsRow) return;

        const updateRow = row => {
            const totalInput = row.querySelector('td:nth-child(4) input');
            const paidInput = row.querySelector('td:nth-child(5) input');
            const balanceInput = row.querySelector('td:nth-child(6) input');
            if (!totalInput || !paidInput || !balanceInput) return;
            const balance = (parseFloat(totalInput.value) || 0) - (parseFloat(paidInput.value) || 0);
            balanceInput.value = balance.toFixed(2);
        };

        const updateTotals = () => {
            let grandTotal = 0;
            let grandPaid = 0;
            let grandBalance = 0;
            table.querySelectorAll('tbody tr').forEach(row => {
                grandTotal += parseFloat(row.querySelector('td:nth-child(4) input')?.value) || 0;
                grandPaid += parseFloat(row.querySelector('td:nth-child(5) input')?.value) || 0;
                grandBalance += parseFloat(row.querySelector('td:nth-child(6) input')?.value) || 0;
            });
            const totalCell = totalsRow.querySelector('.total-amount');
            const paidCell = totalsRow.querySelector('.paid-amount');
            const balanceCell = totalsRow.querySelector('.balance-amount');
            if (totalCell && paidCell && balanceCell) {
                totalCell.textContent = grandTotal.toFixed(2);
                paidCell.textContent = grandPaid.toFixed(2);
                balanceCell.textContent = grandBalance.toFixed(2);
            }
        };

        const addRow = () => {
            const newRow = document.createElement('tr');
            ['date', 'text', 'text', 'number', 'number', 'number'].forEach((type, index) => {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = type;
                input.className = 'form';
                if (index >= 3) input.step = '0.01';
                if (index === 5) input.readOnly = true;
                cell.appendChild(input);
                newRow.appendChild(cell);
            });
            tableBody.appendChild(newRow);
            newRow.querySelector('input')?.focus();
        };

        page.addEventListener('input', event => {
            const input = event.target;
            if (!(input instanceof HTMLInputElement) || !table.contains(input)) return;
            const row = input.closest('tr');
            if (!row) return;
            updateRow(row);
            updateTotals();
        });

        page.addEventListener('keydown', event => {
            const activeElement = document.activeElement;
            if (!(activeElement instanceof HTMLInputElement) || !table.contains(activeElement)) return;
            const currentCell = activeElement.closest('td');
            const currentRow = currentCell?.parentElement;
            if (!currentCell || !currentRow) return;
            const cells = Array.from(currentRow.querySelectorAll('td'));
            const currentIndex = cells.indexOf(currentCell);
            const focusInput = cell => cell?.querySelector('input')?.focus();
            switch (event.key) {
                case 'ArrowRight':
                    event.preventDefault();
                    if (currentIndex < cells.length - 1) focusInput(cells[currentIndex + 1]);
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (currentIndex > 0) focusInput(cells[currentIndex - 1]);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    focusInput(currentRow.nextElementSibling);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    focusInput(currentRow.previousElementSibling);
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (currentIndex < cells.length - 1) {
                        focusInput(cells[currentIndex + 1]);
                    } else if (currentRow.nextElementSibling) {
                        focusInput(currentRow.nextElementSibling);
                    } else {
                        addRow();
                    }
                    break;
            }
        });

        updateTotals();
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    calculateStockTotals();
    initHiringTabs();
    initCreateJobForm();
    initPaymentTables();

    // Handle sidebar title click to show dashboard
    const sidebarTitle = document.getElementById('sidebar-title');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');
    const menuItems = document.querySelectorAll('.menu-item');
    const addButton = document.querySelector('.add-button');

    sidebarTitle.addEventListener('click', () => {
        // Remove active class from all menu items
        menuItems.forEach(mi => mi.classList.remove('active'));

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));

        // Show dashboard page
        const dashboardPage = document.getElementById('dashboard');
        dashboardPage.classList.add('active');

        // Update page title
        pageTitle.textContent = 'Dashboard';

        // Hide add button
        if (addButton) {
            addButton.style.display = 'none';
        }

        // Reset layout to normal
        document.querySelector('.sidebar').style.display = 'block';
        document.querySelector('.main-content').style.marginLeft = '250px';
        document.querySelector('.main-content').style.width = 'auto';
    });
});
