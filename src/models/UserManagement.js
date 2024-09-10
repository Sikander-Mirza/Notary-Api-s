const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  privileges: {
    dashboard: { type: Boolean, default: false },
    notaryDashboard: { type: Boolean, default: false },
    jobManagement: {
      notarizeADocument: { type: Boolean, default: false },
      jobsList: { type: Boolean, default: false }
    },
    titleCompany: { type: Boolean, default: false },
    notaryManagement: { type: Boolean, default: false },
    userManagement: { type: Boolean, default: false },
    services: { type: Boolean, default: false },
    clientManagement: { type: Boolean, default: false },
    menuManagement: { type: Boolean, default: false },
    notarizationLogs: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add pre-save middleware to update the 'updatedAt' field


const UserManagement = mongoose.model('UserManagement', userSchema);

module.exports = UserManagement;
