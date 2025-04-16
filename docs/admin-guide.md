# Cryptocurrency Crime Investigation Platform
## Administrator Guide

This guide provides instructions for platform administrators on managing users, content, and system settings.

## Table of Contents
1. [Administrator Access](#administrator-access)
2. [User Management](#user-management)
3. [Content Management](#content-management)
4. [Analytics Dashboard](#analytics-dashboard)
5. [System Configuration](#system-configuration)
6. [Maintenance Procedures](#maintenance-procedures)

## Administrator Access

### Accessing Admin Features

Administrator features are available to users with the `admin` role. To access admin features:

1. Log in with an admin account
2. Navigate to the Admin Dashboard by clicking the Admin icon in the sidebar
3. Verify that you have access to all administrative functions

### Admin Roles and Permissions

The platform supports the following administrative roles:

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Full system access | All permissions |
| `content_admin` | Content management | Create/edit content, view analytics |
| `user_admin` | User management | Manage users, view analytics |

### First-Time Setup

When setting up the platform for the first time:

1. Use the default admin credentials provided during installation
2. Immediately change the default password
3. Create additional admin accounts as needed
4. Configure system settings

## User Management

### Viewing Users

The Users page displays all registered users with the following information:

- Email address
- Role
- Registration date
- Last login
- Progress status
- Account status

### Creating Users

To create a new user:

1. Navigate to Users > Add New User
2. Enter the user's email address
3. Select the appropriate role
4. Choose whether to send a welcome email
5. Click "Create User"

The user will receive an email with instructions to set their password.

### Editing Users

To edit a user:

1. Find the user in the user list
2. Click the Edit button
3. Modify user details as needed
4. Click "Save Changes"

### Managing User Roles

To change a user's role:

1. Find the user in the user list
2. Click the Edit button
3. Select the new role from the dropdown
4. Click "Save Changes"

### Resetting User Progress

To reset a user's progress:

1. Find the user in the user list
2. Click the "Actions" dropdown
3. Select "Reset Progress"
4. Confirm the action

**Note**: This action cannot be undone and will erase all of the user's progress data.

### Deactivating Users

To deactivate a user:

1. Find the user in the user list
2. Click the "Actions" dropdown
3. Select "Deactivate Account"
4. Confirm the action

Deactivated users cannot log in but their data is preserved.

## Content Management

### Content Organization

The platform's content is organized as follows:

- **Learning Paths**: Collections of chapters forming a coherent curriculum
- **Chapters**: Main content units covering specific topics
- **Sections**: Subdivisions within chapters
- **Interactive Elements**: Exercises, simulations, and quizzes
- **Badges & Certificates**: Achievements awarded for completing content

### Editing Content

#### Editing Chapters

To edit a chapter:

1. Navigate to Content > Chapters
2. Find the chapter in the list
3. Click the Edit button
4. Modify the chapter details
5. Click "Save Changes"

#### Editing Learning Paths

To edit a learning path:

1. Navigate to Content > Learning Paths
2. Find the learning path in the list
3. Click the Edit button
4. Modify the learning path details
5. Click "Save Changes"

#### Editing Badges and Certificates

To edit badges or certificates:

1. Navigate to Content > Badges or Content > Certificates
2. Find the item in the list
3. Click the Edit button
4. Modify the details
5. Click "Save Changes"

### Publishing Content

New or modified content must be published before it becomes visible to users:

1. Make your changes to the content
2. Click "Save Draft" to save without publishing
3. Preview the content to ensure it appears correctly
4. Click "Publish" to make the content live

### Content Versioning

The platform maintains versions of all content:

1. Each save creates a new version
2. Previous versions can be viewed in the Version History
3. You can revert to a previous version if needed
4. Published versions are marked in the history

## Analytics Dashboard

### Overview

The Analytics Dashboard provides insights into:

- User engagement
- Content performance
- Learning outcomes
- System usage

### User Analytics

The User Analytics section shows:

- Active users (daily, weekly, monthly)
- Registration trends
- Engagement metrics
- Completion rates
- Average scores

### Content Analytics

The Content Analytics section shows:

- Most/least accessed content
- Average time spent per chapter
- Completion rates by chapter
- Quiz performance statistics
- Difficulty analysis

### Exporting Data

To export analytics data:

1. Navigate to the desired analytics view
2. Click the "Export" button
3. Select the desired format (CSV, Excel, PDF)
4. Choose the date range
5. Click "Generate Export"

### Custom Reports

To create a custom report:

1. Navigate to Analytics > Custom Reports
2. Click "New Report"
3. Select the metrics to include
4. Configure filtering and grouping options
5. Name and save the report
6. Schedule regular generation (optional)

## System Configuration

### General Settings

The General Settings page allows configuration of:

- Platform name and branding
- Default language
- Time zone
- Date and time formats
- Contact information

### Email Configuration

The Email Settings page allows configuration of:

- SMTP server settings
- Email templates
- Notification preferences
- Automated emails

### Security Settings

The Security Settings page allows configuration of:

- Password policies
- Session timeout
- IP restrictions
- Two-factor authentication requirements
- API access controls

### Payment Integration

The Payment Settings page allows configuration of:

- Stripe API keys
- Pricing plans
- Discount codes
- Invoice settings
- Payment notifications

## Maintenance Procedures

### Backup and Restore

#### Creating Backups

To create a backup:

1. Navigate to System > Backups
2. Click "Create Backup"
3. Select what to include (content, user data, system settings)
4. Click "Start Backup"
5. Download the backup file when complete

#### Restoring from Backup

To restore from a backup:

1. Navigate to System > Backups
2. Click "Restore"
3. Upload the backup file
4. Select what to restore
5. Click "Start Restore"
6. Confirm the action

**Warning**: Restoring will overwrite existing data. Consider creating a backup before restoring.

### System Updates

To update the platform:

1. Navigate to System > Updates
2. Check for available updates
3. Review the update notes
4. Create a backup before updating
5. Click "Install Update"
6. Follow the on-screen instructions

### Performance Optimization

To optimize platform performance:

1. Navigate to System > Performance
2. Review the performance metrics
3. Identify bottlenecks
4. Apply recommended optimizations
5. Monitor the effects of changes

### Error Logs

To view system error logs:

1. Navigate to System > Logs
2. Select the log type (error, access, audit)
3. Set the date range
4. Filter by severity if needed
5. Export logs for further analysis

### Scheduled Maintenance

To schedule maintenance:

1. Navigate to System > Maintenance
2. Click "Schedule Maintenance"
3. Set the date and time
4. Configure the maintenance message
5. Select affected services
6. Click "Schedule"

Users will be notified of the scheduled maintenance according to the notification settings.