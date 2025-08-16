# 🏥 Tech.Care Patient Dashboard

A modern, responsive patient management dashboard built with vanilla JavaScript, HTML5, and CSS3. This application provides healthcare professionals with an intuitive interface to manage patient data, view vital signs, track diagnostic history, and access lab results.

![Tech.Care Dashboard](https://img.shields.io/badge/Tech.Care-Patient%20Dashboard-01F0D0?style=for-the-badge&logo=health&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

## 📋 Table of Contents

- [Repository](#-repository)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [API Integration](#-api-integration)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 🔗 Repository

**GitHub Repository**: [https://github.com/fniyonshuti/patient-web-application](https://github.com/fniyonshuti/patient-web-application)

This project is hosted on GitHub and can be cloned, forked, or contributed to directly from the repository.

---

## ✨ Features

### 🎯 Core Functionality
- **Patient Management**: View and manage multiple patients with detailed profiles
- **Real-time Vital Signs**: Monitor heart rate, temperature, and respiratory rate
- **Blood Pressure Tracking**: Interactive charts with 6-month historical data
- **Diagnostic History**: Complete medical diagnosis list with status tracking
- **Lab Results Management**: Download and view various medical reports
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Dashboard Design**: Clean, professional healthcare-appropriate styling
- **Interactive Charts**: Dynamic blood pressure visualization using Chart.js
- **Patient Selection**: Easy switching between different patients
- **Real-time Updates**: Live data population from API
- **Error Handling**: User-friendly error messages and fallbacks

### 🔐 Security & Authentication
- **Basic Authentication**: Secure API access with encrypted credentials
- **Data Validation**: Input validation and error handling
- **CORS Compliance**: Proper cross-origin resource sharing

## 📸 Screenshots

### Main Dashboard
![Dashboard Overview](Assets/HealthCare%20Dashboard/Layer%201.png)

### Patient Management
![Patient List](Assets/HealthCare%20Dashboard/Layer%202.png)

### Vital Signs Monitoring
![Vital Signs](Assets/HealthCare%20Dashboard/Layer%203.png)

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling with Flexbox and Grid layouts
- **Vanilla JavaScript (ES6+)**: Modern JavaScript without frameworks
- **Chart.js**: Interactive data visualization library

### External Dependencies
- **Google Fonts (Inter)**: Professional typography
- **Chart.js CDN**: Chart rendering and animations

### Development Tools
- **Python HTTP Server**: Local development server
- **Git**: Version control system

## 🔌 API Integration

### Coalition Technologies Patient Data API
The application integrates with the Coalition Technologies Patient Data API for FED Skills Test:

- **Endpoint**: `https://fedskillstest.coalitiontechnologies.workers.dev`
- **Authentication**: Basic Auth with encrypted credentials
- **Data Format**: JSON
- **Focus Patient**: Jessica Taylor (as per API requirements)

### API Features
- **Patient Data Retrieval**: Fetch comprehensive patient information
- **Diagnostic History**: Access medical diagnosis records
- **Lab Results**: Retrieve available medical reports
- **Real-time Updates**: Dynamic data population

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)
- Git (for version control)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/fniyonshuti/patient-web-application.git
   cd patient-web-application
   ```

2. **Start the development server**
   ```bash
   python -m http.server 8000
   ```

3. **Open your browser**
   Navigate to `http://localhost:8000`

### Alternative Setup

If you don't have Python installed, you can use any local web server:

```bash
# Using Node.js (if available)
npx http-server

# Using PHP (if available)
php -S localhost:8000

# Using Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

## 📖 Usage

### Dashboard Navigation

1. **Patient Selection**: Click on any patient in the left sidebar to view their data
2. **Vital Signs**: Monitor real-time vital signs in the center section
3. **Blood Pressure Chart**: Hover over the chart to see detailed readings
4. **Lab Results**: Click on lab result items to select and download them
5. **Patient Details**: View complete patient information in the right sidebar

### Interactive Features

- **Patient Switching**: Click different patients to update the dashboard
- **Chart Interaction**: Hover over blood pressure chart for detailed tooltips
- **Lab Results**: Select and download medical reports
- **Contact Information**: View patient contact and insurance details

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Refresh Data | `Ctrl + R` |
| Open Developer Tools | `F12` |
| Zoom In | `Ctrl + +` |
| Zoom Out | `Ctrl + -` |

## 📁 Project Structure

```
patient-web-application/
├── index.html                 # Main application entry point
├── css/
│   └── styles.css            # Application styles and layout
├── js/
│   └── app.js               # Main application logic
├── Assets/
│   └── HealthCare Dashboard/ # Application assets and icons
│       ├── *.svg            # SVG icons and graphics
│       ├── *.png            # Patient avatars and images
│       └── *.jpg            # Additional images
├── README.md                # Project documentation
└── *.zip                    # Project archives
```

### File Descriptions

- **`index.html`**: Main HTML structure with semantic markup
- **`css/styles.css`**: Complete styling with responsive design
- **`js/app.js`**: Core application logic and API integration
- **`Assets/`**: All visual assets including icons, images, and graphics

## ⚙️ Configuration

### API Configuration

The application is pre-configured to work with the Coalition Technologies API:

```javascript
// API Configuration (js/app.js)
this.apiBaseUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev';
this.username = 'coalition';
this.password = 'skills-test';
```

### Customization Options

You can customize various aspects of the application:

1. **Colors**: Modify CSS custom properties in `styles.css`
2. **Charts**: Adjust Chart.js configuration in `app.js`
3. **API Endpoint**: Change the API URL for different data sources
4. **Styling**: Update CSS classes for different themes

## 🛠 Development

### Local Development

1. **Clone and setup**
   ```bash
   git clone https://github.com/fniyonshuti/patient-web-application.git
   cd patient-web-application
   ```

2. **Start development server**
   ```bash
   python -m http.server 8000
   ```

3. **Open browser**
   Navigate to `http://localhost:8000`

### Code Structure

The application follows a modular structure:

- **PatientDashboard Class**: Main application controller
- **API Integration**: Secure data fetching with authentication
- **Event Handlers**: User interaction management
- **Data Visualization**: Chart creation and updates
- **Error Handling**: Comprehensive error management

### Development Guidelines

- Use semantic HTML5 elements
- Follow BEM CSS methodology
- Implement proper error handling
- Maintain responsive design principles
- Use modern JavaScript ES6+ features

## 🤝 Contributing

We welcome contributions to improve the Tech.Care Patient Dashboard!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Contribution Guidelines

- Follow existing code style and conventions
- Add appropriate comments and documentation
- Test changes across different browsers
- Ensure responsive design compatibility
- Update documentation as needed

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow professional standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No liability
- ❌ No warranty

## 📞 Support

### Getting Help

If you encounter any issues or have questions:

1. **Check the documentation** in this README
2. **Review the code comments** for implementation details
3. **Open an issue** on the GitHub repository
4. **Contact the development team**

### Common Issues

| Issue | Solution |
|-------|----------|
| API Connection Failed | Check internet connection and API endpoint |
| Chart Not Displaying | Ensure Chart.js is loaded properly |
| Styling Issues | Clear browser cache and reload |
| Patient Data Missing | Verify API credentials and data format |

## 🏆 Acknowledgments

- **Coalition Technologies** for providing the API and test environment
- **Chart.js** for the excellent charting library
- **Google Fonts** for the Inter font family
- **Open Source Community** for inspiration and best practices

---

<div align="center">

**Built with ❤️ for healthcare professionals**

[![Tech.Care](https://img.shields.io/badge/Tech.Care-Patient%20Dashboard-01F0D0?style=for-the-badge&logo=health&logoColor=white)](https://github.com/fniyonshuti/patient-web-application)

*Empowering healthcare through technology*

</div>
