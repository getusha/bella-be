export enum AccountType {
  DEFAULT = 'DEFAULT',
  PREMIUM = 'PREMIUM',
}

export enum Languages {
  AMHARIC = 'AMHARIC',
  OROMO = 'OROMO',
  TIGRIGNA = 'TIGRIGNA',
}

export enum ReminderType {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum ReminderPriorityType {
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

export enum ReminderDeliveryType {
  NOTIFICATION = 'NOTIFICATION',
  SMS = 'SMS',
}

export enum ReminderStatus {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
  CANCELLED = 'CANCELLED',
}
