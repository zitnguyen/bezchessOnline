const contactService = require("../services/contactService");
const asyncHandler = require("../middleware/asyncHandler");

exports.createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.createContact(req.body);

  res.status(201).json({
    success: true,
    message: "Contact submitted successfully",
    data: contact,
  });
});

exports.getContacts = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filters = {};
  if (status) filters.status = status;

  const contacts = await contactService.getContacts(filters);

  res.status(200).json({
    success: true,
    message: "Contacts retrieved successfully",
    data: contacts,
  });
});

exports.getContactById = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Contact retrieved successfully",
    data: contact,
  });
});

exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await contactService.updateContact(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    data: contact,
  });
});

exports.respondToContact = asyncHandler(async (req, res) => {
  const { response } = req.body;

  const contact = await contactService.respondToContact(
    req.params.id,
    response,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Response sent successfully",
    data: contact,
  });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  await contactService.deleteContact(req.params.id);

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

exports.createRegistration = asyncHandler(async (req, res) => {
  const registration = await contactService.createRegistration(req.body);

  res.status(201).json({
    success: true,
    message: "Registration submitted successfully",
    data: registration,
  });
});

exports.getRegistrations = asyncHandler(async (req, res) => {
  const { status, course } = req.query;
  const filters = {};
  if (status) filters.status = status;
  if (course) filters.course = course;

  const registrations = await contactService.getRegistrations(filters);

  res.status(200).json({
    success: true,
    message: "Registrations retrieved successfully",
    data: registrations,
  });
});

exports.getRegistrationById = asyncHandler(async (req, res) => {
  const registration = await contactService.getRegistrationById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Registration retrieved successfully",
    data: registration,
  });
});

exports.updateRegistration = asyncHandler(async (req, res) => {
  const registration = await contactService.updateRegistration(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Registration updated successfully",
    data: registration,
  });
});

exports.approveRegistration = asyncHandler(async (req, res) => {
  const registration = await contactService.approveRegistration(
    req.params.id,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Registration approved successfully",
    data: registration,
  });
});

exports.rejectRegistration = asyncHandler(async (req, res) => {
  const { rejectedReason } = req.body;

  const registration = await contactService.rejectRegistration(
    req.params.id,
    rejectedReason,
  );

  res.status(200).json({
    success: true,
    message: "Registration rejected",
    data: registration,
  });
});

exports.deleteRegistration = asyncHandler(async (req, res) => {
  await contactService.deleteRegistration(req.params.id);

  res.status(200).json({
    success: true,
    message: "Registration deleted successfully",
  });
});
