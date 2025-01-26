# Audit History Control PCF

![Audit History - Accounts example](https://github.com/novalogica/pcf-audit-history/blob/main/screenshots/audit-history.png?raw=true)


## Overview
The **Audit History Control** is a PowerApps Component Framework (PCF) control designed to streamline the process of managing and visualizing audit logs in Dynamics 365. This control simplifies tracking changes to records, visualizing field-level audit logs, and restoring previous values when needed.

## Features
- **Field-level Audit Filtering:** Easily filter the audit history by specific fields to focus on relevant changes.
- **Comprehensive Change Visualization:** View details such as old values, new values, users who made the changes, and timestamps.
- **Sorting Options:** Sort audit entries by oldest or newest changes to prioritize your analysis.
- **Restore Changes:** Restore previous values for one or multiple fields with a single click.
- **Multi-language Support:** The control supports multiple languages, including:
  - Arabic
  - German
  - English (US)
  - French
  - Italian
  - Japanese
  - Dutch
  - Portuguese (Brazil)
  - Portuguese (Portugal)
  - Spanish
  - Chinese (Simplified)

## Installation
1. Import the solution containing the PCF control into your Dynamics 365 environment.
2. Configure the control on the desired entity forms.

## How to Use
1. Add the **Audit History Control** to a form or view in Dynamics 365.
2. Open a record and access the audit history via the control.
3. Use the dropdown to filter audit logs by specific fields (e.g., "Choose fields to filter the audit history").
4. View detailed information, including:
   - Field names
   - Old values
   - New values
   - User who made the change
   - Change timestamps
5. Use the sorting options to display logs in ascending or descending order.
6. Restore changes for specific fields or all fields as needed.

![Audit History - Filter attribute](https://github.com/novalogica/pcf-audit-history/blob/main/screenshots/audit-history-filter.png?raw=true)

## Configuration
The control is configurable through a resource file containing localization strings. See the `strings` folder for `.resx` files supporting multiple languages.

## Use Cases
- **Track Key Changes:** Monitor changes to critical fields such as status, ownership, or key numeric values.
- **Audit Compliance:** Simplify audit processes by visualizing changes in an easy-to-read format.
- **Data Restoration:** Quickly restore overwritten values to maintain data accuracy.

## Localization
The control is localized to support the following languages:
- Arabic (1025)
- German (1031)
- English (US) (1033)
- French (1036)
- Italian (1040)
- Japanese (1041)
- Dutch (1043)
- Portuguese (Brazil) (1046)
- Chinese (Simplified) (2052)
- Portuguese (Portugal) (2070)
- Spanish (3082)


## Todo:
- Add confirmation dialog before restoring audit changes ✅
- Implement searchable attribute dropdown ✅
- Add Date Range picker to filter audit changes by dates ✅

## Contributions
Contributions to improve or enhance this control are welcome. If you encounter issues or have feature requests, please create an issue or submit a pull request in the repository.

---

### License
This control is licensed under the MIT License. See the LICENSE file for details.

