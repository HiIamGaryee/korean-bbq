export const MOCK_COUPONS = [
  {
    code: "DIGISMART",
    title: "Flat 10% OFF on Standard Chartered Digismart Credit Cards",
    note: "No Minimum Order Value",
    discount: 10,
    type: "percentage",
  },
  {
    code: "HSBC10",
    title: "Flat 10% OFF upto $10 on HSBC Cashback Credit Card",
    note: "Total Value of items Must be $3 or More",
    discount: 10,
    type: "percentage",
    maxDiscount: 10,
    minOrder: 3,
  },
  {
    code: "PAYMENT50",
    title: "Get Upto 50 OFF on Your First Payment",
    note: "Total Value of items Must be $10 or More",
    discount: 50,
    type: "fixed",
    minOrder: 10,
  },
  {
    code: "WELCOME20",
    title: "Welcome Offer - 20% OFF",
    note: "First time customers only",
    discount: 20,
    type: "percentage",
    isFirstTime: true,
  },
  {
    code: "BBQSPECIAL",
    title: "Korean BBQ Special - $15 OFF",
    note: "Valid on BBQ items only",
    discount: 15,
    type: "fixed",
    category: "bbq",
  },
  {
    code: "FREEDELIVERY",
    title: "Free Delivery",
    note: "No minimum order required",
    discount: 0,
    type: "delivery",
    freeDelivery: true,
  },
];

export const MOCK_PAYMENT_METHODS = [
  {
    id: "online",
    name: "Online Banking",
    description: "Pay securely through your bank",
    icon: "🏦",
  },
  {
    id: "qr",
    name: "QR Code",
    description: "Scan QR code to pay",
    icon: "📱",
  },
  {
    id: "card",
    name: "Bank Card",
    description: "Credit/Debit card payment",
    icon: "💳",
  },
];

export const MOCK_SERVICE_TYPES = [
  {
    id: "delivery",
    name: "Pick-Up",
    description: "Order for pickup",
    icon: "🚚",
  },
  {
    id: "dinein",
    name: "Self Service",
    description: "Dine in restaurant",
    icon: "🍽️",
  },
];
