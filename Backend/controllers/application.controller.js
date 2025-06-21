import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Student applies for a job
export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        status: false,
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        status: false,
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job does not exist",
        status: false,
      });
    }

    // Create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Push application to job
    job.application.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Application submitted successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Student gets all jobs they applied for
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Applications found",
      status: true,
      applications,
    });
  } catch (error) {
    console.log(error);
  }
};

// Admin gets all applicants for a specific job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Applications found",
      status: true,
      applicants: job.application,
    });
  } catch (error) {
    console.log(error);
  }
};

// Admin updates the application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        status: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        status: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
