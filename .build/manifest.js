
import Home from '../src/views/Home';import Customers from '../src/views/Customers';import CustomerDetails from '../src/views/CustomerDetails';

export * from '@stripe/ui-extension-sdk/version';
export const BUILD_TIME = '2025-08-03 20:45:22.223424 +0100 BST m=+0.372463001';

export { 
  Home,	

  Customers,	

  CustomerDetails	
 };

export default {
  "id": "com.example.connecttomailchimp",
  "version": "0.0.2",
  "name": "Connect to Mailchimp",
  "icon": "",
  "permissions": [
    {
      "permission": "checkout_session_read",
      "purpose": "Read Checkout Session data in webhook events"
    }
  ],
  "connect_permissions": null,
  "ui_extension": {
    "views": [
      {
        "viewport": "stripe.dashboard.home.overview",
        "component": "Home"
      },
      {
        "viewport": "stripe.dashboard.customer.list",
        "component": "Customers"
      },
      {
        "viewport": "stripe.dashboard.customer.detail",
        "component": "CustomerDetails"
      }
    ],
    "content_security_policy": {
      "connect-src": null,
      "image-src": null,
      "purpose": ""
    }
  },
  "distribution_type": "private"
};
