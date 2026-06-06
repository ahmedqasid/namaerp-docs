# Ignoring Specific Warehouses/Locators in Reservation Quantity Check by Date

## Description

This feature allows you to exclude specific warehouses or locators from the overdraft-by-date check calculation when performing **Reservation** operations only. When this option is enabled on a warehouse or locator, the quantities held in that warehouse/locator will not be included in the available balance calculation when performing the overdraft-by-date check for reservations.

::: info Note
This feature only affects Reservation operations and has no impact on regular issue or receipt operations.
:::

## Settings in Supply Chain Configurations

| Name | Field ID |
|------|----------|
| Enable ignore in reservation quantity check by date for warehouses | `enableIgnoreInReservationQtyCheckByDateForWarehouses` |
| Enable ignore in reservation quantity check by date for locators | `enableIgnoreInReservationQtyCheckByDateForLocators` |

::: warning Note
These options must be enabled first for the ignore flag to be read from the warehouse or locator. If you attempt to enable the option on a warehouse or locator without enabling the corresponding setting in Supply Chain Configurations, an error message will appear with a direct link to the required setting.
:::

## Settings in Warehouse

| Name | Field ID |
|------|----------|
| Ignore in reservation quantity check by date | `ignoreInReservationQtyCheckByDate` |

## Settings in Locator

| Name | Field ID |
|------|----------|
| Ignore in reservation quantity check by date | `ignoreInReservationQtyCheckByDate` |

## How to Use

1. **Enable the feature:** Go to Supply Chain Configurations and enable the appropriate option:
   - `enableIgnoreInReservationQtyCheckByDateForWarehouses` for warehouses
   - `enableIgnoreInReservationQtyCheckByDateForLocators` for locators

2. **Specify the excluded warehouses/locators:** Go to the warehouse or locator to be excluded and enable the option:
   - `ignoreInReservationQtyCheckByDate`

3. When a reservation operation is performed, the quantities from the warehouse/locator transactions where this option is enabled will not be included in the available balance by date calculation, meaning the system will ignore the balances of those warehouses/locators when determining whether an overdraft exists.
