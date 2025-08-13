# Routes Organization

This folder contains all the route-related configurations and components for the checkout admin application.

## Structure

```
src/routes/
├── index.js              # Main export file for all routes
├── routesConfig.js       # Route definitions and configurations
└── README.md            # This documentation file
```

## Files

### `routesConfig.js`
Contains all route definitions, sub-routes, and helper functions:

- **`appRoutes`**: Main application routes array
- **`financeSubRoutes`**: Finance section sub-navigation
- **`ordersSubRoutes`**: Orders section sub-navigation
- **Helper Functions**: `getRouteByPath()`, `getAllRoutePaths()`, `isValidRoute()`

### `index.js`
Exports all route-related configurations and individual components for easy importing.

## Usage

### In App.jsx
```javascript
import { appRoutes } from './routes';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
}
```

### In Sidebar.jsx
```javascript
import { financeSubRoutes, ordersSubRoutes } from '../routes';

const navigation = [
  {
    name: 'Orders',
    icon: ShoppingCart,
    path: '/orders',
    type: 'section',
    children: ordersSubRoutes
  },
  {
    name: 'Finance',
    icon: Wallet,
    path: '/finance',
    type: 'section',
    children: financeSubRoutes
  }
];
```

### Direct Component Imports
```javascript
import { Dashboard, Orders, Finance } from './routes';
```

## Route Structure

### Main Routes
- `/` - Dashboard
- `/orders` - Orders
- `/pending-orders` - Pending Orders
- `/abandoned-carts` - Abandoned Carts
- `/finance` - Finance Overview
- `/refunds` - Refunds
- `/wallet` - Wallet
- `/settlement-history` - Settlement History
- `/rewards-history` - Rewards History
- `/reports` - Reports
- `/user-management` - User Management
- `/settings` - Settings

### Sub-Routes
- **Orders Section**: Orders, Pending Orders
- **Finance Section**: Customer Finance, Refunds, Wallet, Settlement History, Rewards History

## Benefits

1. **Centralized Management**: All routes defined in one place
2. **Easy Maintenance**: Add/remove routes by updating the config file
3. **Type Safety**: Consistent route structure across the application
4. **Reusability**: Routes can be imported and used in multiple components
5. **Clean Code**: App.jsx is now much cleaner and easier to read
6. **Scalability**: Easy to add new routes and sections

## Adding New Routes

1. **Add to `routesConfig.js`**:
   ```javascript
   {
     path: '/new-route',
     element: NewComponent,
     name: 'New Route',
     icon: 'NewIcon'
   }
   ```

2. **Import the component** at the top of `routesConfig.js`

3. **The route will automatically be available** in the application

## Helper Functions

- **`getRouteByPath(path)`**: Get route object by path
- **`getAllRoutePaths()`**: Get array of all route paths
- **`isValidRoute(path)`**: Check if a path is valid

## Icon Mapping

Icons are mapped using the `iconMap` object in the Sidebar component. Make sure to:
1. Import the icon from lucide-react
2. Add it to the `iconMap` object
3. Reference it in the route configuration
