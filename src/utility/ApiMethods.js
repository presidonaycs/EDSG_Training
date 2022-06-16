export const URLAPI = {
  Auth: {
    Post: "/api/Auth/authorization",
    PostId: "/api/Auth/signin",
  },
  pendingrequest: {
    Get: "/Approval/pendingapprovalrequest",
    GetApproved: "/Approval/approvedapprovalrequest",
    GetDeclined: "/Approval/declinedapprovalrequest",
    GetDetails: "/Approval/approvalprogress/",
  },
  approveTraining: {
    Put: "/Approval/approverequest",
  },
  Closure: {
    Get: "/Request/closedtrainings",
  },
};
