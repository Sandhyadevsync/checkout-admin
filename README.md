# Checkout Admin Panel

A modern and responsive admin panel built with ReactJS, Vite, and Tailwind CSS, inspired by Shiprocket's design. This admin panel provides a comprehensive dashboard for managing orders, abandoned carts, finances, reports, and settings.

## 🚀 Features

### Core Features
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **Modern UI**: Clean and professional interface with Tailwind CSS
- **Collapsible Sidebar**: Space-efficient navigation with collapsible sidebar
- **Real-time Updates**: Live wallet balance and refresh functionality
- **Search & Filter**: Advanced search and filtering capabilities

### Pages & Sections
1. **Dashboard**: Overview with key metrics, recent orders, and quick actions
2. **Orders**: Complete order management with status tracking
3. **Abandoned Carts**: Cart recovery tools and analytics
4. **Finance**: Wallet management, transactions, and financial insights
5. **Reports**: Comprehensive analytics and performance metrics
6. **Settings**: Company information, notifications, and security settings

### Technical Features
- **React Router**: Client-side routing for seamless navigation
- **Reusable Components**: Modular component architecture
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful and consistent icons
- **Mock Data**: Placeholder data for demonstration

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Development**: ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd checkout-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx        # Card component for content containers
│   ├── Modal.jsx       # Modal dialog component
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Collapsible sidebar navigation
│   └── Table.jsx       # Table component with headers and rows
├── layouts/            # Layout components
│   └── MainLayout.jsx  # Main layout wrapper
├── pages/              # Page components
│   ├── Dashboard.jsx   # Dashboard page
│   ├── Orders.jsx      # Orders management page
│   ├── AbandonedCarts.jsx # Abandoned carts page
│   ├── Finance.jsx     # Finance management page
│   ├── Reports.jsx     # Reports and analytics page
│   └── Settings.jsx    # Settings page
├── data/               # Mock data
│   └── mockData.js     # Sample data for demonstration
├── App.jsx             # Main app component with routing
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Gray Scale**: Various shades for text and backgrounds

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Primary (blue) and secondary (gray) variants
- **Tables**: Clean design with hover effects
- **Forms**: Consistent input styling with focus states

## 📱 Responsive Design

The admin panel is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar with overlay
- Stacked layouts for better mobile experience
- Touch-friendly buttons and interactions

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation item in `src/components/Sidebar.jsx`

### Styling
- Use Tailwind CSS utility classes
- Custom styles can be added in `src/index.css`
- Component-specific styles use the `@layer components` directive

### Data Integration
- Replace mock data in `src/data/mockData.js` with real API calls
- Use React hooks for state management
- Implement proper error handling and loading states

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Note**: This is a demonstration project with mock data. For production use, replace the mock data with real API integrations and implement proper authentication and authorization.
