const { createSubmission } = require("./api/submissions");
const { approveSubmission } = require("./api/approvals");
const { runAiVerification } = require("./triggers/submissions");

exports.createSubmission = createSubmission;
exports.approveSubmission = approveSubmission;
exports.runAiVerification = runAiVerification;
