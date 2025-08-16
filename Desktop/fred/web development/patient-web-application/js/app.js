// Tech.Care Patient Dashboard Application
class PatientDashboard {
    constructor() {
        this.apiBaseUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev';
        this.username = 'coalition';
        this.password = 'skills-test';
        this.patientId = null;
        this.patientData = null;
        this.bloodPressureChart = null;
        this.selectedLabResult = 'CT Scans';

        this.init();
    }

    async init() {
        try {
            await this.fetchPatientData();
            this.setupEventListeners();
            this.createBloodPressureChart();
            this.populatePatientData();
            this.setupLabResultsInteraction();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to load patient data. Please try again later.');
        }
    }

    async fetchPatientData() {
        try {
            // Create Basic Auth header
            const credentials = btoa(`${this.username}:${this.password}`);
            const headers = {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            };

            // Fetch all patients data
            const response = await fetch(this.apiBaseUrl, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const patients = await response.json();

            // Find Jessica Taylor in the patient list
            const jessicaTaylor = patients.find(patient =>
                patient.name && patient.name.toLowerCase().includes('jessica') &&
                patient.name.toLowerCase().includes('taylor')
            );

            if (!jessicaTaylor) {
                throw new Error('Jessica Taylor not found in patient data');
            }

            this.patientId = jessicaTaylor.id;
            this.patientData = jessicaTaylor;

            console.log('Patient data loaded from API:', this.patientData);

        } catch (error) {
            console.error('Error fetching patient data:', error);
            this.showError(`Failed to load patient data: ${error.message}`);
        }
    }



    setupEventListeners() {
        // Patient selection functionality
        const patientItems = document.querySelectorAll('.patient-item');
        patientItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                patientItems.forEach(p => p.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                // Update patient data display
                this.updatePatientDisplay(item);
            });
        });

        // Timeframe selector
        const timeframeSelector = document.querySelector('.timeframe-selector');
        if (timeframeSelector) {
            timeframeSelector.addEventListener('click', () => {
                console.log('Timeframe selector clicked');
                // This would typically show a dropdown with different time periods
            });
        }

        // Search functionality
        const searchIcon = document.querySelector('.sidebar-header i.fa-search');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                console.log('Search clicked');
                // This would typically open a search input
            });
        }

        // User profile interactions
        const cogIcon = document.querySelector('.user-profile i.fa-cog');
        const ellipsisIcon = document.querySelector('.user-profile i.fa-ellipsis-v');

        if (cogIcon) {
            cogIcon.addEventListener('click', () => {
                console.log('Settings clicked');
            });
        }

        if (ellipsisIcon) {
            ellipsisIcon.addEventListener('click', () => {
                console.log('More options clicked');
            });
        }

        // Show all information button
        const showAllBtn = document.querySelector('.show-all-btn');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                console.log('Show all information clicked');
                this.showAllPatientInformation();
            });
        }

        // Download icons in lab results
        const downloadIcons = document.querySelectorAll('.download-icon');
        downloadIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const labResultName = icon.parentElement.querySelector('.result-name').textContent;
                this.downloadLabResult(labResultName);
            });
        });
    }

    setupLabResultsInteraction() {
        const labResultItems = document.querySelectorAll('.lab-result-item');
        labResultItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove selected class from all items
                labResultItems.forEach(l => l.classList.remove('selected'));
                // Add selected class to clicked item
                item.classList.add('selected');

                // Update selected lab result
                this.selectedLabResult = item.querySelector('.result-name').textContent;
                console.log(`Selected lab result: ${this.selectedLabResult}`);
            });
        });
    }

    updatePatientDisplay(patientItem) {
        // Get patient name from the clicked item
        const patientName = patientItem.querySelector('.patient-name').textContent;

        // Update the right sidebar patient name
        const rightSidebarName = document.querySelector('.right-sidebar .patient-name');
        if (rightSidebarName) {
            rightSidebarName.textContent = patientName;
        }

        // Update patient avatar in right sidebar
        const patientAvatar = patientItem.querySelector('.patient-avatar');
        const rightSidebarAvatar = document.querySelector('.right-sidebar .patient-avatar-large');
        if (patientAvatar && rightSidebarAvatar) {
            rightSidebarAvatar.src = patientAvatar.src;
            rightSidebarAvatar.alt = patientName;
        }

        // In a real application, you would fetch and display the selected patient's data
        console.log(`Switched to patient: ${patientName}`);
    }

    createBloodPressureChart() {
        const ctx = document.getElementById('bloodPressureChart');
        if (!ctx) return;

        // Get blood pressure data from patient data
        let chartData = this.patientData?.diagnosisHistory || [];
        
        // If no diagnosis history data, create a fallback chart
        if (!chartData || chartData.length === 0) {
            chartData = [
                { month: 'Oct 2023', systolic: 140, diastolic: 90 },
                { month: 'Nov 2023', systolic: 150, diastolic: 95 },
                { month: 'Dec 2023', systolic: 160, diastolic: 110 },
                { month: 'Jan 2024', systolic: 145, diastolic: 85 },
                { month: 'Feb 2024', systolic: 155, diastolic: 100 },
                { month: 'Mar 2024', systolic: 160, diastolic: 78 }
            ];
        }

        const months = chartData.map(item => item.month);
        const systolicData = chartData.map(item => item.systolic);
        const diastolicData = chartData.map(item => item.diastolic);

        this.bloodPressureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Systolic',
                        data: systolicData,
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ec4899',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#ec4899',
                        pointHoverBorderWidth: 3
                    },
                    {
                        label: 'Diastolic',
                        data: diastolicData,
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#8b5cf6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#8b5cf6',
                        pointHoverBorderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false // Hide legend as it's not shown in the image
                    },
                    tooltip: {
                        backgroundColor: 'rgba(55, 65, 81, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#e5e7eb',
                        borderColor: '#10b981',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        titleFont: {
                            family: 'Inter',
                            size: 14,
                            weight: '600'
                        },
                        bodyFont: {
                            family: 'Inter',
                            size: 13,
                            weight: '500'
                        },
                        padding: 12,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' mmHg';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#e5e7eb',
                            borderColor: '#e5e7eb'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            },
                            color: '#6b7280'
                        },
                        border: {
                            color: '#e5e7eb'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 180,
                        grid: {
                            color: '#e5e7eb',
                            borderColor: '#e5e7eb'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '500'
                            },
                            color: '#6b7280',
                            callback: function (value) {
                                return value;
                            },
                            stepSize: 20
                        },
                        border: {
                            color: '#e5e7eb'
                        }
                    }
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#ffffff',
                        hoverBorderColor: '#10b981',
                        hoverBorderWidth: 3
                    },
                    line: {
                        borderJoinStyle: 'round'
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    populatePatientData() {
        if (!this.patientData) return;

        // Update patient information in the right sidebar
        const patientNameElement = document.querySelector('.right-sidebar .patient-name');
        if (patientNameElement && this.patientData.name) {
            patientNameElement.textContent = this.patientData.name;
        }

        // Update contact information
        this.updateContactInfo();

        // Update vitals data (using default values as API might not have specific vitals)
        const respiratoryRateElement = document.getElementById('respiratory-rate');
        if (respiratoryRateElement) {
            respiratoryRateElement.textContent = this.patientData.respiratoryRate || 20;
        }

        const temperatureElement = document.getElementById('temperature');
        if (temperatureElement) {
            temperatureElement.textContent = this.patientData.temperature || 98.6;
        }

        const heartRateElement = document.getElementById('heart-rate');
        if (heartRateElement) {
            heartRateElement.textContent = this.patientData.heartRate || 78;
        }

        // Update current readings based on latest data
        if (this.patientData.diagnosisHistory && this.patientData.diagnosisHistory.length > 0) {
            const latestReading = this.patientData.diagnosisHistory[this.patientData.diagnosisHistory.length - 1];

            // Update systolic reading
            const systolicValue = document.querySelector('.reading-item:first-child .reading-value');
            if (systolicValue) {
                systolicValue.textContent = latestReading.systolic || 160;
            }

            // Update diastolic reading
            const diastolicValue = document.querySelector('.reading-item:last-child .reading-value');
            if (diastolicValue) {
                diastolicValue.textContent = latestReading.diastolic || 78;
            }
        }

        // Update diagnostic list
        this.updateDiagnosticList();

        // Update lab results
        this.updateLabResults();
    }

    updateContactInfo() {
        // Update date of birth
        const dobElement = document.querySelector('.contact-item:nth-child(1) .contact-value');
        if (dobElement && this.patientData.dateOfBirth) {
            dobElement.textContent = this.patientData.dateOfBirth;
        }

        // Update gender
        const genderElement = document.querySelector('.contact-item:nth-child(2) .contact-value');
        if (genderElement && this.patientData.gender) {
            genderElement.textContent = this.patientData.gender;
        }

        // Update contact info
        const contactElement = document.querySelector('.contact-item:nth-child(3) .contact-value');
        if (contactElement && this.patientData.phoneNumber) {
            contactElement.textContent = this.patientData.phoneNumber;
        }

        // Update emergency contact
        const emergencyElement = document.querySelector('.contact-item:nth-child(4) .contact-value');
        if (emergencyElement && this.patientData.emergencyContact) {
            emergencyElement.textContent = this.patientData.emergencyContact;
        }

        // Update insurance
        const insuranceElement = document.querySelector('.contact-item:nth-child(5) .contact-value');
        if (insuranceElement && this.patientData.insuranceType) {
            insuranceElement.textContent = this.patientData.insuranceType;
        }
    }

    updateDiagnosticList() {
        if (!this.patientData.diagnosticList) return;

        const tableBody = document.querySelector('.diagnostic-table .table-body');
        if (!tableBody) return;

        // Clear existing rows
        tableBody.innerHTML = '';

        // Add new rows from API data
        this.patientData.diagnosticList.forEach(diagnosis => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.innerHTML = `
                <span class="cell diagnosis">${diagnosis.problem || diagnosis.name || 'N/A'}</span>
                <span class="cell description">${diagnosis.description || 'No description available'}</span>
                <span class="cell status ${this.getStatusClass(diagnosis.status)}">${diagnosis.status || 'Unknown'}</span>
            `;
            tableBody.appendChild(row);
        });
    }

    updateLabResults() {
        if (!this.patientData.labResults) return;

        const labResultsList = document.querySelector('.lab-results-list');
        if (!labResultsList) return;

        // Clear existing items
        labResultsList.innerHTML = '';

        // Add new items from API data
        this.patientData.labResults.forEach((result, index) => {
            const item = document.createElement('div');
            item.className = 'lab-result-item';
            if (index === 0) item.classList.add('selected'); // Select first item by default
            
            item.innerHTML = `
                <span class="result-name">${result}</span>
                <img src="Assets/HealthCare Dashboard/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="Download" class="download-icon">
            `;
            labResultsList.appendChild(item);
        });

        // Re-setup event listeners for new lab result items
        this.setupLabResultsInteraction();
    }

    getStatusClass(status) {
        if (!status) return 'unknown';
        
        const statusLower = status.toLowerCase();
        if (statusLower.includes('cured') || statusLower.includes('resolved')) return 'cured';
        if (statusLower.includes('active') || statusLower.includes('current')) return 'active';
        if (statusLower.includes('inactive') || statusLower.includes('past')) return 'inactive';
        if (statusLower.includes('observation') || statusLower.includes('monitoring')) return 'under-observation';
        
        return 'unknown';
    }

    showAllPatientInformation() {
        // This would typically open a modal or navigate to a detailed patient page
        console.log('Showing all patient information for:', this.patientData?.name);

        // For demo purposes, show an alert
        if (this.patientData) {
            alert(`Showing complete information for ${this.patientData.name}\n\n` +
                `ID: ${this.patientData.id}\n` +
                `Age: ${this.patientData.age}\n` +
                `Gender: ${this.patientData.gender}\n` +
                `Contact: ${this.patientData.contact}\n` +
                `Emergency: ${this.patientData.emergencyContact}\n` +
                `Insurance: ${this.patientData.insurance}`);
        }
    }

    downloadLabResult(labResultName) {
        // This would typically trigger a file download
        console.log(`Downloading ${labResultName} for patient:`, this.patientData?.name);

        // For demo purposes, show an alert
        alert(`Downloading ${labResultName} for ${this.patientData?.name}\n\n` +
            `In a real application, this would download the actual lab result file.`);
    }

    showError(message) {
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        errorDiv.textContent = message;

        document.body.appendChild(errorDiv);

        // Animate in
        setTimeout(() => {
            errorDiv.style.transform = 'translateX(0)';
        }, 100);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 300);
        }, 5000);
    }

    // Method to refresh data
    async refreshData() {
        try {
            await this.fetchPatientData();
            this.populatePatientData();
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PatientDashboard();
});

// Handle window resize for responsive chart
window.addEventListener('resize', () => {
    // Chart.js automatically handles resize
    console.log('Window resized - chart should auto-adjust');
}); 