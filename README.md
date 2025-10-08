# Korean BBQ Restaurant Management System

A comprehensive Korean BBQ restaurant management system with online ordering, admin panel, and customer features. Built with React frontend and FastAPI backend.

🔗 **Live Demo**: https://sansan-korean-bbq.vercel.app  
📖 **API Documentation**: http://127.0.0.1:8000/docs

## 🚀 Features

### Customer Features

- **Menu Browsing**: Browse Korean BBQ menu items with categories
- **Online Ordering**: Add items to cart and place orders
- **User Authentication**: Sign up, login, and profile management
- **Password Recovery**: OTP-based password reset system
- **Multi-language Support**: English and Chinese localization
- **Responsive Design**: Mobile-friendly interface
- **Payment Integration**: Secure payment processing
- **Order Tracking**: View order history and status

### Admin Features

- **Dashboard**: Overview of orders, sales, and user statistics
- **Menu Management**: Add, edit, and manage menu items
- **Order Management**: Process and track customer orders
- **User Management**: Manage customer accounts
- **Shop Management**: Manage restaurant locations
- **Category Management**: Organize menu items by categories

## 🏗️ Architecture

### Frontend (React + TypeScript)

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) for modern design
- **State Management**: React Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Yup validation
- **Internationalization**: i18next for multi-language support
- **HTTP Client**: Axios for API communication

### Backend (FastAPI + Python)

- **Framework**: FastAPI for high-performance API
- **Authentication**: JWT tokens with secure password hashing
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Email Service**: SMTP integration for OTP emails
- **API Documentation**: Auto-generated with OpenAPI/Swagger

## 📁 Project Structure

```
korean-bbq/
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI application entry
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── requirements.txt    # Python dependencies
│   ├── routes/             # API route handlers
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── menu.py         # Menu management
│   │   ├── orders.py       # Order processing
│   │   ├── payment.py      # Payment handling
│   │   ├── admin.py        # Admin panel APIs
│   │   ├── categories.py   # Category management
│   │   └── shops.py        # Shop/location management
│   └── utils/              # Utility functions
│       ├── jwt_handler.py  # JWT token management
│       └── otp.py          # OTP generation and email
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin panel pages
│   │   └── sales/          # Customer pages
│   ├── api/                # API service functions
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── utils/              # Frontend utilities
│   └── assets/             # Static assets
├── public/                 # Public static files
└── package.json           # Frontend dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9+
- Git

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables** (optional for OTP emails)

```bash
export SMTP_HOST="smtp.yourprovider.com"
export SMTP_PORT=587
export SMTP_USER="no-reply@yourdomain.com"
export SMTP_PASS="your_smtp_password"
```

5. **Start the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to project root**

   ```bash
   cd /path/to/korean-bbq
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📧 OTP (One-Time Password) System

The application includes a comprehensive OTP system for password recovery and secure authentication.

### How OTP Works

1. **OTP Generation**: 6-digit random numeric codes
2. **Email Delivery**: SMTP-based email sending
3. **Verification**: Time-limited code validation
4. **Password Reset**: Secure password update process

### OTP Configuration

#### SMTP Setup (Production)

Set these environment variables for real email delivery:

```bash
export SMTP_HOST="smtp.gmail.com"          # Gmail SMTP
export SMTP_PORT=587
export SMTP_USER="your-email@gmail.com"
export SMTP_PASS="your-app-password"
```

**Popular SMTP Providers:**

- **Gmail**: `smtp.gmail.com:587`
- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailgun**: `smtp.mailgun.org:587`
- **Outlook**: `smtp-mail.outlook.com:587`

#### Development Mode

If SMTP is not configured, the API returns the OTP in the response for local testing.

### OTP API Endpoints

#### 1. Request OTP for Password Reset

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Responses:**

- **With SMTP**: `{"sent": true}`
- **Without SMTP**: `{"sent": false, "otp": "123456"}` (for testing)

#### 2. Verify OTP Code

```http
POST /auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response:**

```json
{ "verified": true }
```

#### 3. Reset Password with OTP

```http
POST /auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "code": "123456",
  "new_password": "MyNewPass123"
}
```

**Response:**

```json
{ "reset": true }
```

### OTP Implementation Details

#### Backend Implementation (`backend/utils/otp.py`)

```python
# OTP Generation
def generate_otp(length: int = 6) -> str:
    return ''.join(random.choice('0123456789') for _ in range(length))

# OTP Storage (in-memory for demo)
_otp_store: Dict[str, str] = {}

# Email Sending
def send_email_smtp(to_email: str, subject: str, body: str) -> None:
    # SMTP configuration and email sending logic
```

#### Security Considerations

- **OTP Expiration**: Implement time-based expiration (recommended: 5-10 minutes)
- **Rate Limiting**: Prevent OTP spam attacks
- **Secure Storage**: Use Redis or database instead of in-memory storage
- **Password Hashing**: Always hash new passwords before storage

### Testing OTP System

1. **Without SMTP** (Development):

   ```bash
   curl -X POST "http://localhost:8000/auth/forgot-password" \
        -H "Content-Type: application/json" \
        -d '{"email": "test@example.com"}'
   ```

2. **With SMTP** (Production):
   - Configure SMTP environment variables
   - Check email inbox for OTP code
   - Use the received code for verification

## 🚀 Available Scripts

### Frontend Scripts

#### `npm start`

Runs the app in development mode.

- Opens [http://localhost:3000](http://localhost:3000)
- Hot reloading enabled
- Shows lint errors in console

#### `npm test`

Launches the test runner in interactive watch mode.

- Runs Jest test suite
- Interactive test interface

#### `npm run build`

Builds the app for production.

- Creates optimized `build` folder
- Minified and hashed filenames
- Ready for deployment

#### `npm run eject`

**⚠️ Warning: One-way operation!**

- Removes single build dependency
- Copies all configuration files
- Gives full control over build tools

### Backend Scripts

#### Development Server

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Production Server

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```bash
# Database
DATABASE_URL=sqlite:///./korean_bbq.db

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_HOURS=2

# SMTP (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENVIRONMENT=development
```

## 🗄️ Database Schema

### Core Tables

- **Users**: Customer and admin accounts
- **Menu Items**: Food items with categories
- **Categories**: Menu organization
- **Orders**: Customer orders
- **Order Items**: Individual items in orders
- **Shops**: Restaurant locations
- **Payments**: Payment transactions

## 🔐 Authentication & Security

### JWT Authentication

- **Access Tokens**: Short-lived (2 hours)
- **Refresh Tokens**: Long-lived (7 days)
- **Secure Headers**: Authorization Bearer tokens

### Password Security

- **Hashing**: bcrypt for password storage
- **Validation**: Strong password requirements
- **Recovery**: OTP-based reset system

## 🌐 API Documentation

### Core Endpoints

#### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Request OTP
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/reset-password` - Reset password

#### Menu & Orders

- `GET /menu` - Get menu items
- `GET /categories` - Get categories
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order details

#### Admin

- `GET /admin/dashboard` - Dashboard statistics
- `POST /admin/menu` - Add menu item
- `PUT /admin/menu/{id}` - Update menu item
- `DELETE /admin/menu/{id}` - Delete menu item

### Interactive API Docs

Visit http://localhost:8000/docs for interactive Swagger documentation.

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Configure environment variables

### Backend Deployment (Railway/Heroku)

1. Create `Procfile`: `web: uvicorn main:app --host 0.0.0.0 --port $PORT`
2. Set environment variables
3. Deploy from Git repository

## 🧪 Testing

### Frontend Testing

```bash
npm test
```

### Backend Testing

```bash
cd backend
python -m pytest
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues

#### Backend Issues

- **Port 8000 in use**: Change port in uvicorn command
- **SMTP errors**: Check email credentials and firewall
- **Database errors**: Ensure SQLite file permissions

#### Frontend Issues

- **Build errors**: Clear node_modules and reinstall
- **API connection**: Check backend server status
- **CORS errors**: Verify proxy configuration

### Getting Help

- Check API documentation: http://localhost:8000/docs
- Review console logs for error details
- Ensure all dependencies are installed

---

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Material-UI Documentation](https://mui.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

---

**Built with ❤️ for Korean BBQ restaurants worldwide**
