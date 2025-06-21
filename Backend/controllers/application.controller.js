import { populate } from "dotenv";

export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.param.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job id is required", status: false });
    }

    // check if user has applied for the job
    const existingApplication = await application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({
          message: "You have already applied for this job",
          status: false,
        });
    }

    //check if job exist

    const job = await job.findOne({ id: jobId });
    if (!job) {
      return res
        .status(400)
        .json({ message: "Job does not exist", status: false });
    }

    // new application
    const newApplication = await application.create({
      job: jobId,
      applicant: userId,
    });
    job.application.push(newApplication._id);
    await job.save();
    return res
      .status(200)
      .json({ message: "Application submitted successfully", status: true });
  } catch (error) {
    console.log(error);
  }
};

export const getApplications = async (req, res) =>{
    try {
        const userId = req.id;
        const application = await application.find({ applicant: userId }).sort ({ createdAt: -1 }).populate ({
            path: 'job',
            option:{sort:{createdAt:-1}},
            populate:{
                path: 'company',
                option:{sort:{createdAt:-1}},
                
            }

        });
        if(!application){
            return res.status(400).json({message: "No application found", status: false});
        }
        return res.status(200).json({message: "Applications found", status: true
        });
        
    } catch (error) {
        console.log(error);
    }
}
//admin will se how many user 
export const getApplicants = async (req, res) =>{
    try {
        const jobId = req.params.id;
        const job = await job.findOne(jobId ).populate({
            path: 'application',
            option:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'

            }
        });
        if(!job){
            return res.status(400).json(
                {message: "No job found", 
                    status: false})
                    };
                    return res.status(200).json({message: "Applications found", status: true});

    } catch (error) {
        console.log(error);
        
    }
}

export const updateStatus = async (req, res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if (!status){
            return res.status(400).json({message: "Status is required", status: false})
            };


            // find the application by id 
            const application = await Application.findOne({_id:applicationId});
            if(!application){
                return res.status(400).json({message: "No application found", status: false})
                };

                // update the status of the application
                application.status = status.toLowerCase();
                await application.save();
                return res.status(200).json({message: "Status updated", status: true});
            
        
    } catch (error) {
        console.log(error);
        
    }
}