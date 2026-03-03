const Contact = require("../models/Contact");
const Registration = require("../models/Registration");
const AppError = require("../utils/AppError");

exports.createContact = async (data) => {
  return await Contact.create(data);
};

exports.getContacts = async (filters = {}) => {
  return await Contact.find(filters)
    .populate("handledBy", "name email")
    .sort({ createdAt: -1 });
};

exports.getContactById = async (id) => {
  const contact = await Contact.findById(id).populate(
    "handledBy",
    "name email",
  );
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }
  return contact;
};

exports.updateContact = async (id, data) => {
  const contact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }
  return contact;
};

exports.respondToContact = async (id, response, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    {
      status: "responded",
      response,
      handledBy: userId,
      respondedAt: new Date(),
    },
    { new: true },
  );
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }
  return contact;
};

exports.deleteContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }
  return contact;
};

exports.createRegistration = async (data) => {
  return await Registration.create(data);
};

exports.getRegistrations = async (filters = {}) => {
  return await Registration.find(filters)
    .populate("course", "title")
    .sort({ createdAt: -1 });
};

exports.getRegistrationById = async (id) => {
  const registration = await Registration.findById(id)
    .populate("course", "title")
    .populate("approvedBy", "name email");
  if (!registration) {
    throw new AppError("Registration not found", 404);
  }
  return registration;
};

exports.updateRegistration = async (id, data) => {
  const registration = await Registration.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!registration) {
    throw new AppError("Registration not found", 404);
  }
  return registration;
};

exports.approveRegistration = async (id, userId) => {
  const registration = await Registration.findByIdAndUpdate(
    id,
    {
      status: "approved",
      approvedBy: userId,
      approvedAt: new Date(),
    },
    { new: true },
  );
  if (!registration) {
    throw new AppError("Registration not found", 404);
  }
  return registration;
};

exports.rejectRegistration = async (id, rejectedReason) => {
  const registration = await Registration.findByIdAndUpdate(
    id,
    {
      status: "rejected",
      rejectedReason,
    },
    { new: true },
  );
  if (!registration) {
    throw new AppError("Registration not found", 404);
  }
  return registration;
};

exports.deleteRegistration = async (id) => {
  const registration = await Registration.findByIdAndDelete(id);
  if (!registration) {
    throw new AppError("Registration not found", 404);
  }
  return registration;
};
