# Car Service Booking Application

A comprehensive car service booking platform built with React frontend and .NET Core Web API backend.

## Features

### Role-Based System

- **Admin**: Full CRUD operations on all entities, platform management
- **Provider**: Service management, booking oversight
- **Customer**: Service booking, payment processing

### Core Functionality

- User registration and authentication with JWT
- Service catalog with filtering and search
- Real-time booking management
- Payment processing simulation
- Dashboard analytics for all user types
- Responsive design with modern UI

## Technology Stack

### Frontend

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for development

### Backend

- .NET 8 Web API
- Entity Framework Core
- SQL Server LocalDB
- JWT Authentication
- BCrypt for password hashing
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js 18+
- .NET 8 SDK
- SQL Server LocalDB

### Backend Setup

1. Navigate to the API directory:

```bash
cd CarServiceBooking.API
```

2. Restore packages:

```bash
dotnet restore
```

3. Update database:

```bash
dotnet ef database update
```

4. Run the API:

```bash
dotnet run
```

The API will be available at `https://localhost:5000`

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Services

- `GET /api/services` - Get all services (with filtering)
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services` - Create service (Provider/Admin)
- `PUT /api/services/{id}` - Update service (Provider/Admin)
- `DELETE /api/services/{id}` - Delete service (Provider/Admin)
- `PATCH /api/services/{id}/toggle-status` - Toggle service status

### Bookings

- `GET /api/bookings` - Get bookings (filtered by user role)
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create booking (Customer)
- `PUT /api/bookings/{id}/status` - Update booking status (Provider/Admin)
- `DELETE /api/bookings/{id}` - Cancel booking (Customer/Admin)

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

## Default Users

The system comes with pre-seeded users for testing:

- **Admin**: admin@carservice.com / admin123
- **Provider**: provider@carservice.com / provider123
- **Customer**: customer@carservice.com / customer123

## Database Schema

### Users Table

- Id, Email, Name, Role, Phone, Address, PasswordHash, CreatedAt

### Services Table

- Id, Name, Description, Price, Duration, Category, ProviderId, ImageUrl, IsActive, CreatedAt

### Bookings Table

- Id, ServiceId, CustomerId, ProviderId, BookingDate, BookingTime, Status, TotalAmount, PaymentStatus, CustomerAddress, SpecialInstructions, CreatedAt

## Security Features

- JWT-based authentication
- Role-based authorization
- Password hashing with BCrypt
- CORS configuration
- Input validation and sanitization

## Development Notes

- The API uses Entity Framework Code First approach
- Database is automatically created on first run
- CORS is configured to allow requests from the React development server
- Swagger UI is available at `/swagger` in development mode
