# Yohana's Kitchenette Food Ordering App

Mobile-first full-stack food ordering app with:

- Menu browsing, search, category filters and cart
- GCash-only checkout
- Order reference number generation
- Saved order summary, amount and payment details
- Food ratings from 1 to 5 stars
- Comment section per food item
- SMS notification through Twilio when configured
- Email notification through SendGrid when configured
- Local JSON outbox fallback when notification credentials are not configured

## Run Locally

Double-click `START_APP.bat`, then open:

```text
http://localhost:4174
```

Orders, ratings, comments and notification attempts are saved in:

```text
data/db.json
```

## Optional Live SMS

Set these environment variables before starting the app:

```text
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=your_twilio_number
```

## Optional Live Email

Set these environment variables before starting the app:

```text
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=verified_sender@email.com
```

Without these credentials, the app still creates the order reference and saves the full notification content in the local outbox.

## Netlify Deployment

The production deployment uses Netlify Functions and Netlify Blobs, so orders, ratings, comments and notification records persist separately from the local `data/db.json` file. Configure the optional Twilio and SendGrid variables in the Netlify site's environment settings before using live SMS or email notifications.
