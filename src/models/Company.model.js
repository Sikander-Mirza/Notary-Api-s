const mongoose = require('mongoose');

const timeZones = [
  "Pacific/Kwajalein",
  "Pacific/Samoa",
  "Pacific/Midway",
  "Pacific/Honolulu",
  "America/Juneau",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Caracas",
  "America/St_Johns",
  "America/Sao_Paulo",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Atlantic/Reykjavik",
  "Europe/London",
  "Europe/Paris",
  "Europe/Moscow",
  "Asia/Tehran",
  "Asia/Dubai",
  "Asia/Kabul",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Yangon",
  "Asia/Bangkok",
  "Asia/Hong_Kong",
  "Australia/Eucla",
  "Asia/Tokyo",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Australia/Lord_Howe",
  "Pacific/Noumea",
  "Pacific/Norfolk",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "Pacific/Tongatapu",
  "Pacific/Kiritimati",
];

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: false },
  timeZone: { type: String, required: false, enum: timeZones },  // Added enum for time zones
});

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddressLine1: { type: String, required: true },
  companyAddressLine2: { type: String },
  companyCity: { type: String, required: true },
  companyState: {
    type: String,
    required: true,
    enum: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
      "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", 
      "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
      "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
      "Texas", "Utah", "Vermont", "Virginia", "Washington", 
      "West Virginia", "Wisconsin", "Wyoming"
    ],
  },
  companyZIP: { type: String, required: true },
  preferredNotaryID: { type: String, required: true },
  primaryContact: { type: contactSchema, required: true },
  secondaryContact: { type: contactSchema },
  thirdContact: { type: contactSchema },
  fourthContact: { type: contactSchema },
  requireKBA: { type: Boolean, default: false },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
