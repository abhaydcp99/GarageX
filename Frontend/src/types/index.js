/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'admin' | 'provider' | 'customer'} role
 * @property {string} [phone]
 * @property {string} [address]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} duration  // in minutes
 * @property {string} category
 * @property {string} providerId
 * @property {string} providerName
 * @property {string} imageUrl
 * @property {boolean} isActive
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} serviceId
 * @property {string} serviceName
 * @property {string} customerId
 * @property {string} customerName
 * @property {string} customerEmail
 * @property {string} customerPhone
 * @property {string} providerId
 * @property {string} providerName
 * @property {string} bookingDate
 * @property {string} bookingTime
 * @property {'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'} status
 * @property {number} totalAmount
 * @property {'pending' | 'paid' | 'refunded'} paymentStatus
 * @property {string} customerAddress
 * @property {string} [specialInstructions]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 */
