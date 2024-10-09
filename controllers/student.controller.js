import { Student } from "../models/student.model.js";
import { buildSearchQuery, getTotalData, sendCreateMessage, sendError, sendErrorWithCode, sendMessage } from "../utils/function.js";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../utils/variable.js";

export const student = async (req, res) => {
    const { studentId } = req.params;
    const { search, section, gender, class: classes, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.query;
    const skipValue = (page - 1) * limit;
    const searchItems = ["name","emisId", "phoneNumber", "aadharNumber", "fatherName"]
    const query = {};
    if (classes && classes !== "") query.class = classes;
    if (section && section !== "") query.section = section;
    if (gender && gender !== "") query.gender = gender;
    if (search && search !== "") {
        buildSearchQuery(search, query, searchItems)
    }

    try {
        if (req.method === "POST") {
            console.log("posting data")
            await Student.create(req.body);
            return sendCreateMessage(res, "Student created successfully");
        }

        if (req.method === "GET") {
            if (studentId) {
                const student = await Student.findById(studentId);
                if (!student) {
                    return sendErrorWithCode(res, "Student not found", 404);
                }
                return res.status(200).json({data:student})
            }
            const total = await getTotalData(Student, query)
            const students = await Student.find(query)
            .skip(skipValue)
            .limit(limit)
            .sort({ createdAt: -1 });
            
            return res.status(200).json({data:students, total:total})
        }
         
        if(req.method === "PUT"){
            const student = await Student.findByIdAndUpdate(studentId, req.body, {new: true});
            return sendMessage(res,"Student data updated Successfully",student);
        }


    } catch (error) {
        return sendError(res, error)
    }
};
