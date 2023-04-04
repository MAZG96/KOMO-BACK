const stripe = require('stripe')
('sk_test_51LskiFJXPK7Bx9nFbzjJ8LQGGJj3eFaX6IVAM2HKJ2wbFfPBNvi3h7vEkzu8beW3EUKZydkUv3GVOiD4DCcfxfaQ00hhRhvfGo');

stripe.applePayDomains.create({
    domain_name: 'komolocalfoods.com'
  });