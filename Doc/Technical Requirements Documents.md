# Tiny Site URL Shortener - Technical Requirements Document (TRD)

## Table of Contents

1. **[Introduction](#1-introduction)**

    - 1.1 [Purpose](#11-purpose)
    - 1.2 [Scope](#12-scope)
    - 1.3 [Intended Audience](#13-intended-audience)

2. **[System Architecture](#2-system-architecture)**

    - 2.1 [Overview](#21-overview)
    - 2.2 [Components](#22-components)

3. **[Development Environment](#3-development-environment)**

    - 3.1 [Programming Languages](#31-programming-languages)
    - 3.2 [Frameworks](#32-frameworks)
    - 3.3 [Database](#33-database)
    - 3.4 [Version Control](#34-version-control)
    - 3.5 [Build and Deployment Tools](#35-build-and-deployment-tools)

4. **[Security Requirements](#4-security-requirements)**

    - 4.1 [User Authentication](#41-user-authentication)

5. **[Performance Requirements](#5-performance-requirements)**

    - 5.1 [Response Time](#51-response-time)
    - 5.2 [Scalability](#52-scalability)
    - 5.3 [Availability and Uptime](#53-availability-and-uptime)

6. **[Database Design](#6-database-design)**

    - 6.1 [Schema](#61-schema)

7. **[User Interface (UI) Design](#7-user-interface-ui-design)**

    - 7.1 [Responsive Design](#71-responsive-design)
    - 7.2 [Browser Compatibility](#72-browser-compatibility)

8. **[Deployment Plan](#8-deployment-plan)**

    - 8.1 [Hosting Environment](#81-hosting-environment)

9. **[Documentation](#9-documentation)**
    - 9.1 [Code Documentation](#91-code-documentation)
    - 9.2 [User Documentation](#92-user-documentation)
    - 9.3 [API Documentation (For Future Versions)](#93-api-documentation-for-future-versions)

## 1. Introduction

### 1.1 Purpose

The Technical Requirements Document (TRD) outlines the technical specifications, architecture, and implementation details for the Tiny Site URL Shortener.

### 1.2 Scope

This document covers the technical aspects of Tiny Site, including system architecture, development environment, security, performance, database design, UI design, API design (for future versions), testing strategy, deployment plan, monitoring, and compliance.

### 1.3 Intended Audience

This document is intended for developers, system architects, and stakeholders involved in the technical implementation of Tiny Site.

## 2. System Architecture

### 2.1 Overview

Tiny Site will adopt a microservices architecture, utilizing cloud services for scalability and reliability.

### 2.2 Components

-   Frontend Application
-   Backend API
-   User Authentication Service
-   Database Service
-   Link Shortening Algorithm Service
-   Analytics Service (For Version 2 and above)

## 3. Development Environment

### 3.1 Programming Languages

-   Frontend: HTML, CSS, JavaScript (React)
-   Backend: Go

### 3.2 Frameworks

-   Frontend: Next JS
-   Backend: gin

### 3.3 Database

-   PostgreSQL

### 3.4 Version Control

-   Git

### 3.5 Deployment Tools

-   Rander for development phase
-   AWS for production

## 4. Security Requirements

### 4.1 User Authentication

-   OAuth 2.0 for user authentication(Google Auth)
-   Secure password storage using bcrypt

## 5. Performance Requirements

### 5.1 Response Time

-   Aim for response times under 500 milliseconds
-   Optimize frontend and backend code for performance

### 5.2 Scalability

-   Horizontal scaling of microservices
-   Load balancing for distribution of traffic

### 5.3 Availability and Uptime

-   Aim for 99.9% uptime in Production
-   Implement redundancy and failover mechanisms

## 6. Database Design

### 6.1 Schema

-   Define schemas for users, links, and analytics data

## 7. User Interface (UI) Design

### 7.1 Responsive Design

-   Ensure a seamless user experience across devices and screen sizes

### 7.2 Browser Compatibility

-   Test and optimize for major browsers (Chrome, Firefox)

## 8. Deployment Plan

### 8.1 Hosting Environment

-   Deploy on AWS (or alternative) for scalability
-   Utilize containerization for easy deployment and scaling

## 9. Documentation

### 9.1 Code Documentation

-   Document codebase for maintainability
-   Include inline comments and README files

### 9.2 User Documentation

-   Create user guides and documentation for Tiny Site users

### 9.3 API Documentation (For Future Versions)

-   Develop comprehensive API documentation for developers
