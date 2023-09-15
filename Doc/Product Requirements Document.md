# Tiny Site URL Shortener - Product Requirements Document (PRD)

## Overview

Tiny Site is a user-friendly website that reduces the length of your URL(Uniform Resource Locator). The idea is to minimize the web page address into something that’s easier to remember and track. This web application will maintain connection between the new URL and the original URL, meaning that anyone who clicks on your new URL will be redirected to the original page.

## Objective

**The objectives of the tiny site are as follows:**

-   Create a user-friendly web application to generate short URLs for long and complex ones, facilitating easy sharing and improved memorability.
-   Enable users to track and analyze URL statistics, including access frequency and timestamps of accesses.
-   Provide customization options, such as adding aliases to URLs and configuring URL properties (e.g., alias length, validity period, updates, deletion).
-   Deliver a scalable and highly available service with low latency and high throughput.

## Context

-   **Customer Personas:** Our target users include social media enthusiasts, developer,digital marketers, and anyone who frequently shares links online.
-   **Use Cases:** Users can shorten URLs, customize shortened links (if they create an account), and track click-through rates (CTR) and other performance metrics.
-   **Competitive Landscape:** Key competitors include Bitly, Rebrandly, and TinyURL. We aim to differentiate ourselves by offering a sleek user interface, advanced analytics, and customizable short URLs.

## Assumptions

-   **Positive Impact Assumptions:**
    1. Users value the ability to customize short URLs.
    2. Users are concerned about link tracking and analytics.
    3. The market for URL shorteners is growing.
-   **Negative Impact Assumptions:**
    1. Users may have security and privacy concerns regarding link tracking.
    2. Building a reliable link shortening service may require significant server resources.
-   **Validation:** We will validate these assumptions through user surveys, feedback collection, and monitoring server resource usage during development.
-   **Dependencies:** The successful deployment of Tiny Site URL Shortener depends on third-party libraries for link shortening algorithms, server hosting, and reliable internet connectivity.

## Scope

**Tiny Site URL Shortener includes the following features:**

**Version 1(Basic Foundation)**

1. User registration and authentication.
2. User-friendly UI for URL shortening.
    - Streamlined interface for easy URL submission and shortening process.
3. Generation of unique short URLs to prevent repetition.
    - Algorithm to ensure unique short URLs are generated for each original URL.
4. Displaying a list of all created short URLs.
    - User dashboard to view and manage their list of shortened URLs.
5. No Expiry
    - Short URLs created in this version do not have expiration options.

**Version 2(Security and Analytics)**

1. Password Protection for short URLs.
    - Allow users to set passwords for specific short URLs.
2. Link Expiration options (View-based).
    - Set short URLs to expire after a certain number of views.
3. URL statistics tracking, including:
    - Track access count for each short URL.
    - Record timestamp of each access for analytics.
4. Link QR Code generator with Custom Logo.
    - Generate QR codes for short URLs, with customizable logo integration.
5. Customization of short URLs:
    - Enable users to update the original URL associated with a short URL.
    - Provide an option to delete a short URL.

**Version 3( Advanced Marketing)**

1. UTM builder with links, including a manager.
    - Integrated UTM parameter builder for generating campaign tracking URLs.
2. Open Graph Image Manager (providing preview and customization).
    - Allow users to customize the preview image and text for social media sharing.
3. iOS app and Android App for deep linking.
    - Develop dedicated mobile apps that support deep linking to app content.
4. Link masking (Allow users to hide the original URL).
    - Provide the option to mask the original URL behind the short URL.

**Version 4 (Optimization and Performance)**

1. High availability and scalability for seamless usage.
    - Design the system architecture for redundancy and uptime.
2. Low-latency, high-throughput infrastructure for optimal performance.
    - Optimize backend infrastructure to ensure rapid response times.

**Version 5 (Extended Functionality)**

1. Browser extensions for quick URL shortening.
    - Develop browser extensions for popular web browsers to enable users to shorten URLs with a single click.
2. Enhanced analytics and reporting features.
    - Provide in-depth analytics tools for users to gain insights into their short URL performance.
3. Integration with other third-party services.
    - Allow seamless integration with other services such as social media platforms or marketing automation tools.
4. API access for developers.
    - Offer a public API that developers can use to programmatically interact with the URL shortening service.
5. Support for custom domains.
    - Enable users to use their custom domains for shortening URLs, enhancing brand identity and trust.

### User Stories

1. As a user, I want to be able to shorten a URL without registering for an account.
2. As a registered user, I want the option to customize the short URL.
3. As a registered user, I want to track the click-through rate (CTR) of my shortened links.
4. As a registered user, I want to edit or delete my shortened links.
5. As a user, I want to have a simple and intuitive user interface.

### Wireframes

![Tiny Site](https://github.com/Real-Dev-Squad/tiny-site/assets/70854507/4ed96b84-e5f3-49c2-8f51-57f46876ff21)

## Performance

Success for Tiny Site URL Shortener will be measured by the following key performance indicators (KPIs):

1. **User Adoption Rate:** The number of users who register and actively use the service.
2. **Link Click-Through Rate (CTR):** The percentage of clicks on shortened links compared to total link visits.
3. **Server Uptime:** Ensuring the service is available to users 99% of the time.
4. **Customization Rate:** The percentage of registered users who customize their short URLs.
5. **User Satisfaction:** Gather user feedback and maintain a satisfaction rating of at least 4 out of 5.

## Open Questions

1. How should we handle potential abuse of the service for malicious purposes?
2. What is the most effective way to monetize the service, if at all?
3. How can we ensure the security and privacy of user data, especially for registered users?
4. What level of analytics detail should we provide to users?
5. How can we effectively market Tiny Site URL Shortener to our target audience?
